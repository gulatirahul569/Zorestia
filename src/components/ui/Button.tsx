import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  variant?: 'pill' | 'flat';
}

export function PrimaryButton({
  children,
  href,
  icon,
  className = '',
  variant = 'pill',
  ...props
}: PrimaryButtonProps) {
  const content =
    variant === 'flat' ? (
      <span
        className={`inline-flex items-center gap-2 border border-gold bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-obsidian transition-opacity duration-300 hover:opacity-90 ${className}`}
      >
        {children}
      </span>
    ) : (
      <Magnetic strength={0.25}>
        <motion.span
          className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-500 ${className}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-royal via-electric to-royal opacity-95" />
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-electric/40 to-azure/40 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
          <span className="relative z-10">{children}</span>
          <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
            {icon ?? <ArrowRight size={16} />}
          </span>
        </motion.span>
      </Magnetic>
    );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button {...props} className="inline-block">
      {content}
    </button>
  );
}

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: 'pill' | 'flat';
}

export function SecondaryButton({
  children,
  href,
  className = '',
  variant = 'pill',
  ...props
}: SecondaryButtonProps) {
  const content =
    variant === 'flat' ? (
      <span
        className={`inline-flex items-center gap-2 border border-white/25 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-soft-white transition-colors duration-300 hover:border-gold/60 hover:text-gold ${className}`}
      >
        {children}
      </span>
    ) : (
      <Magnetic strength={0.2}>
        <motion.span
          className={`group relative inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.02] px-8 py-4 text-sm font-semibold tracking-wide text-soft-white backdrop-blur-sm transition-all duration-500 hover:border-azure/40 hover:bg-white/[0.04] hover:text-white ${className}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute -inset-0.5 rounded-full bg-electric/0 blur-lg transition-all duration-500 group-hover:bg-electric/10" />
          <span className="relative z-10">{children}</span>
          <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
            <ArrowRight size={16} />
          </span>
        </motion.span>
      </Magnetic>
    );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button {...props} className="inline-block">
      {content}
    </button>
  );
}