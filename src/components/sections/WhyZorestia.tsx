import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PRINCIPLES = [
  {
    title: 'Strategic',
    description:
      'We start with the business objective before choosing the technology or execution strategy.',
  },
  {
    title: 'Technology-Driven',
    description:
      'We use modern technology and AI to create smarter and more scalable systems.',
  },
  {
    title: 'Global',
    description: 'We approach opportunities with an international mindset.',
  },
  {
    title: 'Agile',
    description:
      'We adapt strategies as markets, customers and technologies evolve.',
  },
  {
    title: 'Results-Oriented',
    description:
      'We focus on practical execution and measurable business outcomes.',
  },
];

export function WhyZorestia() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-electric/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading eyebrow="Our Principles" title="Why Zorestia" className="mb-20" />

        {/* Vertical timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold/30 via-electric/20 to-transparent lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-16 lg:space-y-24">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.1} y={40}>
                <div
                  className={`relative flex items-start gap-8 lg:gap-0 ${
                    i % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-4 top-2 z-10 -translate-x-1/2 lg:left-1/2">
                    <motion.div
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-azure/30 bg-obsidian"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="h-2 w-2 rounded-full bg-azure" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className={`ml-12 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16 lg:text-right'}`}>
                    <span className="text-xs font-bold tracking-widest text-gold/60">
                      0{i + 1}
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-white lg:text-3xl">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-light-gray">
                      {principle.description}
                    </p>
                  </div>

                  {/* Spacer for the other half */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
