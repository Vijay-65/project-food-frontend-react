import React from 'react';

const TrustSection: React.FC = () => {
    const features = [
        {
            icon: '🚚',
            title: 'Fast Delivery',
            desc: 'Under 30 minutes'
        },
        {
            icon: '🛡️',
            title: 'Safe & Hygienic',
            desc: 'Contactless delivery'
        },
        {
            icon: '⭐',
            title: 'Top Rated',
            desc: '4.8/5 average rating'
        },
        {
            icon: '💎',
            title: 'Best Quality',
            desc: 'Fresh ingredients'
        }
    ];

    return (
        <section className="bg-primary/5 py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-3">
                            <div className="text-4xl mb-2">{f.icon}</div>
                            <h3 className="font-bold text-text">{f.title}</h3>
                            <p className="text-sm text-text-muted">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-text text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                                F
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Food<span className="text-primary">Dash</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Making food ordering easy and delightful. Your favorite meals delivered fresh to your doorstep.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#menu" className="hover:text-primary transition-colors">Menu</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Offers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Help & Support</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to get latest offers and updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary w-full"
                            />
                            <button className="bg-primary px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                                Go
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
                    <p>© 2026 FoodDash. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Facebook</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { TrustSection, Footer };
