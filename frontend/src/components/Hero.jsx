/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import associationImage from "/association-hero.png"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16">

      {/* LEFT SIDE (TEXT) */}
      <motion.div
        className="w-full md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }} // 👈 important for re-animation
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700">
          BCA Association
        </h1>

        <p className="text-lg md:text-xl text-gray-600 prata-regular">
          Empowering students through innovation, learning, and collaboration.
        </p>

        <button className=" prata-regular px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Explore More
        </button>
      </motion.div>

      {/* RIGHT SIDE (IMAGE) */}
      <motion.div
        className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <img
          src={associationImage} // 👈 put image in public folder
          alt="BCA Association"
          className="w-full max-w-md md:max-w-lg"
        />
      </motion.div>

    </section>
  );
}