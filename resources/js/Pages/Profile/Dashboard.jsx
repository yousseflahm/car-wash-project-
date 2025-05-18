import React, { useState } from "react";
import ClientAthentificatedLayout from "@/Layouts/ClientLayout";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Dashboard({ auth, bookings, services }) {
  const [selectedService, setSelectedService] = useState(null);
  const { translations } = usePage().props;
  const t = translations.messages;

 

  const carStatusImages = [
    {
      imageId: 1,
      imageSource: "/carStatus/pending.png",
      imageStatus: "pending",
    },
    {
      imageId: 2,
      imageSource: "/carStatus/confirmed.png",
      imageStatus: "confirmed",
    },
    {
      imageId: 3,
      imageSource: "/carStatus/processing.png",
      imageStatus: "processing",
    },
    {
      imageId: 4,
      imageSource: "/carStatus/completed.png",
      imageStatus: "completed",
    },
    {
      imageId: 5,
      imageSource: "/carStatus/canceled.png",
      imageStatus: "canceled",
    },
  ];

  const handleDetailsClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <ClientAthentificatedLayout>
      <div className="p-6">
       

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            {t.dashboardWelcome} {""},{" "}
            <span className="text-blue-300">{auth.user.name}</span>
          </h2>
          <p className="text-gray-600 mt-2">
            {t.dashboardSubtitle}
          </p>
        </motion.div>

        {/* Bookings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.yourBookings}</h2>
          {bookings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bookings.map((booking) => {
                const statusImage = carStatusImages.find(
                  (image) => image.imageStatus === booking.status
                );

                return (
                  <motion.div
                    key={booking.id_booking}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center">
                          {statusImage && (
                            <img
                              src={statusImage.imageSource}
                              alt="status"
                              className="h-12 w-12 mr-4"
                            />
                          )}
                          <div>
                            <CardTitle className="text-xl font-semibold text-gray-800">
                              {booking.car}
                            </CardTitle>
                            <CardDescription className="text-gray-600 capitalize">
                              {t.status}: {booking.status}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          {t.services}:
                        </h4>
                        <div className="space-y-2">
                          {booking.services.map((service) => (
                            <motion.div
                              key={service.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card className="bg-gray-50 rounded-lg p-4">
                                <CardTitle className="text-md font-semibold text-gray-800">
                                  {service.name}
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                  {service.description}
                                </CardDescription>
                                <p className="text-gray-800 font-bold">
                                  ${service.price}
                                </p>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center">
                <CardContent>
                  <p className="text-gray-600 mt-5 text-lg">
                    {t.noBookings}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Add Car and Book Now Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <Link
              className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              href={route("MangeCar")}
            >
              {t.addCar}
            </Link>
            <Link
              className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300"
              href={route("BookingPage")}
            >
              {t.bookNow}
            </Link>
          </motion.div>
        </motion.div>

        {/* All Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.allServices}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold text-gray-800">
                      ${service.price}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <button
                      className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      onClick={() => handleDetailsClick(service)}
                    >
                      {t.details}
                    </button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modal for Service Details */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {selectedService.name}
                </h3>
                <p className="text-gray-600 mb-4">{selectedService.description}</p>
                <p className="text-lg font-bold text-gray-800 mb-4">
                  {t.price}: ${selectedService.price}
                </p>
                <button
                  className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  onClick={closeModal}
                >
                  {t.close}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClientAthentificatedLayout>
  );
}