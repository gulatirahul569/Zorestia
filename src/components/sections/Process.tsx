import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STAGES = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business, market, challenges and objectives.',
  },
  {
    number: '02',
    title: 'Strategize',
    description: "Develop a focused strategy designed around the company's goals.",
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Turn strategy into practical systems, campaigns and implementations.',
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Optimize, automate and expand successful systems.',
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Our Process"
          title="From strategy to scale."
          className="mb-20"
        />

        {/* Desktop horizontal timeline */}
        <div ref={ref} className="hidden lg:block">
          <div className="relative">
            {/* Base line */}
            <div className="absolute left-0 top-7 h-px w-full bg-white/5" />
            {/* Animated progress line */}
            <motion.div
              className="absolute left-0 top-7 h-px bg-gradient-to-r from-gold/40 via-electric to-azure"
              style={{ width: lineWidth }}
            />

            <div className="grid grid-cols-4 gap-8">
              {STAGES.map((stage, i) => (
                <Reveal key={stage.number} delay={i * 0.15} y={30}>
                  <div className="relative">
                    {/* Node */}
                    <div className="relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-obsidian">
                      <span className="text-sm font-bold text-azure">
                        {stage.number}
                      </span>
                      <div className="absolute inset-0 rounded-full border border-electric/30 opacity-0 transition-opacity duration-500 hover:opacity-100" />
                    </div>

                    <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-light-gray">
                      {stage.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold/30 via-electric/20 to-transparent" />
            <div className="space-y-12">
              {STAGES.map((stage, i) => (
                <Reveal key={stage.number} delay={i * 0.1} y={20}>
                  <div className="relative pl-14">
                    <div className="absolute left-4 top-1 z-10 -translate-x-1/2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-azure/30 bg-obsidian">
                        <span className="text-xs font-bold text-azure">
                          {stage.number}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">{stage.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-light-gray">
                      {stage.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
