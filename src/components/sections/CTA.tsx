import { Suspense, lazy, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { RevealText } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Scene = lazy(() => import('@/components/three/Scene').then((m) => ({ default: m.Scene })));

function CTAParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = reducedMotion ? 150 : 500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [reducedMotion]);

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#60a5fa" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function CTA() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-32 lg:py-48">
      {/* 3D particle background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene cameraPosition={[0, 0, 6]} fov={50} nonInteractive>
            <CTAParticles reducedMotion={reduced} />
          </Scene>
        </Suspense>
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-obsidian via-obsidian/60 to-obsidian" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/8 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 z-10 grid-bg opacity-20" />

      {/* Top transition line */}
      <motion.div
        className="absolute left-0 right-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center lg:px-10">
        <RevealText>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
            Let's Build
          </p>
        </RevealText>

        <RevealText delay={0.1}>
          <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Ready to build what's next?
          </h2>
        </RevealText>

        <RevealText delay={0.25}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-light-gray">
            Let's turn your business ambitions into a scalable global strategy.
          </p>
        </RevealText>

        <RevealText delay={0.4}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton href="#contact">Start a Conversation</PrimaryButton>
            <SecondaryButton href="#services">Explore Services</SecondaryButton>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
