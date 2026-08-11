import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { RevealText } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

const EMPTY: FormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
};

export function Contact() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!data.name.trim()) e.name = 'Name is required';
    if (!data.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = 'Please enter a valid email';
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
        phone: data.phone.trim() || null,
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
    <section id="contact" className="relative overflow-hidden py-32 lg:py-40">
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-electric/5 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          {/* Left — info */}
          <div>
            <SectionHeading eyebrow="Contact" title="Let's talk business." />
            <RevealText delay={0.2}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-light-gray">
                Tell us what you're building, where you want to go and what you need to
                make it happen.
              </p>
            </RevealText>

            <RevealText delay={0.4}>
              <a
                href="mailto:ceo@zorestia.com"
                className="mt-12 inline-flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-azure/30 hover:bg-azure/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <Mail size={20} className="text-azure" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-mid-gray">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    ceo@zorestia.com
                  </p>
                </div>
              </a>
            </RevealText>
          </div>

          {/* Right — form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/[0.06] bg-white/[0.015] p-8 lg:p-10"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Name"
                  required
                  value={data.name}
                  onChange={(v) => update('name', v)}
                  error={errors.name}
                  placeholder="Your full name"
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  value={data.email}
                  onChange={(v) => update('email', v)}
                  error={errors.email}
                  placeholder="you@company.com"
                />
                <Field
                  label="Company"
                  value={data.company}
                  onChange={(v) => update('company', v)}
                  placeholder="Company name"
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={data.phone}
                  onChange={(v) => update('phone', v)}
                  placeholder="+1 234 567 890"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-light-gray">
                  Message <span className="text-gold/60">*</span>
                </label>
                <textarea
                  value={data.message}
                  onChange={(e) => update('message', e.target.value)}
                  rows={5}
                  placeholder="Tell us about your project, goals and timeline..."
                  className={`w-full resize-none rounded-xl border bg-obsidian/50 px-4 py-3 text-sm text-soft-white placeholder:text-mid-gray transition-colors focus:outline-none ${
                    errors.message
                      ? 'border-red-400/40'
                      : 'border-white/10 focus:border-azure/50'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="text-xs text-mid-gray">
                  We'll respond within 48 hours.
                </p>
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-70"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-royal via-electric to-royal" />
                  <span className="relative z-10">
                    {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent' : 'Send Inquiry'}
                  </span>
                  {status === 'loading' ? (
                    <Loader2 size={16} className="relative z-10 animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle2 size={16} className="relative z-10" />
                  ) : null}
                </button>
              </div>

              {/* Status messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 flex items-center gap-3 rounded-xl border border-green-400/20 bg-green-400/5 px-4 py-3"
                  >
                    <CheckCircle2 size={18} className="text-green-400" />
                    <p className="text-sm text-green-300">
                      Thank you. Your inquiry has been received — we'll be in touch shortly.
                    </p>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 flex items-center gap-3 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3"
                  >
                    <AlertCircle size={18} className="text-red-400" />
                    <p className="text-sm text-red-300">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

function Field({ label, value, onChange, type = 'text', required, placeholder, error }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-light-gray">
        {label} {required && <span className="text-gold/60">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-obsidian/50 px-4 py-3 text-sm text-soft-white placeholder:text-mid-gray transition-colors focus:outline-none ${
          error ? 'border-red-400/40' : 'border-white/10 focus:border-azure/50'
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
