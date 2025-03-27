import { motion } from "framer-motion";

export default function WorkInfoSection() {
    return (
        <section className="relative bg-cover bg-center bg-no-repeat py-24">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-blue-100 bg-opacity-75"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-white">
                {/* Title */}
                <div className="text-center">
                    <motion.h2 
                        className="text-lg font-semibold uppercase bg-white text-blue-400 px-5 py-2 rounded-full inline-block shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Work With Us
                    </motion.h2>
                    <motion.h1
                        className="lg:text-7xl text-4xl md:text-5xl font-bold tracking-tight text-blue-600 text-center mt-4"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Join Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-900">
                            Washer Team
                        </span>
                    </motion.h1>
                </div>

                {/* Work Info Description */}
                <motion.div 
                    className="mt-8 max-w-3xl mx-auto text-gray-600 text-lg text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <p>
                        At <span className="font-semibold text-blue-400">Premium Car Wash</span>, we offer flexible opportunities to join our team of professional car washers. 
                        Enjoy competitive pay, training, and a supportive work environment. Start your journey with us today!
                    </p>
                </motion.div>

                {/* Work Info Cards */}
                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { 
                            icon: "📝", 
                            title: "How to Apply", 
                            text: "Fill out our online application form to get started." 
                        },
                        { 
                            icon: "💳", 
                            title: "Payment", 
                            text: "Weekly payments via bank transfer or cash." 
                        },
                        { 
                            icon: "📅", 
                            title: "Workdays", 
                            text: "Monday to Saturday, with flexible shifts available." 
                        },
                        { 
                            icon: "🚀", 
                            title: "Get Started", 
                            text: "Begin your journey with us and start earning right away." 
                        },
                    ].map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-center border border-blue-400 hover:bg-white/20 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <span className="text-4xl text-blue-400">{item.icon}</span>
                            <h3 className="text-xl font-semibold mt-3 text-blue-300">{item.title}</h3>
                            <p className="text-gray-600">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Call-to-Action */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <a
                        href="/apply"
                        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all"
                    >
                        Apply Now
                    </a>
                </motion.div>
            </div>
        </section>
    );
}