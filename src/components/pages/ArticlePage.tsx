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
  ArrowUp,
  Contrast,
  List,
  X
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
  const [readingProgress, setReadingProgress] = useState(0);
  const [isQuickNavOpen, setIsQuickNavOpen] = useState(false);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setReadingProgress(0);
  }, [article.slug]);

  // Track scroll position for Table of Contents highlight and reading percentage
  useEffect(() => {
    const handleScroll = () => {
      // 1. Reading Progress Calculation
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100))) : 0;
      setReadingProgress(progress);

      // 2. Active Section Tracker
      const offsetTop = scrollY + 160;
      for (let i = article.sections.length - 1; i >= 0; i--) {
        const sec = article.sections[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= offsetTop) {
          setActiveSectionId(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSectionId(id);
      setIsQuickNavOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsQuickNavOpen(false);
  };

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

  // Active section title for floating telemetry
  const currentSection = article.sections.find((s) => s.id === activeSectionId) || article.sections[0];
  const activeSectionTitle = currentSection ? currentSection.title.replace(/^\d+\s*\/\/\s*/, '') : '';

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between relative">
      {/* ==========================================
          STICKY TOP TELEMETRY & NAVIGATION BAR
         ========================================== */}
      <header className={`sticky top-0 z-30 border-b border-current ${isInverted ? "bg-black" : "bg-white"}`}>
        <div className="w-full grid grid-cols-12 text-xs font-mono uppercase tracking-wider">
          {/* Back to Portfolio Button */}
          <div className="col-span-12 sm:col-span-5 md:col-span-3 p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-current flex items-center justify-between gap-2">
            <button
              onClick={onBackToPortfolio}
              className="flex items-center gap-2 font-bold tracking-tight hover:opacity-75 transition-opacity cursor-pointer group"
              title="Kembali ke Portofolio Utama"
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
              title="Salin Link Slug Artikel"
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
              title="Toggle Light / Dark Mode"
            >
              <Contrast className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
              <span className={`text-[10px] group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                {isInverted ? "BLK" : "WHT"}
              </span>
            </button>
          </div>
        </div>

        {/* Global Reading Progress Bar directly under header */}
        <div className="w-full h-1 bg-current/15 relative overflow-hidden">
          <div 
            className="h-full bg-current transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
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
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 flex-1 relative">
        {/* ==========================================
            DESKTOP STICKY SIDEBAR (FOLLOWS WHILE SCROLLING)
           ========================================== */}
        <aside className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-current p-6 sm:p-8">
          <div className="sticky top-20 space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
            <div className="border-2 border-current p-4 sm:p-5 font-mono text-xs shadow-sm">
              <div className="font-bold uppercase tracking-wider mb-4 flex items-center justify-between border-b border-current pb-2">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  TABLE OF CONTENTS
                </span>
                <span className="text-[10px] opacity-60">
                  {readingProgress}% READ
                </span>
              </div>

              <nav className="space-y-1.5">
                {article.sections.map((sec, idx) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full block py-2 px-2.5 transition-all text-left text-[11px] font-mono leading-snug cursor-pointer ${
                        isActive
                          ? "bg-current font-bold border-l-4 border-current"
                          : "hover:bg-current/10 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <span className={isActive ? (isInverted ? "text-black" : "text-white") : ""}>
                        [{String(idx + 1).padStart(2, '0')}] {sec.title.replace(/^\d+\s*\/\/\s*/, '')}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Progress bar inside TOC */}
              <div className="mt-4 pt-3 border-t border-current flex items-center justify-between text-[10px] opacity-75">
                <span>SCROLL PROGRESS</span>
                <span className="font-bold">{readingProgress}%</span>
              </div>
            </div>

            {/* Quick Share Card */}
            <div className="border border-current p-4 font-mono text-xs space-y-3">
              <div className="font-bold uppercase tracking-wider text-[11px]">
                QUICK ACTIONS
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <button
                  onClick={scrollToTop}
                  className="border border-current py-2 px-2 font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-current group transition-colors cursor-pointer"
                  title="Kembali ke atas artikel"
                >
                  <ArrowUp className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                  <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    TOP
                  </span>
                </button>
                <button
                  onClick={handleCopyShareLink}
                  className="border border-current py-2 px-2 font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-current group transition-colors cursor-pointer"
                  title="Salin tautan artikel"
                >
                  <Share2 className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
                  <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                    SHARE
                  </span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ==========================================
            MAIN READING COLUMN
           ========================================== */}
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
          UNIVERSAL FLOATING BOTTOM QUICK-NAV DOCK (ALWAYS ACCESSIBLE FROM ANYWHERE)
         ========================================== */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl">
        {/* Floating Quick Jump Popover Menu (when open) */}
        {isQuickNavOpen && (
          <div className={`border-2 border-current p-4 mb-2 shadow-2xl backdrop-blur-md font-mono text-xs animate-in fade-in slide-in-from-bottom-2 duration-150 ${
            isInverted ? "bg-black/95 text-white" : "bg-white/95 text-black"
          }`}>
            <div className="flex items-center justify-between border-b border-current pb-2 mb-3">
              <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                JUMP TO SECTION DIRECTLY
              </span>
              <button
                onClick={() => setIsQuickNavOpen(false)}
                className="p-1 hover:bg-current group cursor-pointer"
                title="Tutup Menu"
              >
                <X className={`w-4 h-4 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-60 overflow-y-auto pr-1">
              {article.sections.map((sec, idx) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`py-1.5 px-2 text-left truncate text-[11px] cursor-pointer ${
                      isActive
                        ? "bg-current font-bold"
                        : "hover:bg-current/15 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span className={isActive ? (isInverted ? "text-black" : "text-white") : ""}>
                      [{String(idx + 1).padStart(2, '0')}] {sec.title.replace(/^\d+\s*\/\/\s*/, '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Floating Dock Bar */}
        <div className={`border-2 border-current shadow-xl backdrop-blur-md px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 font-mono text-xs ${
          isInverted ? "bg-black/90 text-white" : "bg-white/90 text-black"
        }`}>
          {/* Progress & Current Section Info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="border border-current px-1.5 py-0.5 text-[10px] font-bold shrink-0">
              {readingProgress}%
            </span>
            <div className="truncate text-[11px] opacity-80 hidden sm:block">
              {activeSectionTitle}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Toggle Table of Contents Popover */}
            <button
              onClick={() => setIsQuickNavOpen(!isQuickNavOpen)}
              className={`border border-current px-2.5 py-1 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                isQuickNavOpen ? "bg-current" : "hover:bg-current/15"
              }`}
              title="Buka Menu Daftar Isi Cepat"
            >
              <List className={`w-3.5 h-3.5 ${isQuickNavOpen ? (isInverted ? "text-black" : "text-white") : ""}`} />
              <span className={isQuickNavOpen ? (isInverted ? "text-black" : "text-white") : ""}>
                TOC
              </span>
            </button>

            {/* Scroll To Top Button */}
            <button
              onClick={scrollToTop}
              className="border border-current px-2.5 py-1 text-[11px] font-bold flex items-center gap-1 hover:bg-current group transition-colors cursor-pointer"
              title="Lompat ke Atas Halaman"
            >
              <ArrowUp className={`w-3.5 h-3.5 group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`} />
              <span className={`group-hover-invert hidden xs:inline ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                TOP
              </span>
            </button>

            {/* Return to Portfolio Button */}
            <button
              onClick={onBackToPortfolio}
              className="border border-current px-2.5 py-1 text-[11px] font-bold hover:bg-current group transition-colors cursor-pointer"
              title="Kembali ke Portofolio"
            >
              <span className={`group-hover-invert ${isInverted ? "group-hover:text-black" : "group-hover:text-white"}`}>
                INDEX
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          MINIMAL ARTICLE FOOTER
         ========================================== */}
      <footer className="border-t border-current p-6 sm:p-8 font-mono text-xs text-center uppercase opacity-75">
        MUHAMMAD AWAN ARDY FIRMANSYAH — TECHNICAL REPOSITORY &copy; 2026
      </footer>
    </div>
  );
};
