import { motion } from 'framer-motion';
import { RevealText } from '@/components/ui/Reveal';
import { SecondaryButton } from '@/components/ui/Button';
import { Users2 } from 'lucide-react';

export function Partners() {
  return (
    <section id="team" className="relative overflow-hidden bg-obsidian py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — text */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
              Partners in Success
            </span>
            <h2 className="mt-4 text-3xl font-serif leading-[1.15] text-white sm:text-4xl">
              Stronger together.
              <br />
              Limitless possibilities.
            </h2>
            <RevealText delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-light-gray">
                We believe in the power of collaboration. Our team works
                hand-in-hand with you to turn goals into reality.
              </p>
            </RevealText>
            <RevealText delay={0.35}>
              <div className="mt-8">
                <SecondaryButton href="#" variant="flat">Meet Our Team</SecondaryButton>
              </div>
            </RevealText>
          </div>

          {/* Right — photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
          >
            <img
              src="/partners-handshake.jpg"
              alt="Team collaborating"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-obsidian/60 px-4 py-2 backdrop-blur-sm">
              <Users2 size={14} className="text-gold" />
              <span className="text-xs font-medium text-white">
                Trusted by teams worldwide
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}