import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../services/storage';
import logo from '../assets/logo.png';

// Dummy accounts for quick access
const DUMMY_ACCOUNTS = [
    { email: 'demo@yufit.gov.in', password: 'demo123', name: 'Demo User' }
];

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const users = storage.get(STORAGE_KEYS.USERS) || [];
            const allUsers = [...DUMMY_ACCOUNTS, ...users];

            const user = allUsers.find(
                u => u.email === formData.email && u.password === formData.password
            );

            if (user) {
                login({
                    name: user.name,
                    email: user.email,
                    apiKey: import.meta.env.VITE_GEMINI_API_KEY
                });
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } else {
            if (!formData.name || !formData.email || !formData.password) {
                setError('Please fill all fields');
                return;
            }

            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }

            const users = storage.get(STORAGE_KEYS.USERS) || [];

            if (users.find(u => u.email === formData.email) ||
                DUMMY_ACCOUNTS.find(u => u.email === formData.email)) {
                setError('Email already registered');
                return;
            }

            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            storage.set(STORAGE_KEYS.USERS, [...users, newUser]);

            login({
                name: newUser.name,
                email: newUser.email,
                apiKey: import.meta.env.VITE_GEMINI_API_KEY
            });
            navigate('/');
        }
    };

    const handleDummyLogin = () => {
        const demoUser = DUMMY_ACCOUNTS[0];
        login({
            name: demoUser.name,
            email: demoUser.email,
            apiKey: import.meta.env.VITE_GEMINI_API_KEY
        });
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
            {/* Tricolor bar */}
            <div className="tricolor-bar" />

            {/* Header */}
            <div className="govt-header py-4 px-4">
                <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
                    <img
                        src={logo}
                        alt="YuFIT Logo"
                        className="h-14 w-auto bg-white rounded-lg p-1"
                    />
                    <div className="text-center text-white">
                        <h1 className="text-lg md:text-xl font-bold">YuFIT - Yuva Fitness & Integrated Therapy</h1>
                        <p className="text-xs md:text-sm opacity-90">Government of India Initiative</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-md">
                    {/* Login/Register Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-100">
                            <button
                                onClick={() => { setIsLogin(true); setError(''); }}
                                className={`flex-1 py-4 text-center font-semibold transition-all ${isLogin
                                    ? 'text-green-700 border-b-2 border-green-700 bg-green-50'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <LogIn size={18} className="inline mr-2" />
                                Login
                            </button>
                            <button
                                onClick={() => { setIsLogin(false); setError(''); }}
                                className={`flex-1 py-4 text-center font-semibold transition-all ${!isLogin
                                    ? 'text-green-700 border-b-2 border-green-700 bg-green-50'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <UserPlus size={18} className="inline mr-2" />
                                Register
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your full name"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full btn-primary py-3 rounded-xl text-lg flex items-center justify-center gap-2"
                            >
                                {isLogin ? (
                                    <>
                                        <LogIn size={20} />
                                        Login to YuFIT
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={20} />
                                        Create Account
                                    </>
                                )}
                            </button>

                            {isLogin && (
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-center text-sm text-gray-500 mb-3">Quick Access</p>
                                    <button
                                        type="button"
                                        onClick={handleDummyLogin}
                                        className="w-full btn-orange py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
                                    >
                                        Use Demo Account
                                    </button>
                                    <p className="text-center text-xs text-gray-400 mt-2">
                                        demo@yufit.gov.in / demo123
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        By continuing, you agree to YuFIT's Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}
