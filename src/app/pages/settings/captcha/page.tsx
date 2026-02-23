"use client";

import React, { useState } from 'react';
import {
    FloppyDisk,
    ShieldCheck,
    GoogleLogo,
    Info,
    ArrowSquareOut,
    CheckCircle
} from '@phosphor-icons/react';

export default function CaptchaSettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

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

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }, 800);
    };

    const handleCaptchaToggle = (provider: 'recaptcha' | 'turnstile') => {
        setCaptcha(prev => ({
            ...prev,
            provider,
            recaptcha: { ...prev.recaptcha, enabled: provider === 'recaptcha' },
            turnstile: { ...prev.turnstile, enabled: provider === 'turnstile' }
        }));
    };

    const renderHeader = (title: string, desc: string) => (
        <div className="bg-white dark:bg-gray-800 px-8 py-5 border-b border-slate-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10 transition-colors">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{title}</h2>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 transition-colors">{desc}</p>
            </div>
            <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-70"
            >
                {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin transition-colors" />
                ) : (
                    <FloppyDisk size={18} weight="bold" />
                )}
                Save Changes
            </button>
        </div>
    );

    return (
        <>
            {renderHeader('CAPTCHA & Security', 'Protect forms from spam and automated attacks.')}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm mb-6 transition-colors">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3 mb-6 transition-colors">
                        <Info className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} weight="fill" />
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Important:</strong> Enable only one CAPTCHA provider at a time. Google reCAPTCHA is widely used, while Cloudflare Turnstile offers privacy-focused verification.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* reCAPTCHA */}
                        <div className={`border rounded-xl p-5 transition-colors ${captcha.provider === 'recaptcha' ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10 dark:bg-indigo-900/10' : 'border-slate-200 dark:border-gray-700'}`}>
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#4285F4] flex items-center justify-center text-white">
                                        <GoogleLogo weight="bold" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white text-sm transition-colors">Google reCAPTCHA</div>
                                        <div className="text-[10px] text-slate-500 dark:text-gray-400">v2 & v3 Supported</div>
                                    </div>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={captcha.provider === 'recaptcha'} onChange={() => handleCaptchaToggle('recaptcha')} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className={`space-y-3 transition-opacity ${captcha.provider !== 'recaptcha' ? 'opacity-50 pointer-events-none' : ''}`}>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Type</label>
                                    <select className="w-full px-3 py-2 border border-slate-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors" value={captcha.recaptcha.version} onChange={(e) => setCaptcha({ ...captcha, recaptcha: { ...captcha.recaptcha, version: e.target.value as any } })}>
                                        <option value="v2">v2 Checkbox</option>
                                        <option value="v2-invisible">v2 Invisible</option>
                                        <option value="v3">v3 Score-based</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Site Key</label>
                                    <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="6Lc..." value={captcha.recaptcha.siteKey} onChange={(e) => setCaptcha({ ...captcha, recaptcha: { ...captcha.recaptcha, siteKey: e.target.value } })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Secret Key</label>
                                    <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="6Lc..." value={captcha.recaptcha.secretKey} onChange={(e) => setCaptcha({ ...captcha, recaptcha: { ...captcha.recaptcha, secretKey: e.target.value } })} />
                                </div>
                                <a href="https://www.google.com/recaptcha/admin" target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-2 transition-colors">
                                    <ArrowSquareOut weight="bold" /> Get Keys
                                </a>
                            </div>
                        </div>

                        {/* Turnstile */}
                        <div className={`border rounded-xl p-5 transition-colors ${captcha.provider === 'turnstile' ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10 dark:bg-indigo-900/10' : 'border-slate-200 dark:border-gray-700'}`}>
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#F38020] flex items-center justify-center text-white">
                                        <ShieldCheck weight="fill" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white text-sm transition-colors">Cloudflare Turnstile</div>
                                        <div className="text-[10px] text-slate-500 dark:text-gray-400">Privacy-First Alternative</div>
                                    </div>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={captcha.provider === 'turnstile'} onChange={() => handleCaptchaToggle('turnstile')} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className={`space-y-3 transition-opacity ${captcha.provider !== 'turnstile' ? 'opacity-50 pointer-events-none' : ''}`}>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Widget Mode</label>
                                    <select className="w-full px-3 py-2 border border-slate-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors" value={captcha.turnstile.mode} onChange={(e) => setCaptcha({ ...captcha, turnstile: { ...captcha.turnstile, mode: e.target.value as any } })}>
                                        <option value="managed">Managed (Auto)</option>
                                        <option value="non-interactive">Non-Interactive</option>
                                        <option value="invisible">Invisible</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Site Key</label>
                                    <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="0x4AAA..." value={captcha.turnstile.siteKey} onChange={(e) => setCaptcha({ ...captcha, turnstile: { ...captcha.turnstile, siteKey: e.target.value } })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Secret Key</label>
                                    <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="0x4AAA..." value={captcha.turnstile.secretKey} onChange={(e) => setCaptcha({ ...captcha, turnstile: { ...captcha.turnstile, secretKey: e.target.value } })} />
                                </div>
                                <a href="https://dash.cloudflare.com/" target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-2 transition-colors">
                                    <ArrowSquareOut weight="bold" /> Get Keys
                                </a>
                            </div>
                        </div>

                    </div>

                    <div className="mt-8 border-t border-slate-100 dark:border-gray-700 pt-6 transition-colors">
                        <h4 className="text-sm font-bold text-slate-700 dark:text-white mb-4 transition-colors">Apply CAPTCHA To:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(captcha.protectedForms).map(([form, enabled]) => (
                                <label key={form} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-900/50 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-indigo-600 dark:text-indigo-500 rounded focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 transition-colors"
                                        checked={enabled}
                                        onChange={() => setCaptcha({ ...captcha, protectedForms: { ...captcha.protectedForms, [form]: !enabled } })}
                                    />
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300 capitalize transition-colors">{form} Forms</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

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
        </>
    );
}
