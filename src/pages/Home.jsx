import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Salad, Brain, Shield, Building2, Users, Award, ArrowRight, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Home() {
    const { user } = useAuth();

    const features = [
        {
            icon: Salad,
            title: "Smart Diet Analysis",
            description: "AI-powered meal tracking identifies nutrient deficiencies and recommends affordable supplements from Jan Aushadhi Kendras across India.",
        },
        {
            icon: Brain,
            title: "Yoga Therapy",
            description: "Get scientifically-backed, personalized yoga routines tailored to heal your specific health conditions naturally.",
        },
        {
            icon: Shield,
            title: "Privacy First",
            description: "All your health data is stored securely on your device. We never collect or share your personal information.",
        }
    ];

    const stats = [
        { value: "9,500+", label: "Jan Aushadhi Kendras" },
        { value: "1.4B+", label: "Citizens to Benefit" },
        { value: "₹0", label: "Platform Cost" },
        { value: "24/7", label: "AI Assistance" }
    ];

    const schemes = [
        { name: "Jan Aushadhi Yojana", desc: "Affordable medicines for all" },
        { name: "Ayushman Bharat", desc: "Health coverage for families" },
        { name: "Fit India Movement", desc: "Promoting physical fitness" },
        { name: "AYUSH", desc: "Traditional medicine systems" }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-orange-50" />
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />

                <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-12 md:py-20">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                                <Building2 size={16} />
                                Government of India Initiative
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Welcome to{' '}
                                <span className="gradient-text-green">YuFIT</span>
                            </h1>

                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                <strong>Yuva Fitness & Integrated Therapy</strong> – Empowering every Indian citizen with
                                AI-driven nutrition analysis and personalized yoga therapy for a healthier,
                                stronger nation.
                            </p>

                            <div className="notice-box p-4 rounded-lg">
                                <p className="text-sm text-amber-800">
                                    <strong>🎯 Mission:</strong> Eliminate nutritional deficiencies and promote holistic
                                    wellness through accessible healthcare technology.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="/meals"
                                    className="btn-primary px-6 py-3 rounded-xl text-center flex items-center justify-center gap-2"
                                >
                                    Start Meal Tracking
                                    <ArrowRight size={18} />
                                </Link>
                                <Link
                                    to="/yoga"
                                    className="btn-orange px-6 py-3 rounded-xl text-center flex items-center justify-center gap-2"
                                >
                                    Try Yoga Therapy
                                    <Brain size={18} />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col items-center justify-center">
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                                {/* Government of India Emblem */}
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                                    alt="Emblem of India"
                                    className="h-32 w-auto mx-auto mb-4 emblem-shadow"
                                />
                                <h2 className="text-xl font-bold text-gray-800 mb-1">भारत सरकार</h2>
                                <p className="text-gray-600 text-sm">Government of India</p>
                                <div className="tricolor-bar mt-4 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-green-800 py-10">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-green-200 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Key Features
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Leveraging artificial intelligence to address India's nutritional challenges
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm card-hover"
                            >
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                                    <feature.icon className="text-green-700" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Schemes */}
            <section className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Aligned with Government Initiatives
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            YuFIT supports and complements various health initiatives by the Government of India
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {schemes.map((scheme, index) => (
                            <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 text-center card-hover">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                                    <Award className="text-orange-600" size={20} />
                                </div>
                                <h4 className="font-semibold text-gray-800 text-sm mb-1">{scheme.name}</h4>
                                <p className="text-gray-500 text-xs">{scheme.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 md:py-16 bg-green-800">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Our Vision for Bharat
                    </h2>
                    <p className="text-green-100 leading-relaxed mb-6">
                        YuFIT is committed to supporting the Government of India's vision of a
                        <strong className="text-white"> malnutrition-free</strong> and
                        <strong className="text-white"> yoga-embracing</strong> nation.
                        By combining AI technology with affordable healthcare access through Jan Aushadhi Kendras,
                        we're making personalized wellness accessible to every citizen.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                            🇮🇳 Made in India
                        </span>
                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                            🧘 Yoga for All
                        </span>
                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                            💊 Jan Aushadhi
                        </span>
                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                            🏥 Digital Health
                        </span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-10">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <img src={logo} alt="YuFIT" className="h-8 w-auto" />
                                <span className="text-white font-semibold">YuFIT</span>
                            </div>
                            <p className="text-sm leading-relaxed">
                                A Government of India initiative for a healthier nation.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/meals" className="hover:text-white transition-colors">Meal Tracker</Link></li>
                                <li><Link to="/yoga" className="hover:text-white transition-colors">Yoga Therapy</Link></li>
                                <li><Link to="/settings" className="hover:text-white transition-colors">Settings</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="https://janaushadhi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                                        Jan Aushadhi <ExternalLink size={12} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://yoga.ayush.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                                        AYUSH Portal <ExternalLink size={12} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2"><Mail size={14} /> support@yufit.gov.in</li>
                                <li className="flex items-center gap-2"><Phone size={14} /> 1800-XXX-XXXX</li>
                            </ul>
                        </div>
                    </div>

                    <div className="tricolor-bar mb-6" />

                    <div className="text-center text-xs">
                        <p>© 2026 YuFIT - Government of India. All rights reserved.</p>
                        <p className="mt-1">Content owned & maintained by Ministry of Health and Family Welfare</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
