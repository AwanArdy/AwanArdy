import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Check, 
  Copy, 
  Terminal, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Layers, 
  ArrowUpRight,
  Contrast,
  BookOpen
} from 'lucide-react';
import { ArticleItem } from '../../types/portfolio';
import { ARTICLES_DATA } from '../../data/articlesData';

interface ArticlePageProps {
  article: ArticleItem;
  isInverted: boolean;
  onBackToPortfolio: () => void;
  onTogglePolarity: (e: React.MouseEvent) => void;
  onNavigateArticle: (slug: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  isInverted,
  onBackToPortfolio,
  onTogglePolarity,
  onNavigateArticle
}) => {
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState<string | null>(null);
  const [copiedSlugLink, setCopiedSlugLink] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>(article.sections[0]?.id || "");

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article.slug]);

  // Track scroll position for Table of Contents highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const sec of article.sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.sections]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeSnippet(id);
    setTimeout(() => {
      setCopiedCodeSnippet(null);
    }, 2000);
  };

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#article/${article.slug}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedSlugLink(true);
    setTimeout(() => setCopiedSlugLink(false), 2200);
  };

  // Find next and previous articles
  const currentIndex = ARTICLES_DATA.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? ARTICLES_DATA[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[currentIndex + 1] : null;

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between">
      {/* ==========================================
          STICKY ARTICLE TOP NAVIGATION BAR
         ========================================== */}
      <header className={`sticky top-0 z-30 border-b border-current ${isInverted ? "bg-black" : "bg-white"}`}>
        <div className="w-full grid grid-cols-12 text-xs font-mono uppercase tracking-wider">
          {/* Back to Portfolio Button */}
          <div className="col-span-12 sm:col-span-5 md:col-span-3 p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-current flex items-center justify-between gap-2">
            <button
              onClick={onBackToPortfolio}
              className="flex items-center gap-2 font-bold tracking-tight hover:opacity-75 transition-opacity cursor-pointer group"
              title="Kembali ke Halaman Portofolio"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>PORTFOLIO // INDEX</span>
            </button>
            <span className="text-[9px] border border-current px-1.5 py-0.5 shrink-0 hidden sm:inline-block">
              ESC / BACK
            </span>
          </div>

          {/* Breadcrumb / Slug Info */}
          <div className="col-span-7 sm:col-span-4 md:col-span-6 p-3 sm:p-4 border-r border-current flex items-center justify-between text-[11px] truncate">
            <div className="flex items-center gap-2 truncate">
              <span className="opacity-50 hidden md:inline">DOCS //</span>
              <span className="font-bold border border-current px-1 py-0.2 text-[9px]">
                SLUG
              </span>
              <span className="font-mono truncate opacity-90">
                /{article.slug}
              </span>
            </div>
          </div>

          {/* Share & Polarity Toggle */}
          <div className="col-span-5 sm:col-span-3 flex items-center justify-end">
            <button
              onClick={handleCopyShareLink}
              className="h-full px-3 sm:px-4 py-3 border-r border-current hover:bg-current group transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Salin Link Artikel dengan Slug"
            >
              {copiedSlugLink ? (
                <>
                  <Check className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                  <span className={`text-[10px] font-bold group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    COPIED
                  </span>
                </>
              ) : (
                <>
                  <Share2 className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                  <span className={`text-[10px] group-hover-invert hidden md:inline ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    SHARE
                  </span>
                </>
              )}
            </button>

            <button
              onClick={onTogglePolarity}
              className="h-full px-3 sm:px-4 py-3 hover:bg-current group transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
              title="Ganti Tema Gelap / Terang"
            >
              <Contrast className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
              <span className={`text-[10px] group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                {isInverted ? "BLK" : "WHT"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          ARTICLE HERO / HEADER
         ========================================== */}
      <div className="border-b border-current p-6 sm:p-12 lg:p-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider mb-6 opacity-75">
            <span className="border-2 border-current px-2.5 py-1 font-bold">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>BY {article.author}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] mb-6">
            {article.title}
          </h1>

          <p className="font-mono text-xs sm:text-base tracking-wide opacity-80 uppercase leading-relaxed max-w-4xl mb-8">
            {article.subtitle}
          </p>

          <div className="border-l-4 border-current pl-6 py-2 my-8 max-w-4xl bg-current/5">
            <p className="text-base sm:text-xl leading-relaxed italic opacity-95">
              "{article.summary}"
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="font-mono text-xs font-bold mr-2 uppercase opacity-60">TAGS:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] border border-current px-2.5 py-1 uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================
          ARTICLE BODY: DUAL COLUMN LAYOUT
         ========================================== */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 flex-1">
        {/* Desktop Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-current p-6 sm:p-10">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="border border-current p-4 sm:p-5 font-mono text-xs">
              <div className="font-bold uppercase tracking-wider mb-4 flex items-center justify-between border-b border-current pb-2">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  TABLE OF CONTENTS
                </span>
                <span className="text-[10px] opacity-60">
                  {article.sections.length} PARTS
                </span>
              </div>

              <nav className="space-y-2">
                {article.sections.map((sec, idx) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(sec.id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          setActiveSectionId(sec.id);
                        }
                      }}
                      className={`block py-1.5 px-2 transition-colors text-left text-[11px] font-mono leading-snug rounded-none ${
                        isActive
                          ? "bg-current font-bold"
                          : "hover:bg-current/10 opacity-80"
                      }`}
                    >
                      <span className={isActive ? (isInverted ? "text-black" : "text-white") : ""}>
                        [{String(idx + 1).padStart(2, '0')}] {sec.title.replace(/^\d+\s*\/\/\s*/, '')}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Quick Share Card */}
            <div className="border border-current p-4 font-mono text-xs space-y-3">
              <div className="font-bold uppercase tracking-wider text-[11px]">
                ARTICLE METADATA
              </div>
              <div className="text-[11px] opacity-80 space-y-1">
                <div>ID: {article.id}</div>
                <div>SLUG: #{article.slug}</div>
                <div>AUTHOR: {article.author}</div>
              </div>
              <button
                onClick={handleCopyShareLink}
                className="w-full border border-current py-2 font-bold uppercase flex items-center justify-center gap-2 hover:bg-current group transition-colors cursor-pointer text-[11px]"
              >
                <Share2 className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                  {copiedSlugLink ? "SLUG LINK COPIED!" : "SHARE THIS ARTICLE"}
                </span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Column */}
        <section className="lg:col-span-8 p-6 sm:p-10 lg:p-12 space-y-16">
          {article.sections.map((sec) => (
            <article key={sec.id} id={sec.id} className="scroll-mt-24">
              <div className="border-b-2 border-current pb-4 mb-8">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight flex items-center gap-3">
                  <span>{sec.title}</span>
                </h2>
              </div>

              <div className="space-y-10">
                {sec.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide flex items-center gap-2.5">
                      <ChevronRight className="w-5 h-5 shrink-0" />
                      <span>{sub.title}</span>
                    </h3>

                    {sub.lead && (
                      <p className="text-base sm:text-lg font-medium opacity-90 leading-relaxed">
                        {sub.lead}
                      </p>
                    )}

                    {sub.paragraphs && (
                      <div className="space-y-3 text-sm sm:text-base leading-relaxed opacity-85">
                        {sub.paragraphs.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    )}

                    {/* List Items */}
                    {sub.list && (
                      <ul className="space-y-2 border-l-2 border-current pl-4 my-4 text-sm sm:text-base">
                        {sub.list.map((item, lIdx) => (
                          <li key={lIdx} className="leading-relaxed">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Code Blocks */}
                    {sub.codeBlocks && (
                      <div className="space-y-5 mt-4">
                        {sub.codeBlocks.map((cb, cIdx) => {
                          const snippetId = `${sec.id}-${sIdx}-${cIdx}`;
                          const isSnippetCopied = copiedCodeSnippet === snippetId;

                          return (
                            <div
                              key={cIdx}
                              className="border border-current overflow-hidden text-xs font-mono shadow-sm"
                            >
                              {/* Code Block Header */}
                              <div className="border-b border-current px-4 py-2.5 flex items-center justify-between gap-2 bg-current/5">
                                <div className="flex items-center gap-2 truncate">
                                  <Terminal className="w-4 h-4 shrink-0" />
                                  <span className="font-bold uppercase tracking-wider text-[11px] truncate">
                                    {cb.filename || "TERMINAL"}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleCopyCode(cb.code, snippetId)}
                                  className="border border-current px-3 py-1 text-[10px] uppercase font-bold flex items-center gap-1.5 hover:bg-current group transition-colors shrink-0 cursor-pointer"
                                  title="Salin perintah ke clipboard"
                                >
                                  {isSnippetCopied ? (
                                    <>
                                      <Check className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                                      <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                                        COPIED!
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                                      <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                                        COPY
                                      </span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* Code Block Content */}
                              <div className="p-4 sm:p-5 overflow-x-auto select-all leading-relaxed whitespace-pre font-mono text-[12px] sm:text-[13px] opacity-95 bg-current/[0.02]">
                                {cb.code}
                              </div>

                              {cb.description && (
                                <div className="border-t border-current px-4 py-2 text-[11px] opacity-70 italic bg-current/5">
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
                      <div className="border-2 border-current p-5 mt-4 font-mono text-xs sm:text-sm space-y-1.5 bg-current/5">
                        <span className="font-bold uppercase tracking-wider text-xs">
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

          {/* ==========================================
              BOTTOM NAVIGATION: PREV / NEXT ARTICLE
             ========================================== */}
          <div className="border-t-2 border-current pt-10 mt-16 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <button
                  onClick={() => onNavigateArticle(prevArticle.slug)}
                  className="border border-current p-4 text-left hover:bg-current group transition-colors cursor-pointer flex flex-col justify-between"
                >
                  <span className={`font-mono text-[10px] uppercase opacity-60 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    ← PREVIOUS ARTICLE
                  </span>
                  <span className={`font-bold text-sm uppercase line-clamp-2 mt-2 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    {prevArticle.title}
                  </span>
                </button>
              ) : (
                <div />
              )}

              {nextArticle ? (
                <button
                  onClick={() => onNavigateArticle(nextArticle.slug)}
                  className="border border-current p-4 text-right hover:bg-current group transition-colors cursor-pointer flex flex-col justify-between"
                >
                  <span className={`font-mono text-[10px] uppercase opacity-60 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    NEXT ARTICLE →
                  </span>
                  <span className={`font-bold text-sm uppercase line-clamp-2 mt-2 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    {nextArticle.title}
                  </span>
                </button>
              ) : (
                <div />
              )}
            </div>

            {/* Back to Portfolio CTA */}
            <div className="pt-6 border-t border-current flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <span className="opacity-70 uppercase">
                FINISHED READING // {article.slug}
              </span>
              <button
                onClick={onBackToPortfolio}
                className="w-full sm:w-auto border-2 border-current px-6 py-3 uppercase font-bold flex items-center justify-center gap-2 hover:bg-current group transition-colors cursor-pointer"
              >
                <ArrowLeft className={`w-4 h-4 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                  BACK TO PORTFOLIO
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================
          MINIMAL ARTICLE FOOTER
         ========================================== */}
      <footer className="border-t border-current p-6 sm:p-8 font-mono text-xs text-center uppercase opacity-75">
        MUHAMMAD AWAN ARDY FIRMANSYAH — TECHNICAL REPOSITORY &copy; 2026
      </footer>
    </div>
  );
};
