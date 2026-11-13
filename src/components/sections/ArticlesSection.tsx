import React, { useState } from 'react';
import { 
  BookOpen, 
  Share2, 
  ArrowUpRight, 
  Check
} from 'lucide-react';
import { ARTICLES_DATA } from '../../data/articlesData';
import { ArticleItem } from '../../types/portfolio';

interface ArticlesSectionProps {
  isInverted: boolean;
  selectedSkill?: string | null;
  onOpenArticle: (slug: string) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  isInverted,
  selectedSkill,
  onOpenArticle
}) => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleCopyShareLink = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#article/${slug}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2200);
  };

  return (
    <section id="articles" className="border-b border-current">
      {/* Section Header */}
      <div className="p-6 sm:p-10 border-b border-current flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest">SECTION // 04</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mt-2 leading-none">
            TECHNICAL GUIDES &amp;
            <br />
            ARCHITECTURE WRITING
          </h2>
        </div>
        <div className="font-mono text-xs max-w-sm">
          Repositori dokumentasi teknis mendalam, workstation blueprint, panduan Linux &amp; tooling dev, optimasi database, dan praktik software engineering siap tempur. Klik artikel untuk membaca di halaman khusus.
        </div>
      </div>

      {/* Articles Index Catalog List */}
      <div className="divide-y divide-current">
        {ARTICLES_DATA.map((article, idx) => {
          const matchesFilter =
            !selectedSkill ||
            article.tags.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()));

          const isCopied = copiedSlug === article.slug;

          return (
            <div
              key={article.id}
              className={`transition-opacity duration-300 ${
                matchesFilter ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                onClick={() => onOpenArticle(article.slug)}
                className="p-6 sm:p-10 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-current/5 cursor-pointer group"
              >
                {/* Left Column: Number & Title */}
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <span className="font-bold text-lg sm:text-xl">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="border border-current px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                      {article.category}
                    </span>
                    <span className="opacity-60 uppercase">
                      {article.date} • {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight leading-snug group-hover:underline underline-offset-4 decoration-2">
                    {article.title}
                  </h3>

                  <p className="font-mono text-xs sm:text-sm opacity-80 uppercase tracking-wide leading-relaxed">
                    {article.subtitle}
                  </p>

                  <p className="text-sm opacity-90 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Slug Pill & Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="font-mono text-[10px] border border-current px-1.5 py-0.5 font-bold">
                      #{article.slug}
                    </span>
                    {article.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] opacity-70 border border-current/40 px-1.5 py-0.5 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-current/20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenArticle(article.slug);
                    }}
                    className="border-2 border-current px-5 py-3 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 hover:bg-current group/btn transition-colors cursor-pointer"
                  >
                    <BookOpen className={`w-4 h-4 shrink-0 group-hover/btn:invert-text ${isInverted ? "group-hover/btn:text-black" : "group-hover/btn:text-white"}`} />
                    <span className={`group-hover/btn:invert-text ${isInverted ? "group-hover/btn:text-black" : "group-hover/btn:text-white"}`}>
                      OPEN DEDICATED PAGE
                    </span>
                    <ArrowUpRight className={`w-4 h-4 shrink-0 group-hover/btn:invert-text ${isInverted ? "group-hover/btn:text-black" : "group-hover/btn:text-white"}`} />
                  </button>

                  <button
                    onClick={(e) => handleCopyShareLink(e, article.slug)}
                    className="font-mono text-[10px] uppercase opacity-70 hover:opacity-100 flex items-center gap-1.5 cursor-pointer py-1"
                    title="Salin tautan slug artikel"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span className="font-bold">LINK COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3" />
                        <span>COPY SLUG LINK</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
