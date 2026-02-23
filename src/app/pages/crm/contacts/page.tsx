"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, MoreHorizontal } from "lucide-react";
import { ContactModal, Contact } from "../components/Modals";

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    useEffect(() => {
        setContacts([
            { id: 1, firstName: 'John', lastName: 'Smith', email: 'john@innovate.com', phone: '+1234567890', company: 'Innovate Digital', title: 'CEO', address: '123 Tech St' }
        ]);
    }, []);

    const handleAddContact = (contact: Omit<Contact, 'id'>) => {
        const newContact: Contact = { ...contact, id: Date.now() };
        setContacts([...contacts, newContact]);
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Contacts</h1>
                    <p className="text-slate-500 dark:text-gray-400">Manage customer relationships</p>
                </div>
                <button onClick={() => setIsContactModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-sm transition-colors">
                    <UserPlus className="w-5 h-5" /> Add Contact
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[2fr_2fr_1fr_100px] px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-b border-slate-200 dark:border-gray-700 font-semibold text-slate-500 dark:text-gray-400 text-sm uppercase">
                            <div>Name</div>
                            <div>Email</div>
                            <div>Phone</div>
                            <div>Actions</div>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-gray-700">
                            {contacts.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No contacts yet. Click "Add Contact" to create one.</div>
                            ) : (
                                contacts.map((contact) => (
                                    <div key={contact.id} className="grid grid-cols-[2fr_2fr_1fr_100px] px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-100 dark:border-indigo-900/50">
                                                {contact.firstName[0]}{contact.lastName[0]}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-gray-100">{contact.firstName} {contact.lastName}</div>
                                                <div className="text-xs text-slate-500 dark:text-gray-400">{contact.title}</div>
                                            </div>
                                        </div>
                                        <div className="text-slate-600 dark:text-gray-400">{contact.email}</div>
                                        <div className="text-slate-600 dark:text-gray-400 text-xs">{contact.phone || '-'}</div>
                                        <div>
                                            <button className="text-slate-400 hover:text-indigo-600 p-1"><MoreHorizontal className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} onSave={handleAddContact} />
        </div>
    );
}
