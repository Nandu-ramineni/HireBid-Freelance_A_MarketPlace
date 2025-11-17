
import { Phone, ChevronDown, Mail, MapPin, Users, Briefcase } from "lucide-react"
import { useState } from "react"
import au from '@/assets/flags/au.svg';
import ca from '@/assets/flags/canada.svg';
import india from '@/assets/flags/in.svg'
import us from '@/assets/flags/us.svg'
import eu from '@/assets/flags/eu.svg'
import gb from '@/assets/flags/gb.svg'



const currencies = [
    { code: "INR", symbol: "₹", flag: india, country: "India" },
    { code: "USD", symbol: "$", flag: us, country: "United States" },
    { code: "EUR", symbol: "€", flag: eu, country: "Europe" },
    { code: "GBP", symbol: "£", flag: gb, country: "United Kingdom" },
    { code: "CAD", symbol: "C$", flag: ca, country: "Canada" },
    { code: "AUD", symbol: "A$", flag: au, country: "Australia" },
]

export default function TopBar() {
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]) // Default to INR (India)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <div className="w-full z-90 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900 dark:to-slate-900 border-b border-gray-200/60 dark:border-gray-700/60 text-sm shadow-sm">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    {/* Left: Offers and Contact */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        {/* Special Offer for Hiring */}
                        <div className="flex items-center gap-2 group">
                            
                            <span className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 font-medium">
                                🚀 Post Jobs Free This Week!
                            </span>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2 group">
                            <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <Phone className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                            </div>
                            <a
                                href="tel:+919063730699"
                                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition-colors duration-200 font-medium"
                            >
                                +91 90637 30699
                            </a>
                        </div>

                        {/* Support Email */}
                        <div className="flex items-center gap-2 group hidden sm:flex">
                            <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                                <Mail className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <a
                                href="mailto:support@hirebid.com"
                                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors duration-200 font-medium"
                            >
                                support@hirebid.com
                            </a>
                        </div>

                        {/* Active Users */}
                        <div className=" items-center gap-2 text-gray-600 dark:text-gray-400 hidden lg:flex">
                            <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                                <Users className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <span className="text-xs font-medium">50K+ Active Freelancers</span>
                        </div>
                    </div>

                    {/* Right: Location and Currency Selector */}
                    <div className="flex items-center gap-4">
                        {/* Location - India */}
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <MapPin className="h-3.5 w-3.5 text-red-500" />
                            <span className="text-xs font-medium flex items-center gap-1">
                                <img src={india} alt="India" width={16} height={12} className="rounded-sm" />
                                India
                            </span>
                        </div>

                        {/* Currency Selector */}
                        <div className="relative ">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md group"
                            >
                                <img
                                    src={selectedCurrency.flag || "/placeholder.svg"}
                                    alt={selectedCurrency.country}
                                    width={20}
                                    height={15}
                                    className="rounded-sm"
                                />
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedCurrency.code}</span>
                                <span className="text-gray-500 dark:text-gray-400">{selectedCurrency.symbol}</span>
                                <ChevronDown
                                    className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute zv right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl  overflow-hidden">
                                    <div className="py-2 z-50">
                                        {currencies.map((currency) => (
                                            <button
                                                key={currency.code}
                                                onClick={() => {
                                                    setSelectedCurrency(currency)
                                                    setIsDropdownOpen(false)
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${selectedCurrency.code === currency.code
                                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                                        : "text-gray-700 dark:text-gray-300"
                                                    }`}
                                            >
                                                <img
                                                    src={currency.flag || "/placeholder.svg"}
                                                    alt={currency.country}
                                                    width={24}
                                                    height={18}
                                                    className="rounded-sm"
                                                />
                                                <div className="flex-1 text-left">
                                                    <div className="font-semibold">{currency.code}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{currency.country}</div>
                                                </div>
                                                <span className="font-mono text-sm">{currency.symbol}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
        </div>
    )
}
