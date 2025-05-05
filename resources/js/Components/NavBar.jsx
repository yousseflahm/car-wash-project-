import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function NavBar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleLanguageDropdown = () => {
        setLanguageDropdownVisible(!languageDropdownVisible);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

  

    return (
        <div className="flex items-center px-6 justify-end">
            {/* Burger Menu Icon (Visible on Small Screens) */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="focus:outline-none">
                    {isMenuOpen ? (
                        <img src="close.svg" alt="close-bar" className="h-6" />
                    ) : (
                        <img src="burger-bar.svg" alt="burger-bar" className="h-6" />
                    )}
                </button>
            </div>

            {/* Navigation Links (Visible on Larger Screens) */}
            <div className="hidden md:flex items-center space-x-6">
                <a
                    href="#home"
                    className="text-base font-kanit font-normal text-blue-400 hover:text-blue-600"
                >
                    Home
                </a>
                <a
                    href="#services"
                    className="text-base font-kanit font-normal hover:text-blue-600"
                >
                    Services
                </a>
                <a
                    href="#about"
                    className="text-base font-kanit font-normal hover:text-blue-600"
                >
                    About Us
                </a>
                <a
                    href="#contact"
                    className="text-base font-kanit font-normal hover:text-blue-600"
                >
                    Contact Us
                </a>

                {/* Work With Us Dropdown */}
                <div className="relative font-kanit">
                    <div className="flex items-center">
                        <button
                            onClick={toggleDropdown}
                            className="text-base font-normal hover:text-blue-600 flex items-center transition duration-200"
                        >
                            Work With Us
                            <img
                                src="/fleche.svg"
                                alt="fleche"
                                className={`h-3 pl-2 transform transition-transform duration-200 ${
                                    dropdownVisible ? "-rotate-180 " : "rotate-0"
                                }`}
                            />
                        </button>
                    </div>

                    {dropdownVisible && (
                        <div className="absolute bg-white border rounded-md shadow-md mt-2 w-56">
                            <div className="flex justify-end p-3">
                                <div onClick={toggleDropdown}>
                                    <img src="close.svg" alt="close" className="h-2" />
                                </div>
                            </div>
                            <Link
                                href={route("admin.login")}
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Admin login
                            </Link>
                            <Link
                                href={route('washer-landing')}
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Washer Area
                            </Link>
                        </div>
                    )}
                </div>

                {/* Language Switcher Dropdown */}
                <div className="relative font-kanit">
                    <div className="flex items-center">
                        <button
                            onClick={toggleLanguageDropdown}
                            className="text-base font-normal hover:text-blue-600 flex items-center transition duration-200"
                        >
                            EN/FR
                            <img
                                src="/fleche.svg"
                                alt="arrow"
                                className={`h-3 pl-2 transform transition-transform duration-200 ${
                                    languageDropdownVisible ? "-rotate-180" : "rotate-0"
                                }`}
                            />
                        </button>
                    </div>

                    {languageDropdownVisible && (
                        <div className="absolute bg-white border rounded-md shadow-md mt-2 w-32 right-0">
                            <div className="flex justify-end p-3">
                                <div onClick={toggleLanguageDropdown}>
                                    <img src="close.svg" alt="close" className="h-2" />
                                </div>
                            </div>
                            <a
                                href={route("lang.switch", ["en"])}
                                onClick={toggleLanguageDropdown}
                                className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                            >
                                English
                            </a>
                            <a
                                href={route("lang.switch", ["fr"])}
                                onClick={toggleLanguageDropdown}
                                className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Français
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Login and Register Buttons (Visible on Larger Screens) */}
            <div className="hidden md:flex">
                <Link
                    href={route("login")}
                    className="text-base font-semibold font-kanit hover:text-blue-600 transition duration-200 py-2 px-2 ml-4 text-black"
                >
                    Log in
                </Link>
                <Link
                    href={route("register")}
                    className="text-base font-semibold font-kanit text-white bg-blue-400 hover:bg-blue-600 transition duration-200 py-2 px-4 rounded-full"
                >
                    Register
                </Link>
            </div>

            {/* Mobile Menu (Visible on Small Screens) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white bg-opacity-70 shadow-lg absolute top-16 left-0 right-0 text-center">
                    <div className="px-6 py-4 flex flex-col space-y-4">
                        <a
                            href="#home"
                            onClick={toggleMenu}
                            className="text-base font-normal text-blue-400 hover:text-blue-600"
                        >
                            Home
                        </a>
                        <a
                            href="#services"
                            onClick={toggleMenu}
                            className="text-base font-normal hover:text-blue-600"
                        >
                            Services
                        </a>
                        <a
                            href="#about"
                            onClick={toggleMenu}
                            className="text-base font-normal hover:text-blue-600"
                        >
                            About Us
                        </a>
                        <a
                            href="#contact"
                            onClick={toggleMenu}
                            className="text-base font-normal hover:text-blue-600"
                        >
                            Contact Us
                        </a>

                        {/* Work With Us Dropdown for Mobile */}
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="text-base font-normal hover:text-blue-600"
                            >
                                Work With Us
                            </button>

                            {dropdownVisible && (
                                <div className="mt-2 ml-4">
                                    <div className="flex justify-end p-3">
                                        <div onClick={toggleDropdown}>
                                            <img src="close.svg" alt="close" className="h-4" />
                                        </div>
                                    </div>
                                    <Link
                                        href={route("admin.login")}
                                        onClick={toggleMenu}
                                        className="block px-4 py-2 text-black hover:bg-gray-100"
                                    >
                                        Admin login
                                    </Link>
                                    <Link
                                        href="/work-with-us/washer"
                                        onClick={toggleMenu}
                                        className="block px-4 py-2 text-black hover:bg-gray-100"
                                    >
                                        Washer Area
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Language Switcher for Mobile */}
                        <div className="relative">
                            <button
                                onClick={toggleLanguageDropdown}
                                className="text-base font-normal hover:text-blue-600"
                            >
                                Language (EN/FR)
                            </button>

                            {languageDropdownVisible && (
                                <div className="mt-2 ml-4">
                                    <div className="flex justify-end p-3">
                                        <div onClick={toggleLanguageDropdown}>
                                            <img src="close.svg" alt="close" className="h-4" />
                                        </div>
                                    </div>
                                    <a
                                        href={route("lang.switch", ["en"])}
                                        onClick={toggleMenu}
                                        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                    >
                                        English
                                    </a>
                                    <a
                                        href={route("lang.switch", ["fr"])}
                                        onClick={toggleMenu}
                                        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                    >
                                        Français
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Login and Register Buttons for Mobile */}
                        <div className="flex flex-col space-y-2">
                            <Link
                                href={route("login")}
                                className="text-base font-semibold text-blue-400 border border-blue-400 hover:bg-blue-600 hover:text-white transition duration-200 py-2 px-4 rounded-full"
                            >
                                Login
                            </Link>
                            <Link
                                href={route("register")}
                                onClick={toggleMenu}
                                className="text-base font-semibold text-white bg-blue-400 hover:bg-blue-600 transition duration-200 py-2 px-4 rounded-full text-center"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}