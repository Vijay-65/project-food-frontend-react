import React from 'react';
import { IMAGE_BASE_URL, productAPI, categoryAPI } from '../api/api';
import { useCart } from '../context/CartContext';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description?: string;
    imageUrl: string;
    isFeatured: boolean;
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, cart } = useCart();
    const isAdded = cart.some(item => item.id === product.id);

    const handleAddToCart = () => {
        addToCart(product);
    };

    const imageUrl = product.imageUrl && product.imageUrl.startsWith('http')
        ? product.imageUrl
        : (product.imageUrl ? `${IMAGE_BASE_URL}${product.imageUrl}` : 'https://via.placeholder.com/300?text=No+Image');

    return (
        <div className="glass-card overflow-hidden group hover:translate-y-[-8px] transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.isFeatured && (
                    <div className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                        SPECIAL DEAL
                    </div>
                )}
                <button
                    onClick={handleAddToCart}
                    className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 scale-0 group-hover:scale-100 ${isAdded ? 'bg-success text-white scale-100' : 'bg-white text-primary hover:bg-primary hover:text-white'
                        }`}
                >
                    {isAdded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{product.category}</span>
                </div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <span className="font-bold text-primary">${product.price}</span>
                </div>
                <p className="text-text-muted text-sm line-clamp-2 mb-4">
                    {product.description}
                </p>
                <button
                    onClick={handleAddToCart}
                    className={`w-full py-2.5 rounded-xl border-2 font-bold transition-all duration-300 flex items-center justify-center gap-2 ${isAdded
                        ? 'bg-success border-success text-white'
                        : 'border-primary/10 text-primary hover:bg-primary hover:text-white'
                        }`}
                >
                    {isAdded ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Added to Cart
                        </>
                    ) : (
                        'Add to Cart'
                    )}
                </button>
            </div>
        </div>
    );
};



interface MenuSectionProps {
    limit?: number;
    featuredOnly?: boolean;
    title?: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({ limit, featuredOnly, title }) => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [categories, setCategories] = React.useState<any[]>([]);
    const [activeCategory, setActiveCategory] = React.useState('All');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    productAPI.getAll(),
                    categoryAPI.getAll()
                ]);
                setProducts(prodRes.data);
                setCategories(catRes.data);
            } catch (error) {
                console.error("Error fetching menu section data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const allFiltered = activeCategory === 'All'
        ? (featuredOnly ? products.filter(p => p.isFeatured) : products)
        : (featuredOnly ? products.filter(p => p.category === activeCategory && p.isFeatured) : products.filter(p => p.category === activeCategory));

    const displayProducts = limit ? allFiltered.slice(0, limit) : allFiltered;

    if (loading) return null;

    return (
        <section id="menu" className="section-padding">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-extrabold text-text mb-4">
                    {title || "Our Delicious Menu"}
                </h2>
                <p className="text-text-muted max-w-2xl mx-auto">
                    {featuredOnly
                        ? "Exclusive deals and featured items you won't want to miss."
                        : "From juicy burgers to fresh sushi, we have something for everyone."}
                </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                <button
                    onClick={() => setActiveCategory('All')}
                    className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${activeCategory === 'All'
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-surface text-text-muted hover:bg-primary/10 hover:text-primary'
                        }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${activeCategory === cat.name
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-surface text-text-muted hover:bg-primary/10 hover:text-primary'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {limit && (
                <div className="mt-16 text-center">
                    <a
                        href="/menu"
                        className="btn-primary !bg-white !text-primary border-2 border-primary/20 hover:!bg-primary hover:!text-white transition-all duration-300 px-12 py-4 text-lg inline-block rounded-full font-bold shadow-lg"
                    >
                        View All Items
                    </a>
                </div>
            )}
        </section>
    );
};

export default MenuSection;
