import { motion } from "framer-motion";
import { usePage } from "@inertiajs/react";

export default function HeroSection() {
  const{translations} = usePage().props;
  const t  = translations.messages;
  // console.log(t);
 
  return (
    <div className="h-[calc(100vh)] bg-[url('/background.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="h-full w-full bg-blue-400 bg-opacity-50 flex items-center justify-center">
        <div className="text-center max-w-3xl px-4">
         
          <motion.h1
            className="text-white text-4xl font-bold font-kanit pt-20"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 , ease: "easeOut" }}
          >
            {t.welcome}
          </motion.h1>

         
          <motion.p
            className="text-white text-lg mt-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 , delay: 0.3, ease: "easeOut" }}
          >
              {t.welcomeText}
          </motion.p>

        
          <motion.a
            href={route("register")}
            className="inline-block mt-8 px-6 py-2 text-white bg-blue-400 hover:bg-blue-600 rounded-full text-lg font-semibold transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {t.buttonText}
          </motion.a>
        </div>
      </div>
    </div>
  );
}
