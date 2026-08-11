import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong border-b border-white/[0.06]'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-3">
            <span className="text-xl font-bold tracking-[0.15em] text-white transition-colors group-hover:text-azure">
              ZORESTIA
            </span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-light-gray sm:block">
              Global
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-sm font-medium text-light-gray transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-azure to-electric transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-azure/50 hover:bg-azure/5 lg:inline-block"
          >
            Start a Conversation
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/5 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl" />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span className="text-xl font-bold tracking-[0.15em] text-white">
                  ZORESTIA
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between border-b border-white/5 py-5 text-2xl font-semibold text-soft-white transition-colors hover:text-azure"
                    >
                      {link.label}
                      <span className="text-sm font-normal text-mid-gray">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="px-6 pb-10">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-royal via-electric to-royal px-8 py-4 text-sm font-semibold text-white"
                >
                  Start a Conversation
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
