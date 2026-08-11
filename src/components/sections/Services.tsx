import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  Code2,
  Globe2,
  Lightbulb,
  Megaphone,
  Cpu,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

interface Capability {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const CAPABILITIES: Capability[] = [
  {
    number: '01',
    title: 'AI & Automation',
    description: 'Intelligent systems, workflow automation and AI-powered business processes.',
    icon: Brain,
  },
  {
    number: '02',
    title: 'Sales & Business Development',
    description: 'Customer acquisition, outbound sales systems, lead generation and revenue development.',
    icon: TrendingUp,
  },
  {
    number: '03',
    title: 'Technology & Digital Solutions',
    description: 'Modern websites, digital platforms, business systems and technology implementation.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Global Expansion',
    description: 'Market entry strategies, international partnerships and global business development.',
    icon: Globe2,
  },
  {
    number: '05',
    title: 'Strategic Consulting',
    description: 'Business strategy, growth planning, positioning and operational improvement.',
    icon: Lightbulb,
  },
  {
    number: '06',
    title: 'Marketing & Brand Development',
    description: 'Digital positioning, customer acquisition and premium brand development.',
    icon: Megaphone,
  },
  {
    number: '07',
    title: 'Emerging Technology',
    description: 'Strategic exploration of Web3, blockchain and other emerging technologies.',
    icon: Cpu,
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-electric/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Business Capabilities"
          title="One partner. Multiple growth engines."
          className="mb-16 lg:mb-20"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.number} delay={i * 0.08} y={30}>
              <CapabilityCard capability={cap} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ capability }: { capability: Capability }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-50, 50], [6, -6]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-50, 50], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const Icon = capability.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-8 transition-all duration-500 hover:border-azure/20"
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mx) var(--my), rgba(59,130,246,0.08), transparent 40%)',
        }}
      />

      {/* Number */}
      <div className="relative mb-12 flex items-start justify-between">
        <span
          className="text-5xl font-bold tracking-tight text-white/10 transition-all duration-500 group-hover:text-azure/30"
          style={{
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.4s ease',
          }}
        >
          {capability.number}
        </span>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] transition-all duration-500 group-hover:border-azure/30 group-hover:bg-azure/5">
          <Icon
            size={22}
            className="text-light-gray transition-all duration-500 group-hover:scale-110 group-hover:text-azure"
          />
        </div>
      </div>

      {/* Title + description */}
      <h3 className="relative mb-3 text-lg font-semibold leading-snug text-white">
        {capability.title}
      </h3>
      <p className="relative text-sm leading-relaxed text-light-gray">
        {capability.description}
      </p>

      {/* Bottom reveal line */}
      <div className="relative mt-8 h-px w-full overflow-hidden bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-azure to-electric"
          initial={{ x: '-100%' }}
          animate={{ x: hovered ? '0%' : '-100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
