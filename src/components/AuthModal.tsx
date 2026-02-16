import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const { login, register } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (mode === 'signup') {
                if (formData.password !== formData.confirmPassword) {
                    toast.error("Passwords do not match");
                    return;
                }
                await register(formData);
                toast.success("Account created successfully! Please login.");
                setMode('login');
            } else {
                await login({ email: formData.email, password: formData.password });
                toast.success("Logged in successfully!");
                onClose();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Simple centered card */}
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-premium p-6 sm:p-8">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Title + toggle */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-text">
                        {mode === 'login' ? 'Login' : 'Create account'}
                    </h2>
                    <p className="mt-2 text-sm text-text-muted">
                        {mode === 'login'
                            ? "Sign in to continue ordering your favourite food."
                            : "Fill in the details below to get started."}
                    </p>

                    <div className="mt-4 inline-flex rounded-full bg-surface p-1">
                        <button
                            type="button"
                            className={`px-4 py-1.5 text-sm rounded-full font-medium ${mode === 'login'
                                ? 'bg-primary text-white'
                                : 'text-text-muted'
                                }`}
                            onClick={() => setMode('login')}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-1.5 text-sm rounded-full font-medium ${mode === 'signup'
                                ? 'bg-primary text-white'
                                : 'text-text-muted'
                                }`}
                            onClick={() => setMode('signup')}
                        >
                            Sign up
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex flex-col items-start">
                                    <label className="mb-1 text-xs font-medium text-text-muted">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="flex flex-col items-start">
                                    <label className="mb-1 text-xs font-medium text-text-muted">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col items-start">
                                <label className="mb-1 text-xs font-medium text-text-muted">
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    required
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                                />
                            </div>

                            <div className="flex flex-col items-start">
                                <label className="mb-1 text-xs font-medium text-text-muted">
                                    Delivery address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                                />
                            </div>
                        </>
                    )}

                    <div className="flex flex-col items-start">
                        <label className="mb-1 text-xs font-medium text-text-muted">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="mb-1 text-xs font-medium text-text-muted">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    {mode === 'signup' && (
                        <div className="flex flex-col items-start">
                            <label className="mb-1 text-xs font-medium text-text-muted">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
                    >
                        {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
