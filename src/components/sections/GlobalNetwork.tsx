import { Suspense, lazy, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Scene = lazy(() => import('@/components/three/Scene').then((m) => ({ default: m.Scene })));

const REGIONS = [
  { name: 'North America', lat: 40, lon: -100 },
  { name: 'Europe', lat: 50, lon: 10 },
  { name: 'Middle East', lat: 25, lon: 45 },
  { name: 'Asia', lat: 35, lon: 100 },
];

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function NetworkGlobe({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () => REGIONS.map((r) => latLonToVec3(r.lat, r.lon, 1.5)),
    []
  );

  const arcs = useMemo(() => {
    const result: { points: Float32Array }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const start = nodes[i];
        const end = nodes[j];
        const mid = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(2.2);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const pts = curve.getPoints(40);
        result.push({ points: new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])) });
      }
    }
    return result;
  }, [nodes]);

  const wireframe = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.5, 40, 28);
    return new THREE.WireframeGeometry(geo);
  }, []);

  const particles = useMemo(() => {
    const count = reducedMotion ? 100 : 300;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.5 * (1.1 + Math.random() * 1.8);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [reducedMotion]);

  const particleRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!reducedMotion) groupRef.current.rotation.y += delta * 0.1;
    if (particleRef.current && !reducedMotion) {
      particleRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.49, 64, 48]} />
        <meshBasicMaterial color="#040810" transparent opacity={0.85} />
      </mesh>
      <lineSegments geometry={wireframe}>
        <lineBasicMaterial color="#1e3a8a" transparent opacity={0.2} />
      </lineSegments>

      {nodes.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color="#7dd3fc" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
          </mesh>
        </group>
      ))}

      {arcs.map((arc, i) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(arc.points, 3));
        return (
          <primitive
            key={i}
            object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#3b82f6', transparent: true, opacity: 0.25 }))}
          />
        );
      })}

      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#60a5fa" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  );
}

export function GlobalNetwork() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const globeScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const globeRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section id="solutions" ref={ref} className="relative overflow-hidden py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-midnight/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — text */}
          <div>
            <SectionHeading
              eyebrow="Global Network"
              title="Built for a world without borders."
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-light-gray">
                Global opportunity requires global thinking. We connect markets,
                technology, people and partnerships across continents to drive
                sustainable growth.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-white/5">
                {['Markets', 'Technology', 'People', 'Partnerships', 'Growth'].map((step, i) => (
                  <div key={step} className="flex items-center gap-4 bg-white/[0.015] px-6 py-4">
                    <span className="text-xs font-bold text-gold/60">0{i + 1}</span>
                    <span className="text-sm font-semibold text-white">{step}</span>
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-azure/40" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — 3D globe */}
          <motion.div
            style={{ scale: globeScale, rotate: globeRotate }}
            className="relative aspect-square w-full"
          >
            <div className="absolute inset-0 rounded-full bg-electric/5 blur-[80px]" />
            <Suspense fallback={null}>
              <Scene cameraPosition={[0, 0, 4.5]} fov={45}>
                <NetworkGlobe reducedMotion={reduced} />
              </Scene>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
