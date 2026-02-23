"use client";

import { useState } from 'react';
import Link from 'next/link';

const SidebarLink = ({ href, icon, label, collapsed }: { href: string; icon: string; label: string; collapsed: boolean }) => (
    <Link href={href} className={`menu-btn w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${collapsed ? 'justify-center' : ''}`}>
        <i className={`${icon} mr-2`}></i>
        {!collapsed && <span>{label}</span>}
    </Link>
);

interface SidebarProps {
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    isMobileMenuOpen?: boolean;
    closeMobileMenu?: () => void;
}

export default function Sidebar({ isSidebarCollapsed, toggleSidebar, isMobileMenuOpen = false, closeMobileMenu }: SidebarProps) {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    // Toggle Submenu
    const toggleSubmenu = (menuName: string) => {
        if (isSidebarCollapsed) return;
        setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 bg-sidebar-dark text-white dark:bg-gray-800 flex flex-col transition-transform duration-300 ease-in-out 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:relative lg:translate-x-0 
                ${isSidebarCollapsed ? 'lg:w-[70px]' : 'lg:w-64'} 
                w-64 shadow-xl lg:shadow-none`}
            id="sidebar"
        >
            <div className="p-4 border-b border-gray-700 dark:border-gray-700">
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {(!isSidebarCollapsed || isMobileMenuOpen) && <h1 className="text-xl font-bold">Admin Dashboard</h1>}

                    {/* Desktop Toggle */}
                    <button onClick={toggleSidebar} className="hidden lg:block text-gray-400 hover:text-white">
                        <i className={`fas ${isSidebarCollapsed ? 'fa-chevron-right' : 'fa-bars'}`}></i>
                    </button>

                    {/* Mobile Close Button */}
                    <button onClick={closeMobileMenu} className="lg:hidden text-gray-400 hover:text-white">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">

                <div className="space-y-4">

                    <div>
                        <Link href="/" className={`menu-btn w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                            <i className="fas fa-tachometer-alt mr-2"></i>
                            {!isSidebarCollapsed && <span>Dashboard</span>}
                        </Link>
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
                                <Link href="/pages/user-management" className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                    <i className="fas fa-circle text-[8px] mr-2"></i>
                                    User Management
                                </Link>
                                <Link href="/pages/role-permissions" className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                    <i className="fas fa-circle text-[8px] mr-2"></i>
                                    Role Permissions
                                </Link>
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
                                {[
                                    { name: 'Report', href: '/pages/reports' },
                                    { name: 'Order', href: '/pages/service-orders' },
                                    { name: 'Incomplete order', href: '/pages/incomplete-orders' },
                                    { name: 'Order Cancellation', href: '/pages/cancellations' },
                                    { name: 'Service', href: '/pages/service-management' },
                                    { name: 'Product categories', href: '/pages/product-categories' },
                                    { name: 'Associate Management', href: '/pages/new-partner' },
                                    { name: 'Service attributes', href: '/pages/service-attributes' },
                                    { name: 'Service collections', href: '/pages/service-collections' }
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
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
                                    { name: 'Dashboard', href: '/pages/referral-dashboard' },
                                    { name: 'Partner Management', href: '/pages/partners' },
                                    { name: 'Commission Settings', href: '/pages/commission-settings' },
                                    { name: 'Referral Tracking', href: '/pages/referral-tracking' },
                                    { name: 'Payout Management', href: '/pages/payout-management' },
                                    { name: 'Analytics & Reports', href: '/pages/referral-analytics' }
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
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
                        { name: 'Service Price Plan', icon: 'fa-money-bill-wave', href: '/pages/service-price-plan' },
                        { name: 'Discounts', icon: 'fa-tag', href: '/pages/discounts' },
                        { name: 'Pages', icon: 'fa-file-alt', href: '/pages/pages' },
                        { name: 'Team', icon: 'fa-users-cog', href: '/pages/team' },
                    ].map((item) => (
                        <div key={item.name}>
                            <Link href={item.href} className={`menu-btn w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {!isSidebarCollapsed && <span>{item.name}</span>}
                            </Link>
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
                                    { name: 'Dashboard', href: '/pages/blogs' },
                                    { name: 'New Post', href: '/pages/create-blog-post' },
                                    { name: 'Post', href: '/pages/blog-posts' },
                                    { name: 'Categories', href: '/pages/create-blog-category' },
                                    { name: 'Tags', href: '/pages/blog-tags' }
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recruitment */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('recruitment')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-briefcase mr-2"></i>
                                {!isSidebarCollapsed && <span>Recruitment</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'recruitment' ? 'rotate-180' : ''}`}></i>}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'recruitment' && !isSidebarCollapsed ? 'max-h-[600px] mt-1' : 'max-h-0'}`}
                        >
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Dashboard', href: '/pages/recruitment' },
                                    { name: 'Job Application', href: '/pages/recruitment/job-applications' },
                                    { name: 'Candidates', href: '/pages/recruitment/candidates' },
                                    { name: 'Interviews', href: '/pages/recruitment/interviews' },
                                    { name: 'Onboarding', href: '/pages/recruitment/onboarding' },
                                    { name: 'Questionnaire', href: '/pages/recruitment/questionnaire' },
                                    { name: 'Career', href: '/pages/recruitment/career' },
                                    { name: 'Settings', href: '/pages/recruitment/settings' }
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Settings Dropdown */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('settings')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-cog mr-2"></i>
                                {!isSidebarCollapsed && <span>Settings</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'settings' ? 'rotate-180' : ''}`}></i>}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'settings' && !isSidebarCollapsed ? 'max-h-[500px] mt-1' : 'max-h-0'}`}
                        >
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Branding', href: '/pages/settings/branding' },
                                    { name: 'Typography', href: '/pages/settings/typography' },
                                    { name: 'Text Colors', href: '/pages/settings/colors' },
                                    { name: 'Footer Links', href: '/pages/settings/footer' },
                                    { name: 'Social Post', href: '/pages/settings/autopost' },
                                    { name: 'OAuth Login', href: '/pages/settings/oauth' },
                                    { name: 'Security', href: '/pages/settings/captcha' },
                                    { name: 'SMTP Config', href: '/pages/settings/smtp' }
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CRM */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('crm')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-address-book mr-2"></i>
                                {!isSidebarCollapsed && <span>CRM System</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'crm' ? 'rotate-180' : ''}`}></i>}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'crm' && !isSidebarCollapsed ? 'max-h-[500px] mt-1' : 'max-h-0'}`}
                        >
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Dashboard', href: '/pages/crm' },
                                    { name: 'Pipeline', href: '/pages/crm/pipeline' },
                                    { name: 'Leads', href: '/pages/crm/leads' },
                                    { name: 'Contacts', href: '/pages/crm/contacts' },
                                    { name: 'Tasks', href: '/pages/crm/tasks' },
                                    { name: 'Tickets', href: '/pages/crm/tickets' }
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Support System Dropdown */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('support')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-headset mr-2"></i>
                                {!isSidebarCollapsed && <span>Support System</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'support' ? 'rotate-180' : ''}`}></i>}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'support' && !isSidebarCollapsed ? 'max-h-[500px] mt-1' : 'max-h-0'}`}>
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Dashboard', href: '/pages/support' },
                                    { name: 'Tickets', href: '/pages/support/tickets' },
                                    { name: 'Customers', href: '/pages/support/customers' },
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Messenger Dropdown */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('messenger')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-comments mr-2"></i>
                                {!isSidebarCollapsed && <span>Messenger</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'messenger' ? 'rotate-180' : ''}`}></i>}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'messenger' && !isSidebarCollapsed ? 'max-h-[500px] mt-1' : 'max-h-0'}`}>
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Chats', href: '/pages/messenger/chats' },
                                    { name: 'Calls', href: '/pages/messenger/calls' },
                                    { name: 'Meetings', href: '/pages/messenger/meetings' },
                                    { name: 'Contacts', href: '/pages/messenger/users' },
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQs Dropdown */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('faqs')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-question-circle mr-2"></i>
                                {!isSidebarCollapsed && <span>FAQs</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'faqs' ? 'rotate-180' : ''}`}></i>}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'faqs' && !isSidebarCollapsed ? 'max-h-[400px] mt-1' : 'max-h-0'}`}>
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Manage FAQs', href: '/pages/faqs' },
                                    { name: 'Categories', href: '/pages/faqs/categories' },
                                    { name: 'Knowledge Base', href: '/pages/support/knowledge-base' },
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* More Items */}
                    {[
                        { name: 'Payments', icon: 'fa-credit-card', href: '/pages/payments' },
                        { name: 'Service Timeline', icon: 'fa-stream', href: '/pages/service-timeline' },
                        { name: 'Testimonials', icon: 'fa-star', href: '/pages/testimonials' },

                        { name: 'Document', icon: 'fa-file-contract', href: '/pages/documents' },
                        { name: 'Comments (Blog)', icon: 'fa-comment', href: '/pages/comments' },
                        { name: 'Locations', icon: 'fa-map-marker-alt', href: '/pages/locations' },

                        { name: 'Company Info', icon: 'fa-building', href: '/pages/company-info' },
                        { name: 'Tools', icon: 'fa-tools', href: '/pages/tools' },
                        { name: 'New partner onboard', icon: 'fa-handshake', href: '/pages/partners' },

                    ].map((item) => (
                        <div key={item.name}>
                            <Link href={item.href} className={`menu-btn w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {!isSidebarCollapsed && <span>{item.name}</span>}
                            </Link>
                        </div>
                    ))}

                    {/* Newsletters Dropdown */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('newsletters')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-newspaper mr-2"></i>
                                {!isSidebarCollapsed && <span>Newsletters</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'newsletters' ? 'rotate-180' : ''}`}></i>}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'newsletters' && !isSidebarCollapsed ? 'max-h-[300px] mt-1' : 'max-h-0'}`}>
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Subscribers', href: '/pages/newsletters/subscribers' },
                                    { name: 'Campaigns', href: '/pages/newsletters/campaigns' },
                                    { name: 'Templates', href: '/pages/newsletters/templates' },
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Dropdown */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('contact')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-envelope mr-2"></i>
                                {!isSidebarCollapsed && <span>Contact</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'contact' ? 'rotate-180' : ''}`}></i>}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'contact' && !isSidebarCollapsed ? 'max-h-[300px] mt-1' : 'max-h-0'}`}>
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Inbox', href: '/pages/contact/inbox' },
                                    { name: 'Contacts / Leads', href: '/pages/contact/contacts' },
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Custom Code Dropdown */}
                    <div>
                        <button
                            onClick={() => toggleSubmenu('custom')}
                            className={`menu-header w-full text-left p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                        >
                            <span className="flex items-center">
                                <i className="fas fa-code mr-2"></i>
                                {!isSidebarCollapsed && <span>Custom Code</span>}
                            </span>
                            {!isSidebarCollapsed && <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openSubmenu === 'custom' ? 'rotate-180' : ''}`}></i>}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === 'custom' && !isSidebarCollapsed ? 'max-h-[300px] mt-1' : 'max-h-0'}`}>
                            <div className="ml-4 space-y-1">
                                {[
                                    { name: 'Scripts', href: '/pages/custom/scripts' },
                                    { name: 'Custom CSS', href: '/pages/custom/styles' },
                                    { name: 'Snippets', href: '/pages/custom/snippets' },
                                ].map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-sm">
                                        <i className="fas fa-circle text-[8px] mr-2"></i>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

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
