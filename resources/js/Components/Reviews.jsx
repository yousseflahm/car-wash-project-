import { motion } from "framer-motion";
import { usePage } from "@inertiajs/react";

const comments = [
    {
        id: 1,
        scrImage: "/profile1.jpg",
        rating: 5,
        firstName: "John",
        text: "The best car wash I've ever had! My car looks brand new, and the service was quick and professional."
    },
    {
        id: 2,
        scrImage: "/profile2.jpg",
        rating: 4,
        firstName: "Sarah",
        text: "Great attention to detail! My car was spotless inside and out. Highly recommend their premium wash package."
    },
    {
        id: 3,
        scrImage: "/profile3.jpg",
        rating: 4,
        firstName: "Michael",
        text: "Fast and efficient! They removed stains I thought were permanent. Will definitely come back!"
    }
];


export default function Reviews() {
  
    const{translations} = usePage().props;
    const t  = translations.messages;
    return (
        <div className="bg-cover bg-[url('/backgroundReview.jpg')] bg-center bg-no-repeat">

        
        <div className="bg-blue-400   bg-opacity-50 py-16 overflow-x-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Title */}
                <div className="mx-auto max-w-5xl text-center">
                    <motion.h2
                        className="text-base font-semibold leading-7 text-blue-400 bg-white px-4 py-2 rounded-full uppercase mb-4 lg:mb-8 inline-block"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                       {t.tr1}
                    </motion.h2>
                    <motion.h1
                        className="lg:text-7xl text-4xl md:text-5xl font-bold tracking-tight text-blue-600"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t.tr2}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-900">
                            {t.tr3}
                        </span>
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-md text-white max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t.trDtext}
                    </motion.p>
                </div>

                {/* Reviews Grid */}
                <div className="mx-auto mt-16 max-w-4xl">
                    <div className="grid gap-6 md:grid-cols-2">
                        {comments.map((comment, index) => (
                            <motion.div
                                key={comment.id}
                                className={`bg-white p-6 rounded-2xl shadow-lg flex items-center gap-4 ${
                                    index === comments.length - 1 ? "md:col-span-2" : ""
                                }`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src={comment.scrImage}
                                    alt={comment.firstName}
                                    className="w-16 h-16 rounded-full border-4 border-blue-400"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{comment.firstName}</h3>
                                    <p className="text-yellow-500 text-xl">{"⭐".repeat(comment.rating)}</p>
                                    <p className="text-gray-600 mt-1">{comment.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}
