import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="flex min-h-screen font-kanit">
            <Head title="Log in" />

            {/* Left Section: Image (Hidden on Small Screens) */}
            <div className="hidden lg:flex w-1/2 bg-[url('/backgroundContact.png')] bg-cover bg-center">
                <div className="h-full w-full bg-blue-400 bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-8">
                    {/* Animated Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl font-bold"
                    >
                        Trusted by Thousands!
                    </motion.h2>

                    {/* Animated Paragraphs */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mt-4 text-lg max-w-md"
                    >
                        We have served{" "}
                        <span className="font-semibold">10,000+</span> happy
                        customers, delivering top-quality car wash and detailing
                        services.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-4 text-lg max-w-md"
                    >
                        Our professional team ensures that every car shines with
                        a spotless finish. Experience premium care for your
                        vehicle today!
                    </motion.p>

                    {/* Animated Stats */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-6 flex space-x-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="text-center"
                        >
                            <h3 className="text-3xl font-bold">10K+</h3>
                            <p className="text-sm">Happy Clients</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="text-center"
                        >
                            <h3 className="text-3xl font-bold">5★</h3>
                            <p className="text-sm">Customer Ratings</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.4 }}
                            className="text-center"
                        >
                            <h3 className="text-3xl font-bold">100%</h3>
                            <p className="text-sm">Satisfaction Guarantee</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Right Section: Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-blue-100 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className=""
                >
                    <h2 className="text-3xl font-bold text-blue-600 text-center">
                        Log in to your account
                    </h2>

                    {status && (
                        <div className="mt-4 text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Enter your email"
                                className="mt-1 w-full rounded-lg border  border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Enter your password"
                                className="mt-1 w-full rounded-lg  border  p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 text-sm text-gray-700"
                            >
                                Remember me
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center mt-4">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {processing ? "Logging in..." : "Log in"}
                            </button>
                        </div>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <Link
                            href='register'
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Don't have an account? Sign up here
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
