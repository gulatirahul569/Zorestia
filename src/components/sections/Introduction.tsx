import { motion } from 'framer-motion';
import { RevealText } from '@/components/ui/Reveal';
import { PrimaryButton } from '@/components/ui/Button';

export function Introduction() {
  return (
    <section id="about" className="relative overflow-hidden bg-obsidian py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10">
        {/* Left — text */}
        <div>
          <RevealText>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
              About Zorestia
            </span>
          </RevealText>

          <RevealText delay={0.1}>
            <h2 className="mt-6 text-3xl font-serif leading-[1.15] text-white sm:text-4xl md:text-[2.75rem]">
              We turn ambition into achievement.
            </h2>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-light-gray">
              Zorestia is a global advisory and investment firm dedicated to
              creating long-term value. We combine deep market expertise with
              innovative thinking to deliver exceptional outcomes for our
              clients.
            </p>
          </RevealText>

          <RevealText delay={0.3}>
            <div className="mt-8">
              <PrimaryButton href="#services" variant="flat">Learn More</PrimaryButton>
            </div>
          </RevealText>
        </div>

        {/* Right — office photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:aspect-[3/4]"
        >
          <img
            src="/about-office.jpg"
            alt="Zorestia office"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}