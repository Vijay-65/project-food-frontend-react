import React, { useState, useEffect } from 'react';
import { bannerAPI, IMAGE_BASE_URL } from '../api/api';

const OffersPage: React.FC = () => {
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await bannerAPI.getAll();
                setBanners(response.data);
            } catch (error) {
                console.error("Error fetching offers banners:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    const coupons = [
        {
            code: 'WELCOME50',
            title: '50% OFF',
            desc: 'On your first order above $20',
            validity: 'Valid till 31st Jan',
            color: 'bg-primary'
        },
        {
            code: 'FREEDEL',
            title: 'FREE DELIVERY',
            desc: 'On all orders above $30',
            validity: 'Limited time offer',
            color: 'bg-secondary'
        },
        {
            code: 'SUSHI20',
            title: '20% OFF ON SUSHI',
            desc: 'Applicable on all sushi platters',
            validity: 'Weekend special',
            color: 'bg-accent'
        }
    ];

    if (loading) return null;

    return (
        <div className="pt-24 pb-16">
            {/* Page Header */}
            <section className="bg-surface py-12 mb-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text mb-4">Exclusive Offers</h1>
                    <p className="text-text-muted text-lg max-w-2xl">
                        Save big on your favorite meals with our latest deals and promotions.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Featured Promotions */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {banners.map((banner) => (
                        <div key={banner.id} className="relative h-64 rounded-3xl overflow-hidden group shadow-lg">
                            <img
                                src={banner.imageUrl && banner.imageUrl.startsWith('http') ? banner.imageUrl : (banner.imageUrl ? `${IMAGE_BASE_URL}${banner.imageUrl}` : 'https://via.placeholder.com/600x400?text=Offer')}
                                alt={banner.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{banner.title}</h3>
                                <p className="text-gray-300 mb-6">{banner.subtitle}</p>
                                <button className="btn-primary w-fit !py-2 !px-6">{banner.cta || 'Order Now'}</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coupon Grid */}
                <h2 className="text-3xl font-bold text-text mb-8">Available Coupons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coupons.map((coupon, index) => (
                        <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                            <div className={`${coupon.color} p-6 text-white text-center`}>
                                <span className="text-sm font-bold opacity-80 uppercase tracking-wider">Use Code</span>
                                <div className="text-2xl font-black mt-1 border-2 border-dashed border-white/30 py-2 rounded-xl">
                                    {coupon.code}
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="font-bold text-xl text-text mb-2">{coupon.title}</h3>
                                <p className="text-text-muted text-sm mb-6 flex-grow">{coupon.desc}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <span className="text-xs text-text-muted font-medium italic">{coupon.validity}</span>
                                    <button className="text-primary font-bold text-sm hover:underline">Copy Code</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OffersPage;
