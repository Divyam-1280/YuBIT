import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Salad, Brain, Settings, Home, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function NavLink({ to, icon: Icon, children }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm",
                isActive
                    ? "bg-green-700 text-white shadow-md"
                    : "text-gray-600 hover:text-green-700 hover:bg-green-50"
            )}
        >
            <Icon size={18} />
            <span className="hidden sm:inline">{children}</span>
        </Link>
    );
}

export function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/meals', icon: Salad, label: 'Meals' },
        { to: '/yoga', icon: Brain, label: 'Yoga' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <>
            {/* Tricolor bar */}
            <div className="tricolor-bar" />

            {/* Desktop Navbar */}
            <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5">
                        <img
                            src={logo}
                            alt="YuFIT Logo"
                            className="h-10 w-auto"
                        />
                        <div className="hidden sm:block">
                            <span className="text-lg font-bold text-green-800">YuFIT</span>
                            <span className="block text-xs text-gray-500">Govt. of India</span>
                        </div>
                    </Link>

                    {/* Nav Links - Desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink key={item.to} to={item.to} icon={item.icon}>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* User info */}
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:block text-sm text-gray-600">
                            {user?.name || 'User'}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden border-t border-gray-100">
                    <div className="flex items-center justify-around py-2">
                        {navItems.map((item) => {
                            const location = useLocation();
                            const isActive = location.pathname === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={clsx(
                                        "flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all",
                                        isActive
                                            ? "text-green-700"
                                            : "text-gray-500"
                                    )}
                                >
                                    <item.icon size={20} />
                                    <span className="text-[10px] font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
}
