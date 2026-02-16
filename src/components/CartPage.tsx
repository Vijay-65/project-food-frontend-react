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
    const navigate = useNavigate();

    const fetchRecentOrders = async () => {
        if (!isAuthenticated || !user?.email) return;
        try {
            const response = await orderAPI.getAll();
            const filtered = response.data
                .filter((o: any) => o.customerEmail === user.email)
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 3); // Just show top 3
            setRecentOrders(filtered);
        } catch (error) {
            console.error("Error fetching orders for cart:", error);
        }
    };

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
                totalAmount: cartTotal,
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
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-text mb-12 tracking-tight">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Cart & History */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Cart Items */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-text">Your Selection</h2>
                            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                {cart?.length || 0} {(cart?.length || 0) === 1 ? 'Item' : 'Items'}
                            </span>
                        </div>

                        {(!cart || cart.length === 0) ? (
                            <div className="glass-card p-10 text-center border-2 border-dashed border-gray-100">
                                <p className="text-text-muted font-bold mb-6 italic">Your cart is current hungry for items...</p>
                                <Link to="/menu" className="btn-primary py-3 px-8 text-sm">Fill it up!</Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item?.id || Math.random()} className="glass-card p-5 flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-surface flex-shrink-0 shadow-md">
                                            <img
                                                src={item?.imageUrl?.startsWith('http') ? item.imageUrl : (item?.imageUrl ? `${IMAGE_BASE_URL}${item.imageUrl}` : 'https://via.placeholder.com/150')}
                                                alt={item?.name || 'Food'}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-extrabold text-lg text-text mb-1 group-hover:text-primary transition-colors">{item?.name || 'Untitled Item'}</h3>
                                            <div className="flex items-center gap-4">
                                                <p className="text-primary font-black text-lg">${Number(item?.price || 0).toFixed(2)}</p>
                                                <span className="text-xs text-text-muted font-bold uppercase tracking-widest opacity-50">Unit Price</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 bg-surface rounded-2xl p-1.5 border border-white shadow-inner">
                                            <button
                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-text font-black hover:bg-white hover:shadow-premium transition-all"
                                            >
                                                -
                                            </button>
                                            <span className="font-black text-lg w-6 text-center">{item?.quantity || 0}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-text font-black hover:bg-white hover:shadow-premium transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-3 text-text-muted hover:text-error hover:bg-error/5 rounded-2xl transition-all"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Quick Tracking History */}
                    {isAuthenticated && recentOrders.length > 0 && (
                        <section className="animate-fade-in-up">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-text">Recent Orders</h2>
                                <Link to="/orders" className="text-primary font-black text-sm hover:underline flex items-center gap-1">
                                    View Detailed History <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {recentOrders.map((order) => {
                                    let items: any[] = [];
                                    try {
                                        items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                                        if (!Array.isArray(items)) items = [];
                                    } catch (e) { items = []; }

                                    return (
                                        <div key={order.id} className="glass-card p-4 flex flex-col justify-between border-l-4 border-l-primary hover:bg-surface/30 transition-colors">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-black text-text-muted uppercase">#{order.id}</span>
                                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${order.status === 'delivered' ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'
                                                        }`}>
                                                        {order.status || 'Pending'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-text-muted font-bold mb-3">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}</p>
                                            </div>
                                            <div className="flex justify-between items-end mt-4">
                                                <div className="flex -space-x-3 overflow-hidden">
                                                    {items.slice(0, 3).map((it: any, i: number) => (
                                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm bg-surface">
                                                            <img
                                                                src={it?.imageUrl?.startsWith('http') ? it.imageUrl : (it?.imageUrl ? `${IMAGE_BASE_URL}${it.imageUrl}` : 'https://via.placeholder.com/150')}
                                                                className="w-full h-full object-cover"
                                                                alt=""
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="font-black text-sm text-text">${Number(order.totalAmount || 0).toFixed(1)}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                </div>

                {/* Right Column: Checkout Details */}
                <div className="lg:col-span-1">
                    <div className="glass-card p-8 sticky top-32 border-2 border-primary/5 shadow-premium">
                        <h2 className="text-2xl font-black text-text mb-8 tracking-tight italic">Order Total</h2>

                        <div className="space-y-5 mb-10">
                            <div className="flex justify-between text-text font-bold">
                                <span className="opacity-60">Subtotal</span>
                                <span>${Number(cartTotal || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center bg-success/5 p-3 rounded-xl border border-success/10">
                                <span className="text-success font-black text-xs uppercase tracking-widest">Delivery</span>
                                <span className="text-success font-black">FREE</span>
                            </div>
                            <div className="pt-5 border-t-2 border-dashed border-gray-100 flex justify-between items-end">
                                <span className="font-black text-lg">Total</span>
                                <div className="text-right">
                                    <span className="text-primary font-black text-4xl block leading-none">${Number(cartTotal || 0).toFixed(2)}</span>
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Inc. All Taxes</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handlePlaceOrder} className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-black text-text-muted uppercase tracking-widest mb-2 px-1">Receiver Name</label>
                                <input
                                    type="text"
                                    required
                                    value={customerName || ''}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    readOnly={isAuthenticated}
                                    className={`w-full bg-surface border-2 border-transparent rounded-2xl px-5 py-4 font-bold text-text focus:ring-4 focus:ring-primary/10 focus:border-primary/20 outline-none transition-all ${isAuthenticated ? 'bg-gray-50/50 cursor-not-allowed border-dashed opacity-70' : ''}`}
                                    placeholder="e.g. John Wick"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !cart || cart.length === 0}
                                className="w-full btn-primary py-5 rounded-3xl text-lg shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-95 transition-transform disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        <span>Confirm Order</span>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <p className="text-[10px] text-gray-500 font-bold leading-tight">Secure checkout powered by DashPay Safe™</p>
                        </div>
                    </div>
                </div>

            </div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};




export default CartPage;
