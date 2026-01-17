import React, { useState, useEffect, useMemo } from 'react';
import MealLogger from '../components/MealLogger';
import NutrientDashboard from '../components/NutrientDashboard';
import SupplementRecommendations from '../components/SupplementRecommendations';
import { storage, STORAGE_KEYS } from '../services/storage';
import { analyzeDailyNutrition } from '../services/gemini';
import { ChevronLeft, ChevronRight, Calendar, Plus, Utensils, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Meals() {
    const [meals, setMeals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showLogger, setShowLogger] = useState(false);
    const [dailyAnalysis, setDailyAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    const loadMeals = () => {
        const stored = storage.get(STORAGE_KEYS.MEALS) || [];
        setMeals(stored);
    };

    useEffect(() => {
        loadMeals();
    }, []);

    // Get date string for comparison (using local date)
    const formatDateKey = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    // Meals for selected date
    const selectedDateMeals = useMemo(() => {
        const dateKey = formatDateKey(selectedDate);
        return meals.filter(meal => {
            if (meal.dateKey) {
                return meal.dateKey === dateKey;
            }
            return formatDateKey(meal.date) === dateKey;
        });
    }, [meals, selectedDate]);

    // Get meals dates for calendar indicators
    const mealDates = useMemo(() => {
        return new Set(meals.map(meal => meal.dateKey || formatDateKey(meal.date)));
    }, [meals]);

    // Run daily analysis when meals change
    const runDailyAnalysis = async () => {
        if (selectedDateMeals.length === 0) {
            setDailyAnalysis(null);
            return;
        }

        setAnalyzing(true);
        try {
            const mealDescriptions = selectedDateMeals.map(m => m.description);
            const analysis = await analyzeDailyNutrition(mealDescriptions);
            setDailyAnalysis(analysis);

            // Store analysis with date key
            const dateKey = formatDateKey(selectedDate);
            const storedAnalyses = storage.get(STORAGE_KEYS.DAILY_ANALYSES) || {};
            storedAnalyses[dateKey] = analysis;
            storage.set(STORAGE_KEYS.DAILY_ANALYSES, storedAnalyses);
        } catch (error) {
            console.error("Failed to analyze daily nutrition:", error);
        } finally {
            setAnalyzing(false);
        }
    };

    // Load cached analysis when date changes
    useEffect(() => {
        const dateKey = formatDateKey(selectedDate);
        const storedAnalyses = storage.get(STORAGE_KEYS.DAILY_ANALYSES) || {};
        if (storedAnalyses[dateKey]) {
            setDailyAnalysis(storedAnalyses[dateKey]);
        } else {
            setDailyAnalysis(null);
        }
    }, [selectedDate]);

    // Calendar helpers
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const calendarDays = getDaysInMonth(currentMonth);

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const isToday = (date) => {
        if (!date) return false;
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isSelected = (date) => {
        if (!date) return false;
        return date.toDateString() === selectedDate.toDateString();
    };

    const hasMeals = (date) => {
        if (!date) return false;
        return mealDates.has(formatDateKey(date));
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Handle meal logged - run analysis after
    const handleMealLogged = async () => {
        loadMeals();
        setShowLogger(false);
        // Wait a bit for state to update then analyze
        setTimeout(() => {
            runDailyAnalysis();
        }, 500);
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Meal Tracker</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Track daily nutrition & get personalized insights</p>
                </div>
                <button
                    onClick={() => setShowLogger(true)}
                    className="btn-primary px-5 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    Log Meal
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Section */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Calendar Card */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={prevMonth}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </h3>
                            <button
                                onClick={nextMonth}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map(day => (
                                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((date, index) => (
                                <button
                                    key={index}
                                    onClick={() => date && setSelectedDate(date)}
                                    disabled={!date}
                                    className={`
                    calendar-day aspect-square rounded-lg flex items-center justify-center text-sm relative
                    ${!date ? 'invisible' : 'cursor-pointer'}
                    ${isSelected(date) ? 'active' : ''}
                    ${isToday(date) && !isSelected(date) ? 'ring-2 ring-green-500 text-green-600 font-semibold' : ''}
                    ${hasMeals(date) && !isSelected(date) ? 'has-meals text-gray-700 font-medium' : 'text-gray-600'}
                    ${!isSelected(date) && !isToday(date) ? 'hover:bg-green-50' : ''}
                  `}
                                >
                                    {date?.getDate()}
                                </button>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span>Has meals</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full ring-2 ring-green-500"></div>
                                <span>Today</span>
                            </div>
                        </div>
                    </div>

                    {/* Supplement Recommendations - Now uses daily analysis */}
                    <SupplementRecommendations
                        dailyAnalysis={dailyAnalysis}
                        analyzing={analyzing}
                        onRefresh={runDailyAnalysis}
                        hasMeals={selectedDateMeals.length > 0}
                    />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Selected Date Info */}
                    <div className="flex items-center justify-between bg-green-50 px-4 py-3 rounded-xl border border-green-100">
                        <div className="flex items-center gap-3">
                            <Calendar className="text-green-600" size={20} />
                            <span className="font-medium text-green-800">
                                {selectedDate.toLocaleDateString('en-IN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        {selectedDateMeals.length > 0 && (
                            <button
                                onClick={runDailyAnalysis}
                                disabled={analyzing}
                                className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1 disabled:opacity-50"
                            >
                                <RefreshCw size={14} className={analyzing ? 'animate-spin' : ''} />
                                {analyzing ? 'Analyzing...' : 'Refresh Analysis'}
                            </button>
                        )}
                    </div>

                    {/* Nutrient Dashboard */}
                    <NutrientDashboard meals={selectedDateMeals} />

                    {/* Meals for Selected Date */}
                    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Utensils size={20} className="text-green-600" />
                            Meals on this day ({selectedDateMeals.length})
                        </h3>

                        <AnimatePresence mode="wait">
                            {selectedDateMeals.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Utensils size={24} className="text-gray-400" />
                                    </div>
                                    <p className="text-gray-500">No meals logged for this day.</p>
                                    <button
                                        onClick={() => setShowLogger(true)}
                                        className="mt-4 text-green-600 hover:text-green-700 font-medium"
                                    >
                                        + Add meal
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-4"
                                >
                                    {selectedDateMeals.map((meal, index) => (
                                        <motion.div
                                            key={meal.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-gray-50 border border-gray-100 rounded-xl p-4"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-gray-900 font-medium">{meal.description}</p>
                                                <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                                                    {new Date(meal.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {meal.analysis?.summary}
                                            </p>
                                            {meal.analysis?.nutrients && (
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <span className="px-2 py-1 rounded-md bg-orange-100 text-xs text-orange-700 font-medium">
                                                        🔥 {meal.analysis.nutrients.calories || 0} cal
                                                    </span>
                                                    <span className="px-2 py-1 rounded-md bg-green-100 text-xs text-green-700 font-medium">
                                                        💪 {meal.analysis.nutrients.protein || 0}g protein
                                                    </span>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Meal Logger Modal */}
            <AnimatePresence>
                {showLogger && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                        onClick={() => setShowLogger(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg"
                        >
                            <MealLogger
                                selectedDate={selectedDate}
                                onLogComplete={handleMealLogged}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
