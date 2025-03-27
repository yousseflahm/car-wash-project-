import AdminAuthenticatedLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function AllBooking({ bookings, washers }) {
    const [selectedWasher, setSelectedWasher] = useState({});

    const handleWasherChange = (bookingId, washerId) => {
        setSelectedWasher((prev) => ({
            ...prev,
            [bookingId]: washerId,
        }));
    };

    const handleAssignWasher = (bookingId) => {
        const washerId = selectedWasher[bookingId];
        if (washerId) {
            router.put(`/admin/bookings/${bookingId}/assign-washer`, { washer_id: washerId });
        } else {
            alert('Please select a washer before assigning.');
        }
    };

    return (
        <AdminAuthenticatedLayout>
            <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                ID
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                User
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                Car
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                Washer
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                Date
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                Total Price
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                Services
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                Status
                            </th>
                            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id_booking} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {booking.id_booking}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {booking.user}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {booking.car}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    <select
                                        value={selectedWasher[booking.id_booking] || booking.washer_id || ''}
                                        onChange={(e) => handleWasherChange(booking.id_booking, e.target.value)}
                                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Washer</option>
                                        {washers.map((washer) => (
                                            <option key={washer.id} value={washer.id}>
                                                {washer.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {new Date(booking.date).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    ${booking.total_price}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    <ul>
                                        {booking.services.map((service) => (
                                            <li key={service.id}>
                                                {service.name} (${service.price})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    <span
                                        className={`px-2 py-1 rounded ${
                                            booking.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : booking.status === 'confirmed'
                                                ? 'bg-green-100 text-green-800'
                                                : booking.status === 'processing'
                                                ? 'bg-blue-100 text-blue-800'
                                                : booking.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    <button
                                        onClick={() => handleAssignWasher(booking.id_booking)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Assign
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminAuthenticatedLayout>
    );
}