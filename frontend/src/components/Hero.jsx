/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import heroImg from '/association-hero.png';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 pt-20">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700">BCA Association</h1>
        <p className="text-lg md:text-xl text-gray-600">Empowering students through innovation, learning, and collaboration.</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Explore More</button>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/2 mt-10 md:mt-0">
        <img src={heroImg} alt="BCA Association" className="max-w-md mx-auto" />
      </motion.div>
    </section>
  );
}