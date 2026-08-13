import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const NODES = [
  { label: 'AI', description: 'Intelligent automation and machine learning systems.' },
  { label: 'Technology', description: 'Digital platforms, systems and modern infrastructure.' },
  { label: 'Sales', description: 'Customer acquisition and revenue development systems.' },
  { label: 'Business Development', description: 'Strategic partnerships and growth opportunities.' },
  { label: 'Marketing', description: 'Brand positioning and customer acquisition.' },
  { label: 'Consulting', description: 'Strategy, planning and operational improvement.' },
  { label: 'Global Expansion', description: 'International market entry and partnerships.' },
  { label: 'Emerging Technology', description: 'Web3, blockchain and frontier innovation.' },
];

export function Ecosystem() {
  const [active, setActive] = useState<number | null>(null);
  const radius = 200;
  const center = 280;

  return (
    <section className="relative overflow-hidden py-10 lg:py-20">
      {/* Background image */}
      <div className="absolute  inset-0 z-0 overflow-hidden">
        <img
          src="/public/ecosystem1.jpg"
          alt=""
          className="h-full w-full scale-110 object-cover"
        />
        {/* <div className="absolute inset-0 bg-obsidian/85" /> */}
      </div>

      <div className="pointer-events-none absolute inset-0 grid-bg opacity-10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Ecosystem"
          title="Everything connected. One ecosystem."
          className="mb-16 text-center"
          center
        />

        <Reveal>
          <div className="flex justify-center">
            <div className="relative w-full max-w-[600px]">
              <svg viewBox="0 0 560 560" className="w-full" role="img" aria-label="Zorestia ecosystem diagram">
                {NODES.map((_, i) => {
                  const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
                  const x = center + Math.cos(angle) * radius;
                  const y = center + Math.sin(angle) * radius;
                  const isActive = active === i;
                  return (
                    <line
                      key={`line-${i}`}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke={isActive ? '#7dd3fc' : '#1e3a8a'}
                      strokeWidth={isActive ? 1.5 : 0.5}
                      opacity={isActive ? 0.8 : 0.3}
                      className="transition-all duration-500"
                    />
                  );
                })}

                <circle cx={center} cy={center} r={radius} fill="none" stroke="#3b82f6" strokeWidth={0.3} opacity={0.15} strokeDasharray="2 4" />
                <circle cx={center} cy={center} r={radius * 0.6} fill="none" stroke="#c9a96a" strokeWidth={0.3} opacity={0.1} strokeDasharray="2 4" />

                <g>
                  <circle cx={center} cy={center} r={48} fill="#04060c" stroke="#3b82f6" strokeWidth={1} opacity={0.9} />
                  <circle cx={center} cy={center} r={56} fill="none" stroke="#3b82f6" strokeWidth={0.5} opacity={0.3} className="animate-pulse-glow" />
                  <text
                    x={center}
                    y={center + 4}
                    textAnchor="middle"
                    className="fill-white text-[16px] font-bold tracking-wider"
                  >
                    ZORESTIA
                  </text>
                </g>

                {NODES.map((node, i) => {
                  const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
                  const x = center + Math.cos(angle) * radius;
                  const y = center + Math.sin(angle) * radius;
                  const isActive = active === i;
                  return (
                    <g
                      key={node.label}
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : i)}
                      className="cursor-pointer"
                      role="button"
                      aria-label={node.label}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? 36 : 28}
                        fill={isActive ? '#3b82f6' : '#0c111c'}
                        opacity={isActive ? 0.15 : 0.8}
                        stroke={isActive ? '#7dd3fc' : '#1b2435'}
                        strokeWidth={isActive ? 1 : 0.5}
                        className="transition-all duration-500"
                      />
                      <text
                        x={x}
                        y={y + 4}
                        textAnchor="middle"
                        className={`text-[9px] font-semibold transition-all duration-300 ${isActive ? 'fill-azure' : 'fill-soft-white'
                          }`}
                      >
                        {node.label.length > 14
                          ? node.label.substring(0, 12) + '...'
                          : node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="mt-8 flex justify-center">
                <AnimatePresence mode="wait">
                  {active !== null ? (
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-md rounded-2xl border border-azure/20 bg-white/[0.03] p-6 text-center"
                    >
                      <h4 className="text-sm font-bold text-azure">
                        {NODES[active].label}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-light-gray">
                        {NODES[active].description}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-mid-gray"
                    >
                      Hover or tap a node to explore each capability.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}