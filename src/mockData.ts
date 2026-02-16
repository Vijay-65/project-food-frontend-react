export const categories = [
    { id: 1, name: 'Burgers', icon: '🍔' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Sushi', icon: '🍣' },
    { id: 4, name: 'Salads', icon: '🥗' },
    { id: 5, name: 'Desserts', icon: '🍰' },
    { id: 6, name: 'Drinks', icon: '🥤' },
];

export const products = [
    {
        id: 1,
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with melted cheddar, lettuce, and tomato.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
        category: 'Burgers',
        isFeatured: true,
    },
    {
        id: 2,
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, basil, and tomato sauce on a thin crust.',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80',
        category: 'Pizza',
        isFeatured: true,
    },
    {
        id: 3,
        name: 'Salmon Nigiri',
        description: 'Fresh salmon slices over seasoned sushi rice.',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=500&q=80',
        category: 'Sushi',
        isFeatured: false,
    },
    {
        id: 4,
        name: 'Caesar Salad',
        description: 'Crispy romaine with parmesan, croutons, and dressing.',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80',
        category: 'Salads',
        isFeatured: false,
    },
    {
        id: 5,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center.',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80',
        category: 'Desserts',
        isFeatured: true,
    },
];

export const banners = [
    {
        id: 1,
        title: '50% OFF on your first order!',
        subtitle: 'Use code: WELCOME50',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
        cta: 'Order Now',
    },
    {
        id: 2,
        title: 'Fresh & Healthy Salads',
        subtitle: 'Starting at just $9.99',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
        cta: 'Explore Menu',
    },
];
