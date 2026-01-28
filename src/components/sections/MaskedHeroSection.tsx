import { motion } from 'framer-motion';

export default function MaskedHeroSection() {
  return (
    <section className="relative w-full min-h-screen md:h-screen overflow-hidden bg-black flex items-center justify-center">
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
      <div className="relative z-10 flex items-center justify-center px-4 py-12 md:py-0 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative text-center max-w-full"
        >
          {/* Main text with image mask effect */}
          <div
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[220px] font-heading font-bold text-center leading-none tracking-tighter"
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
            className="h-1 md:h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent mt-4 sm:mt-6 md:mt-10 origin-center max-w-xs mx-auto"
          />

          {/* Subtitle with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-4 sm:mt-6 md:mt-10"
          >
            <p className="text-white text-center text-sm sm:text-base md:text-lg lg:text-2xl font-paragraph tracking-wide font-medium px-2">
              Premium Commercial Spaces Across Pune
            </p>
          </motion.div>

                    </svg>
        </div>
      </motion.div>
    </section>
  );
}
