import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryAPI } from '../api/api';

interface Category {
    id: number;
    name: string;
    icon?: string;
}

const CategorySection: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryAPI.getAll();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return null;

    return (
        <section className="bg-white py-16 md:py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-text mb-4">
                        Explore <span className="text-primary">Categories</span>
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg">
                        Discover your favorite cuisines from our wide range of categories
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/menu?category=${category.name}`}
                            className="group flex flex-col items-center gap-4 w-[110px] md:w-[140px]"
                        >
                            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-[2rem] flex items-center justify-center text-4xl md:text-5xl shadow-lg shadow-gray-200/50 group-hover:shadow-primary/20 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 border border-gray-50/50 backdrop-blur-sm overflow-hidden">
                                {/* Hover background effect */}
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                                <span className="relative z-10">{category.icon}</span>
                            </div>
                            <span className="text-sm md:text-lg font-bold text-text group-hover:text-primary transition-colors text-center">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/menu"
                        className="btn-primary inline-flex items-center gap-2 group"
                    >
                        View All Categories
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
