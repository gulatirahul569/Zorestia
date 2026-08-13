import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-void">
      {/* Animated line above footer */}
      <motion.div
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-[0.15em] text-white">
              ZORESTIA
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-light-gray">
              Powering global business growth through AI, technology &amp; strategic
              services.
            </p>
            <a
              href="mailto:contactzorestia.com"
              className="mt-6 inline-flex items-center gap-2 text-sm text-light-gray transition-colors hover:text-azure"
            >
              <Mail size={16} />
              contactzorestia.com
            </a>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-mid-gray">
              Navigation
            </p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center text-sm text-light-gray transition-colors hover:text-white"
                  >
                    <span className="mr-0 h-px w-0 bg-azure transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-mid-gray">
              Company
            </p>
            <ul className="space-y-3 text-sm text-light-gray">
              <li>Founder &amp; CEO: Tejas Bhardwaj</li>
              <li>Global Business &amp; Technology</li>
              <li className="pt-2">
                <span className="inline-block rounded-full border border-white/10 px-3 py-1 text-xs text-mid-gray">
                  AI · Strategy · Scale
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-mid-gray">
            © 2026 Zorestia. All Rights Reserved.
          </p>
          <p className="text-xs text-mid-gray">
            Built for a world without borders.
          </p>
        </div>
      </div>
    </footer>
  );
}
