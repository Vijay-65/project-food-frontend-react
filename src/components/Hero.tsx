import React, { useState, useEffect } from 'react';
import { bannerAPI, IMAGE_BASE_URL } from '../api/api';

interface Banner {
    id: number;
    title: string;
    subtitle?: string;
    imageUrl: string;
    cta?: string;
}

const Hero: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await bannerAPI.getAll();
                setBanners(response.data);
            } catch (error) {
                console.error("Error fetching banners:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % banners.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [banners]);

    if (loading) return null;
    if (banners.length === 0) return null;

    return (
        <section className="relative h-[80vh] md:h-[100vh] overflow-hidden">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={banner.imageUrl.startsWith('http') ? banner.imageUrl : `${IMAGE_BASE_URL}${banner.imageUrl}`}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center items-start">
                        <div className={`max-w-2xl transition-all duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                            <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                                {banner.title.split(' ').map((word, i) => (
                                    <span key={i} className={word.includes('%') || word.includes('OFF') ? 'text-primary' : ''}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-200 mb-10 font-medium">
                                {banner.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="btn-primary text-lg px-10 py-4">
                                    {banner.cta || 'Order Now'}
                                </button>
                                <button className="px-10 py-4 rounded-full font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                    View Menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
