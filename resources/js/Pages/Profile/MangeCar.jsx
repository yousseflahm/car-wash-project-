import ClientAthentificatedLayout from "@/Layouts/ClientLayout";
import { useForm, usePage, Link } from "@inertiajs/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ConfirmationModal from "@/Components/ConfirmationModal"; // Import the modal

export default function MangeCar({ auth, cars }) {
    const userId = auth.user.id;
    const {
        data,
        setData,
        post,
        processing,
        errors,
        delete: destroy,
    } = useForm({
        user_id: userId,
        brand: "",
        model: "",
    });
    // Get translations from the page props
    const { translations } = usePage().props;
    const t = translations.messages;

    // Access flash messages from the server
    const { flash } = usePage().props;

    // State for delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("MangeCar.store"));
    };

    const handleDelete = (id) => {
        setCarToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (carToDelete) {
            destroy(route("MangeCar.destroy", carToDelete));
        }
        setIsDeleteModalOpen(false);
        setCarToDelete(null);
    };

    return (
        <ClientAthentificatedLayout>
            <div>
                {/* Flash Messages */}
                {flash.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {flash.error}
                    </div>
                )}

                <div className="flex">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col md:flex-row gap-4 md:gap-8 bg-white px-6 py-6 w-full shadow-sm rounded-lg"
                    >
                        {/* Brand Input */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                            <label
                                htmlFor="brand"
                                className="text-gray-700 font-medium mb-1"
                            >
                                {t.brand}
                            </label>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    value={data.brand}
                                    onChange={(e) =>
                                        setData("brand", e.target.value)
                                    }
                                    className={`border ${
                                        errors.brand
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                />
                                {errors.brand && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.brand}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Model Input */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                            <label
                                htmlFor="model"
                                className="text-gray-700 font-medium mb-1"
                            >
                                {t.model}
                            </label>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={data.model}
                                    onChange={(e) =>
                                        setData("model", e.target.value)
                                    }
                                    className={`border ${
                                        errors.model
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none min-w-[150px]`}
                                />
                                {errors.model && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.model}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-300 px-4 py-2 rounded-lg text-white hover:bg-blue-900 focus:outline-none w-fit focus:ring-2 focus:ring-blue-500 mt-4 md:mt-0"
                        >
                            {processing ? t.submitting : t.submit}
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="mt-8">
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t.brand}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t.model}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t.action}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {cars.map((car) => (
                                    <tr key={car.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {car.brand}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {car.model}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                                            {/* Edit Button */}
                                            <Link
                                                href={route(
                                                    "MangeCar.edit",
                                                    car.id
                                                )}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </Link>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() =>
                                                    handleDelete(car.id)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Table (Cards) */}
                    <div className="md:hidden">
                        {cars.map((car) => (
                            <div
                                key={car.id}
                                className="bg-white shadow-sm rounded-lg p-4 mb-4"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {car.brand}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {car.model}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        {/* Edit Button */}
                                        <Link
                                            href={route(
                                                "MangeCar.edit",
                                                car.id
                                            )}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </Link>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(car.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Confirmation Modal */}
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="Delete Car"
                    message="Are you sure you want to delete this car? This action cannot be undone."
                />
            </div>
        </ClientAthentificatedLayout>
    );
}