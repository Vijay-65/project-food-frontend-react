import React from 'react';

const AboutPage: React.FC = () => {
    const values = [
        {
            title: 'Fresh Ingredients',
            description: 'We source only the finest and freshest ingredients from local farmers and trusted suppliers.',
            icon: '🌿'
        },
        {
            title: 'Fast Delivery',
            description: 'Our dedicated delivery partners ensure your food arrives hot and fresh within 30 minutes.',
            icon: '🚀'
        },
        {
            title: 'Hygiene First',
            description: 'We maintain the highest standards of cleanliness and hygiene in our kitchens and delivery process.',
            icon: '✨'
        },
        {
            title: 'Customer Delight',
            description: 'Your satisfaction is our top priority. We strive to make every meal a delightful experience.',
            icon: '❤️'
        }
    ];

    const team = [
        {
            name: 'Chef Marco',
            role: 'Head Chef',
            image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&q=80'
        },
        {
            name: 'Sarah Jenkins',
            role: 'Operations Manager',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
        },
        {
            name: 'David Chen',
            role: 'Delivery Lead',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'
        }
    ];

    return (
        <div className="pt-24 pb-16">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden mb-16">
                <img
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=80"
                    alt="About Us"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-slide-up">Our Story</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Bringing the world's flavors to your doorstep since 2020.
                    </p>
                </div>
            </section>

            {/* Brand Story */}
            <section className="section-padding grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-slide-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">A Passion for Great Food</h2>
                    <p className="text-text-muted leading-relaxed mb-6">
                        FoodDash started with a simple idea: that everyone deserves access to high-quality, delicious food, no matter where they are. What began as a small local delivery service has grown into a community of food lovers and talented chefs.
                    </p>
                    <p className="text-text-muted leading-relaxed">
                        We believe that food is more than just sustenance—it's an experience. That's why we meticulously select our partner restaurants and ensure every delivery is handled with care.
                    </p>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-premium animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <img
                        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                        alt="Chef Cooking"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Our Values */}
            <section className="bg-surface py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Our Core Values</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">The principles that guide everything we do.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                                <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="section-padding">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Meet the Team</h2>
                    <p className="text-text-muted max-w-2xl mx-auto">The talented people behind your favorite meals.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {team.map((member, index) => (
                        <div key={index} className="group text-center">
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-xl text-text">{member.name}</h3>
                            <p className="text-primary font-medium">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
