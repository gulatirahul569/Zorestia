import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SecondaryButton } from '@/components/ui/Button';

interface Node {
  name: string;
  x: number; // % from left
  y: number; // % from top
  color: 'blue' | 'red' | 'gold';
}

const NODES: Node[] = [
  { name: 'North America', x: 20, y: 38, color: 'blue' },
  { name: 'Europe', x: 48, y: 28, color: 'blue' },
  { name: 'Middle East', x: 58, y: 42, color: 'red' },
  { name: 'Africa', x: 52, y: 58, color: 'red' },
  { name: 'South Asia', x: 68, y: 46, color: 'gold' },
  { name: 'East Asia', x: 78, y: 34, color: 'red' },
];

const CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 5],
  [2, 5],
];

const dotColor = {
  blue: '#3b82f6',
  red: '#ef4444',
  gold: '#d4af37',
};

export function GlobalNetwork() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-obsidian py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — text */}
          <div>
            <SectionHeading eyebrow="Global Perspective" title="Worldwide reach. Local insight." />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-light-gray">
                Our global network enables us to connect opportunities across
                borders and deliver impact where it matters most.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8">
                <SecondaryButton href="#" variant="flat">Explore Markets</SecondaryButton>
              </div>
            </Reveal>
          </div>

          {/* Right — flat map with animated nodes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
          >
            <img
              src="/world-map.jpg"
              alt="Global network map"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-obsidian/20" />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {CONNECTIONS.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={NODES[a].x}
                  y1={NODES[a].y}
                  x2={NODES[b].x}
                  y2={NODES[b].y}
                  stroke="url(#lineGrad)"
                  strokeWidth={0.15}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeInOut' }}
                />
              ))}
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#d4af37" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {NODES.map((node, i) => (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <span
                  className="block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: dotColor[node.color], boxShadow: `0 0 12px ${dotColor[node.color]}` }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: dotColor[node.color] }}
                  animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}