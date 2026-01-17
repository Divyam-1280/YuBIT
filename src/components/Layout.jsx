import React from 'react';
import { Navbar } from './Navbar';

export function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="w-full px-3 sm:px-4 md:px-6 py-4 md:py-6 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
