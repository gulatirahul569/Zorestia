import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail, Globe2, Clock } from 'lucide-react';
import { FaLinkedinIn, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { supabase } from '@/lib/supabase';
import { RevealText } from '@/components/ui/Reveal';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const EMPTY: FormData = { name: '', email: '', company: '', message: '' };

export function Contact() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!data.name.trim()) e.name = 'Name is required';
    if (!data.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Please enter a valid email';
    if (!data.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('contact_inquiries').insert({
        name: data.name.trim(),
        email: data.email.trim(),
        company: data.company.trim() || null,
        message: data.message.trim(),
      });
      if (error) throw error;
      setStatus('success');
      setData(EMPTY);
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
    }
  };

  const update = (key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/images/contact-office.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-obsidian/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left — info */}
          <div>
            <RevealText>
              <div className="mb-6 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
                  Get in Touch
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
              </div>
            </RevealText>

            <RevealText delay={0.1}>
              <h2 className="text-5xl font-bold leading-[1.05] text-white sm:text-6xl">
                Let&apos;s talk
                <br />
                <span className="text-gold">business.</span>
              </h2>
            </RevealText>

            <RevealText delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-light-gray">
                Tell us what you&apos;re building, where you want to go and what
                you need to make it happen.
              </p>
            </RevealText>

            <div className="mt-10 space-y-6">
              <RevealText delay={0.3}>
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gold/30 bg-obsidian/60">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-mid-gray">Email</p>

                    <a href="mailto:contact@zorestia.com"
                      className="mt-0.5 block text-sm font-semibold text-white transition-colors hover:text-gold"
                    >
                      contact@zorestia.com
                    </a>
                  </div>
                  </div>
              </RevealText>

              <RevealText delay={0.4}>
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gold/30 bg-obsidian/60">
                    <Globe2 size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-mid-gray">Global Presence</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">Serving clients worldwide</p>
                  </div>
                </div>
              </RevealText>

              <RevealText delay={0.5}>
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gold/30 bg-obsidian/60">
                    <Clock size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-mid-gray">Business Hours</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">Mon–Fri &nbsp;·&nbsp; 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </RevealText>
            </div>

            <RevealText delay={0.6}>
              <div className="mt-10">
                <p className="text-xs uppercase tracking-widest text-mid-gray">Follow Us</p>
                <div className="mt-3 flex gap-3">
                  {[FaLinkedinIn, FaXTwitter, FaInstagram].map((Icon, i) => (

                    <a key={i}
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-obsidian/60 text-light-gray transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </RevealText>
          </div>

          {/* Right — form card */}
          <div>
            <div className="rounded-2xl border border-white/10 bg-obsidian/70 p-8 backdrop-blur-sm lg:p-10">
              <form onSubmit={handleSubmit} noValidate>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-light-gray">
                  Full Name <span className="text-gold/60">*</span>
                </label>
                <input
                  value={data.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Your full name"
                  className={`w-full rounded-lg border bg-white/[0.03] px-4 py-3 text-sm text-soft-white placeholder:text-mid-gray focus:outline-none ${errors.name ? 'border-red-400/40' : 'border-white/15 focus:border-gold/50'}`}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}

                <label className="mb-2 mt-5 block text-xs font-semibold uppercase tracking-wider text-light-gray">
                  Business Email <span className="text-gold/60">*</span>
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@company.com"
                  className={`w-full rounded-lg border bg-white/[0.03] px-4 py-3 text-sm text-soft-white placeholder:text-mid-gray focus:outline-none ${errors.email ? 'border-red-400/40' : 'border-white/15 focus:border-gold/50'}`}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}

                <label className="mb-2 mt-5 block text-xs font-semibold uppercase tracking-wider text-light-gray">
                  Company
                </label>
                <input
                  value={data.company}
                  onChange={(e) => update('company', e.target.value)}
                  placeholder="Company name"
                  className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-soft-white placeholder:text-mid-gray focus:border-gold/50 focus:outline-none"
                />

                <label className="mb-2 mt-5 block text-xs font-semibold uppercase tracking-wider text-light-gray">
                  What can we help you with? <span className="text-gold/60">*</span>
                </label>
                <textarea
                  value={data.message}
                  onChange={(e) => update('message', e.target.value)}
                  rows={4}
                  placeholder="Tell us about your goals, project or requirements."
                  className={`w-full resize-none rounded-lg border bg-white/[0.03] px-4 py-3 text-sm text-soft-white placeholder:text-mid-gray focus:outline-none ${errors.message ? 'border-red-400/40' : 'border-white/15 focus:border-gold/50'}`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wide text-obsidian transition-opacity hover:opacity-90 disabled:opacity-70"
                >
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent' : 'Start a Conversation'}
                  {status === 'loading' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                </button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 flex items-center gap-2 text-sm text-green-300"
                    >
                      <CheckCircle2 size={16} /> Thank you — we'll be in touch shortly.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 flex items-center gap-2 text-sm text-red-300"
                    >
                      <AlertCircle size={16} /> Something went wrong — please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-mid-gray">
              We&apos;ll respond within <span className="font-semibold text-gold">48 hours.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}