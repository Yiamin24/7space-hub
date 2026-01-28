import { motion } from 'framer-motion';

export default function MaskedHeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
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
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative text-center"
        >
          {/* Main text with image mask effect */}
          <div
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[220px] font-heading font-bold text-center leading-none tracking-tighter"
            style={{
              backgroundImage: 'url(https://static.wixstatic.com/media/cef78c_f6fc7a3d96ae4a5ebf0e0fb5337949f0~mv2.png?originWidth=1920&originHeight=1024)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.5))',
            }}
          >
            7 Doors
          </div>

          {/* Animated accent line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent mt-6 md:mt-10 origin-center max-w-xs mx-auto"
          />

          {/* Subtitle with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6 md:mt-10"
          >
            <p className="text-white text-center text-base md:text-lg lg:text-2xl font-paragraph tracking-wide font-medium">
              Premium Commercial Spaces Across Pune
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8 md:mt-12"
          >
            <a
              href="#properties"
              className="inline-block px-8 py-3 md:px-10 md:py-4 bg-white/10 backdrop-blur-md text-white font-paragraph font-semibold rounded-lg border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-sm md:text-base"
            >
              Explore Properties
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with enhanced animation */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-white/70 text-xs md:text-sm font-paragraph tracking-widest uppercase">Scroll</span>
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white/70 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
