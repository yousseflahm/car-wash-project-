import AdminAuthenticatedLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaTrash } from 'react-icons/fa'; 
import ConfirmationModal from "@/Components/ConfirmationModal"; // Adjust the import path as needed

export default function Washers({ washers }) {
    const [selectedStatus, setSelectedStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [washerToDelete, setWasherToDelete] = useState(null);
    const {translations} = usePage().props;
    const t = translations.messages

    // Map the washers data to include additional properties (e.g., CSS classes)
    const mappedWashers = washers.map((washer) => {
        const statusClass = {
            pending: "bg-blue-100 text-blue-800", // Blue for pending
            approved: "bg-green-100 text-green-800", // Green for approved
            rejected: "bg-red-100 text-red-800", // Red for rejected
        }[washer.status];

        return {
            ...washer,
            statusClass,
        };
    });

    const handleStatusChange = (id, status) => {
        setSelectedStatus((prev) => ({
            ...prev,
            [id]: status,
        }));
    };

    const confirmStatusUpdate = (id) => {
        const status = selectedStatus[id];
        if (status) {
            router.put(`/admin/washers/${id}/status`, { status });
        }
    };

    const openDeleteModal = (id) => {
        setWasherToDelete(id);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setWasherToDelete(null);
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (washerToDelete) {
            router.delete(`/admin/washers/${washerToDelete}`, {
                onSuccess: () => {
                    closeDeleteModal();
                },
            });
        }
    };

    const { flash } = usePage().props;

    const flashClass =
        flash.flashStatus === "rejected"
            ? "bg-red-100 border-l-4 border-red-500 text-red-700" // Red for rejected
            : flash.flashStatus === "approved"
            ? "bg-green-100 border-l-4 border-green-500 text-green-700" // Green for approved
            : "bg-blue-100 border-l-4 border-blue-500 text-blue-700"; // Blue for other cases (e.g., pending)

    return (
        <AdminAuthenticatedLayout>
            {flash.success && (
                <div className={`p-4 mb-4 ${flashClass}`}>{flash.success}</div>
            )}

            <h1 className="text-2xl font-bold mb-4">{t.washerName}</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                {t.id}
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                {t.name}
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                {t.registerLastName}
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                {t.registerPhone}
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                {t.address}
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                {t.email}
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                {t.status}
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                {t.action}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedWashers.map((washer) => (
                            <tr key={washer.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {washer.id}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {washer.name}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {washer.lastName}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {washer.phone}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {washer.address}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {washer.email}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    <select
                                        value={
                                            selectedStatus[washer.id] ||
                                            washer.status
                                        }
                                        onChange={(e) =>
                                            handleStatusChange(
                                                washer.id,
                                                e.target.value
                                            )
                                        }
                                        className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${washer.statusClass}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    <div className="flex items-center space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() =>
                                                confirmStatusUpdate(washer.id)
                                            }
                                            className={`bg-blue-500 text-white px-4 py-2 rounded ${
                                                selectedStatus[washer.id] ===
                                                    washer.status ||
                                                !selectedStatus[washer.id]
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : "hover:bg-blue-600"
                                            }`}
                                            disabled={
                                                selectedStatus[washer.id] ===
                                                    washer.status ||
                                                !selectedStatus[washer.id]
                                            }
                                        >
                                            Confirm
                                        </button>

                                        {/* Trash Icon */}
                                        <button
                                            onClick={() => openDeleteModal(washer.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Delete Washer"
                message="Are you sure you want to delete this washer? This action cannot be undone."
            />
        </AdminAuthenticatedLayout>
    );
}