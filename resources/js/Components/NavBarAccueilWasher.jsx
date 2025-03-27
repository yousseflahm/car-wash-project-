import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function NavBarAccueilWasher() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
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
                        <img src="close.svg" alt="close-bar" className="h-6" /> // Close icon
                    ) : (
                        <img
                            src="burger-bar.svg"
                            alt="burger-bar"
                            className="h-6"
                        /> // Burger icon
                    )}
                </button>
            </div>

            {/* Navigation Links (Visible on Larger Screens) */}
            <div className="hidden md:flex items-center space-x-6">
                <a
                    href="#home"
                    className="text-base  font-kanit font-normal text-blue-400 hover:text-blue-600"
                >
                    Home
                </a>
                <a
                    href="#workInfo"
                    className="text-base font-kanit font-normal hover:text-blue-600"
                >
                    work info
                </a>
                <a
                    href="#about"
                    className="text-base  font-kanit font-normal hover:text-blue-600"
                >
                    About Us
                </a>
                <a
                    href="#contact"
                    className="text-base  font-kanit  font-normal hover:text-blue-600"
                >
                    Contact Us
                </a>

              
            </div>

            {/* Login and Register Buttons (Visible on Larger Screens) */}
            <div className="hidden md:flex ">
                <Link
                    href={route("washer.login")}
                    className="text-base font-semibold  font-kanit   hover:text-blue-600 transition duration-200 py-2 px-2 ml-4  text-black	 "
                >
                    Log in
                </Link>
                <Link
                    href={route("washer.register")}
                    className="text-base font-semibold font-kanit text-white bg-blue-400 hover:bg-blue-600 transition duration-200 py-2 px-4 rounded-full"
                >
                    Register
                </Link>
            </div>

            {/* Mobile Menu (Visible on Small Screens) */}
            {isMenuOpen && (
                <div className="md:hidden  bg-white bg-opacity-70  shadow-lg absolute top-16 left-0 right-0 text-center">
                    <div className="px-6 py-4 flex flex-col space-y-4">
                        <a
                            href="#home"
                            onClick={toggleMenu}
                            className="text-base font-normal text-blue-400 hover:text-blue-600"
                        >
                            Home
                        </a>
                        <a
                            href="#workInfo"
                            onClick={toggleMenu}
                            className="text-base font-normal hover:text-blue-600"
                        >
                            work info
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



                        {/* Login and Register Buttons for Mobile */}
                        <div className="flex flex-col space-y-2">
                            <Link
                                href={route("washer.login")}
                                className="text-base font-semibold text-blue-400 border border-blue-400 hover:bg-blue-600 hover:text-white transition duration-200 py-2 px-4 rounded-full"
                            >
                                Login
                            </Link>
                            <Link
                                href={route("washer.register")}
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
