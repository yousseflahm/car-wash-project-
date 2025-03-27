import NavBarAccueilWasher from "@/Components/NavBarAccueilWasher";
import ApplicationLogo from "@/Components/ApplicationLogo";
import HeroSectionWasher from "@/Components/HeroSectionWasher";
import AboutUsWasher from "@/Components/AboutWasher";
import ContactUs from "@/Components/Contact";
import Footer from "@/Components/Footer";  
import WorkInfoSection from "@/Components/WorkInfo"; 

export default function WasherAccueil() {
    return (
        <>
            <header className="fixed  mt-3 top-0 left-0 w-full  rounded-full bg-white shadow-md z-50 mx-auto">
                <div className=" mx-auto  flex items-center  ">
                    <div className="pl-6">
                        <ApplicationLogo />
                    </div>
                    <div className="px-4 w-full">
                        <NavBarAccueilWasher />
                    </div>
                </div>
            </header>
            <section id="home">
                <HeroSectionWasher />
            </section>
            <section id="workInfo">
                <WorkInfoSection />
            </section>
            <section id="about">
                <AboutUsWasher />
            </section>
            <section id="contact" className="bg-blue-200">
                <ContactUs />
            </section>
            <footer className="bg-blue-200 py-10 font-kanit ">
                <Footer />
            </footer>
        </>
    );
}
