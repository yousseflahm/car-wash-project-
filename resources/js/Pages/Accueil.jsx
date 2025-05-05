import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavBar from "@/Components/NavBar";
import HeroSection from "@/Components/HeroSection";
import Services from "@/Components/Services";
import Reviews from "@/Components/Reviews";
import AboutUs from "@/Components/About";
import ContactUs from "@/Components/Contact";
import Footer from "@/Components/Footer";

export default function Welcome() {
   
    return (
        <>
            <Head title="Welcome" />
            <header className="fixed  mt-3 top-0 left-0 w-full  rounded-full bg-white shadow-md z-50 mx-auto">
                <div className=" mx-auto  flex items-center  ">
                    <div className="pl-6">
                        <ApplicationLogo />
                    </div>
                    <div className="px-4 w-full">
                        <NavBar />
                    </div>
                </div>
            </header>
            <section id="home">
                <HeroSection />
            </section>
            <section id="services">
                <Services />
            </section>
            <section id="reviews">
                <Reviews />
            </section>
            <section id="about">
                <AboutUs />
            </section>
            <section id="contact">
                <ContactUs />
            </section>
            <footer className="bg-blue-200 py-10 font-kanit ">
                <Footer />
            </footer>
        </>
    );
}
