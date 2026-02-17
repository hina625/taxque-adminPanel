"use client";

import { useState, useEffect, useRef } from 'react';

interface Offer {
    id: number;
    title: string;
    content: string;
    image: string | null;
    target: string;
    display: string;
    url: string;
    active: boolean;
    dismissible: boolean;
    specificUrl: string | null;
    date: string;
}

export default function BannerPage() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentOffer, setCurrentOffer] = useState<Offer>({
        id: 0,
        title: '',
        content: '',
        image: null,
        target: 'all',
        display: 'body-top',
        url: '',
        active: true,
        dismissible: false,
        specificUrl: null,
        date: new Date().toISOString()
    });
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('adminOffers');
            if (stored) {
                setOffers(JSON.parse(stored));
            } else {
                const initialOffers = [
                    { id: 1, title: "Special GST Blog Offer", content: "Download our FREE 2025 GST Guide!", target: "blog-gst", display: "sidebar", url: "/guide/gst-guide", active: true, dismissible: false, image: "/assets/images/banners/gst-guide.svg", date: new Date().toISOString(), specificUrl: null },
                    { id: 2, title: "Book a Tax Consultation", content: "Get 50% off your first consultation.", target: "service-tax", display: "popup", url: "/consult/book-now", active: true, dismissible: true, image: "/assets/images/banners/tax-consultation.svg", date: new Date().toISOString(), specificUrl: null },
                    { id: 3, title: "Q3 Price Update", content: "Prices adjusted based on market trends.", target: "all", display: "body-top", url: "/pricing", active: false, dismissible: true, image: "/assets/images/banners/price-update.svg", date: new Date().toISOString(), specificUrl: null }
                ];
                setOffers(initialOffers);
                localStorage.setItem('adminOffers', JSON.stringify(initialOffers));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && offers.length > 0) {
            localStorage.setItem('adminOffers', JSON.stringify(offers));
        }
    }, [offers]);

    const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleOpenModal = (offer?: Offer) => {
        if (offer) {
            setIsEditing(true);
            setCurrentOffer(offer);
        } else {
            setIsEditing(false);
            setCurrentOffer({
                id: 0,
                title: '',
                content: '',
                image: null,
                target: 'all',
                display: 'body-top',
                url: '',
                active: true,
                dismissible: false,
                specificUrl: null,
                date: new Date().toISOString()
            });
        }
        setIsCreateModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (currentOffer.target === 'specific-url' && !currentOffer.specificUrl) {
            showNotification("Specific URL is required for this targeting type.", 'error');
            return;
        }

        if (isEditing) {
            setOffers(offers.map(o => o.id === currentOffer.id ? { ...currentOffer, date: new Date().toISOString() } : o));
            showNotification(`Offer #${currentOffer.id} updated successfully!`, 'success');
        } else {
            const newId = offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1;
            setOffers([...offers, { ...currentOffer, id: newId, date: new Date().toISOString() }]);
            showNotification("New Offer Banner deployed!", 'success');
        }
        handleCloseModal();
    };

    const formatTarget = (target: string) => {
        const map: { [key: string]: string } = {
            'all': 'All Pages', 'blog-gst': 'GST Blog Category', 'service-tax': 'Tax Service Page',
            'homepage': 'Homepage Only', 'specific-url': 'Specific URL'
        };
        return map[target] || target;
    };

    const formatDisplayZone = (zone: string) => {
        const map: { [key: string]: string } = {
            'body-top': 'Body Top Banner', 'sidebar': 'Sidebar Widget', 'popup': 'Pop-up Modal'
        };
        return map[zone] || zone;
    };

    const filteredOffers = offers.filter(o => {
        if (searchTerm && !(o.title.toLowerCase().includes(searchTerm.toLowerCase()) || o.content.toLowerCase().includes(searchTerm.toLowerCase()) || o.url.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
        if (filterStatus === 'active' && !o.active) return false;
        if (filterStatus === 'draft' && o.active) return false;
        if (filterStatus === 'popup' && o.display !== 'popup') return false;
        if (filterStatus === 'image-missing' && o.image) return false;
        return true;
    }).sort((a, b) => (Number(b.active) - Number(a.active)) || new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="w-full p-6 font-sans text-gray-900 bg-white min-h-screen">
            {/* Page Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <i className="fas fa-bullhorn"></i> Offer Banner Manager
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage and deploy promotional offers across different display zones and target specific content categories.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2" onClick={() => handleOpenModal()}>
                    <i className="fas fa-plus-circle"></i> Create Offer
                </button>
            </div>

            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold">Active/Draft Offers</h2>
                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        <select
                            className="w-full md:w-40 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary outline-none"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Offers</option>
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="popup">Popup Display</option>
                            <option value="image-missing">Image Missing</option>
                        </select>
                        <input
                            type="text"
                            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Search title or link..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-primary/10 text-primary-dark">
                                <th className="p-4 text-left font-semibold border-b w-[30%]">Title / Content</th>
                                <th className="p-4 text-left font-semibold border-b w-[20%]">Image</th>
                                <th className="p-4 text-left font-semibold border-b w-[25%]">Targeting (Category/Page)</th>
                                <th className="p-4 text-left font-semibold border-b w-[15%]">Status</th>
                                <th className="p-4 text-left font-semibold border-b w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOffers.length > 0 ? (
                                filteredOffers.map(offer => (
                                    <tr key={offer.id} className="hover:bg-primary/5 transition-colors">
                                        <td className="p-4 border-b">
                                            <strong className="text-primary block">{offer.title}</strong>
                                            <p className="text-gray-500 text-sm mt-1 truncate max-w-[200px]">{offer.content}</p>
                                        </td>
                                        <td className="p-4 border-b">
                                            {offer.image ? (
                                                <div className="flex items-center gap-2">
                                                    <img src={offer.image} alt="Banner" className="w-[60px] h-[40px] object-cover rounded border" />
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold flex items-center gap-1">
                                                        <i className="fas fa-image"></i> Present
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-semibold flex items-center gap-1 w-fit">
                                                    <i className="fas fa-times"></i> Missing
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 border-b">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                                                {offer.target === 'specific-url' ? 'Specific URL' : formatTarget(offer.target)}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-1 truncate max-w-[200px]">{offer.specificUrl || offer.url}</p>
                                        </td>
                                        <td className="p-4 border-b">
                                            <div className="flex flex-col gap-1 items-start">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded border border-blue-100">
                                                    {formatDisplayZone(offer.display)}
                                                </span>
                                                {offer.active ? (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">Active</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold">Draft</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 border-b">
                                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm font-semibold transition-colors flex items-center gap-2" onClick={() => handleOpenModal(offer)}>
                                                <i className="fas fa-edit"></i> Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        <i className="fas fa-tags text-4xl mb-4 block text-gray-300"></i>
                                        No offers or banners found. Click 'Create New Offer' to deploy one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                {isEditing ? <><i className="fas fa-edit"></i> Edit Offer Banner (#{currentOffer.id})</> : <><i className="fas fa-plus-circle"></i> Create New Offer Banner</>}
                            </h3>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block font-semibold mb-2">Offer Title (Internal/Display)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        required
                                        placeholder="e.g., 20% Off Tax Filing Service"
                                        value={currentOffer.title}
                                        onChange={(e) => setCurrentOffer({ ...currentOffer, title: e.target.value })}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block font-semibold mb-2">Banner Content / Text</label>
                                    <textarea
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        rows={3}
                                        required
                                        placeholder="Short, compelling text for the banner or popup..."
                                        value={currentOffer.content}
                                        onChange={(e) => setCurrentOffer({ ...currentOffer, content: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label className="block font-semibold mb-2">Banner Image URL</label>
                                    <input
                                        type="url"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="e.g., https://yourdomain.com/banner.jpg"
                                        value={currentOffer.image || ''}
                                        onChange={(e) => setCurrentOffer({ ...currentOffer, image: e.target.value || null })}
                                    />
                                    <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                                        {currentOffer.image ? (
                                            <img src={currentOffer.image} alt="Preview" className="max-h-40 mx-auto rounded" />
                                        ) : (
                                            <div className="text-gray-400">
                                                <i className="fas fa-image text-2xl mb-2"></i>
                                                <p className="text-xs">Paste a URL above to see preview</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block font-semibold mb-2">Targeting Category</label>
                                        <select
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            value={currentOffer.target}
                                            onChange={(e) => setCurrentOffer({ ...currentOffer, target: e.target.value })}
                                        >
                                            <option value="all">All Pages</option>
                                            <option value="blog-gst">GST Blog Category</option>
                                            <option value="service-tax">Tax Service Page</option>
                                            <option value="homepage">Homepage Only</option>
                                            <option value="specific-url">Specific URL</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-2">Display Zone</label>
                                        <select
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            value={currentOffer.display}
                                            onChange={(e) => setCurrentOffer({ ...currentOffer, display: e.target.value })}
                                        >
                                            <option value="body-top">Body Top Banner</option>
                                            <option value="sidebar">Sidebar Widget</option>
                                            <option value="popup">Pop-up/Modal</option>
                                        </select>
                                    </div>
                                </div>

                                {currentOffer.target === 'specific-url' && (
                                    <div className="mb-4">
                                        <label className="block font-semibold mb-2">Specific Target URL/Path</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            placeholder="/blog/specific-post-slug or full URL"
                                            value={currentOffer.specificUrl || ''}
                                            onChange={(e) => setCurrentOffer({ ...currentOffer, specificUrl: e.target.value })}
                                        />
                                    </div>
                                )}

                                <div className="mb-6">
                                    <label className="block font-semibold mb-2">Call-to-Action Link</label>
                                    <input
                                        type="url"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        required
                                        placeholder="https://yourdomain.com/checkout"
                                        value={currentOffer.url}
                                        onChange={(e) => setCurrentOffer({ ...currentOffer, url: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-6 mb-6">
                                    <label className="flex items-center gap-2 font-semibold cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-primary rounded focus:ring-primary"
                                            checked={currentOffer.active}
                                            onChange={(e) => setCurrentOffer({ ...currentOffer, active: e.target.checked })}
                                        />
                                        Activate Offer Now
                                    </label>
                                    <label className="flex items-center gap-2 font-semibold cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-primary rounded focus:ring-primary"
                                            checked={currentOffer.dismissible}
                                            onChange={(e) => setCurrentOffer({ ...currentOffer, dismissible: e.target.checked })}
                                        />
                                        User Dismissible
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <button type="button" className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors" onClick={handleCloseModal}>Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
                                        {isEditing ? <><i className="fas fa-sync-alt"></i> Update Offer</> : <><i className="fas fa-save"></i> Save & Deploy</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-5 right-5 z-[1001] px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 text-white transform transition-all duration-500 ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : notification.type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}`}></i>
                    <span className="font-semibold">{notification.message}</span>
                </div>
            )}
        </div>
    );
}
