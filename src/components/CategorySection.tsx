import React, { useState, useEffect } from 'react';
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
        <section className="bg-surface py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-text">Explore Categories</h2>
                    <button className="text-primary font-semibold hover:underline">View All</button>
                </div>

                <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className="flex-shrink-0 group flex flex-col items-center gap-3 min-w-[100px]"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-sm group-hover:shadow-md group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300 border border-gray-100">
                                {category.icon}
                            </div>
                            <span className="text-sm md:text-base font-semibold text-text group-hover:text-primary transition-colors">
                                {category.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
