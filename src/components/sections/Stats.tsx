import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const STATS = [
  { number: '24/7 ', label: 'Support', sublabel: 'Always-on assistance' },
  { number: '50+', label: 'Projects', sublabel: 'Successfully delivered' },
  { number: '35+', label: 'Countries', sublabel: 'Global presence' },
  { number: '98%', label: 'Client Satisfaction', sublabel: 'Long-term partnerships' },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative border-y border-white/5 bg-obsidian py-16 lg:py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-left"
            >
              <span className="block text-4xl font-serif text-white lg:text-5xl">
                {stat.number}
              </span>
              <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
                {stat.label}
              </span>
              <span className="mt-1 block text-xs text-mid-gray">
                {stat.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}