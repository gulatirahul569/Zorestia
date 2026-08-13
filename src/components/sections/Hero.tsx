import { motion } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-skyline.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/90" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-obsidian/70 via-transparent to-obsidian/40" />
      <div className="pointer-events-none absolute inset-0 z-10 grid-bg opacity-30 radial-fade" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24 pb-16 lg:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-gradient-to-r from-gold/60 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/90">
            Zorestia
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-light-gray">
            Global Business &amp; Technology
          </span>
        </motion.div>

        {/* Headline line 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.6, ease }}
          className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Powering Global
          <br />
          Business Growth
        </motion.h1>

        {/* Headline line 2 */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.9, ease }}
          className="mt-2 max-w-4xl text-2xl font-medium leading-[1.2] tracking-tight text-gradient-blue sm:text-3xl md:text-4xl lg:text-[2.75rem]"
        >
          Through AI, Technology &amp; Strategic Services
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-light-gray sm:text-lg"
        >
          We help ambitious businesses build smarter systems, acquire customers, enter
          new markets and scale through technology, AI and strategic execution.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <PrimaryButton href="#contact">Start a Conversation</PrimaryButton>
          <SecondaryButton href="#services">Explore Our Services</SecondaryButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-mid-gray">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-white/20 to-transparent">
            <motion.div
              className="h-4 w-px bg-azure"
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}