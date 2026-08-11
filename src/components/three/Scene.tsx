import { type ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SceneProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
  nonInteractive?: boolean;
}

export function Scene({
  children,
  cameraPosition = [0, 0, 6],
  fov = 45,
  className = '',
  nonInteractive = false,
}: SceneProps) {
  const reduced = useReducedMotion();

  return (
    <Canvas
      className={`${nonInteractive ? 'scene-bg' : ''} ${className}`.trim()}
      dpr={[1, reduced ? 1 : 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ touchAction: 'pan-y', pointerEvents: nonInteractive ? 'none' : 'auto' }}
    >
      <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#c9a96a" />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
