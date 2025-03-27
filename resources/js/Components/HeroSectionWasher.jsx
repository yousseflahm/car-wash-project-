import { motion } from "framer-motion";

export default function HeroSectionWasher() {
  return (
    <div className="h-[calc(100vh)] bg-[url('/washerAccPic/pc1.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="h-full w-full bg-blue-400 bg-opacity-50 flex items-center justify-end">
        <div className="text-left max-w-2xl px-8 mt-20 pb-16">
          {/* Compact and Worker-Focused Title */}
          <motion.h1
            className="text-white text-3xl md:text-4xl font-bold font-kanit mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Join Our Team of Car Care Experts!
          </motion.h1>

          {/* Worker-Focused Description */}
          <motion.p
            className="text-white text-lg md:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Become part of a professional team that delivers top-notch car cleaning services. Enjoy flexible hours, competitive pay, and the opportunity to work with a company that values your skills and dedication. Start your journey with us today!
          </motion.p>

          {/* Call-to-Action Button for Workers */}
          <motion.a
            href={route("washer.register")}
            className="inline-block px-8 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full text-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.a>
        </div>
      </div>
    </div>
  );
}