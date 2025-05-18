import React, { useState } from 'react';
import { useForm , usePage } from '@inertiajs/react';
import ClientAthentificatedLayout from "@/Layouts/ClientLayout";
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from '@/Components/ConfirmationModal';

export default function Booking({ cars, services, bookings }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        car_id: '',
        service_ids: [],
        date: new Date().toISOString().split('T')[0],
        total_price: 0,
    });
    // Get translations from the page props
     const { translations } = usePage().props;
     const t = translations.messages;
     console.log(t);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('BookingPage.store'));
    };

    const handleServiceChange = (serviceId) => {
        const updatedServiceIds = data.service_ids.includes(serviceId)
            ? data.service_ids.filter(id => id !== serviceId)
            : [...data.service_ids, serviceId];
        setData('service_ids', updatedServiceIds);

        const selectedServices = services.filter(service => updatedServiceIds.includes(service.id_service));
        const total = selectedServices.reduce((acc, service) => {
            const price = parseFloat(service.price) || 0;
            return acc + price;
        }, 0);
        setTotalPrice(total);
        setData('total_price', total);
    };

    const handleDeleteBooking = (bookingId) => {
        destroy(route('BookingPage.destroy', bookingId), {
            onSuccess: () => {
                setIsModalOpen(false);
                setBookingToDelete(null);
            },
        });
    };

    const openDeleteModal = (bookingId) => {
        setBookingToDelete(bookingId);
        setIsModalOpen(true);
    };

    return (
        <ClientAthentificatedLayout>
            <div className="">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-center mb-8">{t.reservationPage}</h1>

                    {/* Booking Form */}
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            {/* Car Selection */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectCar}</label>
                                <select
                                    value={data.car_id}
                                    onChange={(e) => setData('car_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="">{t.selectAcar}</option>
                                    {cars.map(car => (
                                        <option key={car.id} value={car.id}>
                                            {car.brand} {car.model}
                                        </option>
                                    ))}
                                </select>
                                {errors.car_id && <p className="text-red-500 text-sm mt-1">{errors.car_id}</p>}
                            </div>

                            {/* Service Selection */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectService}</label>
                                <div className="space-y-2">
                                    {services.map(service => {
                                        const price = parseFloat(service.price) || 0;
                                        return (
                                            <div key={service.id_service} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={service.id}
                                                    checked={data.service_ids.includes(service.id_service)}
                                                    onChange={() => handleServiceChange(service.id_service)}
                                                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all"
                                                />
                                                <label className="ml-3 text-sm text-gray-700">
                                                    {service.name} - ${price.toFixed(2)}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                {errors.service_ids && <p className="text-red-500 text-sm mt-1">{errors.service_ids}</p>}
                            </div>
                        </div>

                        {/* Total Price */}
                        <div className="mt-6">
                            <strong className="block text-lg font-semibold text-gray-700">
                                {t.totalPrice} ${totalPrice.toFixed(2)}
                            </strong>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                            >
                                {processing ? t.reservering : t.reserver}
                            </button>
                        </div>
                    </form>

                    {/* Bookings Table */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">{t.booking}</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.id}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.carName}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.washerName}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.date}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.totalPrice}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.services}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.action}</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map(booking => (
                                        <tr key={booking.id_booking}>
                                            <td className="px-6 py-4 whitespace-nowrap">{booking.id_booking}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{booking.car}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{booking.washer_name || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${parseFloat(booking.total_price).toFixed(0)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <ul className="list-disc list-inside">
                                                    {booking.services.map(service => (
                                                        <li key={service.name}>{service.name} - ${service.price}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => openDeleteModal(booking.id_booking)}
                                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                                >
                                                    <FaTrash className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => handleDeleteBooking(bookingToDelete)}
                title="Delete Booking"
                message="Are you sure you want to delete this booking? This action cannot be undone."
            />
        </ClientAthentificatedLayout>
    );
}