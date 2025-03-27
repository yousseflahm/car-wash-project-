import { motion } from 'framer-motion';

export default function Services() {
    return (
        <div className="bg-blue-100 py-12 overflow-x-hidden">
            <div className="mx-auto max-w-7xl pl-2 lg:px-8">
                <div className="mx-auto max-w-5xl lg:text-center flex flex-col justify-center items-center">
                    <motion.h2
                        className="text-base font-semibold leading-7 text-blue-400 bg-white px-4 py-2 rounded-full uppercase mb-4 lg:mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Car Wash Services
                    </motion.h2>
                    <motion.h1
                        className="lg:text-7xl text-4xl md:text-5xl font-bold tracking-tight text-blue-600 text-center"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Premium
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-900">
                            Car Care Services
                        </span>
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-md text-white-600 max-w-lg text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Experience the best car wash services with a range of
                        options designed to keep your car sparkling clean,
                        inside and out.
                    </motion.p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        <motion.div
                            className="relative pl-16"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                                    <img
                                        src="exteriorwash.png"
                                        alt="Exterior Hand Wash"
                                        className="h-6 w-6 text-white"
                                    />
                                </div>
                                Exterior Hand Wash
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                Our exterior hand wash service ensures your car
                                gets the best treatment, removing dirt, grime,
                                and stains, leaving a shiny, clean surface.
                            </dd>
                        </motion.div>

                        <motion.div
                            className="relative pl-16"
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                                    <img
                                        src="exteriorwash.png" // Repeated image source
                                        alt="Interior Cleaning"
                                        className="h-6 w-6 text-white"
                                    />
                                </div>
                                Interior Cleaning
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                We clean the interior of your vehicle, vacuuming
                                carpets and upholstery, wiping down surfaces,
                                and leaving your car fresh and spotless.
                            </dd>
                        </motion.div>

                        <motion.div
                            className="relative pl-16"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                                    <img
                                        src="exteriorwash.png" // Repeated image source
                                        alt="Wax & Polish"
                                        className="h-6 w-6 text-white"
                                    />
                                </div>
                                Wax & Polish
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                Our wax and polish service provides a protective
                                layer that enhances the car’s shine, preserving
                                its paint and keeping it looking brand new.
                            </dd>
                        </motion.div>

                        <motion.div
                            className="relative pl-16"
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                                    <img
                                        src="exteriorwash.png" // Repeated image source
                                        alt="Engine Bay Cleaning"
                                        className="h-6 w-6 text-white"
                                    />
                                </div>
                                Engine Bay Cleaning
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                Keep your engine running smoothly with our
                                engine bay cleaning service, designed to remove
                                dirt, oil, and debris from your engine
                                components.
                            </dd>
                        </motion.div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
