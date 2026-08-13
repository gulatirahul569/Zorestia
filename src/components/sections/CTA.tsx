import { motion } from 'framer-motion';
import { RevealText } from '@/components/ui/Reveal';
import { PrimaryButton } from '@/components/ui/Button';

export function CTA() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="absolute inset-0 z-0">
        <img
          src="/public/cta-skyline.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-10">
        <RevealText>
          <h2 className="text-3xl font-serif leading-[1.15] text-white sm:text-4xl md:text-5xl">
            Ready to shape the future
            <br />
            of your business?
          </h2>
        </RevealText>

        <RevealText delay={0.2}>
          <p className="mt-6 text-base text-light-gray">Let's start a conversation.</p>
        </RevealText>

        <RevealText delay={0.35}>
          <div className="mt-10 flex justify-center">
            <PrimaryButton href="#contact" variant="flat">Get in Touch</PrimaryButton>
          </div>
        </RevealText>
      </div>
    </section>
  );
}