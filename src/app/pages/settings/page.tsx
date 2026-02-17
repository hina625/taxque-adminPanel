"use client";

import React, { useState } from 'react';
import {
    Gear,
    PaintBucket,
    Link as LinkIcon,
    ShareNetwork,
    UsersThree,
    ShieldCheck,
    EnvelopeSimple,
    FloppyDisk,
    Image,
    Star,
    InstagramLogo,
    LinkedinLogo,
    FacebookLogo,
    GoogleLogo,
    Storefront,
    XLogo,
    ArrowSquareOut,
    PaperPlaneRight,
    Plus,
    Trash,
    CheckCircle,
    Info
} from '@phosphor-icons/react';

// --- Types ---

type SettingsTab = 'branding' | 'footer' | 'autopost' | 'oauth' | 'captcha' | 'smtp';

interface FooterLink {
    platform: string;
    url: string;
}

// --- Component ---

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('branding');
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // -- State for Sections (Mock Data) --

    // Branding
    const [branding, setBranding] = useState({
        appName: 'TaxQue Admin',
        supportEmail: 'support@taxque.com'
    });

    // Auto Post
    const [autoPost, setAutoPost] = useState({
        instagram: { enabled: false, id: '', token: '' },
        linkedin: { enabled: false, orgId: '', token: '' },
        facebook: { enabled: true, pageId: '', token: '' },
        google: { enabled: false, locId: '', token: '' }
    });

    // CAPTCHA
    const [captcha, setCaptcha] = useState({
        provider: 'recaptcha', // 'recaptcha' | 'turnstile'
        recaptcha: { enabled: false, version: 'v3', siteKey: '', secretKey: '', score: '0.5' },
        turnstile: { enabled: false, mode: 'managed', siteKey: '', secretKey: '', theme: 'light' },
        protectedForms: {
            contact: true,
            login: true,
            comments: false,
            reset: false
        }
    });

    // SMTP
    const [smtp, setSmtp] = useState({
        host: '',
        port: '',
        encryption: 'TLS',
        fromName: '',
        user: '',
        password: '',
        fromEmail: '',
        replyTo: ''
    });

    // Footer Links
    const [footerLinks, setFooterLinks] = useState<FooterLink[]>([
        { platform: 'Facebook', url: 'https://fb.com' },
        { platform: 'Instagram', url: 'https://inst.com' }
    ]);

    // OAuth
    const [oauth, setOauth] = useState({
        google: { enabled: true, clientId: '', secret: '' },
        facebook: { enabled: false, appId: '', secret: '' },
        linkedin: { enabled: false, clientId: '', secret: '' },
        twitter: { enabled: false, clientId: '', secret: '' }
    });

    // --- Actions ---

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }, 800);
    };

    const addFooterLink = () => {
        setFooterLinks([...footerLinks, { platform: 'Facebook', url: '' }]);
    };

    const removeFooterLink = (index: number) => {
        setFooterLinks(footerLinks.filter((_, i) => i !== index));
    };

    const updateFooterLink = (index: number, field: keyof FooterLink, value: string) => {
        const newLinks = [...footerLinks];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setFooterLinks(newLinks);
    };

    const handleCaptchaToggle = (provider: 'recaptcha' | 'turnstile') => {
        setCaptcha(prev => ({
            ...prev,
            provider,
            recaptcha: { ...prev.recaptcha, enabled: provider === 'recaptcha' },
            turnstile: { ...prev.turnstile, enabled: provider === 'turnstile' }
        }));
    };

    // --- Render Helpers ---

    const renderHeader = (title: string, desc: string) => (
        <div className="bg-white px-8 py-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500 mt-1">{desc}</p>
            </div>
            <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 disabled:opacity-70"
            >
                {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <FloppyDisk size={18} weight="bold" />
                )}
                Save Changes
            </button>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">

            {/* Sidebar */}
            <aside className="w-[280px] bg-slate-900 flex-shrink-0 flex flex-col overflow-y-auto border-r border-white/5">
                <div className="p-6">
                    <div className="flex items-center gap-3 text-white font-bold text-lg mb-8">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
                            <Gear weight="bold" className="text-white" />
                        </div>
                        Admin Config
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Frontend & Assets</div>
                            <button
                                onClick={() => setActiveTab('branding')}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${activeTab === 'branding' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <PaintBucket size={18} weight={activeTab === 'branding' ? 'bold' : 'regular'} />
                                Branding & Logos
                            </button>
                            <button
                                onClick={() => setActiveTab('footer')}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${activeTab === 'footer' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <LinkIcon size={18} weight={activeTab === 'footer' ? 'bold' : 'regular'} />
                                Footer Links
                            </button>
                        </div>

                        <div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Marketing</div>
                            <button
                                onClick={() => setActiveTab('autopost')}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${activeTab === 'autopost' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <ShareNetwork size={18} weight={activeTab === 'autopost' ? 'bold' : 'regular'} />
                                Social Auto-Posting
                            </button>
                        </div>

                        <div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">System</div>
                            <button
                                onClick={() => setActiveTab('oauth')}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${activeTab === 'oauth' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <UsersThree size={18} weight={activeTab === 'oauth' ? 'bold' : 'regular'} />
                                Social Login
                            </button>
                            <button
                                onClick={() => setActiveTab('captcha')}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${activeTab === 'captcha' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <ShieldCheck size={18} weight={activeTab === 'captcha' ? 'bold' : 'regular'} />
                                CAPTCHA & Security
                            </button>
                            <button
                                onClick={() => setActiveTab('smtp')}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${activeTab === 'smtp' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <EnvelopeSimple size={18} weight={activeTab === 'smtp' ? 'bold' : 'regular'} />
                                SMTP Configuration
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">

                {/* Branding Section */}
                {activeTab === 'branding' && (
                    <>
                        {renderHeader('Branding & Logos', 'Manage site identity and visual assets.')}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">

                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                    <h3 className="text-lg font-bold text-slate-900">Site Identity</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Application Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                                            value={branding.appName}
                                            onChange={(e) => setBranding({ ...branding, appName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Support Email</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                                            value={branding.supportEmail}
                                            onChange={(e) => setBranding({ ...branding, supportEmail: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                                    <h3 className="text-lg font-bold text-slate-900">Logos & Favicon</h3>
                                    <p className="text-xs text-slate-500">Upload separate logos for Light and Dark modes.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Website Logo (Light Mode)</label>
                                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500 hover:bg-slate-50 transition-colors cursor-pointer group min-h-[180px]">
                                            <Image className="text-slate-300 group-hover:text-indigo-400 mb-3 transition-colors" size={40} weight="duotone" />
                                            <div className="text-sm font-bold text-slate-600">Click to Upload</div>
                                            <div className="text-xs text-slate-400 mt-1">For White Backgrounds</div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Website Logo (Dark Mode)</label>
                                        <div className="border-2 border-dashed border-slate-600 bg-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-white transition-colors cursor-pointer group min-h-[180px]">
                                            <Image className="text-slate-500 group-hover:text-white mb-3 transition-colors" size={40} weight="duotone" />
                                            <div className="text-sm font-bold text-slate-200">Click to Upload</div>
                                            <div className="text-xs text-slate-400 mt-1">For Dark Backgrounds</div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Favicon (Browser Tab)</label>
                                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500 hover:bg-slate-50 transition-colors cursor-pointer group min-h-[180px]">
                                            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center mb-3 text-sky-600">
                                                <Star weight="bold" size={20} />
                                            </div>
                                            <div className="text-sm font-bold text-slate-600">Upload .ICO</div>
                                            <div className="text-xs text-slate-400 mt-1">32x32px Recommended</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                )}

                {/* Social Auto Post */}
                {activeTab === 'autopost' && (
                    <>
                        {renderHeader('Social Media Auto-Posting', 'Automatically publish blog posts to connected accounts.')}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Instagram */}
                                    <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center text-white">
                                                    <InstagramLogo weight="fill" size={20} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">Instagram Business</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={autoPost.instagram.enabled} onChange={() => setAutoPost({ ...autoPost, instagram: { ...autoPost.instagram, enabled: !autoPost.instagram.enabled } })} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">IG Account ID</label>
                                                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="17841..." value={autoPost.instagram.id} onChange={(e) => setAutoPost({ ...autoPost, instagram: { ...autoPost.instagram, id: e.target.value } })} disabled={!autoPost.instagram.enabled} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Access Token</label>
                                                <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="IGQJ..." value={autoPost.instagram.token} onChange={(e) => setAutoPost({ ...autoPost, instagram: { ...autoPost.instagram, token: e.target.value } })} disabled={!autoPost.instagram.enabled} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* LinkedIn */}
                                    <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#0077b5] flex items-center justify-center text-white">
                                                    <LinkedinLogo weight="fill" size={20} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">LinkedIn Company</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={autoPost.linkedin.enabled} onChange={() => setAutoPost({ ...autoPost, linkedin: { ...autoPost.linkedin, enabled: !autoPost.linkedin.enabled } })} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Organization ID</label>
                                                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="urn:li:organization:..." value={autoPost.linkedin.orgId} onChange={(e) => setAutoPost({ ...autoPost, linkedin: { ...autoPost.linkedin, orgId: e.target.value } })} disabled={!autoPost.linkedin.enabled} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Access Token</label>
                                                <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="AQV..." value={autoPost.linkedin.token} onChange={(e) => setAutoPost({ ...autoPost, linkedin: { ...autoPost.linkedin, token: e.target.value } })} disabled={!autoPost.linkedin.enabled} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Facebook */}
                                    <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center text-white">
                                                    <FacebookLogo weight="fill" size={20} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">Facebook Page</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={autoPost.facebook.enabled} onChange={() => setAutoPost({ ...autoPost, facebook: { ...autoPost.facebook, enabled: !autoPost.facebook.enabled } })} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Page ID</label>
                                                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="10293..." value={autoPost.facebook.pageId} onChange={(e) => setAutoPost({ ...autoPost, facebook: { ...autoPost.facebook, pageId: e.target.value } })} disabled={!autoPost.facebook.enabled} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Page Token</label>
                                                <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="EAA..." value={autoPost.facebook.token} onChange={(e) => setAutoPost({ ...autoPost, facebook: { ...autoPost.facebook, token: e.target.value } })} disabled={!autoPost.facebook.enabled} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Google Business */}
                                    <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#4285F4] flex items-center justify-center text-white">
                                                    <Storefront weight="fill" size={20} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">Google Business</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={autoPost.google.enabled} onChange={() => setAutoPost({ ...autoPost, google: { ...autoPost.google, enabled: !autoPost.google.enabled } })} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Location ID</label>
                                                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="locations/..." value={autoPost.google.locId} onChange={(e) => setAutoPost({ ...autoPost, google: { ...autoPost.google, locId: e.target.value } })} disabled={!autoPost.google.enabled} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Refresh Token</label>
                                                <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="1//0..." value={autoPost.google.token} onChange={(e) => setAutoPost({ ...autoPost, google: { ...autoPost.google, token: e.target.value } })} disabled={!autoPost.google.enabled} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Security */}
                {activeTab === 'captcha' && (
                    <>
                        {renderHeader('CAPTCHA & Security', 'Protect forms from spam and automated attacks.')}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 mb-6">
                                    <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} weight="fill" />
                                    <p className="text-sm text-blue-800">
                                        <strong>Important:</strong> Enable only one CAPTCHA provider at a time. Google reCAPTCHA is widely used, while Cloudflare Turnstile offers privacy-focused verification.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* reCAPTCHA */}
                                    <div className={`border rounded-xl p-5 transition-colors ${captcha.provider === 'recaptcha' ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10' : 'border-slate-200'}`}>
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#4285F4] flex items-center justify-center text-white">
                                                    <GoogleLogo weight="bold" size={20} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm">Google reCAPTCHA</div>
                                                    <div className="text-[10px] text-slate-500">v2 & v3 Supported</div>
                                                </div>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={captcha.provider === 'recaptcha'} onChange={() => handleCaptchaToggle('recaptcha')} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className={`space-y-3 transition-opacity ${captcha.provider !== 'recaptcha' ? 'opacity-50 pointer-events-none' : ''}`}>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Type</label>
                                                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" value={captcha.recaptcha.version} onChange={(e) => setCaptcha({ ...captcha, recaptcha: { ...captcha.recaptcha, version: e.target.value as any } })}>
                                                    <option value="v2">v2 Checkbox</option>
                                                    <option value="v2-invisible">v2 Invisible</option>
                                                    <option value="v3">v3 Score-based</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Site Key</label>
                                                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="6Lc..." value={captcha.recaptcha.siteKey} onChange={(e) => setCaptcha({ ...captcha, recaptcha: { ...captcha.recaptcha, siteKey: e.target.value } })} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Secret Key</label>
                                                <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="6Lc..." value={captcha.recaptcha.secretKey} onChange={(e) => setCaptcha({ ...captcha, recaptcha: { ...captcha.recaptcha, secretKey: e.target.value } })} />
                                            </div>
                                            <a href="https://www.google.com/recaptcha/admin" target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 mt-2">
                                                <ArrowSquareOut weight="bold" /> Get Keys
                                            </a>
                                        </div>
                                    </div>

                                    {/* Turnstile */}
                                    <div className={`border rounded-xl p-5 transition-colors ${captcha.provider === 'turnstile' ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10' : 'border-slate-200'}`}>
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#F38020] flex items-center justify-center text-white">
                                                    <ShieldCheck weight="fill" size={20} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm">Cloudflare Turnstile</div>
                                                    <div className="text-[10px] text-slate-500">Privacy-First Alternative</div>
                                                </div>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={captcha.provider === 'turnstile'} onChange={() => handleCaptchaToggle('turnstile')} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className={`space-y-3 transition-opacity ${captcha.provider !== 'turnstile' ? 'opacity-50 pointer-events-none' : ''}`}>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Widget Mode</label>
                                                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" value={captcha.turnstile.mode} onChange={(e) => setCaptcha({ ...captcha, turnstile: { ...captcha.turnstile, mode: e.target.value as any } })}>
                                                    <option value="managed">Managed (Auto)</option>
                                                    <option value="non-interactive">Non-Interactive</option>
                                                    <option value="invisible">Invisible</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Site Key</label>
                                                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="0x4AAA..." value={captcha.turnstile.siteKey} onChange={(e) => setCaptcha({ ...captcha, turnstile: { ...captcha.turnstile, siteKey: e.target.value } })} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-500 mb-1">Secret Key</label>
                                                <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="0x4AAA..." value={captcha.turnstile.secretKey} onChange={(e) => setCaptcha({ ...captcha, turnstile: { ...captcha.turnstile, secretKey: e.target.value } })} />
                                            </div>
                                            <a href="https://dash.cloudflare.com/" target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 mt-2">
                                                <ArrowSquareOut weight="bold" /> Get Keys
                                            </a>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-8 border-t border-slate-100 pt-6">
                                    <h4 className="text-sm font-bold text-slate-700 mb-4">Apply CAPTCHA To:</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {Object.entries(captcha.protectedForms).map(([form, enabled]) => (
                                            <label key={form} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                                    checked={enabled}
                                                    onChange={() => setCaptcha({ ...captcha, protectedForms: { ...captcha.protectedForms, [form]: !enabled } })}
                                                />
                                                <span className="text-sm font-medium text-slate-700 capitalize">{form} Forms</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* SMTP */}
                {activeTab === 'smtp' && (
                    <>
                        {renderHeader('SMTP Configuration', 'Manage email server and delivery settings.')}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                                    <h3 className="text-lg font-bold text-slate-900">Mail Server Details</h3>
                                    <button className="text-indigo-600 text-sm font-bold hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors flex items-center gap-2">
                                        <PaperPlaneRight weight="bold" />
                                        Send Test Email
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Mail Host</label>
                                        <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" placeholder="smtp.gmail.com" value={smtp.host} onChange={(e) => setSmtp({ ...smtp, host: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Mail Port</label>
                                        <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" placeholder="587" value={smtp.port} onChange={(e) => setSmtp({ ...smtp, port: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Encryption</label>
                                        <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white" value={smtp.encryption} onChange={(e) => setSmtp({ ...smtp, encryption: e.target.value })}>
                                            <option>TLS</option>
                                            <option>SSL</option>
                                            <option>None</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Sender Name</label>
                                        <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" placeholder="e.g. TaxQue Support" value={smtp.fromName} onChange={(e) => setSmtp({ ...smtp, fromName: e.target.value })} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">SMTP Username</label>
                                        <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" placeholder="user@domain.com" value={smtp.user} onChange={(e) => setSmtp({ ...smtp, user: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">SMTP Password</label>
                                        <input type="password" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" placeholder="App Password" value={smtp.password} onChange={(e) => setSmtp({ ...smtp, password: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">From Email</label>
                                        <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" placeholder="noreply@domain.com" value={smtp.fromEmail} onChange={(e) => setSmtp({ ...smtp, fromEmail: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Reply-To Email</label>
                                        <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" placeholder="support@domain.com" value={smtp.replyTo} onChange={(e) => setSmtp({ ...smtp, replyTo: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Footer Links */}
                {activeTab === 'footer' && (
                    <>
                        {renderHeader('Footer Links', 'Manage social icons in the website footer.')}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="mb-6 border-b border-slate-100 pb-4">
                                    <h3 className="text-lg font-bold text-slate-900">Social Links</h3>
                                </div>
                                <div className="space-y-4">
                                    {footerLinks.map((link, i) => (
                                        <div key={i} className="flex gap-4 items-center animate-scale-in">
                                            <select
                                                className="w-40 px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white"
                                                value={link.platform}
                                                onChange={(e) => updateFooterLink(i, 'platform', e.target.value)}
                                            >
                                                <option>Facebook</option>
                                                <option>Instagram</option>
                                                <option>LinkedIn</option>
                                                <option>Twitter</option>
                                                <option>YouTube</option>
                                            </select>
                                            <input
                                                type="text"
                                                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
                                                placeholder="https://..."
                                                value={link.url}
                                                onChange={(e) => updateFooterLink(i, 'url', e.target.value)}
                                            />
                                            <button
                                                onClick={() => removeFooterLink(i)}
                                                className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-colors"
                                            >
                                                <Trash size={18} weight="bold" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addFooterLink}
                                        className="mt-4 flex items-center gap-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors border border-transparent hover:border-indigo-100"
                                    >
                                        <Plus weight="bold" /> Add New Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* OAuth */}
                {activeTab === 'oauth' && (
                    <>
                        {renderHeader('OAuth Login Providers', 'Enable users to login via third-party services.')}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Google */}
                                    <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[#DB4437] flex items-center justify-center text-white">
                                                    <GoogleLogo weight="bold" size={18} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">Google</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={oauth.google.enabled} onChange={() => setOauth({ ...oauth, google: { ...oauth.google, enabled: !oauth.google.enabled } })} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Client ID" value={oauth.google.clientId} onChange={(e) => setOauth({ ...oauth, google: { ...oauth.google, clientId: e.target.value } })} disabled={!oauth.google.enabled} />
                                            <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Client Secret" value={oauth.google.secret} onChange={(e) => setOauth({ ...oauth, google: { ...oauth.google, secret: e.target.value } })} disabled={!oauth.google.enabled} />
                                        </div>
                                    </div>

                                    {/* Facebook */}
                                    <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white">
                                                    <FacebookLogo weight="bold" size={18} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">Facebook</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={oauth.facebook.enabled} onChange={() => setOauth({ ...oauth, facebook: { ...oauth.facebook, enabled: !oauth.facebook.enabled } })} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="App ID" value={oauth.facebook.appId} onChange={(e) => setOauth({ ...oauth, facebook: { ...oauth.facebook, appId: e.target.value } })} disabled={!oauth.facebook.enabled} />
                                            <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="App Secret" value={oauth.facebook.secret} onChange={(e) => setOauth({ ...oauth, facebook: { ...oauth.facebook, secret: e.target.value } })} disabled={!oauth.facebook.enabled} />
                                        </div>
                                    </div>

                                    {/* LinkedIn */}
                                    <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[#0077b5] flex items-center justify-center text-white">
                                                    <LinkedinLogo weight="bold" size={18} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">LinkedIn</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={oauth.linkedin.enabled} onChange={() => setOauth({ ...oauth, linkedin: { ...oauth.linkedin, enabled: !oauth.linkedin.enabled } })} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Client ID" value={oauth.linkedin.clientId} onChange={(e) => setOauth({ ...oauth, linkedin: { ...oauth.linkedin, clientId: e.target.value } })} disabled={!oauth.linkedin.enabled} />
                                            <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Client Secret" value={oauth.linkedin.secret} onChange={(e) => setOauth({ ...oauth, linkedin: { ...oauth.linkedin, secret: e.target.value } })} disabled={!oauth.linkedin.enabled} />
                                        </div>
                                    </div>

                                    {/* X */}
                                    <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white">
                                                    <XLogo weight="bold" size={18} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">X (Twitter)</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={oauth.twitter.enabled} onChange={() => setOauth({ ...oauth, twitter: { ...oauth.twitter, enabled: !oauth.twitter.enabled } })} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Client ID" value={oauth.twitter.clientId} onChange={(e) => setOauth({ ...oauth, twitter: { ...oauth.twitter, clientId: e.target.value } })} disabled={!oauth.twitter.enabled} />
                                            <input type="password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Client Secret" value={oauth.twitter.secret} onChange={(e) => setOauth({ ...oauth, twitter: { ...oauth.twitter, secret: e.target.value } })} disabled={!oauth.twitter.enabled} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                )}

            </main>

            {/* Toast */}
            <div className={`fixed bottom-8 right-8 z-50 transform transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
                <div className="bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
                    <CheckCircle size={24} weight="bold" />
                    <div>
                        <strong className="block text-sm">Success</strong>
                        <span className="text-xs opacity-90">Settings saved successfully.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
