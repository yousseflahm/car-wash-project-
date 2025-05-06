import { motion } from "framer-motion";
import { usePage } from "@inertiajs/react";

export default function AboutUsWasher() {
    const {translations} = usePage().props;
    const t = translations.messages;
    return (
        <section className="relative bg-cover bg-[url('/washerAccPic/pc2.jpg')] bg-center bg-no-repeat py-24">
            <div className="absolute inset-0 bg-blue-400 bg-opacity-50"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-white">
                {/* Title */}
                <div className="text-center">
                    <motion.h2
                        className="text-lg font-semibold uppercase bg-white text-blue-400 px-5 py-2 rounded-full inline-block shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                       {t.tA1}
                    </motion.h2>
                    <motion.h1
                        className="lg:text-7xl text-4xl md:text-5xl font-bold tracking-tight text-blue-600 text-center mt-4"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t.wAt1} {" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-900">
                            {t.wAt2}
                        </span>
                    </motion.h1>
                </div>

                {/* Worker-Focused Story */}
                <motion.div
                    className="mt-8 max-w-3xl mx-auto text-gray-600 text-lg text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <p className="text-white">
                        {t.wAdesc1}{" "}
                        <span className="font-semibold text-blue-400">
                          {t.wAdesc2}
                        </span>
                        {t.wAdesc3}{" "}
                    </p>
                </motion.div>

                {/* Worker Benefits Information */}
                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: "💼",
                            title: t.waCard1 , 
                            text: t.waCarddesc1
                        },
                        {
                            icon: "💰",
                            title: t.waCard2 , 
                            text: t.waCarddesc2
                        },
                        {
                            icon: "🚗",
                            title: t.waCard3 , 
                            text: t.waCarddesc3
                        },
                        {
                            icon: "🌟",
                            title: t.waCard4 , 
                            text: t.waCarddesc4
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-center border border-blue-400 hover:bg-white/20 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <span className="text-4xl text-blue-400">
                                {item.icon}
                            </span>
                            <h3 className="text-xl font-semibold mt-3 text-blue-300">
                                {item.title}
                            </h3>
                            <p className="text-white">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
