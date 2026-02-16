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

            // Strict filtering by user email
            if (user?.email) {
                data = data.filter((o: any) => o.customerEmail === user.email);
            } else {
                data = []; // No email, no orders
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

        // Cancelled state
        if (step === 0) {
            return (
                <div className="inline-flex items-center gap-2 rounded-full bg-error/5 px-3 py-1.5 text-xs font-medium text-error">
                    <span className="h-1.5 w-1.5 rounded-full bg-error" />
                    <span>Order cancelled</span>
                </div>
            );
        }

        const steps = ['Confirmed', 'Cooking', 'On the Way', 'Delivered'];

        return (
            <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-text-muted">
                    {steps.map((label, index) => {
                        const reached = index < step;
                        const isCurrent = index === step - 1;
                        return (
                            <span
                                key={label}
                                className={`flex-1 text-center ${reached ? 'font-semibold text-primary' : isCurrent ? 'text-primary' : ''}`}
                            >
                                {label}
                            </span>
                        );
                    })}
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-surface">
                    <div
                        className="h-full w-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ transform: `scaleX(${Math.max(0.1, step / 4)})`, transformOrigin: 'left' }}
                    />
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto text-center">
                <div className="animate-pulse space-y-12">
                    <div className="h-20 w-3/4 bg-surface rounded-3xl mx-auto"></div>
                    <div className="space-y-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-surface rounded-[2.5rem] w-full"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="w-full max-w-md rounded-2xl bg-white shadow-premium px-6 py-10 text-center">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 15v2" />
                            <path d="M12 7v2" />
                            <circle cx="12" cy="12" r="9" />
                        </svg>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-text">Login required</h2>
                    <p className="mb-6 text-sm text-text-muted">
                        You need to be logged in to see your orders and track your deliveries.
                    </p>
                    <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="mb-3 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                    >
                        Login / Sign up
                    </button>
                    <p className="text-xs text-text-muted">
                        Or go back to the <Link to="/menu" className="font-semibold text-primary">menu</Link> and start ordering.
                    </p>
                    <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 px-4">

<section className="bg-surface py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl text-center md:text-5xl font-extrabold text-text mb-4">Your Orders</h1>
                    <p className="text-text-muted text-center text-lg max-w-full">
                    See what you’ve ordered before and track the status of each delivery.
                    </p>
                </div>
            </section>
        
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
                    {/* Page header */}
                    {/* <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-text tracking-tighter leading-none">Your Orders</h1>
                
                        <p className="mt-2 text-sm text-text-muted">
                        See what you’ve ordered before and track the status of each delivery.
                    </p>
                </div> */}

                {/* Empty state */}
                {orders.length === 0 ? (
                    <div className="rounded-2xl bg-white p-8 text-center shadow-premium">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-surface">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 text-text-muted"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-text">No orders yet</h2>
                        <p className="mt-2 text-sm text-text-muted">
                            When you place an order, it will appear here so you can check its details and status.
                        </p>
                        <Link
                            to="/menu"
                            className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                        >
                            Browse menu
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {orders.map((order) => {
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
                                    className="rounded-2xl bg-white p-6 shadow-premium"
                                >
                                    <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                                                Order #{order.id}
                                            </p>
                                            <p className="mt-1 text-sm text-text-muted">
                                                {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                            <p className="mt-2 text-sm font-medium text-text">
                                                {items.length} {items.length === 1 ? 'item' : 'items'}
                                            </p>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="text-xs text-text-muted">Total paid</p>
                                            <p className="text-lg font-semibold text-text">
                                                ${Number(order.totalAmount).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <StatusTracker status={order.status} />
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        {items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between gap-4 rounded-xl bg-surface px-3 py-2"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-200">
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
                                                        <p className="text-sm font-medium text-text">
                                                            {item.name}
                                                        </p>
                                                        <p className="mt-0.5 text-xs text-text-muted">
                                                            x{item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-semibold text-text">
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

                <OrderSuccessModal
                    isOpen={showSuccess}
                    onClose={() => setShowSuccess(false)}
                />
                <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default OrdersPage;
