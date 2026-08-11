import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealText } from '@/components/ui/Reveal';

export function Introduction() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineScale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-32 lg:py-48">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-electric/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-midnight/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Animated line */}
        <motion.div
          className="mb-16 h-px origin-left bg-gradient-to-r from-gold/40 via-electric/30 to-transparent"
          style={{ scaleX: lineScale }}
        />

        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Left — eyebrow */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <RevealText>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
                The Zorestia Approach
              </span>
            </RevealText>
          </div>

          {/* Right — headline + paragraph */}
          <motion.div style={{ y: textY }}>
            <RevealText delay={0.1}>
              <h2 className="text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                Building the systems behind the next generation of business.
              </h2>
            </RevealText>

            <RevealText delay={0.3}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-light-gray lg:text-xl">
                Zorestia brings together business development, sales, technology,
                artificial intelligence and strategic thinking to help businesses move
                from opportunity to execution — and from execution to scalable growth.
              </p>
            </RevealText>

            {/* Decorative metrics */}
            <RevealText delay={0.5}>
              <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 sm:grid-cols-4">
                {['Strategy', 'Technology', 'Intelligence', 'Scale'].map((item, i) => (
                  <div key={item} className="bg-white/[0.015] p-6">
                    <div className="text-xs font-medium text-mid-gray">
                      0{i + 1}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </RevealText>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
