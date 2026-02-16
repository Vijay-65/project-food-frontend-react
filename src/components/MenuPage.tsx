import React, { useState, useEffect } from 'react';
import { categoryAPI, productAPI } from '../api/api';
import { ProductCard } from './MenuSection';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const MenuPage: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isSticky, setIsSticky] = useState(false);
    const [loading, setLoading] = useState(true);
    const { cartCount, cartTotal } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    categoryAPI.getAll(),
                    productAPI.getAll()
                ]);
                setCategories(catRes.data);
                setProducts(prodRes.data);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    if (loading) return (
        <div className="pt-40 pb-20 text-center font-bold text-2xl text-primary animate-pulse">
            Loading Menu...
        </div>
    );

    return (
        <div className="pt-24 pb-16">
            {/* Page Header */}
            <section className="bg-surface py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text mb-4">Our Menu</h1>
                    <p className="text-text-muted text-lg max-w-2xl">
                        Explore our wide variety of delicious dishes, prepared fresh just for you.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8">
                {/* Sticky Sidebar / Tabs */}
                <aside className={`lg:w-64 flex-shrink-0 ${isSticky ? 'lg:sticky lg:top-24' : ''} h-fit`}>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                        <h3 className="font-bold text-text mb-4 px-2">Categories</h3>
                        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
                            <button
                                onClick={() => setActiveCategory('All')}
                                className={`flex-shrink-0 text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${activeCategory === 'All'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-text-muted hover:bg-primary/5 hover:text-primary'
                                    }`}
                            >
                                All Items
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`flex-shrink-0 text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 ${activeCategory === cat.name
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-text-muted hover:bg-primary/5 hover:text-primary'
                                        }`}
                                >
                                    <span>{cat.icon}</span>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Listing */}
                <div className="flex-grow">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-text">
                            {activeCategory} <span className="text-text-muted text-lg font-normal ml-2">({filteredProducts.length} items)</span>
                        </h2>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-surface rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="text-6xl mb-4">🍽️</div>
                            <h3 className="text-xl font-bold text-text mb-2">No items found</h3>
                            <p className="text-text-muted">Try selecting a different category.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Cart Summary (Mobile) */}
            {cartCount > 0 && (
                <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%]">
                    <Link
                        to="/cart"
                        className="w-full bg-primary text-white py-4 rounded-2xl shadow-2xl shadow-primary/40 font-bold flex items-center justify-between px-6 animate-slide-up"
                    >
                        <div className="flex items-center gap-3">
                            <span className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center">{cartCount}</span>
                            <span>View Cart</span>
                        </div>
                        <span className="text-lg">${cartTotal.toFixed(2)}</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MenuPage;
