import React, { useEffect } from 'react';

interface OrderSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="glass-card w-full max-w-sm p-8 text-center relative z-10 animate-scale-in">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-extrabold text-text mb-2">Order Placed!</h2>
                <p className="text-text-muted">
                    Your delicious meal is on its way.
                </p>
                <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-success animate-progress-fast"></div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessModal;
