const TrustSection: React.FC = () => {
    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 10l2 7m0 0l9 0m-9 0l-2 -7m9 0l2 7m-2 -7l-9 0m11 0l2 -2m-5 2l1 -2l1 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 14l0 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="7" cy="19" r="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="17" cy="19" r="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Express Delivery',
            desc: 'Under 30 minutes'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 3c4.97 0 9 3.134 9 7 0 3.326 -2.972 6.136 -7 6.84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 3c-4.97 0 -9 3.134 -9 7 0 3.326 2.972 6.136 7 6.84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15c-3.14 0 -6 1.34 -6 3s2.86 3 6 3 6 -1.34 6 -3 -2.86 -3 -6 -3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Safe & Hygienic',
            desc: 'Contactless delivery'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Top Rated',
            desc: '4.8/5 average rating'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12l8-4.5M12 12l-8-4.5M12 12V21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Best Quality',
            desc: 'Fresh ingredients'
        }
    ];

    return (
        <section className="relative z-10 py-20 md:py-24 px-4 bg-[#FFE5CC]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-premium border border-white/50 flex flex-col items-center text-center gap-4 hover:translate-y-[-10px] transition-all duration-500 group hover-blink">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                                {f.icon}
                            </div>
                            <div>
                                <h3 className="font-black text-text text-lg mb-1">{f.title}</h3>
                                <p className="text-sm font-bold text-text-muted opacity-60 uppercase tracking-widest">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="relative bg-[#050505] text-white pt-24 pb-12 overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-0 translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-0 -translate-x-1/4 translate-y-1/4" />

            {/* Shape Divider */}
            {/* <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
                <svg className="relative block w-[calc(100%+1.3px)] h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
                </svg>
            </div> */}

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30 transform -rotate-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                                    <path d="M7 2v20" />
                                    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                                </svg>
                            </div>
                            <span className="text-2xl font-black tracking-tight">
                                Ever<span className="text-primary">Bite</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed max-w-xs">
                            Crafting culinary experiences and delivering happiness. Your premium gateway to the world's finest flavors.
                        </p>
                        <div className="flex gap-4">
                            {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                                <a key={social} href="#" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors">
                                        {/* Simplified generic social icon representation */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                                            <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-primary">Discover</h4>
                        <ul className="space-y-4">
                            {['Home', 'Our Menu', 'Special Offers', 'About Us', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 flex items-center gap-2 transition-all duration-300 group">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-primary">Support</h4>
                        <ul className="space-y-4 text-gray-400">
                            {['Help Center', 'Safety & Hygiene', 'Terms of Service', 'Privacy Policy', 'Refund Policy'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-white transition-colors block">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
                        <h4 className="text-lg font-black mb-4 uppercase tracking-widest">Join the Club</h4>
                        <p className="text-gray-400 text-sm mb-6">Stay hungry for the latest deals and culinary exclusives.</p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full transition-all"
                            />
                            <button className="w-full bg-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark shadow-xl shadow-primary/20 transition-all active:scale-95">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm font-medium">
                        © 2026 <span className="text-white font-bold">EverBite</span>. All culinary rights reserved.
                    </p>
                    <div className="flex gap-8 text-gray-500 text-xs font-bold uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Safety</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { TrustSection, Footer };
