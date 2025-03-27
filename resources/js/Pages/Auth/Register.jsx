import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        lastName :"" ,
        phone:"" , 
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <div className="flex min-h-screen font-kanit">
            <Head title="Register" />

            {/* Left Section: Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-blue-100 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-blue-600 text-center">
                        Create an Account
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Enter your name"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        {/* First Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name 
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={data.lastName}
                                onChange={(e) => setData("lastName", e.target.value)}
                                placeholder="Enter your last name"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                        </div>
                        {/* phone*/}
                        <div>
                            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                               Phone
                            </label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone }
                                onChange={(e) => setData("phone", e.target.value)}
                                placeholder="Enter your phone"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder="Enter your email"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                placeholder="Enter your password"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                placeholder="Confirm your password"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {processing ? "Signing up..." : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <Link href='login' className="text-sm text-blue-600 hover:underline">
                            Already have an account? Log in here
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Right Section: Image (Hidden on Small Screens) */}
            <div className="hidden lg:flex w-1/2 bg-[url('/backgroundContact.png')] bg-cover bg-center">
                <div className="h-full w-full bg-blue-400 bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl font-bold"
                    >
                        Join Our Community!
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mt-4 text-lg max-w-md"
                    >
                        Get access to premium car wash and detailing services. Sign up today and enjoy exclusive benefits!
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
