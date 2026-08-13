import { RevealText } from '@/components/ui/Reveal';
import { Brain, Boxes, Workflow, Database, type LucideIcon } from 'lucide-react';

interface TechItem {
  icon: LucideIcon;
  label: string;
  desc: string;
}

const ITEMS: TechItem[] = [
  { icon: Brain, label: 'Artificial Intelligence', desc: 'Automated intelligence at scale' },
  { icon: Boxes, label: 'Web3 & Blockchain', desc: 'Decentralized systems and trust' },
  { icon: Workflow, label: 'Automation Systems', desc: 'Workflow efficiency engines' },
  { icon: Database, label: 'Data Infrastructure', desc: 'Connected decision systems' },
];

export function FutureTech() {
  return (
    <section className="relative overflow-hidden bg-obsidian py-24 lg:py-32">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/public/future.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Headline */}
        <RevealText>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
            AI, Technology, Global Impact
          </span>
        </RevealText>

        <RevealText delay={0.1}>
          <h2 className="mt-5 max-w-xl text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            What&apos;s next is already <span className="text-gold">moving.</span>
          </h2>
        </RevealText>

        <RevealText delay={0.2}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-light-gray">
            We explore frontier technologies — from AI to blockchain — not as
            trends, but as tools for building systems that give businesses an
            edge before the market catches up.
          </p>
        </RevealText>

        {/* Feature list */}
        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:mt-28">
          {ITEMS.map(({ icon: Icon, label, desc }, i) => (
            <RevealText key={label} delay={0.4 + i * 0.1}>
              <div className="flex flex-col items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40">
                  <Icon size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white">{label}</h3>
                <p className="text-xs leading-relaxed text-mid-gray">{desc}</p>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}