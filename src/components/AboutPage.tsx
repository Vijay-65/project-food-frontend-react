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
            <section className="relative h-[300px] flex items-center justify-center overflow-hidden mb-16">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80"
                        alt="Fine Dining"
                        className="w-full h-full object-cover animate-ken-burns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <div className="inline-block px-8 py-12 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl animate-scale-in">
                        <h1 className="text-5xl md:text-5xl font-black text-white mb-6 drop-shadow-lg uppercase tracking-tighter">
                            Our <span className="text-primary">Story</span>
                        </h1>
                        <p className="text-xl md:text-xl text-gray-100 max-w-2xl mx-auto font-medium">
                            Bringing the world's finest flavors to your doorstep.
                        </p>
                    </div>
                </div>

                {/* Decorative Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
                    <span className="w-1 h-12 rounded-full bg-gradient-to-b from-primary to-transparent" />
                </div>
            </section>

            {/* Brand Story */}
            <section className="section-padding grid md:grid-cols-2 gap-16 items-center relative">
                {/* Decorative blobs */}
                <div className="absolute -top-24 -left-24 w-64 h-2 bg-primary/5 rounded-full blur-3xl -z-10" />

                <div className="animate-slide-up order-2 md:order-1">
                    <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">SINCE 2020</div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-text mb-8 leading-tight">
                        A Passion for <span className="text-primary underline decoration-secondary/30">Excellence</span>
                    </h2>
                    <p className="text-text-muted text-lg leading-relaxed mb-8">
                        EverBite started with a simple idea: that everyone deserves access to high-quality, delicious food, no matter where they are. What began as a small local delivery service has grown into a community of food lovers and talented chefs.
                    </p>
                    <p className="text-text-muted text-lg leading-relaxed">
                        We believe that food is more than just sustenance—it's an experience. That's why we meticulously select our partner restaurants and ensure every delivery is handled with care. Every bite is a testament to our dedication.
                    </p>
                </div>

                <div className="relative group order-1 md:order-2">
                    {/* <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" /> */}
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl animate-slide-up transform group-hover:scale-[1.02] transition-transform duration-700">
                        <img
                            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1000&q=80"
                            alt="Culinary Art"
                            className="object-contain"
                        />
                    </div>
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
