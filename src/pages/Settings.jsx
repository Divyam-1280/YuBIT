import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Key, Save, ShieldCheck, Trash2, User } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../services/storage';

export default function Settings() {
    const { user, login } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        login({ ...user, name: name || 'User' });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
            storage.remove(STORAGE_KEYS.MEALS);
            storage.remove(STORAGE_KEYS.YOGA_ROUTINES);
            alert('All data cleared!');
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6 py-4">
            <header>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-600 text-sm sm:text-base">Manage your preferences and data</p>
            </header>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={20} className="text-green-600" />
                    Profile
                </h3>

                <form onSubmit={handleSave} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                        {isSaved ? <ShieldCheck size={18} /> : <Save size={18} />}
                        {isSaved ? 'Saved!' : 'Save Changes'}
                    </button>
                </form>
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Trash2 size={20} className="text-red-500" />
                    Data Management
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                    Clear all stored meals and yoga routines. This action cannot be undone.
                </p>

                <button
                    onClick={handleClearData}
                    className="w-full py-3 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 transition-all font-medium"
                >
                    Clear All Data
                </button>
            </div>

            {/* About */}
            <div className="text-center text-gray-500 text-sm space-y-2 pt-4">
                <p className="font-medium">YuFIT v1.0.0</p>
                <p>A Government of India Initiative</p>
                <p className="text-xs">Built with ❤️ for a healthier Bharat</p>
            </div>
        </div>
    );
}
