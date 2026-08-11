import { Suspense, lazy, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RevealText } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Scene = lazy(() => import('@/components/three/Scene').then((m) => ({ default: m.Scene })));

function VisionObject({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), []);
  const wireframe = useMemo(() => new THREE.WireframeGeometry(geo), [geo]);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.3;
  });

  return (
    <group ref={meshRef}>
      <lineSegments geometry={wireframe}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[1.48, 1]} />
        <meshBasicMaterial color="#040810" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export function Vision() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section
      id="vision"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 3D background */}
      <motion.div style={{ opacity, scale }} className="pointer-events-none absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene cameraPosition={[0, 0, 4]} fov={50} nonInteractive>
            <VisionObject reducedMotion={reduced} />
          </Scene>
        </Suspense>
      </motion.div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-obsidian/80 via-obsidian/40 to-obsidian/90" />
      <div className="pointer-events-none absolute inset-0 z-10 grid-bg opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/8 blur-[120px]" />

      {/* Gold accent line */}
      <motion.div
        className="absolute left-1/2 top-0 z-20 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative z-20 mx-auto max-w-5xl px-6 py-32 text-center lg:px-10">
        <RevealText>
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
            Our Vision
          </p>
        </RevealText>

        <RevealText delay={0.15}>
          <h2 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            The future of business is connected.
          </h2>
        </RevealText>

        <RevealText delay={0.35}>
          <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-light-gray lg:text-xl">
            Our vision is to create a global ecosystem where businesses can access the
            strategy, technology and systems they need to transform ideas into scalable
            enterprises.
          </p>
        </RevealText>
      </div>
    </section>
  );
}
