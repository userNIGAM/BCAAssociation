/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroImg from "/association-hero.png";

export default function Hero() {
  const heroRef = useRef(null);

  // NEW
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const section = heroRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.6, // hero must be at least 60% visible
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleScrollDown = () => {
    if (heroRef.current) {
      const scrollToY =
        heroRef.current.offsetTop + heroRef.current.clientHeight;

      window.scrollTo({
        top: scrollToY,
        behavior: "smooth",
      });
    } else {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };
  // Magnetic hover effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 120,
    damping: 14,
  });

  const smoothY = useSpring(y, {
    stiffness: 120,
    damping: 14,
  });

  // Mouse movement handler
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // Small movement amount
    x.set(mouseX * 0.05);
    y.set(mouseY * 0.05);
  };

  // Reset position
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      ref={heroRef}
      className="
        relative
        w-full
        min-h-[90svh]
        md:min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        px-4
        sm:px-6
        md:px-10
        lg:px-16
        py-10
        md:py-16
        bg-linear-to-br
        from-white
        via-blue-50/80
        to-indigo-50/40
      "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* your background divs */}
      </div>

      <div
        className="
          max-w-7xl
          w-full
          flex
          flex-col-reverse
          md:flex-row
          items-center
          justify-between
          gap-10
          lg:gap-16
          relative
          z-10
        "
      >
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            w-full
            md:w-1/2
            text-center
            md:text-left
            space-y-5
            md:space-y-6
          "
        >
          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              xl:text-7xl
              font-bold
              leading-tight
              tracking-tight
              bg-linear-to-r
              from-blue-700
              via-blue-800
              to-indigo-700
              bg-clip-text
              text-transparent
            "
          >
            BCA Association
          </h1>

          <p
            className="
              text-base
              sm:text-lg
              text-gray-700
              max-w-xl
              mx-auto
              md:mx-0
              leading-relaxed
            "
          >
            Empowering students through innovation, learning, and collaboration.
          </p>

          <div className="flex justify-center md:justify-start pt-2">
            <button
              type="button"
              className="
                group
                px-6
                py-3
                bg-linear-to-r
                from-blue-600
                to-indigo-600
                text-white
                text-sm
                sm:text-base
                font-medium
                rounded-2xl
                transition-all
                duration-300
                shadow-lg
                hover:shadow-2xl
                hover:scale-105
                hover:from-blue-700
                hover:to-indigo-700
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
              "
            >
              Explore More
            </button>
          </div>
        </motion.div>
        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
    w-full
    md:w-1/2
    flex
    justify-center
    items-center
  "
        >
          <motion.img
            src={heroImg}
            alt="BCA Association - Students collaborating and innovating"
            loading="eager"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              x: smoothX,
              y: smoothY,
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              scale: {
                duration: 0.3,
              },
              type: "spring",
              stiffness: 120,
              damping: 14,
            }}
            className="
      w-full
      max-w-55
      sm:max-w-[320px]
      md:max-w-105
      lg:max-w-125
      xl:max-w-145
      h-auto
      object-contain
      drop-shadow-2xl
      cursor-pointer
      will-change-transform
      select-none
    "
          />
        </motion.div>
      </div>

      {/* Scroll Down Button */}
      {isHeroVisible && (
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll down to next section"
          className="
            absolute
            bottom-3
            md:bottom-6
            left-1/2
            -translate-x-1/2
            z-20
            group
            hidden
            sm:flex
            items-center
            justify-center
            rounded-full
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
          "
        >
          <div
            className="
              bg-white/40
              backdrop-blur-md
              rounded-full
              p-2
              transition-all
              duration-300
              group-hover:bg-white/60
              group-hover:scale-110
            "
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="
                  w-5
                  h-5
                  text-blue-600
                  group-hover:text-indigo-600
                  transition-colors
                "
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
        </button>
      )}
    </section>
  );
}
