import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';

export default function Services() {
    const {translations} = usePage().props;
    const t = translations.messages;
    
    
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
                        {t.tS1}
                    </motion.h2>
                    <motion.h1
                        className="lg:text-7xl text-4xl md:text-5xl font-bold tracking-tight text-blue-600 text-center"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t.tS2}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-900">
                           {t.tS3}
                        </span>
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-md text-white-600 max-w-lg text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                       {t.sDtext}
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
                                {t.ServiceTitle1}
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                {t.service1Text}
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
                                {t.ServiceTitle2}
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                {t.service2Text}
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
                                {t.ServiceTitle3}
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                {t.service3Text}
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
                               {t.ServiceTitle4}
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                               {t.service4Text}
                            </dd>
                        </motion.div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
