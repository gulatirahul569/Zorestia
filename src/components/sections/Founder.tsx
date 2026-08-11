import { motion } from 'framer-motion';
import { Reveal, RevealText } from '@/components/ui/Reveal';

export function Founder() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-midnight/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Portrait placeholder */}
          <Reveal>
            <FounderPortrait />
          </Reveal>

          {/* Text */}
          <div>
            <RevealText>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
                Visionary Leadership
              </span>
            </RevealText>

            <RevealText delay={0.1}>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">
                Tejas Bhardwaj
              </h2>
            </RevealText>

            <RevealText delay={0.2}>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-azure">
                Founder &amp; CEO
              </p>
            </RevealText>

            <RevealText delay={0.3}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-light-gray">
                Tejas Bhardwaj founded Zorestia with a vision to build a modern global
                business ecosystem combining technology, AI, sales and strategic
                execution to help businesses move faster and scale beyond traditional
                boundaries.
              </p>
            </RevealText>

            <Reveal delay={0.5}>
              <a
                href="#contact"
                className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-azure"
              >
                <span className="h-px w-8 bg-gold/40 transition-all hover:w-12" />
                Get in touch
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderPortrait() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-charcoal to-obsidian">
      {/* Geometric framing */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Blue lighting */}
      <div className="absolute -left-20 top-1/4 h-60 w-60 rounded-full bg-electric/15 blur-[80px]" />
      <div className="absolute -right-10 bottom-1/4 h-40 w-40 rounded-full bg-azure/10 blur-[60px]" />

      {/* Abstract geometric portrait */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 300 375" className="h-full w-full" role="img" aria-label="Abstract founder portrait placeholder">
          {/* Frame */}
          <rect x="20" y="20" width="260" height="335" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" rx="12" />
          <rect x="40" y="40" width="220" height="295" fill="none" stroke="#c9a96a" strokeWidth="0.3" opacity="0.15" rx="8" />

          {/* Abstract figure silhouette */}
          <circle cx="150" cy="160" r="42" fill="none" stroke="#7dd3fc" strokeWidth="1" opacity="0.4" />
          <circle cx="150" cy="160" r="32" fill="#0c111c" stroke="#3b82f6" strokeWidth="0.5" opacity="0.6" />
          <path
            d="M 90 260 Q 90 220 150 220 Q 210 220 210 260 L 210 330 L 90 330 Z"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.8"
            opacity="0.3"
          />

          {/* Monogram */}
          <text
            x="150"
            y="168"
            textAnchor="middle"
            className="fill-azure text-[28px] font-bold"
          >
            TB
          </text>

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.circle
              key={i}
              cx={30 + Math.random() * 240}
              cy={30 + Math.random() * 315}
              r={1 + Math.random() * 1.5}
              fill="#60a5fa"
              opacity={0.3 + Math.random() * 0.3}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Label */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-soft-white">
            Tejas Bhardwaj
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-mid-gray">
            Founder &amp; CEO
          </p>
        </div>
        <div className="h-8 w-px bg-gold/30" />
      </div>
    </div>
  );
}
