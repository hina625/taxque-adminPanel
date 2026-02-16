"use client";

import { useState } from 'react';

const SidebarLink = ({ href, icon, label, collapsed }: { href: string; icon: string; label: string; collapsed: boolean }) => (
    <a href={href} className={`menu-btn w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${collapsed ? 'justify-center' : ''}`}>
        <i className={`${icon} mr-2`}></i>
        {!collapsed && <span>{label}</span>}
    </a>
);

interface SidebarProps {
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isSidebarCollapsed, toggleSidebar }: SidebarProps) {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    // Toggle Submenu
    const toggleSubmenu = (menuName: string) => {
        if (isSidebarCollapsed) return;
        setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    };

    return (
        <div
            className={`bg-sidebar-dark text-white dark:bg-gray-800 flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-[70px]' : 'w-64'}`}
            id="sidebar"
        >
            <div className="p-4 border-b border-gray-700 dark:border-gray-700">
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isSidebarCollapsed && <h1 className="text-xl font-bold">Admin Dashboard</h1>}
                    <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                        <i className={`fas ${isSidebarCollapsed ? 'fa-chevron-right' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">

                <div className="space-y-4">

                    <div>
                        <a href="/" className={`menu-btn w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                            <i className="fas fa-tachometer-alt mr-2"></i>
                            {!isSidebarCollapsed && <span>Dashboard</span>}
                        </a>
                    </div>


                    <div>
                        <button
                            onClick={() => toggleSubmenu('user-role')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-users mr-2"></i>
                                {!isSidebarCollapsed && <span>User and Role</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'user-role' ? 'rotate-180' : ''}`}></i>}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'user-role' && !isSidebarCollapsed ? 'max-h-[500px] mt-1' : 'max-h-0'}`}
                        >
                            <div className="ml-4 space-y-1">
                                <a href="#" className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                    <i className="fas fa-circle text-[8px] mr-2"></i>
                                    User Management
                                </a>
                                <a href="#" className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                    <i className="fas fa-circle text-[8px] mr-2"></i>
                                    Role Permissions
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => toggleSubmenu('ecommerce')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-shopping-cart mr-2"></i>
                                {!isSidebarCollapsed && <span>Ecommerce</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'ecommerce' ? 'rotate-180' : ''}`}></i>}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'ecommerce' && !isSidebarCollapsed ? 'max-h-[500px] mt-1' : 'max-h-0'}`}
                        >
                            <div className="ml-4 space-y-1">
                                {['Report', 'Order', 'Incomplete order', 'Order Cancellation', 'Service', 'Product categories', 'Service attributes', 'Service collections'].map((item) => (
                                    <a key={item} href="#" className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Referral Partner */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('referral')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-handshake mr-2"></i>
                                {!isSidebarCollapsed && <span>Referral Partner</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'referral' ? 'rotate-180' : ''}`}></i>}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'referral' && !isSidebarCollapsed ? 'max-h-[500px] mt-1' : 'max-h-0'}`}
                        >
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Dashboard', href: '/pages/dashboard' },
                                    { name: 'Partner Management', href: '#' },
                                    { name: 'Commission Settings', href: '/pages/commission-settings' },
                                    { name: 'Referral Tracking', href: '#' },
                                    { name: 'Payout Management', href: '#' },
                                    { name: 'Analytics & Reports', href: '#' }
                                ].map((item) => (
                                    <a key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Announcements Link */}
                    <div>
                        <SidebarLink href="/pages/site-announcements" icon="fas fa-bullhorn" label="Announcements" collapsed={isSidebarCollapsed} />

                    </div>

                    {/* Offer Banners Link */}
                    <div>
                        <SidebarLink href="/pages/banner" icon="fas fa-image" label="Offer Banners" collapsed={isSidebarCollapsed} />
                    </div>

                    {/* Other Menu Items */}
                    {[
                        { name: 'Service Price Plan', icon: 'fa-money-bill-wave' },
                        { name: 'Discounts', icon: 'fa-tag' },
                        { name: 'Pages', icon: 'fa-file-alt' },
                        { name: 'Team', icon: 'fa-users-cog' },
                    ].map((item) => (
                        <div key={item.name}>
                            <a href="#" className={`menu-btn w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {!isSidebarCollapsed && <span>{item.name}</span>}
                            </a>
                        </div>
                    ))}

                    {/* Blog */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('blog')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-blog mr-2"></i>
                                {!isSidebarCollapsed && <span>Blog</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'blog' ? 'rotate-180' : ''}`}></i>}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'blog' && !isSidebarCollapsed ? 'max-h-[500px] mt-1' : 'max-h-0'}`}
                        >
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Post', href: '/pages/blog-posts' },
                                    { name: 'Categories', href: '/pages/blog-categories' },
                                    { name: 'Tags', href: '/pages/blog-tags' }
                                ].map((item) => (
                                    <a key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* More Items */}
                    {[
                        { name: 'Payments', icon: 'fa-credit-card', href: '#' },
                        { name: 'Recruitment Setup', icon: 'fa-briefcase', href: '#' },
                        { name: 'Support System', icon: 'fa-headset', href: '#' },
                        { name: 'Messenger', icon: 'fa-comments', href: '#' },
                        { name: 'Service Timeline', icon: 'fa-stream', href: '#' },
                        { name: 'CRM System', icon: 'fa-address-book', href: '/pages/crm' },
                        { name: 'Testimonials', icon: 'fa-star', href: '#' },

                        { name: 'Document', icon: 'fa-file-contract', href: '/pages/documents' },
                        { name: 'Comments (Blog)', icon: 'fa-comment', href: '/pages/comments' },
                        { name: 'FAQs', icon: 'fa-question-circle', href: '#' },
                        { name: 'Newsletters', icon: 'fa-newspaper', href: '#' },
                        { name: 'Locations', icon: 'fa-map-marker-alt', href: '#' },
                        { name: 'Contact', icon: 'fa-envelope', href: '/pages/contact' },

                        { name: 'Company Info', icon: 'fa-building', href: '/pages/company-info' },
                        { name: 'Tools', icon: 'fa-tools', href: '#' },
                        { name: 'Settings', icon: 'fa-cog', href: '#' },
                        { name: 'Custom Code Manager', icon: 'fa-code', href: '/pages/custom' },
                        { name: 'Create Blog Post', icon: 'fa-pen', href: '/pages/create-blog-post' },
                        { name: 'New partner onboard', icon: 'fa-handshake', href: '#' },

                    ].map((item) => (
                        <div key={item.name}>
                            <a href={item.href} className={`menu-btn w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {!isSidebarCollapsed && <span>{item.name}</span>}
                            </a>
                        </div>
                    ))}

                </div>
            </div>

            <div className="p-4 border-t border-gray-700 dark:border-gray-700">
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="text-white font-bold">A</span>
                    </div>
                    {!isSidebarCollapsed && (
                        <div className="ml-3">
                            <p className="text-sm font-medium">Admin User</p>
                            <p className="text-xs text-gray-400">Full Access</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
