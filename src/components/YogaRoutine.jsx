import React from 'react';
import { Clock, CheckCircle2, Info, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function YogaRoutine({ routineData }) {
    if (!routineData) return null;

    const { routine, ailment } = routineData;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Routine Header Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                {/* Orange accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400" />

                <div className="pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div>
                            <p className="text-green-700 text-sm font-medium mb-2 flex items-center gap-2">
                                <CheckCircle2 size={16} />
                                Routine for: {ailment}
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                {routine.routineName}
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-100 border border-orange-200">
                            <Clock size={18} className="text-orange-600" />
                            <span className="text-orange-800 font-medium">{routine.duration}</span>
                        </div>
                    </div>

                    {routine.focus && (
                        <p className="text-gray-600 text-sm bg-gray-100 inline-block px-3 py-1 rounded-lg">
                            Focus: <span className="text-gray-900 font-medium">{routine.focus}</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Poses List */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Play size={18} className="text-orange-600" />
                    Yoga Poses ({routine.steps?.length || 0})
                </h3>

                <div className="grid gap-4">
                    {routine.steps?.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="yoga-pose-card bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden"
                        >
                            <div className="flex gap-4">
                                {/* Step Number */}
                                <div className="shrink-0">
                                    <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold shadow">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Step Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {step.pose}
                                        </h4>
                                        <span className="text-sm text-orange-700 font-medium bg-orange-100 px-3 py-1 rounded-full w-fit">
                                            {step.duration}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                        {step.instructions}
                                    </p>

                                    <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 border border-green-100">
                                        <Info size={16} className="text-green-600 shrink-0 mt-0.5" />
                                        <p className="text-sm text-green-800">
                                            <span className="font-medium">Benefit:</span> {step.benefits}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Advice Card */}
            {routine.advice && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="notice-box rounded-xl p-5"
                >
                    <h4 className="text-base font-semibold text-amber-800 mb-2 flex items-center gap-2">
                        💡 Pro Tip
                    </h4>
                    <p className="text-amber-900 leading-relaxed">
                        {routine.advice}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
