"use client";

import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    FloppyDisk,
    Plus,
    Info,
    Crown,
    Briefcase,
    Headset,
    Users,
    Handshake,
    User,
    CaretRight,
    UsersThree,
    Package,
    Article,
    ShoppingCart,
    Gear,
    Check
} from '@phosphor-icons/react';

// Types
type RoleType = 'System' | 'Staff' | 'External' | 'Custom';

interface Role {
    id: string;
    icon: React.ElementType;
    type: RoleType;
}

interface Module {
    name: string;
    key: string;
    desc: string;
    icon: React.ElementType;
}

interface PermissionSet {
    read: boolean;
    write: boolean;
    create: boolean;
    delete: boolean;
}

interface RolePermissions {
    [key: string]: {
        [moduleKey: string]: PermissionSet;
    };
}

export default function RolePermissionsPage() {
    // Constants
    const ROLES: Role[] = [
        { id: "Admin", icon: Crown, type: "System" },
        { id: "Manager", icon: Briefcase, type: "Staff" },
        { id: "Agent", icon: Headset, type: "Staff" },
        { id: "Employee", icon: Users, type: "Staff" },
        { id: "Partner", icon: Handshake, type: "External" },
        { id: "Customer", icon: User, type: "External" }
    ];

    const MODULES: Module[] = [
        { name: "User Management", key: "users", desc: "Onboard, edit and ban users", icon: UsersThree },
        { name: "Product Catalog", key: "products", desc: "Inventory pricing and details", icon: Package },
        { name: "Content Studio", key: "content", desc: "Blog posts and media assets", icon: Article },
        { name: "Order Processing", key: "orders", desc: "Customer orders and refunds", icon: ShoppingCart },
        { name: "Global Settings", key: "settings", desc: "Platform configuration", icon: Gear },
    ];

    const PERM_LEVELS: (keyof PermissionSet)[] = ["read", "write", "create", "delete"];

    // State
    const [currentRole, setCurrentRole] = useState<string>('Admin');
    const [permissions, setPermissions] = useState<RolePermissions>({
        "Admin": { users: { read: true, write: true, create: true, delete: true }, products: { read: true, write: true, create: true, delete: true }, content: { read: true, write: true, create: true, delete: true }, orders: { read: true, write: true, create: true, delete: true }, settings: { read: true, write: true, create: true, delete: true } },
        "Manager": { users: { read: true, write: true, create: true, delete: false }, products: { read: true, write: true, create: true, delete: false }, content: { read: true, write: true, create: true, delete: false }, orders: { read: true, write: true, create: false, delete: false }, settings: { read: false, write: false, create: false, delete: false } },
        "Agent": { users: { read: false, write: false, create: false, delete: false }, products: { read: false, write: false, create: false, delete: false }, content: { read: false, write: false, create: false, delete: false }, orders: { read: true, write: true, create: false, delete: false }, settings: { read: false, write: false, create: false, delete: false } },
        "Employee": { users: { read: true, write: false, create: false, delete: false }, products: { read: false, write: false, create: false, delete: false }, content: { read: false, write: false, create: false, delete: false }, orders: { read: false, write: false, create: false, delete: false }, settings: { read: false, write: false, create: false, delete: false } },
        "Partner": { users: { read: false, write: false, create: false, delete: false }, products: { read: false, write: false, create: false, delete: false }, content: { read: false, write: false, create: false, delete: false }, orders: { read: false, write: false, create: false, delete: false }, settings: { read: false, write: false, create: false, delete: false } },
        "Customer": { users: { read: false, write: false, create: false, delete: false }, products: { read: false, write: false, create: false, delete: false }, content: { read: false, write: false, create: false, delete: false }, orders: { read: true, write: false, create: false, delete: false }, settings: { read: false, write: false, create: false, delete: false } },
    });

    const [showToast, setShowToast] = useState(false);

    // Handlers
    const handlePermissionChange = (moduleKey: string, perm: keyof PermissionSet) => {
        if (currentRole === 'Admin') return; // Admin is immutable

        setPermissions(prev => ({
            ...prev,
            [currentRole]: {
                ...prev[currentRole],
                [moduleKey]: {
                    ...prev[currentRole][moduleKey],
                    [perm]: !prev[currentRole][moduleKey][perm]
                }
            }
        }));
    };

    const handleSave = () => {
        console.log("Saved:", permissions);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans pb-12">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 mb-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <ShieldCheck size={24} weight="bold" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Access Control Center</h1>
                            <p className="text-xs text-slate-500 font-medium">RBAC Configuration v2.0</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-slate-400 hidden sm:block">Last saved: Just now</span>
                        <button onClick={handleSave}
                            className="group relative bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full shadow-lg shadow-indigo-200 flex items-center gap-2 font-medium transition-all transform active:scale-95 overflow-hidden">
                            <FloppyDisk size={20} weight="bold" />
                            <span>Publish Changes</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">

                    {/* Left Panel: Roles List */}
                    <div className="lg:sticky lg:top-28 space-y-6">
                        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-xl shadow-slate-200/50 border border-white/50">
                            <div className="flex justify-between items-center mb-6 px-1">
                                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">User Roles</h2>
                                <button className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors text-sm font-medium flex items-center gap-1">
                                    <Plus size={16} weight="bold" /> New
                                </button>
                            </div>

                            <div className="space-y-3">
                                {ROLES.map(role => {
                                    const isActive = role.id === currentRole;
                                    return (
                                        <div
                                            key={role.id}
                                            onClick={() => setCurrentRole(role.id)}
                                            className={`cursor-pointer rounded-xl p-4 transition-all duration-300 border shadow-sm group ${isActive
                                                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-500/30 scale-105 border-transparent'
                                                    : 'bg-white border-slate-100 hover:bg-slate-50 hover:translate-x-1'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <role.icon size={24} weight="duotone" className={isActive ? 'text-emerald-100' : 'text-slate-400'} />
                                                    <div>
                                                        <h4 className="font-bold text-sm">{role.id}</h4>
                                                        <p className={`text-xs ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>{role.type} Role</p>
                                                    </div>
                                                </div>
                                                <CaretRight size={16} weight="bold" className={`transition-opacity ${isActive ? 'text-white' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Helper Card */}
                        <div className="bg-indigo-900 text-indigo-100 rounded-2xl p-6 relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-indigo-500 rounded-full opacity-20 blur-xl"></div>
                            <Info size={32} weight="duotone" className="mb-3 block text-indigo-300" />
                            <h3 className="font-semibold text-white mb-1">Did you know?</h3>
                            <p className="text-sm opacity-80 leading-relaxed">Admins have immutable access. Create a custom role to define specific restrictions.</p>
                        </div>
                    </div>

                    {/* Right Panel: Matrix */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden flex flex-col min-h-[600px]">

                        {/* Matrix Header */}
                        <div className="p-8 border-b border-slate-100 bg-white/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl text-slate-600">
                                    {(() => {
                                        const RoleIcon = ROLES.find(r => r.id === currentRole)?.icon || ShieldCheck;
                                        return <RoleIcon size={28} weight="duotone" />;
                                    })()}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                        {currentRole}
                                        <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wide">
                                            {ROLES.find(r => r.id === currentRole)?.type || 'Custom'}
                                        </span>
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-1">Configure visibility and action permissions for this role.</p>
                                </div>
                            </div>
                        </div>

                        {/* Permissions Table */}
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10 px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 w-1/3">
                                            Feature Module
                                        </th>
                                        {PERM_LEVELS.map(level => (
                                            <th key={level} className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10 px-4 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                                                {level}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white/40">
                                    {MODULES.map((module) => (
                                        <tr key={module.key} className="group hover:bg-indigo-50/30 transition-colors">
                                            <td className="px-8 py-5 border-b border-slate-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                                        <module.icon size={24} weight="duotone" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm">{module.name}</p>
                                                        <p className="text-xs text-slate-500 mt-0.5">{module.desc}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            {PERM_LEVELS.map(perm => (
                                                <td key={perm} className="px-4 py-5 text-center border-b border-slate-100">
                                                    <div className="flex justify-center">
                                                        <label className={`relative inline-flex items-center cursor-pointer ${(currentRole === 'Admin') ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={permissions[currentRole][module.key][perm]}
                                                                onChange={() => handlePermissionChange(module.key, perm)}
                                                                disabled={currentRole === 'Admin'}
                                                            />
                                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                                        </label>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <div className={`fixed bottom-8 right-8 z-50 transform transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
                <div className="bg-slate-900/90 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-xl border border-slate-700">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-900/50">
                        <Check size={16} weight="bold" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Configuration Saved</h4>
                        <p className="text-xs text-slate-300 mt-0.5">Access policies updated successfully.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
