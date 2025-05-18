import React from "react";
import { Head , usePage } from "@inertiajs/react";
import ClientAthentificatedLayout from "@/Layouts/ClientLayout";
import { FaFilePdf } from "react-icons/fa"; // PDF icon

export default function Documents({ bookingsCompleted }) {
    const calculateTotalPrice = (services) => {
        return services.reduce(
            (total, service) => total + parseFloat(service.price),
            0
        );
    };

    // Get translations from the page props
    const { translations } = usePage().props;
    const t = translations.messages;

    return (
        <ClientAthentificatedLayout>
            <Head title="Documents" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    {t.Invoice}
                </h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    {t.BookingID}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    {t.carName}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    {t.status}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    {t.services}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    {t.totalPrice}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    {t.generatePDF}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookingsCompleted.map((booking) => {
                                const totalPrice = calculateTotalPrice(
                                    booking.services
                                );
                                return (
                                    <tr key={booking.id}>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {booking.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {booking.car}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                                            <span className="px-2 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            <ul className="list-disc list-inside">
                                                {booking.services.map(
                                                    (service) => (
                                                        <li key={service.id}>
                                                            {service.name} - $
                                                            {service.price}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            ${totalPrice.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            <a
                                                className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
                                                href={route(
                                                    "generateInvoicePdf",
                                                    booking.id
                                                )}
                                            >
                                                <FaFilePdf className="w-5 h-5 mr-2" />
                                                {t.generatePDF}
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </ClientAthentificatedLayout>
    );
}
