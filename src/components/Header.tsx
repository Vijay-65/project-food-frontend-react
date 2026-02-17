import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const location = useLocation();
    const { cartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
    }, [location]);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Orders', path: '/orders' },
        { name: 'Offers', path: '/offers' },
        { name: 'About', path: '/about' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                    ? 'mt-4 md:mt-6 px-4'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className={`max-w-7xl mx-auto transition-all duration-500 ${isScrolled
                    ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/5 rounded-[2.5rem] py-3 px-6 md:px-10 border border-white/40 ring-1 ring-black/5'
                    : 'px-4 md:px-8'
                    } flex items-center justify-between`}>
                    <Link to="/" className="flex items-center gap-2 relative z-50 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                                <path d="M7 2v20" />
                                <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                            </svg>
                        </div>
                        <span className={`text-xl font-black tracking-tight transition-colors duration-300 ${isScrolled || location.pathname !== '/' || isMenuOpen ? 'text-text' : 'text-white'}`}>
                            Ever<span className="text-primary">Bite</span>
                        </span>
                    </Link>


                    <nav className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`relative px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${isActive
                                        ? 'text-primary'
                                        : isScrolled || location.pathname !== '/'
                                            ? 'text-text-muted hover:text-primary hover:bg-primary/5'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>


                    {/* Actions */}
                    <div className="flex items-center gap-2 md:gap-4 relative z-50">
                        <Link
                            to="/cart"
                            className={`relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group ${isScrolled || location.pathname !== '/' || isMenuOpen
                                    ? 'text-text hover:bg-gray-100'
                                    : 'text-white hover:bg-white/20'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[11px] font-black min-w-[20px] h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce-subtle">
                                    {cartCount}
                                </span>
                            )}
                        </Link>


                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={`flex items-center gap-2 p-1.5 pr-3 rounded-full transition-colors border shadow-sm ${isScrolled || location.pathname !== '/' ? 'bg-surface border-gray-100' : 'bg-white/10 border-white/20 backdrop-blur-md'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                        {user?.firstName?.charAt(0) || user?.email.charAt(0).toUpperCase()}
                                    </div>
                                    <span className={`hidden sm:block text-sm font-bold ${isScrolled || location.pathname !== '/' ? 'text-text' : 'text-white'}`}>
                                        {user?.firstName || 'Account'}
                                    </span>
                                </button>


                                {isUserMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-premium border border-gray-50 py-2 overflow-hidden animate-scale-in">
                                        <div className="px-4 py-3 border-b border-gray-50">
                                            <p className="text-xs text-text-muted">Logged in as</p>
                                            <p className="text-sm font-bold text-text truncate">{user?.email}</p>
                                        </div>
                                        <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-text hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profile Settings
                                        </button>
                                        <Link to="/orders" className="w-full text-left px-4 py-2.5 text-sm font-medium text-text hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            My Orders
                                        </Link>
                                        <div className="border-t border-gray-50 mt-1">
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2.5 text-sm font-bold text-error hover:bg-error/5 transition-colors flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="hidden sm:block btn-primary !py-2 !px-5 text-sm"
                            >
                                Login
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`md:hidden p-2 rounded-xl transition-colors ${isScrolled || location.pathname !== '/' || isMenuOpen ? 'text-text bg-gray-100' : 'text-white bg-white/10'
                                }`}
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Drawer - Outside header to avoid stacking context issues */}
            <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col h-full pt-24 px-6">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="text-2xl font-bold text-text py-4 border-b border-gray-50 flex items-center justify-between group"
                            >
                                {item.name}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto mb-10">
                        {isAuthenticated ? (
                            <button
                                onClick={logout}
                                className="w-full btn-primary !bg-error py-4 text-lg mb-4"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsAuthModalOpen(true);
                                }}
                                className="w-full btn-primary py-4 text-lg mb-4"
                            >
                                Login / Sign Up
                            </button>
                        )}
                        <p className="text-center text-text-muted text-sm">
                            Need help? <span className="text-primary font-semibold">Contact Support</span>
                        </p>
                    </div>
                </div>
            </div>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};

export default Header;

