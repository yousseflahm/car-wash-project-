import React, { useState } from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminLayout";
import { useForm, usePage, router } from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import { FaTrash } from "react-icons/fa";

export default function Services({ services }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        price: "",
    });

    const {translations} = usePage().props;
    const t = translations.messages

    // Get flash messages from the page props
    const { flash } = usePage().props;

    // State for the confirmation modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.storeService"), {
            onSuccess: () => {
                // Clear the form fields after successful submission
                setData("name", "");
                setData("description", "");
                setData("price", "");
            },
        });
    };

    const handleDeleteClick = (id) => {
        setSelectedServiceId(id); // Set the service ID to delete
        setIsModalOpen(true); // Open the confirmation modal
    };

    const handleDeleteConfirm = () => {
        if (selectedServiceId) {
            router.delete(route("admin.deleteService", selectedServiceId)); // Delete the service
        }
        setIsModalOpen(false); // Close the modal
        setSelectedServiceId(null); // Reset the selected service ID
    };

    const handleDeleteCancel = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedServiceId(null); // Reset the selected service ID
    };

    return (
        <AdminAuthenticatedLayout>
            <h1 className="text-2xl font-bold mb-6">{t.services}</h1>

            {/* Flash Messages */}
            {flash.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {flash.error}
                </div>
            )}

            {/* Add New Service Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col gap-4 md:flex-row">
                    {/* Service Name */}
                    <div className="flex-1">
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder={t.ServiceName}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Service Description */}
                    <div className="flex-1">
                        <input
                            type="text"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder={t.ServiceDescription}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    {/* Service Price */}
                    <div className="flex-1">
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            placeholder={t.ServicePrice}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            {processing ? t.Adding : t.AddService}
                        </button>
                    </div>
                </div>
            </form>

            {/* Display Existing Services */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.length > 0 ? (
                    services.map((service) => (
                        <div
                            key={service.id_service}
                            className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-center"
                        >
                            <div>
                                <p className="text-lg font-semibold mb-2">
                                    <strong>{t.name}</strong> {service.name}
                                </p>
                                <p className="mb-2">
                                    <strong>{t.Description}:</strong> {service.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>{t.Price}:</strong> ${service.price}
                                </p>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDeleteClick(service.id_service)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No services found.</p>
                )}
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete Service"
                message="Are you sure you want to delete this service? This action cannot be undone."
            />
        </AdminAuthenticatedLayout>
    );
}