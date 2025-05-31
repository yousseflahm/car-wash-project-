import { motion } from "framer-motion";
import { usePage } from "@inertiajs/react";

export default function HeroSectionWasher() {
  const { translations } = usePage().props;
  const t = translations.messages;

  return (
    <div className="h-[calc(100vh)] bg-[url('/washerAccPic/pc1.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="h-full w-full bg-blue-400 bg-opacity-50 flex items-center justify-end">
        <div className="text-left max-w-2xl px-8 mt-20 pb-16">
      
          <motion.h1
            className="text-white text-3xl md:text-4xl font-bold font-kanit mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {t.heroTitle}
          </motion.h1>

         
          <motion.p
            className="text-white text-lg md:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {t.heroDescription}
          </motion.p>

         
          <motion.a
            href={route("washer.register")}
            className="inline-block px-8 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full text-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.heroButton}
          </motion.a>
        </div>
      </div>
    </div>
  );
}