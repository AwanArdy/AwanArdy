import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Copy, 
  Check, 
  Share2, 
  ArrowUpRight, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Tag, 
  X, 
  Database,
  Layers
} from 'lucide-react';
import { ARTICLES_DATA } from '../../data/articlesData';
import { ArticleItem } from '../../types/portfolio';

interface ArticlesSectionProps {
  isInverted: boolean;
  selectedSkill?: string | null;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  isInverted,
  selectedSkill
}) => {
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState<string | null>(null);
  const [copiedSlugLink, setCopiedSlugLink] = useState(false);
  const articleReaderRef = useRef<HTMLDivElement>(null);

  // Sync state with URL hash (e.g. #article/full-setup-ubuntu-after-install)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#article/') || hash.startsWith('#/article/')) {
        const slug = hash.replace(/^#(?:[/]article[/]|article[/])/, '');
        const found = ARTICLES_DATA.find((a) => a.slug === slug);
        if (found) {
          setActiveArticleSlug(found.slug);
          setTimeout(() => {
            document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openArticle = (article: ArticleItem) => {
    setActiveArticleSlug(article.slug);
    window.location.hash = `article/${article.slug}`;
    setTimeout(() => {
      if (articleReaderRef.current) {
        articleReaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const closeArticle = () => {
    setActiveArticleSlug(null);
    if (window.location.hash.startsWith('#article')) {
      window.history.pushState(null, '', '#articles');
    }
    const sectionEl = document.getElementById('articles');
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeSnippet(id);
    setTimeout(() => {
      setCopiedCodeSnippet(null);
    }, 2000);
  };

  const handleCopyShareLink = (slug: string) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#article/${slug}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedSlugLink(true);
    setTimeout(() => setCopiedSlugLink(false), 2200);
  };

  const activeArticle = ARTICLES_DATA.find((a) => a.slug === activeArticleSlug);

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
          Repositori dokumentasi teknis, workstation blueprint, panduan instalasi server, optimasi database, dan praktik software engineering langsung pakai.
        </div>
      </div>

      {/* Active Article Full Reader (if opened) */}
      {activeArticle && (
        <div 
          ref={articleReaderRef}
          className={`border-b-2 border-current transition-all duration-300 ${
            isInverted ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          {/* Reader Top Action Bar */}
          <div className="border-b border-current px-5 sm:px-10 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="font-bold border border-current px-1.5 py-0.5 text-[10px]">
                SLUG
              </span>
              <span className="font-bold opacity-80 truncate">
                /{activeArticle.slug}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyShareLink(activeArticle.slug)}
                className="border border-current px-3 py-1.5 flex items-center gap-1.5 hover:bg-current group transition-colors cursor-pointer"
                title="Salin tautan langsung artikel"
              >
                {copiedSlugLink ? (
                  <>
                    <Check className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                    <span className={`text-[11px] group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                      LINK COPIED!
                    </span>
                  </>
                ) : (
                  <>
                    <Share2 className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                    <span className={`text-[11px] group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                      SHARE SLUG
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={closeArticle}
                className="border border-current px-3 py-1.5 flex items-center gap-1.5 hover:bg-current group transition-colors cursor-pointer font-bold"
                title="Tutup artikel dan kembali ke daftar"
              >
                <X className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                <span className={`text-[11px] group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                  CLOSE
                </span>
              </button>
            </div>
          </div>

          {/* Article Header Hero */}
          <div className="p-6 sm:p-12 border-b border-current">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider mb-4 opacity-75">
                <span className="border border-current px-2 py-0.5 font-bold">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {activeArticle.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activeArticle.readTime}
                </span>
                <span>•</span>
                <span>BY {activeArticle.author}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-4">
                {activeArticle.title}
              </h1>

              <p className="font-mono text-xs sm:text-sm tracking-wide opacity-80 uppercase leading-relaxed mb-6">
                {activeArticle.subtitle}
              </p>

              <p className="text-base sm:text-lg leading-relaxed opacity-90 border-l-2 border-current pl-4 my-6 italic">
                "{activeArticle.summary}"
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] sm:text-xs border border-current px-2 py-0.5 uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Article Main Content */}
          <div className="p-6 sm:p-12 max-w-5xl">
            {/* Quick Table of Contents */}
            <div className="border border-current p-5 mb-12 font-mono text-xs">
              <div className="font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                TABLE OF CONTENTS // QUICK NAVIGATION
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {activeArticle.sections.map((sec, idx) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:underline flex items-baseline gap-2 truncate opacity-85 hover:opacity-100"
                  >
                    <span className="font-bold opacity-60">[{String(idx + 1).padStart(2, '0')}]</span>
                    <span className="truncate">{sec.title.replace(/^\d+\s*\/\/\s*/, '')}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Sections Flow */}
            <div className="space-y-16">
              {activeArticle.sections.map((sec) => (
                <article key={sec.id} id={sec.id} className="scroll-mt-24">
                  <div className="border-b-2 border-current pb-3 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight flex items-center gap-3">
                      <span>{sec.title}</span>
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {sec.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-4">
                        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 shrink-0" />
                          <span>{sub.title}</span>
                        </h3>

                        {sub.lead && (
                          <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed">
                            {sub.lead}
                          </p>
                        )}

                        {sub.paragraphs && (
                          <div className="space-y-2 text-sm sm:text-base leading-relaxed opacity-85">
                            {sub.paragraphs.map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))}
                          </div>
                        )}

                        {/* List items if present */}
                        {sub.list && (
                          <ul className="space-y-2 border-l-2 border-current pl-4 my-3 text-sm">
                            {sub.list.map((item, lIdx) => (
                              <li key={lIdx} className="leading-relaxed">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Code Blocks */}
                        {sub.codeBlocks && (
                          <div className="space-y-4 mt-3">
                            {sub.codeBlocks.map((cb, cIdx) => {
                              const snippetId = `${sec.id}-${sIdx}-${cIdx}`;
                              const isSnippetCopied = copiedCodeSnippet === snippetId;

                              return (
                                <div
                                  key={cIdx}
                                  className="border border-current overflow-hidden text-xs font-mono"
                                >
                                  {/* Code Block Header */}
                                  <div className="border-b border-current px-3 py-2 flex items-center justify-between gap-2 opacity-90">
                                    <div className="flex items-center gap-2 truncate">
                                      <Terminal className="w-3.5 h-3.5 shrink-0" />
                                      <span className="font-bold uppercase tracking-wider text-[11px] truncate">
                                        {cb.filename || "TERMINAL"}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => handleCopyCode(cb.code, snippetId)}
                                      className="border border-current px-2.5 py-1 text-[10px] uppercase font-bold flex items-center gap-1.5 hover:bg-current group transition-colors shrink-0 cursor-pointer"
                                      title="Copy code to clipboard"
                                    >
                                      {isSnippetCopied ? (
                                        <>
                                          <Check className={`w-3 h-3 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                                          <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                                            COPIED
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className={`w-3 h-3 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                                          <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                                            COPY
                                          </span>
                                        </>
                                      )}
                                    </button>
                                  </div>

                                  {/* Code Block Content */}
                                  <div className="p-4 overflow-x-auto select-all leading-relaxed whitespace-pre font-mono text-[12px] sm:text-[13px] opacity-95">
                                    {cb.code}
                                  </div>

                                  {cb.description && (
                                    <div className="border-t border-current px-3 py-1.5 text-[10px] opacity-70 italic">
                                      // {cb.description}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Callouts */}
                        {sub.callout && (
                          <div className="border-2 border-current p-4 mt-3 font-mono text-xs space-y-1">
                            <span className="font-bold uppercase tracking-wider">
                              [{sub.callout.type.toUpperCase()}]
                            </span>
                            <p className="leading-relaxed opacity-90">
                              {sub.callout.text}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* End of Article Footer */}
            <div className="mt-16 pt-8 border-t-2 border-current flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div>
                <span className="font-bold uppercase">END OF GUIDE</span> — {activeArticle.slug}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleCopyShareLink(activeArticle.slug)}
                  className="border border-current px-4 py-2 hover:bg-current group transition-colors cursor-pointer font-bold flex items-center gap-1.5"
                >
                  <Share2 className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                  <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    {copiedSlugLink ? "SLUG COPIED!" : "SHARE SLUG URL"}
                  </span>
                </button>

                <button
                  onClick={closeArticle}
                  className="border border-current px-4 py-2 hover:bg-current group transition-colors cursor-pointer font-bold"
                >
                  <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    BACK TO ARTICLES
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Index Catalog List */}
      <div className="divide-y divide-current">
        {ARTICLES_DATA.map((article, idx) => {
          const isSelected = activeArticleSlug === article.slug;
          const matchesFilter =
            !selectedSkill ||
            article.tags.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()));

          return (
            <div
              key={article.id}
              className={`transition-opacity duration-300 ${
                matchesFilter ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`p-6 sm:p-10 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-current/5 ${
                  isSelected ? "bg-current/10" : ""
                }`}
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

                  <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight leading-snug">
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
                    onClick={() => openArticle(article)}
                    className="border-2 border-current px-5 py-3 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 hover:bg-current group transition-colors cursor-pointer"
                  >
                    <BookOpen className={`w-4 h-4 shrink-0 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                    <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                      {isSelected ? "VIEWING GUIDE" : "READ FULL GUIDE"}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 shrink-0 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                  </button>

                  <button
                    onClick={() => handleCopyShareLink(article.slug)}
                    className="font-mono text-[10px] uppercase opacity-70 hover:opacity-100 flex items-center gap-1.5 cursor-pointer py-1"
                    title="Salin tautan slug artikel"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>COPY SLUG LINK</span>
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
