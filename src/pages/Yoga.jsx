import React, { useState, useEffect } from 'react';
import SymptomForm from '../components/SymptomForm';
import YogaRoutine from '../components/YogaRoutine';
import { storage, STORAGE_KEYS } from '../services/storage';
import { History, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Yoga() {
    const [currentRoutine, setCurrentRoutine] = useState(null);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const stored = storage.get(STORAGE_KEYS.YOGA_ROUTINES) || [];
        setHistory(stored);
        if (stored.length > 0) {
            setCurrentRoutine(stored[0]);
        }
    }, []);

    const handleNewRoutine = (routineData) => {
        setCurrentRoutine(routineData);
        setHistory(prev => [routineData, ...prev]);
    };

    return (
        <div className="pb-8">
            {/* Header */}
            <header className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-orange-100">
                                <Sparkles className="text-orange-600" size={20} />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Yoga Therapist</h1>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Personalized yoga routines to heal your body naturally
                        </p>
                    </div>

                    {history.length > 0 && (
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${showHistory
                                    ? 'bg-orange-100 border-orange-300 text-orange-700'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <History size={18} />
                            <span className="hidden sm:inline">Past Sessions</span>
                            <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">{history.length}</span>
                        </button>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Section: Form + History */}
                <div className="lg:col-span-4 space-y-6">
                    <SymptomForm onRoutineGenerated={handleNewRoutine} />

                    {/* History Panel */}
                    <AnimatePresence>
                        {showHistory && history.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <History size={18} className="text-orange-600" />
                                    Session History
                                </h3>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                    {history.map((item, index) => (
                                        <motion.button
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => setCurrentRoutine(item)}
                                            className={`w-full text-left p-3 rounded-xl transition-all ${currentRoutine?.id === item.id
                                                    ? 'bg-orange-100 border border-orange-300'
                                                    : 'bg-gray-50 border border-gray-100 hover:border-gray-200'
                                                }`}
                                        >
                                            <p className={`font-medium truncate text-sm ${currentRoutine?.id === item.id ? 'text-orange-800' : 'text-gray-700'
                                                }`}>
                                                {item.ailment}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(item.date).toLocaleDateString('en-IN', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Section: Routine Display */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {currentRoutine ? (
                            <YogaRoutine key={currentRoutine.id} routineData={currentRoutine} />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]"
                            >
                                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                                    <span className="text-5xl">🧘</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Ready to Feel Better?
                                </h3>
                                <p className="text-gray-500 max-w-sm">
                                    Describe what's troubling you and our AI will create a personalized yoga routine based on ancient Indian wisdom.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
