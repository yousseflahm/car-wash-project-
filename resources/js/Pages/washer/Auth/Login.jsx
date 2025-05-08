import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
    const { translations } = usePage().props;
    const t = translations.messages;

    const toggleLanguageDropdown = () => {
        setLanguageDropdownVisible(!languageDropdownVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("washer.login.post"));
    };

    return (
        <div className="relative flex min-h-screen font-kanit">
            <Head title={t.washerLoginTitle} />

            {/* Language Switcher */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
                <div className="relative">
                    <button
                        onClick={toggleLanguageDropdown}
                        className="flex items-center justify-center w-16 h-10 rounded-lg transition duration-200 border border-gray-200"
                    >
                        <span className="text-sm pl-2 font-medium">EN/FR</span>
                        <img
                            src="/fleche.svg"
                            alt="arrow"
                            className={`h-3 ml-2 transform transition-transform duration-200 ${
                                languageDropdownVisible ? "-rotate-180" : "rotate-0"
                            }`}
                        />
                    </button>

                    {languageDropdownVisible && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                            <div className="flex justify-end p-2">
                                <button onClick={toggleLanguageDropdown}>
                                    <img src="/close.svg" alt="close" className="h-3 w-3" />
                                </button>
                            </div>
                            <a
                                href={route("lang.switch", ["en"])}
                                onClick={toggleLanguageDropdown}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                                English
                            </a>
                            <a
                                href={route("lang.switch", ["fr"])}
                                onClick={toggleLanguageDropdown}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                                Français
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Left Section: Image */}
            <div className="hidden lg:flex w-1/2 bg-[url('/washerAccPic/pc3.jpg')] bg-cover bg-center">
                <div className="h-full w-full bg-blue-400 bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl font-bold"
                    >
                        {t.washerJoinTeam}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mt-4 text-lg max-w-md"
                    >
                        {t.washerTeamDescription1}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-4 text-lg max-w-md"
                    >
                        {t.washerTeamDescription2}
                    </motion.p>

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
                            <p className="text-sm">{t.washerHappyClients}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="text-center"
                        >
                            <h3 className="text-3xl font-bold">5★</h3>
                            <p className="text-sm">{t.washerCustomersRating}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.4 }}
                            className="text-center"
                        >
                            <h3 className="text-3xl font-bold">100%</h3>
                            <p className="text-sm">{t.washerSatisfiedGuarantee}</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.6 }}
                    >
                        <Link
                            href="#apply"
                            className="text-lg hover:text-blue-300"
                        >
                            {t.washerApplyNow}
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Right Section: Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-blue-100 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-blue-600 text-center">
                        {t.washerLoginTitle}
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
                                {t.washerEmail}
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder={t.washerEmailPlaceholder}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                required
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
                                {t.washerPassword}
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                placeholder={t.washerPasswordPlaceholder}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                required
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
                                onChange={(e) => setData("remember", e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 text-sm text-gray-700"
                            >
                                {t.washerRememberMe}
                            </label>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    {t.washerForgotPassword}
                                </Link>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {processing ? t.washerLoggingIn : t.washerLoginButton}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="register"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            {t.washerSignupLink}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}