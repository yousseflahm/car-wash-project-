
import { Head , usePage } from '@inertiajs/react';
import { useState } from 'react'; 
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AdminAuthentificatedLayout from '@/Layouts/AdminLayout';

export default function Edit({ mustVerifyEmail, status }) {
     // State to track the active tab
        const [activeTab, setActiveTab] = useState('info'); 
        const {translations} = usePage().props;
        const t = translations.messages
    return (
        <AdminAuthentificatedLayout>
            <Head title="Profile" />
            
                        <div className="py-12">
                            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                {/* Navigation Bar */}
                                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                    <nav className="flex space-x-4">
                                        <button
                                            onClick={() => setActiveTab('info')}
                                            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                                                activeTab === 'info'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                            } rounded-lg`}
                                        >
                                           {t.profileInfo}
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('password')}
                                            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                                                activeTab === 'password'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                            } rounded-lg`}
                                        >
                                            {t.passwordReset}
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('delete')}
                                            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                                                activeTab === 'delete'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                            } rounded-lg`}
                                        >
                                           {t.deleteAccount}
                                        </button>
                                    </nav>
                                </div>
            
                                {/* Conditionally Render Components */}
                                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                    {activeTab === 'info' && (
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                            className="max-w-xl"
                                        />
                                    )}
                                    {activeTab === 'password' && (
                                        <UpdatePasswordForm className="max-w-xl" />
                                    )}
                                    {activeTab === 'delete' && (
                                        <DeleteUserForm className="max-w-xl" />
                                    )}
                                </div>
                            </div>
                        </div>
        </AdminAuthentificatedLayout> 
    );
}
