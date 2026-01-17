import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { analyzeMeal } from '../services/gemini';
import { STORAGE_KEYS, storage } from '../services/storage';

export default function MealLogger({ onLogComplete, selectedDate }) {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        try {
            const data = await analyzeMeal(input);

            // Fix: Create date properly without timezone issues
            let mealDate;
            if (selectedDate) {
                // Create a new date object from selectedDate and set current time
                const selected = new Date(selectedDate);
                const now = new Date();
                // Use local date components to avoid timezone shifts
                mealDate = new Date(
                    selected.getFullYear(),
                    selected.getMonth(),
                    selected.getDate(),
                    now.getHours(),
                    now.getMinutes(),
                    now.getSeconds()
                );
            } else {
                mealDate = new Date();
            }

            const newMeal = {
                id: Date.now(),
                date: mealDate.toISOString(),
                // Store date string separately for easier comparison
                dateKey: `${mealDate.getFullYear()}-${String(mealDate.getMonth() + 1).padStart(2, '0')}-${String(mealDate.getDate()).padStart(2, '0')}`,
                description: input,
                analysis: data
            };

            // Save to local storage
            const existingMeals = storage.get(STORAGE_KEYS.MEALS) || [];
            const updatedMeals = [newMeal, ...existingMeals];
            storage.set(STORAGE_KEYS.MEALS, updatedMeals);

            setInput('');
            if (onLogComplete) onLogComplete();
        } catch (error) {
            console.error("Failed to analyze meal:", error);
            alert("Failed to analyze meal. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Format display date
    const displayDate = selectedDate
        ? new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Today';

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Log a Meal</h2>
                <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                    {displayDate}
                </span>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What did you eat? e.g., 'Rice with dal, sabzi, and curd' or 'Roti with paneer curry'"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder:text-gray-400"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Analyzing with AI...
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            Analyze Meal
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
