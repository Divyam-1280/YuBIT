import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateYogaRoutine } from '../services/gemini';
import { storage, STORAGE_KEYS } from '../services/storage';

export default function SymptomForm({ onRoutineGenerated }) {
    const [ailment, setAilment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ailment.trim()) return;

        setLoading(true);
        try {
            const routine = await generateYogaRoutine(ailment);

            const newRoutine = {
                id: Date.now(),
                date: new Date().toISOString(),
                ailment: ailment,
                routine: routine
            };

            const prevRoutines = storage.get(STORAGE_KEYS.YOGA_ROUTINES) || [];
            storage.set(STORAGE_KEYS.YOGA_ROUTINES, [newRoutine, ...prevRoutines]);

            onRoutineGenerated(newRoutine);
            setAilment('');
        } catch (error) {
            console.error("Error generating routine:", error);
            alert("Error generating routine. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const suggestions = [
        "Lower back pain",
        "Neck stiffness",
        "Stress & anxiety",
        "Insomnia",
        "Headaches"
    ];

    return (
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">What's troubling you?</h2>
            <p className="text-gray-500 text-sm mb-4">
                Describe your symptoms for a personalized routine
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={ailment}
                    onChange={(e) => setAilment(e.target.value)}
                    placeholder="e.g., I have severe lower back pain from sitting all day..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-gray-400 text-sm"
                    disabled={loading}
                />

                {/* Quick Suggestions */}
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            type="button"
                            onClick={() => setAilment(suggestion)}
                            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:text-orange-700 hover:border-orange-300 hover:bg-orange-50 transition-all"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading || !ailment.trim()}
                    className="w-full btn-orange disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Creating your routine...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Generate Routine
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
