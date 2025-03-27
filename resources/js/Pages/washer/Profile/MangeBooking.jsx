import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react"; // Import usePage for flash messages
import WasherAuthentificatedLayout from "@/Layouts/WasherLayout";

export default function WasherBookings({ bookings }) {
    const [statusUpdates, setStatusUpdates] = useState({});
    const { flash } = usePage().props; // Access flash messages
    console.log(flash)
    // Handle status change
    const handleStatusChange = (bookingId, newStatus) => {
        setStatusUpdates((prev) => ({
            ...prev,
            [bookingId]: newStatus,
        }));
    };

    // Handle update button click
    const handleUpdateStatus = (bookingId) => {
        const newStatus = statusUpdates[bookingId];
        if (newStatus) {
            router.put(route('washer.updateBookingStatus', bookingId), {
                status: newStatus,
            });
        }
    };

    // Get background color based on status
    const getStatusBackgroundColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100"; // Yellow for pending
            case "confirmed":
                return "bg-blue-100"; // Blue for confirmed
            case "processing":
                return "bg-purple-100"; // Purple for processing
            case "completed":
                return "bg-green-100"; // Green for completed
            case "canceled":
                return "bg-red-100"; // Red for canceled
            default:
                return "bg-gray-100"; // Default gray
        }
    };

    return (
        <WasherAuthentificatedLayout>
            <Head title="Washer Bookings" />
            <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>

            {/* Flash Messages */}
            {flash.success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {flash.error}
                </div>
            )}

            {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Car
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Customer Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Total Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Services
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <tr key={booking.id_booking}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {booking.car}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {booking.user_name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {booking.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            ${booking.total_price}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={statusUpdates[booking.id_booking] || booking.status}
                                            onChange={(e) => handleStatusChange(booking.id_booking, e.target.value)}
                                            className={`block w-full pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${getStatusBackgroundColor(
                                                statusUpdates[booking.id_booking] || booking.status
                                            )}`}
                                            style={{ minWidth: "120px" }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                            <option value="canceled">Canceled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <ul className="list-disc list-inside">
                                            {booking.services.map((service) => (
                                                <li key={service.id} className="text-sm text-gray-900">
                                                    {service.name} - ${service.price}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleUpdateStatus(booking.id_booking)}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600">No bookings assigned to you.</p>
            )}
        </WasherAuthentificatedLayout>
    );
}