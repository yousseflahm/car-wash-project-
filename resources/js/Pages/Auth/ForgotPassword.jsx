import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/backgroundContact.png')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-blue-300  bg-opacity-75"></div>

            <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <Head title="Forgot Password" />

                <h2 className="text-2xl font-semibold text-gray-800 text-center">Forgot Password</h2>

                <p className="mt-2 text-sm text-gray-600 text-center">
                    Forgot your password? No problem. Just enter your email address, and we’ll send you a reset link.
                </p>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-4">
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 px-6 py-4 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                        <PrimaryButton className="w-full bg-blue-600 px-6 py-4 " disabled={processing}>
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
