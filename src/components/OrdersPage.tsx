import React, { useEffect, useState } from 'react';
import { orderAPI, IMAGE_BASE_URL } from '../api/api';
import { useLocation, Link } from 'react-router-dom';
import OrderSuccessModal from './OrderSuccessModal';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';


interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

interface Order {
    id: number;
    customerName: string;
    customerEmail?: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: any;
}

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, isAuthenticated } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const location = useLocation();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (location.state?.success) {
            setShowSuccess(true);
            window.history.replaceState({}, document.title);
        }
        if (isAuthenticated) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [location, isAuthenticated, user?.email]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await orderAPI.getAll();
            let data = response.data;

            if (user?.email) {
                data = data.filter((o: any) => o.customerEmail === user.email);
            } else {
                data = [];
            }

            const sortedOrders = data.sort((a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setOrders(sortedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStep = (status: string) => {
        const s = status.toLowerCase();
        if (s === 'delivered') return 4;
        if (s === 'shipped') return 3;
        if (s === 'processing') return 2;
        if (s === 'pending') return 1;
        if (s === 'cancelled') return 0;
        return 1;
    };

    const StatusTracker = ({ status }: { status: string }) => {
        const step = getStatusStep(status);

        if (step === 0) {
            return (
                <div className="inline-flex items-center gap-2 rounded-xl bg-error/10 px-4 py-2 text-sm font-bold text-error border border-error/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Order Cancelled</span>
                </div>
            );
        }

        const steps = [
            { label: 'Confirmed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Cooking', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            { label: 'On Way', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { label: 'Delivered', icon: 'M5 13l4 4L19 7' }
        ];

        return (
            <div className="mt-6">
                <div className="flex justify-between items-start">
                    {steps.map((s, idx) => {
                        const active = idx < step;
                        return (
                            <div key={idx} className="flex flex-col items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${active ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-400'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                                    </svg>
                                </div>
                                <span className={`mt-2 text-[10px] md:text-xs font-bold ${active ? 'text-primary' : 'text-gray-400'}`}>
                                    {s.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="relative mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="absolute h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-in-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                    {step < 4 && step > 0 && (
                        <div className="absolute h-full w-20 bg-white/30 animate-progress-fast" style={{ left: `${(step / 4) * 100 - 15}%` }} />
                    )}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto text-center">
                <div className="animate-pulse space-y-12">
                    <div className="h-12 w-48 bg-gray-100 rounded-2xl mx-auto"></div>
                    <div className="space-y-8">
                        {[1, 2].map(i => (
                            <div key={i} className="h-80 bg-gray-50 rounded-[2.5rem] w-full border border-gray-100"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-surface relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

                <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-premium p-10 text-center animate-scale-in">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-text mb-4 tracking-tight">Login Required</h2>
                    <p className="text-text-muted mb-8 leading-relaxed">
                        To protect your account and track your delicious orders, please sign in or create an account.
                    </p>
                    <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="btn-primary w-full py-4 text-lg mb-4"
                    >
                        Login / Sign Up
                    </button>
                    <Link to="/menu" className="text-primary font-bold hover:underline">Or browse our menu first</Link>
                </div>
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white">
            {/* Header Section */}
            <section className="relative py-12 md:py-16 mb-12 overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-8">
                    <h1 className="text-5xl md:text-5xl font-black text-text mb-3 tracking-tighter ">
                        Your Orders
                    </h1>
                    <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Follow your cravings from our kitchen to your doorstep in real-time.
                    </p>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-4 space-y-12">
                {orders.length === 0 ? (
                    <div className="bg-surface/50 rounded-[3rem] p-16 text-center border-2 border-dashed border-gray-100 animate-slide-up">
                        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-5xl mx-auto mb-8">
                            🍽️
                        </div>
                        <h2 className="text-3xl font-black text-text mb-4">Hungry? No orders yet!</h2>
                        <p className="text-text-muted mb-10 max-w-sm mx-auto text-lg leading-relaxed">
                            Your order history is currently empty. Start your journey with our amazing menu.
                        </p>
                        <Link to="/menu" className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2 group">
                            Explore Menu
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {orders.map((order, index) => {
                            let items: OrderItem[] = [];
                            try {
                                items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                                if (!Array.isArray(items)) items = [];
                            } catch (e) {
                                console.error(e);
                            }

                            return (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-50/50 hover:shadow-2xl transition-all duration-500 animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-gray-50">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-text tracking-tight mb-1">Order #{order.id}</h3>
                                                <p className="text-sm font-bold text-text-muted flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-surface px-6 py-4 rounded-3xl text-right">
                                            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Total Paid</p>
                                            <p className="text-3xl font-black text-primary">${Number(order.totalAmount).toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <StatusTracker status={order.status} />

                                    <div className="mt-10 space-y-4">
                                        <h4 className="text-sm font-black text-text uppercase tracking-widest pl-2 mb-4">Order Details</h4>
                                        {items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between gap-4 p-4 rounded-[1.5rem] bg-surface/50 border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="h-16 w-16 overflow-hidden rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                                                        <img
                                                            src={
                                                                item.imageUrl?.startsWith('http')
                                                                    ? item.imageUrl
                                                                    : item.imageUrl
                                                                        ? `${IMAGE_BASE_URL}${item.imageUrl}`
                                                                        : 'https://via.placeholder.com/150'
                                                            }
                                                            alt={item.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-bold text-text mb-1">{item.name}</p>
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black">
                                                            QTY: {item.quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-lg font-black text-text">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <OrderSuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </div>
        </div>
    );
};

export default OrdersPage;
