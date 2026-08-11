import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// City coordinates on a sphere (lat, lon) → normalized
const CITY_COORDS: [number, number][] = [
  [40.7, -74.0],   // New York
  [51.5, -0.1],    // London
  [25.2, 55.3],    // Dubai
  [1.35, 103.8],   // Singapore
  [35.7, 139.7],   // Tokyo
  [28.6, 77.2],    // New Delhi
  [-33.9, 151.2],  // Sydney
  [37.8, -122.4],  // San Francisco
  [52.5, 13.4],    // Berlin
  [48.9, 2.3],     // Paris
  [55.7, 37.6],    // Moscow
  [-23.5, -46.6],  // São Paulo
  [22.3, 114.2],   // Hong Kong
  [24.7, 46.7],    // Riyadh
  [30.0, 31.2],    // Cairo
  [6.5, 3.4],      // Lagos
  [-1.3, 36.8],    // Nairobi
  [34.0, -118.2],  // Los Angeles
  [43.7, -79.4],   // Toronto
  [19.4, -99.1],   // Mexico City
];

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

interface GlobeProps {
  radius?: number;
  reducedMotion?: boolean;
}

export function Globe({ radius = 2, reducedMotion = false }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const cities = useMemo(
    () => CITY_COORDS.map(([lat, lon]) => latLonToVec3(lat, lon, radius * 1.005)),
    [radius]
  );

  const connections = useMemo(() => {
    const lines: { positions: Float32Array; progress: number; speed: number }[] = [];
    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        if (Math.random() > 0.85) {
          const start = cities[i];
          const end = cities[j];
          const mid = new THREE.Vector3()
            .addVectors(start, end)
            .multiplyScalar(0.5)
            .normalize()
            .multiplyScalar(radius * 1.5);
          const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
          const points = curve.getPoints(50);
          const positions = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]));
          lines.push({
            positions,
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.004,
          });
        }
      }
    }
    return lines;
  }, [cities, radius]);

  // Wireframe sphere geometry
  const sphereGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(radius, 48, 32);
    return new THREE.WireframeGeometry(geo);
  }, [radius]);

  // Inner solid sphere
  const innerGeometry = useMemo(() => new THREE.SphereGeometry(radius * 0.99, 64, 48), [radius]);
  const innerMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#040810'),
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  // Atmosphere glow
  const atmosphereGeometry = useMemo(() => new THREE.SphereGeometry(radius * 1.15, 64, 48), [radius]);
  const atmosphereMaterial = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color('#3b82f6') },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, 1.0) * intensity * 0.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    return mat;
  }, []);

  // Particles
  const particlePositions = useMemo(() => {
    const count = reducedMotion ? 200 : 600;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (1.3 + Math.random() * 2.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [radius, reducedMotion]);

  const particleRef = useRef<THREE.Points>(null);

  // Gold highlight ring
  const goldRingRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Auto rotate
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.08;
    }

    // Mouse parallax
    const targetX = mouseRef.current.y * 0.15;
    const targetY = -mouseRef.current.x * 0.2;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (targetY - 0) * 0.01;

    // Particles drift
    if (particleRef.current && !reducedMotion) {
      particleRef.current.rotation.y += delta * 0.02;
      particleRef.current.rotation.x += delta * 0.01;
    }

    // Gold ring slow orbit
    if (goldRingRef.current && !reducedMotion) {
      goldRingRef.current.rotation.z += delta * 0.15;
      goldRingRef.current.rotation.x += delta * 0.05;
    }
  });

  // City node material refs for pulsing
  const cityRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    cityRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const scale = 1 + Math.sin(t * 2 + i * 0.5) * 0.3;
        mesh.scale.setScalar(scale);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Inner dark sphere */}
      <mesh geometry={innerGeometry} material={innerMaterial} />

      {/* Wireframe globe */}
      <lineSegments geometry={sphereGeometry}>
        <lineBasicMaterial color="#1e3a8a" transparent opacity={0.25} />
      </lineSegments>

      {/* Atmosphere glow */}
      <mesh geometry={atmosphereGeometry} material={atmosphereMaterial} />

      {/* City nodes */}
      {cities.map((pos, i) => (
        <mesh key={i} position={pos} ref={(el) => { cityRefs.current[i] = el; }}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#7dd3fc" />
        </mesh>
      ))}

      {/* City glow halos */}
      {cities.map((pos, i) => (
        <mesh key={`glow-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
        </mesh>
      ))}

      {/* Connection arcs */}
      {connections.map((conn, i) => (
        <ConnectionArc key={`conn-${i}`} positions={conn.positions} />
      ))}

      {/* Traveling particles along connections */}
      {connections.map((conn, i) => (
        <TravelingParticle
          key={`tp-${i}`}
          positions={conn.positions}
          speed={conn.speed}
          startProgress={conn.progress}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Floating particles */}
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#60a5fa"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Gold accent ring */}
      <mesh ref={goldRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[radius * 1.4, 0.005, 8, 100]} />
        <meshBasicMaterial color="#c9a96a" transparent opacity={0.3} />
      </mesh>

      {/* Thin equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.01, 0.003, 8, 80]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function ConnectionArc({ positions }: { positions: Float32Array }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <primitive
      object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#3b82f6', transparent: true, opacity: 0.18 }))}
    />
  );
}

function TravelingParticle({
  positions,
  speed,
  startProgress,
  reducedMotion,
}: {
  positions: Float32Array;
  speed: number;
  startProgress: number;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(startProgress);

  useFrame(() => {
    if (!meshRef.current || reducedMotion) return;
    progressRef.current += speed;
    if (progressRef.current > 1) progressRef.current = 0;

    const idx = Math.floor(progressRef.current * (positions.length / 3 - 1));
    meshRef.current.position.set(
      positions[idx * 3],
      positions[idx * 3 + 1],
      positions[idx * 3 + 2]
    );
    const opacity = Math.sin(progressRef.current * Math.PI) * 0.8;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });

  if (reducedMotion) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#7dd3fc" transparent opacity={0} />
    </mesh>
  );
}
