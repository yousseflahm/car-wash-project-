import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="flex min-h-screen font-kanit">
            <Head title="Email Verification" />

            {/* Left Section: Image (Hidden on Small Screens) */}
            <div className="hidden lg:flex w-1/2 bg-[url('/backgroundContact.png')] bg-cover bg-center">
                <div className="h-full w-full bg-blue-400 bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl font-bold"
                    >
                        Almost There!
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mt-4 text-lg max-w-md"
                    >
                        Verify your email to unlock full access. We just sent you a link – check your inbox!
                    </motion.p>
                </div>
            </div>

            {/* Right Section: Verification Message */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-blue-100 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-md"
                >
                    <h2 className="text-3xl font-bold text-blue-600">
                        Verify Your Email
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Thanks for signing up! Please check your email and click the verification link to proceed. If you haven't received the email, you can request a new one.
                    </p>

                    {status === 'verification-link-sent' && (
                        <p className="mt-4 text-sm font-medium text-green-600">
                            A new verification link has been sent to your email.
                        </p>
                    )}

                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <PrimaryButton disabled={processing} className="w-full">
                            Resend Verification Email
                        </PrimaryButton>
                    </form>

                    <div className="mt-6">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Log Out
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
