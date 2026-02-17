import React, { useState, useEffect } from 'react';

import { useCart } from '../context/CartContext';
import { IMAGE_BASE_URL, orderAPI } from '../api/api';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const CartPage: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const [customerName, setCustomerName] = useState('');
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const navigate = useNavigate();

    const fetchRecentOrders = async () => {
        if (!isAuthenticated || !user?.email) return;
        try {
            const response = await orderAPI.getAll();
            const filtered = response.data
                .filter((o: any) => o.customerEmail === user.email)
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 3);
            setRecentOrders(filtered);
        } catch (error) {
            console.error("Error fetching orders for cart:", error);
        }
    };

    const handleApplyCoupon = () => {
        if (!couponCode) return;
        setIsApplyingCoupon(true);
        setTimeout(() => {
            if (couponCode.toUpperCase() === 'EVERBITE20') {
                setDiscount(cartTotal * 0.2);
                toast.success('20% discount applied!');
            } else {
                setDiscount(0);
                toast.error('Invalid coupon code');
            }
            setIsApplyingCoupon(false);
        }, 800);
    };

    const finalTotal = cartTotal - discount;

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;

        if (!isAuthenticated) {
            toast.error("Please login to place an order");
            setIsAuthModalOpen(true);
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                customerName: user?.firstName ? `${user.firstName} ${user.lastName}` : customerName,
                customerEmail: user?.email,
                totalAmount: finalTotal,
                items: cart,
                status: 'pending'
            };

            await orderAPI.create(orderData);
            clearCart();
            toast.success("Order placed successfully!");
            navigate('/orders', { state: { success: true } });
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            setCustomerName(user.firstName ? `${user.firstName} ${user.lastName}` : '');
            fetchRecentOrders();
        }
    }, [isAuthenticated, user]);

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white">
            {/* Header Section */}
            <section className="bg-surface py-12 mb-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text mb-4">Your Cart</h1>
                    <p className="text-text-muted text-lg max-w-2xl">
                        Review your selection and checkout your next delicious bite.
                    </p>
                </div>
            </section>


            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Left Column: Cart Items & History */}
                    <div className="lg:col-span-2 space-y-12">

                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-text flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    Review Selection
                                </h2>
                                <span className="text-primary font-black px-4 py-2 bg-primary/10 rounded-2xl text-sm">
                                    {cart?.length || 0} {(cart?.length || 0) === 1 ? 'ITEM' : 'ITEMS'}
                                </span>
                            </div>

                            {(!cart || cart.length === 0) ? (
                                <div className="bg-surface/50 rounded-[3rem] p-16 text-center border-2 border-dashed border-gray-100 animate-slide-up">
                                    <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-5xl mx-auto mb-8">
                                        🛒
                                    </div>
                                    <h2 className="text-3xl font-black text-text mb-4">Your cart is empty</h2>
                                    <p className="text-text-muted mb-10 max-w-sm mx-auto text-lg leading-relaxed">
                                        It looks like you haven't added anything yet. Explore our menu to find your favorites!
                                    </p>
                                    <Link to="/menu" className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2 group">
                                        Browse Menu
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item, index) => (
                                        <div
                                            key={item?.id || index}
                                            className="bg-white rounded-[2.5rem] p-6 flex flex-col md:flex-row items-center gap-6 shadow-premium border border-gray-50/50 hover:shadow-2xl transition-all duration-500 animate-slide-up group"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <div className="w-32 h-32 rounded-[2rem] overflow-hidden bg-surface flex-shrink-0 shadow-lg border-4 border-white">
                                                <img
                                                    src={item?.imageUrl?.startsWith('http') ? item.imageUrl : (item?.imageUrl ? `${IMAGE_BASE_URL}${item.imageUrl}` : 'https://via.placeholder.com/150')}
                                                    alt={item?.name || 'Food'}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>

                                            <div className="flex-grow text-center md:text-left">
                                                <h3 className="text-2xl font-black text-text mb-1 tracking-tight group-hover:text-primary transition-colors">
                                                    {item?.name || 'Untitled Item'}
                                                </h3>
                                                <div className="flex items-center justify-center md:justify-start gap-3">
                                                    <span className="text-primary font-black text-2xl">${Number(item?.price || 0).toFixed(2)}</span>
                                                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                                    <span className="text-sm font-bold text-text-muted uppercase tracking-widest opacity-50">Per Item</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-4 bg-surface/50 rounded-3xl p-2 border border-white shadow-inner">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-text font-black bg-white shadow-sm hover:bg-primary hover:text-white transition-all transform active:scale-90"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <span className="font-black text-xl w-8 text-center text-text">{item?.quantity || 0}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-text font-black bg-white shadow-sm hover:bg-primary hover:text-white transition-all transform active:scale-90"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-14 h-14 rounded-[1.5rem] flex items-center justify-center text-gray-300 hover:text-error hover:bg-error/5 hover:border-error/10 border-2 border-transparent transition-all"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Recent Activity Mini-Tracker */}
                        {isAuthenticated && recentOrders.length > 0 && (
                            <section className="animate-slide-up">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-text">Previous Cravings</h2>
                                    <Link to="/orders" className="text-primary font-bold hover:underline text-sm flex items-center gap-1">
                                        Full History <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {recentOrders.map((order) => (
                                        <Link key={order.id} to="/orders" className="bg-white p-6 rounded-[2rem] shadow-premium border border-gray-50 flex flex-col justify-between hover:scale-105 transition-transform">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="px-3 py-1 bg-surface rounded-lg text-[10px] font-black text-text-muted">#{order.id}</span>
                                                    <div className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-success' : 'bg-primary'} animate-pulse`} />
                                                </div>
                                                <p className="text-xl font-black text-text">${Number(order.totalAmount || 0).toFixed(1)}</p>
                                                <p className="text-xs font-bold text-text-muted mt-1 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1 sticky top-32">
                        <div className="bg-white rounded-[3rem] p-10 shadow-premium border border-gray-50 relative overflow-hidden">
                            {/* Decorative background aura */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />

                            <h2 className="text-3xl font-black text-text mb-10 tracking-tighter">Order Summary</h2>

                            <div className="space-y-6 mb-10 pb-10 border-b-2 border-dashed border-gray-100">
                                <div className="flex justify-between text-lg font-bold text-text-muted">
                                    <span>Subtotal</span>
                                    <span>${Number(cartTotal || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-success">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Delivery</span>
                                    </div>
                                    <span className="font-black italic">FREE</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-lg font-bold text-primary animate-scale-in">
                                        <span>Promo Discount</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="pt-6 flex flex-col items-center">
                                    <span className="text-sm font-black text-text-muted uppercase tracking-[0.3em] mb-2">Total Amount</span>
                                    <div className="flex items-start">
                                        <span className="text-4xl font-black text-text mr-1 mt-1 font-serif">$</span>
                                        <span className="text-7xl font-black text-primary tracking-tighter tabular-nums leading-none">
                                            {finalTotal.toFixed(2).split('.')[0]}
                                        </span>
                                        <span className="text-2xl font-black text-primary mt-1">
                                            .{finalTotal.toFixed(2).split('.')[1]}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code Field */}
                            <div className="mb-10 p-2 bg-surface rounded-[2rem] border border-gray-100">
                                <div className="flex gap-2">
                                    <div className="relative flex-grow">
                                        <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Promo Code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-sm font-black text-text focus:ring-0 placeholder:text-gray-400 uppercase"
                                        />
                                    </div>
                                    <button
                                        onClick={handleApplyCoupon}
                                        disabled={isApplyingCoupon || !couponCode}
                                        className="bg-text text-white px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50"
                                    >
                                        {isApplyingCoupon ? '...' : 'Apply'}
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handlePlaceOrder} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 ml-2">Ship To</label>
                                    <input
                                        type="text"
                                        required
                                        value={customerName || ''}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        readOnly={isAuthenticated}
                                        className={`w-full bg-surface border-2 border-transparent rounded-[1.5rem] px-6 py-5 font-bold text-text focus:ring-4 focus:ring-primary/10 focus:border-primary/20 outline-none transition-all ${isAuthenticated ? 'bg-gray-50/50 cursor-not-allowed border-dashed' : ''}`}
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !cart || cart.length === 0}
                                    className="w-full btn-primary py-6 rounded-[2rem] text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <>
                                            <span>Place Order Now</span>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 flex items-center justify-center gap-4 text-gray-400 opacity-60">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">EverBite Secure Checkout</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};




export default CartPage;
