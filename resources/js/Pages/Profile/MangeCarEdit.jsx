import ClientAthentificatedLayout from '@/Layouts/ClientLayout';
import { useForm, Head , usePage } from '@inertiajs/react';

export default function MangeCarEdit({ auth, car }) {
    const { data, setData, put, processing, errors } = useForm({
        brand: car.brand,
        model: car.model,
    });

    // Get translations from the page props
    const { translations } = usePage().props;
    const t = translations.messages;

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('MangeCar.update', car.id));
    };

    return (
        <ClientAthentificatedLayout user={auth.user}>
            <Head title="Edit Car" />
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">{t.editCar}</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Brand Input */}
                        <div className="mb-6">
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                                {t.brand}
                            </label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                value={data.brand}
                                onChange={(e) => setData('brand', e.target.value)}
                                className={`w-full px-4 py-2 border ${
                                    errors.brand ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200`}
                                placeholder="Enter car brand"
                            />
                            {errors.brand && (
                                <p className="text-red-500 text-sm mt-2">{errors.brand}</p>
                            )}
                        </div>

                        {/* Model Input */}
                        <div className="mb-6">
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                                {t.model}
                            </label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={data.model}
                                onChange={(e) => setData('model', e.target.value)}
                                className={`w-full px-4 py-2 border ${
                                    errors.model ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200`}
                                placeholder="Enter car model"
                            />
                            {errors.model && (
                                <p className="text-red-500 text-sm mt-2">{errors.model}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-4">
                            <a
                                href={route('MangeCar')} // Replace with your route for the car list
                                className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
                            >
                                {t.cancel}
                            </a>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                            >
                                {processing ? t.updating : t.update}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ClientAthentificatedLayout>
    );
}