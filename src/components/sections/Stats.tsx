import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';

const STATS = [
  { number: '01', label: 'Strategic Thinking' },
  { number: '02', label: 'Technology Driven' },
  { number: '03', label: 'Global Mindset' },
  { number: '04', label: 'Growth Focused' },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden border-y border-white/5 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-10" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-16 text-center text-sm font-medium uppercase tracking-[0.3em] text-light-gray">
            What defines us
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden bg-white/[0.01] p-8 text-center transition-colors duration-500 hover:bg-white/[0.03] lg:p-12"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-b from-electric/5 to-transparent" />
              </div>
              <div className="relative">
                <span className="block text-5xl font-bold tracking-tight text-gradient-blue lg:text-6xl">
                  {stat.number}
                </span>
                <span className="mt-4 block text-sm font-medium text-light-gray lg:text-base">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
