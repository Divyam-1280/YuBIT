import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function NutrientDashboard({ meals }) {
    if (!meals || meals.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                    <TrendingUp className="text-gray-400" size={20} />
                </div>
                <p className="text-gray-500 text-sm">No meals logged for this day yet.</p>
            </div>
        );
    }

    // Aggregate nutrients
    const totalNutrients = meals.reduce((acc, meal) => {
        const n = meal.analysis?.nutrients || {};
        acc.calories += parseFloat(n.calories) || 0;
        acc.protein += parseFloat(n.protein) || 0;
        acc.carbs += parseFloat(n.carbs) || 0;
        acc.fats += parseFloat(n.fats) || 0;
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

    const data = [
        { name: 'Protein', value: totalNutrients.protein, color: '#16a34a' },
        { name: 'Carbs', value: totalNutrients.carbs, color: '#2563eb' },
        { name: 'Fats', value: totalNutrients.fats, color: '#ea580c' },
    ];

    const statCards = [
        { label: 'Calories', value: totalNutrients.calories.toFixed(0), unit: 'kcal', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
        { label: 'Protein', value: totalNutrients.protein.toFixed(1), unit: 'g', color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
        { label: 'Carbs', value: totalNutrients.carbs.toFixed(1), unit: 'g', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
        { label: 'Fats', value: totalNutrients.fats.toFixed(1), unit: 'g', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
    ];

    return (
        <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-xl p-4 border shadow-sm ${stat.bg}`}
                    >
                        <p className="text-gray-500 text-xs font-medium mb-1">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>
                            {stat.value}
                            <span className="text-sm font-normal text-gray-400 ml-1">{stat.unit}</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-green-600" />
                    Macros Breakdown
                </h3>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical">
                            <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                            <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={12} width={60} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    borderColor: '#e5e7eb',
                                    borderRadius: '12px',
                                    color: '#1f2937'
                                }}
                                formatter={(value) => [`${value.toFixed(1)}g`, '']}
                            />
                            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
