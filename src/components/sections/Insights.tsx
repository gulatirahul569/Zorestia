import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecondaryButton } from '@/components/ui/Button';
import { RevealText } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

interface Article {
  title: string;
  date: string;
}

const ARTICLES: Article[] = [
  { title: 'The Future of Global Markets', date: 'May 12, 2024' },
  { title: 'Scaling Businesses in a Digital World', date: 'April 28, 2024' },
  { title: 'Sustainable Growth in Uncertain Times', date: 'April 10, 2024' },
];

export function Insights() {
  return (
    <section
      id="insights"
      className="relative flex min-h-[85vh] items-end overflow-hidden bg-obsidian"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/insights-skyline.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24 lg:px-10 lg:pb-20">
        <div className="grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left — heading */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
              Insights
            </span>
            <h2 className="mt-4 text-3xl font-serif leading-[1.15] text-white sm:text-4xl">
              Ideas. Perspectives. Opportunities.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-light-gray">
              Stay informed with our latest insights on markets, industries and trends
              shaping the future.
            </p>
            <div className="mt-8">
              <SecondaryButton href="#" variant="flat">
                View Insights
              </SecondaryButton>
            </div>
          </div>

          {/* Right — article list */}
          <div className="divide-y divide-white/10">
            {ARTICLES.map((article, i) => (
              <RevealText key={article.title} delay={i * 0.1}>
                <a href="#" className="group flex items-center justify-between gap-4 py-5 first:pt-0">
                  <div>
                    <h3 className="text-base font-medium text-white transition-colors group-hover:text-gold">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-xs text-mid-gray">{article.date}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-mid-gray transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold"
                  />
                </a>
              </RevealText>
            ))}

            
            <a  href="#"
              className="flex items-center gap-2 pt-5 text-xs font-semibold uppercase tracking-wide text-gold/90 hover:text-gold"
            >
              View All Articles
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}