"use client";

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('darkMode');
            if (savedTheme === 'true') {
                setIsDarkMode(true);
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            const savedSidebar = localStorage.getItem('sidebarCollapsed');
            if (savedSidebar === 'true') {
                setIsSidebarCollapsed(true);
            }
        }
    }, []);

    // Toggle Theme
    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));

        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Toggle Sidebar
    const toggleSidebar = () => {
        const newState = !isSidebarCollapsed;
        setIsSidebarCollapsed(newState);
        localStorage.setItem('sidebarCollapsed', String(newState));
    };

    return (
        <div className="flex h-screen overflow-hidden bg-white transition-colors duration-300">
            {/* Sidebar */}
            <Sidebar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden h-full">
                {/* Advanced Top Bar */}
                <TopBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

                {/* Content Area */}
                <div className="flex-1 overflow-auto bg-white transition-all duration-300">
                    {children}
                </div>
            </div>
        </div>
    );
}
