import { Suspense, lazy, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RevealText } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Scene = lazy(() => import('@/components/three/Scene').then((m) => ({ default: m.Scene })));

function FloatingObjects({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const spheres = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        radius: 0.15 + Math.random() * 0.25,
        speed: 0.5 + Math.random() * 1,
        offset: i * Math.random() * Math.PI * 2,
      })),
    []
  );

  const rings = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 3,
          -1 - i,
        ] as [number, number, number],
        radius: 0.5 + Math.random() * 0.8,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [
          number,
          number,
          number
        ],
        speed: 0.2 + Math.random() * 0.3,
      })),
    []
  );

  const particles = useMemo(() => {
    const count = reducedMotion ? 80 : 200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    return arr;
  }, [reducedMotion]);

  const particleRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      if (i < spheres.length) {
        child.position.y = spheres[i].position[1] + Math.sin(t * spheres[i].speed + spheres[i].offset) * 0.3;
      }
    });

    if (particleRef.current && !reducedMotion) {
      particleRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <mesh key={`s-${i}`} position={s.position}>
          <sphereGeometry args={[s.radius, 32, 32]} />
          <meshPhysicalMaterial
            color="#0a1530"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6}
            clearcoat={1}
          />
        </mesh>
      ))}

      {rings.map((r, i) => (
        <mesh key={`r-${i}`} position={r.position} rotation={r.rotation}>
          <torusGeometry args={[r.radius, 0.015, 8, 64]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
        </mesh>
      ))}

      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#60a5fa" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  );
}

export function FutureTech() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Future Technology"
          title="What's next is already moving."
          className="mb-16"
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* 3D objects */}
          <div className="relative aspect-square w-full">
            <div className="absolute inset-0 rounded-full bg-electric/5 blur-[80px]" />
            <Suspense fallback={null}>
              <Scene cameraPosition={[0, 0, 5]} fov={50}>
                <FloatingObjects reducedMotion={reduced} />
              </Scene>
            </Suspense>
          </div>

          {/* Text */}
          <div>
            <RevealText>
              <p className="max-w-lg text-lg leading-relaxed text-light-gray">
                We explore frontier technologies — from AI to blockchain — not as
                trends, but as tools for building systems that give businesses an edge
                before the market catches up.
              </p>
            </RevealText>

            <RevealText delay={0.2}>
              <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-white/5">
                {[
                  { label: 'Artificial Intelligence', desc: 'Automated intelligence at scale' },
                  { label: 'Web3 & Blockchain', desc: 'Decentralized systems and trust' },
                  { label: 'Automation Systems', desc: 'Workflow efficiency engines' },
                  { label: 'Data Infrastructure', desc: 'Connected decision systems' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="group flex items-center gap-4 bg-white/[0.01] px-6 py-5 transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="text-xs font-bold text-gold/50">0{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-xs text-mid-gray">{item.desc}</p>
                    </div>
                    <span className="ml-auto h-2 w-2 rounded-full bg-azure/20 transition-all group-hover:bg-azure/60 group-hover:shadow-[0_0_12px_rgba(125,211,252,0.5)]" />
                  </div>
                ))}
              </div>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
