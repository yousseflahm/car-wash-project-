import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        lastName: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
    const { translations } = usePage().props;
    const t = translations.messages;

    const toggleLanguageDropdown = () => {
        setLanguageDropdownVisible(!languageDropdownVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("washer.register"));
    };

    return (
        <div className="relative flex min-h-screen font-kanit">
            <Head title={t.washerRegisterTitle} />

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

            {/* Left Section: Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-blue-100 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-blue-600 text-center">
                        {t.washerRegisterTitle}
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* Name and Last Name in the Same Row */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {t.registerName}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder={t.washerNamePlaceholder}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {t.washerLastName}
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    value={data.lastName}
                                    onChange={(e) => setData("lastName", e.target.value)}
                                    placeholder={t.washerLastNamePlaceholder}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {t.washerPhone}
                            </label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                                placeholder={t.washerPhonePlaceholder}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {t.washerAddress}
                            </label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                onChange={(e) => setData("address", e.target.value)}
                                placeholder={t.washerAddressPlaceholder}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.address}
                                </p>
                            )}
                        </div>

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

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {t.washerConfirmPassword}
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                placeholder={t.washerConfirmPasswordPlaceholder}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {processing ? t.washerSigningUp : t.washerSignUpButton}
                            </button>

                            <Link
                                href={route("washer.login")}
                                className="w-full sm:w-auto text-sm text-blue-600 hover:underline text-center"
                            >
                                {t.washerLoginLink}
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Right Section: Image */}
            <div className="hidden lg:flex w-1/2 bg-[url('/washerAccPic/pc4.jpg')] bg-cover bg-center">
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
                        {t.washerRegisterSubtitle1}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-4 text-lg max-w-md"
                    >
                        {t.washerRegisterSubtitle2}
                    </motion.p>
                </div>
            </div>
        </div>
    );
}