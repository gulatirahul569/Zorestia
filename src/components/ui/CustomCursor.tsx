import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);

      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, [role="button"]');
      setHovering(!!interactive);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-azure/40"
      style={{ x: springX, y: springY }}
      animate={{
        scale: hovering ? 1.6 : 1,
        opacity: hovering ? 0.8 : 0.35,
        borderColor: hovering ? 'rgba(125,211,252,0.8)' : 'rgba(125,211,252,0.4)',
      }}
      transition={{ duration: 0.25 }}
    />
  );
}
