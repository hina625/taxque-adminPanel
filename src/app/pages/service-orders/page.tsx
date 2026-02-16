import React from 'react';
import {
    ShoppingCart, Download, Plus, ClipboardList, Clock,
    CheckCircle, Hourglass, Search, Filter, MoreVertical,
    FileText, User, Phone, Mail, ChevronDown
} from 'lucide-react';

const ServiceOrdersPage = () => {
    return (
        <div className="p-6 min-h-screen bg-gray-50 text-slate-900 font-sans">

            {/* PAGE HEADER */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3 text-slate-900 mb-1">
                        <ShoppingCart className="text-indigo-600 w-8 h-8" />
                        Service Orders
                    </h1>
                    <p className="text-slate-500 text-sm">Manage and track all tax consulting service orders • Updated: Dec 17, 2025 at 1:36 PM</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-slate-900 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors font-semibold text-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transform">
                        <Plus className="w-4 h-4" />
                        New Order
                    </button>
                </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

                {/* Stat Card 1 */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        <ClipboardList className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold leading-none mb-1">248</div>
                        <div className="text-xs font-medium opacity-90">Total Orders</div>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-gradient-to-br from-fuchsia-400 to-rose-500 rounded-xl p-5 text-white flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold leading-none mb-1">32</div>
                        <div className="text-xs font-medium opacity-90">In Progress</div>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-gradient-to-br from-sky-400 to-cyan-400 rounded-xl p-5 text-white flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold leading-none mb-1">198</div>
                        <div className="text-xs font-medium opacity-90">Completed</div>
                    </div>
                </div>

                {/* Stat Card 4 */}
                <div className="bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl p-5 text-white flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        <span>₹</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold leading-none mb-1">₹8.4L</div>
                        <div className="text-xs font-medium opacity-90">Total Revenue</div>
                    </div>
                </div>

                {/* Stat Card 5 */}
                <div className="bg-gradient-to-br from-pink-400 to-yellow-400 rounded-xl p-5 text-white flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        <Hourglass className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold leading-none mb-1">18</div>
                        <div className="text-xs font-medium opacity-90">Pending</div>
                    </div>
                </div>
            </div>

            {/* FILTERS BAR */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Search Order</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Order ID, Customer name..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Service Type</label>
                        <div className="relative">
                            <select className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer">
                                <option>All Services</option>
                                <option>GST Filing</option>
                                <option>ITR Filing</option>
                                <option>Business Registration</option>
                                <option>Tax Consultation</option>
                                <option>Audit Services</option>
                                <option>Accounting</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</label>
                        <div className="relative">
                            <select className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer">
                                <option>All Status</option>
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Under Review</option>
                                <option>Completed</option>
                                <option>Cancelled</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date Range</label>
                        <div className="relative">
                            <select className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last 90 Days</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ORDERS TABLE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-slate-100">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                        <ClipboardList className="w-5 h-5 text-indigo-600" />
                        Recent Orders
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b-2 border-gray-200">
                                <th className="text-left p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                                <th className="text-left p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="text-left p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                                <th className="text-left p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="text-left p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="text-left p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="text-left p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">

                            {/* Row 1 */}
                            <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                                <td className="p-4 text-sm">
                                    <span className="font-bold text-indigo-600">#TQ-2025-001</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                            RS
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Rajesh Sharma</div>
                                            <div className="text-xs text-slate-500">rajesh.s@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg shrink-0">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">GST Filing</div>
                                            <div className="text-xs text-slate-500">Monthly Return</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-amber-100 text-amber-800">
                                        <Clock className="w-3.5 h-3.5" />
                                        In Progress
                                    </span>
                                </td>
                                <td className="p-4 text-sm font-semibold text-slate-900">₹1,500</td>
                                <td className="p-4 text-sm text-slate-600">Dec 16, 2025</td>
                                <td className="p-4">
                                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:border-indigo-600 hover:text-indigo-600 text-slate-600 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>

                            {/* Row 2 */}
                            <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                                <td className="p-4 text-sm">
                                    <span className="font-bold text-indigo-600">#TQ-2025-002</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-400 to-rose-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                            AK
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Amit Kumar</div>
                                            <div className="text-xs text-slate-500">amit.k@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">ITR Filing</div>
                                            <div className="text-xs text-slate-500">Individual</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Completed
                                    </span>
                                </td>
                                <td className="p-4 text-sm font-semibold text-slate-900">₹2,500</td>
                                <td className="p-4 text-sm text-slate-600">Dec 15, 2025</td>
                                <td className="p-4">
                                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:border-indigo-600 hover:text-indigo-600 text-slate-600 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>

                            {/* Row 3 */}
                            <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                                <td className="p-4 text-sm">
                                    <span className="font-bold text-indigo-600">#TQ-2025-003</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-400 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                            PS
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Priya Singh</div>
                                            <div className="text-xs text-slate-500">priya.s@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg shrink-0">
                                            <ShoppingBag className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Business Reg.</div>
                                            <div className="text-xs text-slate-500">Private Limited</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800">
                                        <Hourglass className="w-3.5 h-3.5" />
                                        Pending
                                    </span>
                                </td>
                                <td className="p-4 text-sm font-semibold text-slate-900">₹15,000</td>
                                <td className="p-4 text-sm text-slate-600">Dec 14, 2025</td>
                                <td className="p-4">
                                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:border-indigo-600 hover:text-indigo-600 text-slate-600 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>

                            {/* Row 4 */}
                            <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                                <td className="p-4 text-sm">
                                    <span className="font-bold text-indigo-600">#TQ-2025-004</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                            MK
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Mohit Kapoor</div>
                                            <div className="text-xs text-slate-500">mohit.k@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-lg shrink-0">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Audit</div>
                                            <div className="text-xs text-slate-500">Statutory Audit</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-amber-100 text-amber-800">
                                        <Clock className="w-3.5 h-3.5" />
                                        In Progress
                                    </span>
                                </td>
                                <td className="p-4 text-sm font-semibold text-slate-900">₹25,000</td>
                                <td className="p-4 text-sm text-slate-600">Dec 14, 2025</td>
                                <td className="p-4">
                                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:border-indigo-600 hover:text-indigo-600 text-slate-600 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                <div className="flex justify-center items-center gap-2 mt-6 pt-6 border-t border-gray-100">
                    <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-semibold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">Previous</button>
                    <button className="px-3 py-2 bg-indigo-600 border border-indigo-600 rounded-md text-sm font-semibold text-white">1</button>
                    <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-semibold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">2</button>
                    <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-semibold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">3</button>
                    <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-semibold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">Next</button>
                </div>

            </div>

        </div>
    );
};

// Helper component for ShoppingBag icon which was used in the table
function ShoppingBag({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    );
}

export default ServiceOrdersPage;
