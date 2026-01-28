import { motion } from 'framer-motion';

export default function MaskedHeroSection() {
  return (
    <section className="relative w-full min-h-screen md:h-screen overflow-hidden bg-black flex items-center justify-center\">
      {/* Full-screen background image with parallax effect */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          backgroundImage: 'url(https://static.wixstatic.com/media/cef78c_c86cca07170f4079baca8c3abc2847c9~mv2.png?originWidth=1920&originHeight=1024)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlay for depth and text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

      {/* Text mask effect container */}
      <div className="relative z-10 flex items-center justify-center px-3 sm:px-4 py-16 sm:py-20 md:py-0 w-full max-w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative text-center max-w-full w-full"
        >
          {/* Main text with image mask effect */}
          <div
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold text-center leading-none tracking-tighter break-words"
            style={{
              backgroundImage: 'url(https://static.wixstatic.com/media/cef78c_f6fc7a3d96ae4a5ebf0e0fb5337949f0~mv2.png?originWidth=1920&originHeight=1024)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.5))',
              opacity: 1,
              wordBreak: 'break-word',
            }}
          >
            7 Doors
          </div>

          {/* Subtitle with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-3 sm:mt-6 md:mt-10"
          >
            <p className="text-white text-center text-xs sm:text-sm md:text-lg lg:text-2xl font-paragraph tracking-wide font-medium px-2 break-words">
              Premium Commercial Spaces Across Pune
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-4 sm:mt-8 md:mt-12"
          >
            <a
              href="#properties"
              className="inline-block px-4 sm:px-8 py-2 sm:py-3 md:px-10 md:py-4 bg-white/10 backdrop-blur-md text-white font-paragraph font-semibold rounded-lg border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              Explore Properties
            </a>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
}
