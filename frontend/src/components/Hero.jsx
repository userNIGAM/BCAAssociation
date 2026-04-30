/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import heroImg from "/association-hero.png";

export default function Hero() {
  return (
    <section className="w-full min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-12 bg-linear-to-b from-white to-blue-50/30">
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-12 xl:gap-16">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 text-center md:text-left space-y-4 sm:space-y-5 md:space-y-6"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-blue-700 tracking-tight">
            BCA Association
          </h1>

          <p className="text-sm xs:text-base sm:text-lg text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Empowering students through innovation, learning, and collaboration.
          </p>

          <div className="flex justify-center md:justify-start pt-2">
            <button className="group px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Explore More
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <img
            src={heroImg}
            alt="BCA Association - Students collaborating and innovating"
            className="w-auto max-w-55 xs:max-w-[260px] sm:max-w-[320px] md:max-w-90 lg:max-w-105 xl:max-w-120 h-auto object-contain drop-shadow-xl transition-all duration-500 hover:scale-105"
            loading="eager"
          />

          {/* Scrool down indicatior */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
            {/* Down Arrow */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              className="mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
