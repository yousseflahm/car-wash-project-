import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { usePage } from "@inertiajs/react";

export default function Footer() {
    const { translations } = usePage().props;
    const t = translations.messages
    return (
      
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <ApplicationLogo className="h-12 w-auto" />
                        <span className="text-xl font-semibold text-blue-800">{t.ft1}</span>
                    </div>

                    {/* Footer Links */}
                    <div className="flex space-x-6 mt-6 md:mt-0">
                        <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-900 transition duration-300">
                            {t.PrivacyPolicy}
                        </Link>
                        <Link href="/terms-of-service" className="text-gray-600 hover:text-blue-900 transition duration-300">
                          {t.TermsOfService}
                        </Link>
                        <Link href="/refund-policy" className="text-gray-600 hover:text-blue-900 transition duration-300">
                            {t.RefundPolicy}
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center border-t border-blue-400 pt-4 text-blue-800 text-sm">
                    &copy; {new Date().getFullYear()}{t.cr}
                </div>
            </div>
     
    );
}
