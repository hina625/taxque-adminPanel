"use client";

import { useState, useEffect } from 'react';

interface TopBarProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
    toggleMobileMenu?: () => void;
}

export default function TopBar({ isDarkMode, toggleTheme, toggleMobileMenu }: TopBarProps) {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));

            setCurrentDate(now.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-300">
            <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Hamburger Menu */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <i className="fas fa-bars text-xl"></i>
                        </button>

                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">Dashboard</h2>
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                    <li className="inline-flex items-center">
                                        <a href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                                            <i className="fas fa-home mr-1"></i>
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <i className="fas fa-chevron-right text-gray-400 text-xs dark:text-gray-500"></i>
                                            <span className="ml-1 text-sm font-medium text-gray-800 dark:text-gray-300">Dashboard</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* Quick Website Link */}
                        <div className="hidden md:block">
                            <a href="https://yourwebsite.com" target="_blank" className="flex items-center text-sm text-primary hover:text-blue-800 dark:hover:text-blue-400 border border-primary rounded-lg px-3 py-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                <i className="fas fa-external-link-alt mr-2 text-xs"></i>
                                Visit Website
                            </a>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <div className="relative hidden lg:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search everything..."
                                    className="w-64 pl-10 pr-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                                />
                                <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-400">
                                    <i className="fas fa-search"></i>
                                </div>
                                <div className="absolute right-3 top-2.5">
                                    <kbd className="px-1 py-0.5 text-xs border rounded bg-gray-100 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500">Ctrl+K</kbd>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="relative">
                            <button
                                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                                onBlur={() => setTimeout(() => setIsQuickActionsOpen(false), 200)}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <i className="fas fa-bolt"></i>
                            </button>
                            {isQuickActionsOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50 animate-fade-in-down">
                                    <div className="p-3 border-b dark:border-gray-700">
                                        <p className="font-medium dark:text-white">Quick Actions</p>
                                    </div>
                                    <div className="p-2">
                                        <a href="#" className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                                            <i className="fas fa-user-plus text-blue-600 dark:text-blue-400 mr-3"></i>
                                            <span className="dark:text-white">Add New User</span>
                                        </a>
                                        <a href="#" className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                                            <i className="fas fa-plus-circle text-green-600 dark:text-green-400 mr-3"></i>
                                            <span className="dark:text-white">Create Order</span>
                                        </a>
                                        <a href="#" className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                                            <i className="fas fa-edit text-purple-600 dark:text-purple-400 mr-3"></i>
                                            <span className="dark:text-white">Write Blog Post</span>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <div className="relative">
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                onBlur={() => setTimeout(() => setIsNotificationsOpen(false), 200)}
                                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <i className="fas fa-bell"></i>
                                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-[11px] rounded-full bg-red-500 text-white flex items-center justify-center">5</span>
                            </button>
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50 animate-fade-in-down">
                                    <div className="p-3 border-b dark:border-gray-700 flex justify-between items-center">
                                        <p className="font-medium dark:text-white">Notifications</p>
                                        <button className="text-xs text-primary hover:text-blue-800 dark:hover:text-blue-400">Mark all as read</button>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                                        <div className="p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                        <i className="fas fa-shopping-cart text-blue-600 dark:text-blue-400 text-sm"></i>
                                                    </div>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium dark:text-white">New Order Received</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Order #ORD-12345 has been placed</p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 minutes ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 border-t dark:border-gray-700 text-center">
                                        <a href="#" className="text-sm text-primary hover:text-blue-800 dark:hover:text-blue-400">View all notifications</a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile */}
                        <div className="relative border-l dark:border-gray-700 pl-4">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                                className="flex items-center space-x-2"
                            >
                                <img
                                    src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff&bold=true&size=40"
                                    alt="Admin User"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium dark:text-white">Admin User</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                                </div>
                                <i className="fas fa-chevron-down text-gray-400 dark:text-gray-500 text-xs"></i>
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50 animate-fade-in-down">
                                    <div className="p-3 border-b dark:border-gray-700">
                                        <div className="flex items-center">
                                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff&bold=true&size=40" alt="Admin User" className="w-10 h-10 rounded-full mr-3 object-cover" />
                                            <div>
                                                <p className="font-medium dark:text-white">Admin User</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <a href="#" className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded dark:text-white transition-colors">
                                            <i className="fas fa-user text-gray-600 dark:text-gray-400 mr-3 text-sm"></i>
                                            <span>My Profile</span>
                                        </a>
                                        <a href="#" className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded dark:text-white transition-colors">
                                            <i className="fas fa-cog text-gray-600 dark:text-gray-400 mr-3 text-sm"></i>
                                            <span>Account Settings</span>
                                        </a>
                                        <div className="border-t dark:border-gray-700 my-2"></div>
                                        <a href="#" className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-red-600 hover:text-red-800 dark:text-red-400 transition-colors">
                                            <i className="fas fa-sign-out-alt mr-3 text-sm"></i>
                                            <span>Logout</span>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="mt-3 lg:hidden">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-400">
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-3 flex flex-wrap items-center justify-between text-sm">
                    <div className="flex space-x-4">
                        <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-gray-600 dark:text-gray-300">System Status: <span className="font-medium text-green-600 dark:text-green-400">Operational</span></span>
                        </div>
                        <div className="hidden md:flex items-center">
                            <i className="fas fa-users text-gray-400 dark:text-gray-500 mr-2"></i>
                            <span className="text-gray-600 dark:text-gray-300">Active Users: <span className="font-medium dark:text-white">24</span></span>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <i className="fas fa-clock mr-2"></i>
                        <span>{currentTime}</span>
                        <span className="mx-2">•</span>
                        <span>{currentDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
