import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../api/api';
import { ProductCard } from './MenuSection';

const FeaturedSection: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await productAPI.getFeatured();
                setFeaturedProducts(response.data.slice(0, 8));
            } catch (error) {
                console.error("Error fetching featured products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading) return null;

    return (
        <section className="section-padding">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-text mb-4">Trending Now</h2>
                    <p className="text-text-muted text-lg">
                        Check out our most popular dishes that everyone is talking about.
                        Hand-picked for their exceptional taste and quality.
                    </p>
                </div>
                <Link
                    to="/menu"
                    className="btn-primary !bg-white !text-primary border-2 border-primary/20 hover:!bg-primary hover:!text-white transition-all duration-300"
                >
                    View Full Menu
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-16 text-center">
                <Link to="/menu" className="btn-primary text-lg px-12 py-4">
                    Order Now
                </Link>
            </div>
        </section>
    );
};

export default FeaturedSection;
