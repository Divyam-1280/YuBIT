import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { user } = useAuth();

    if (!user?.apiKey) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
                    <span className="text-4xl">👋</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                    Welcome to YuBIT
                </h1>
                <p className="max-w-md text-slate-400 text-lg">
                    Your personal health companion. To get started, please setup your API key.
                </p>
                <Link
                    to="/settings"
                    className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                >
                    Get Started
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400">Welcome back, {user.name || 'User'}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <h3 className="text-xl font-semibold mb-4 text-emerald-400">Quick Stats</h3>
                    <p className="text-slate-400">Start logging your meals to see stats!</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Recent Activity</h3>
                    <p className="text-slate-400">No recent activity.</p>
                </div>
            </div>
        </div>
    );
}
