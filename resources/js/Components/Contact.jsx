import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";



export default function ContactUs( ) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        text: "",
    });

    
   


    const submit = (e) => {
       
        e.preventDefault();
        post("/contact");
    };

    return (
        <section className="relative bg-cover bg-[url('/backgroundContact.png')] bg-center bg-no-repeat py-24">
            <div className="absolute inset-0 bg-blue-400 bg-opacity-50"></div>

            <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-blue-400">
                {/* Title */}
                <div className="text-center">
                    <motion.h2
                        className="text-lg font-semibold uppercase bg-white  px-5 py-2 rounded-full inline-block shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Contact Us
                    </motion.h2>
                    <motion.h1
                        className="lg:text-6xl text-4xl md:text-5xl font-bold tracking-tight text-blue-600 mt-4"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Get in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-900">
                            Touch
                        </span>
                    </motion.h1>
                </div>

               

                <motion.form
                    onSubmit={submit}
                    className="mt-10  bg-blue-200 p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="text-blue-600 block text-lg font-semibold">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-2 w-full px-4 py-3  border border-blue-400 text-black rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your name"
                               
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-blue-600 block text-lg font-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="mt-2 w-full px-4 py-3  border border-blue-400 text-black rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your email"
                            
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-blue-600 block text-lg font-semibold">
                                Message
                            </label>
                            <textarea
                                name="text"
                                value={data.text}
                                onChange={(e) =>
                                    setData("text", e.target.value)
                                }
                                className="mt-2 w-full px-4 py-3  border border-blue-400 text-black rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Write your message"
                                rows="5"
                               
                            ></textarea>
                            {errors.text && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.text}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center mt-4">
                            <motion.button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-900 text-white text-lg font-semibold rounded-full shadow-md hover:opacity-90 transition-all duration-300"
                                whileTap={{ scale: 0.95 }}
                            >
                                {processing ? "Sending..." : "Send Message"}
                            </motion.button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}
