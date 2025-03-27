import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div
            className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/backgroundContact.png')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-blue-200 opacity-50"></div>

            {/* Form Container */}
            <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <Head title="Confirm Password" />

                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Confirm Password
                </h2>

                <p className="mt-2 text-sm text-gray-600 text-center">
                    This is a secure area of the application. Please confirm
                    your password before continuing.
                </p>

                <form onSubmit={submit} className="mt-4">
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("password", e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                        <PrimaryButton className="w-full py-2" disabled={processing}>
                            Confirm
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
