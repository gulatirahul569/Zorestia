import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);

  return (
    <div ref={ref} className={className}>
      {eyebrow && (
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
            {eyebrow}
          </span>
          <motion.div
            className="h-px bg-gradient-to-r from-gold/40 to-transparent"
            style={{ width: lineWidth }}
          />
        </motion.div>
      )}
      <h2 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </div>
  );
}
