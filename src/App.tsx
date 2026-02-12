import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Rocket,
  ShieldCheck,
  Terminal,
  Code2,
  Image as ImageIcon,
  Video,
  Palette,
  Zap,
  Scan,
  Cpu,
  BookOpen,
  Settings,
  Globe,
  Link2,
  Lightbulb,
  Layers,
  FolderTree,
  FileText,
  Search,
  Download,
  Menu,
  X,
  ArrowUp,
  Sparkles,
  Check,
  Copy,
} from 'lucide-react';

type GuideTocItem = {
  num: number;
  label: string;
  id: string;
};

type GuideSection = {
  id: string;
  title: string;
  num?: number;
  icon: any;
  content: string; // markdown
};

function extractPlainText(node: any): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractPlainText).join('');
  if (node && typeof node === 'object' && 'props' in node) return extractPlainText((node as any).props?.children);
  return '';
}

function slugifyLoose(input: string): string {
  // Loose slug for non-numbered appendix sections.
  return input
    .replace(/[\p{Extended_Pictographic}]/gu, '')
    .toLowerCase()
    .trim()
    .replace(/["'`~!@#$%^&*()=+\[\]{}\\|;:,.<>/?]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getSectionNumber(title: string): number | undefined {
  const m = title.match(/^\s*(\d+)\s*\.\s*/);
  if (!m) return undefined;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : undefined;
}

function extractToc(markdown: string): GuideTocItem[] {
  const items: GuideTocItem[] = [];
  const re = /^\s*(\d+)\s*\.\s*\[([^\]]+)\]\(#([^)]+)\)\s*$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown))) {
    const num = Number(m[1]);
    const label = m[2].trim();
    const id = m[3].trim();
    if (Number.isFinite(num) && id) items.push({ num, label, id });
  }
  // De-duplicate by num (keep first)
  const seen = new Set<number>();
  return items.filter((it) => {
    if (seen.has(it.num)) return false;
    seen.add(it.num);
    return true;
  });
}

function splitH2Sections(markdown: string): Array<{ title: string; content: string }> {
  const lines = markdown.split(/\r?\n/);
  const starts: number[] = [];
  const titles: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      starts.push(i);
      titles.push(line.slice(3).trim());
    }
  }

  const out: Array<{ title: string; content: string }> = [];
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    const end = i + 1 < starts.length ? starts[i + 1] : lines.length;
    const title = titles[i];
    const content = lines.slice(start + 1, end).join('\n').trim();
    out.push({ title, content });
  }
  return out;
}

function iconFor(section: { num?: number; title: string }): any {
  if (section.num) {
    switch (section.num) {
      case 1:
        return Rocket;
      case 2:
        return ShieldCheck;
      case 3:
        return Terminal;
      case 4:
        return Code2;
      case 5:
        return ImageIcon;
      case 6:
        return Video;
      case 7:
        return Palette;
      case 8:
        return Zap;
      case 9:
        return Scan;
      case 10:
        return Cpu;
      case 11:
        return Sparkles;
      case 12:
        return BookOpen;
      case 13:
        return Settings;
      case 14:
        return Globe;
      case 15:
        return Link2;
      case 16:
        return BookOpen;
      default:
        return BookOpen;
    }
  }

  const t = section.title.toLowerCase();
  if (t.includes('prompt') && t.includes('tips')) return Lightbulb;
  if (t.includes('tech stack')) return Layers;
  if (t.includes('project structure')) return FolderTree;
  if (t.includes('license')) return FileText;
  return BookOpen;
}

const StarryBackground: React.FC = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        dur: 2.2 + Math.random() * 3,
        delay: Math.random() * 4,
        opacity: 0.35 + Math.random() * 0.35,
      })),
    [],
  );

  return (
    <div className="stars">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
};

function CodeBlock({ inline, className, children }: any) {
  const [copied, setCopied] = useState(false);
  const code = String(children ?? '').replace(/\n$/, '');
  const lang = (className ?? '').toString().replace('language-', '').trim();

  if (inline) {
    return <code className="inline-code">{children}</code>;
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  };

  return (
    <div className="code-wrap">
      <div className="code-topbar">
        <div className="code-lang">{lang || 'code'}</div>
        <button className="code-copy" onClick={copy} type="button" aria-label="Copy code">
          {copied ? (
            <>
              <Check size={14} /> Copied
            </>
          ) : (
            <>
              <Copy size={14} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="code-pre">
        <code className={className}>{code}</code>
      </pre>
    </div>
  );
}

function TableWrap({ children }: any) {
  return <div className="table-wrap">{children}</div>;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<GuideSection[]>([]);
  const [activeId, setActiveId] = useState<string>(() => window.location.hash.replace('#', '') || 'overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const url = `${import.meta.env.BASE_URL}guide.md`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load guide.md (${res.status})`);
        const md = await res.text();

        const firstNumberedMatch = md.match(/^##\s+\d+\./m);
        const cutIndex = firstNumberedMatch ? md.indexOf(firstNumberedMatch[0]) : md.length;
        const overviewMd = md.slice(0, cutIndex).trim();
        const bodyMd = md.slice(cutIndex).trim();

        const toc = extractToc(overviewMd);
        const tocByNum = new Map<number, GuideTocItem>();
        toc.forEach((t) => tocByNum.set(t.num, t));

        const parsed = splitH2Sections(bodyMd);
        const byNum = new Map<number, GuideSection>();
        const extras: GuideSection[] = [];

        for (const s of parsed) {
          const num = getSectionNumber(s.title);
          if (num && tocByNum.has(num)) {
            const t = tocByNum.get(num)!;
            const title = `${num}. ${t.label}`;
            byNum.set(num, {
              id: t.id,
              num,
              title,
              icon: iconFor({ num, title }),
              content: s.content,
            });
          } else {
            const id = slugifyLoose(s.title) || `section-${extras.length + 1}`;
            const title = s.title;
            extras.push({
              id,
              title,
              icon: iconFor({ title }),
              content: s.content,
            });
          }
        }

        // Build ordered list
        const out: GuideSection[] = [];
        out.push({
          id: 'overview',
          title: '🚀 ZTH Coder — AI Prompt Guide',
          icon: Sparkles,
          content: overviewMd || '# ZTH Coder\n\n(guide.md မတွေ့ပါ)',
        });

        const pushNum = (n: number) => {
          const sec = byNum.get(n);
          if (sec) out.push(sec);
        };

        for (let n = 1; n <= 14; n++) pushNum(n);

        // Insert Prompt Tips if present
        const promptTips = extras.find((e) => e.title.toLowerCase().includes('prompt ရေးနည်း tips'));
        if (promptTips) out.push(promptTips);

        pushNum(15);

        const tech = extras.find((e) => e.title.toLowerCase().includes('tech stack'));
        const structure = extras.find((e) => e.title.toLowerCase().includes('project structure'));
        const license = extras.find((e) => e.title.toLowerCase().includes('license'));
        if (tech) out.push(tech);
        if (structure) out.push(structure);
        if (license) out.push(license);

        pushNum(16);

        // Append any remaining extras not already included
        const used = new Set(out.map((s) => s.id));
        for (const e of extras) {
          if (!used.has(e.id)) out.push(e);
        }

        if (cancelled) return;
        setSections(out);

        // If current hash doesn't exist, default to overview
        const wanted = window.location.hash.replace('#', '') || activeId;
        const exists = out.some((s) => s.id === wanted);
        setActiveId(exists ? wanted : 'overview');
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace('#', '');
      if (!id) return;
      if (sections.some((s) => s.id === id)) setActiveId(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [sections]);

  const current = sections.find((s) => s.id === activeId) ?? sections[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    if (q.length < 2) return sections;
    return sections.filter((s) => {
      if (s.title.toLowerCase().includes(q)) return true;
      // lightweight content search
      if (s.content.toLowerCase().includes(q)) return true;
      return false;
    });
  }, [query, sections]);

  const go = (id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const downloadUrl = `${import.meta.env.BASE_URL}guide.md`;

  return (
    <div className="shell">
      <StarryBackground />

      <button className="mobile-toggle" onClick={() => setSidebarOpen((v) => !v)} type="button" aria-label="Toggle menu">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-icon">ZTH</div>
          <div>
            <div className="brand-title">ZTH Coder</div>
            <div className="brand-sub">KMN Prompt Generator — Guide</div>
          </div>
        </div>

        <div className="sidebar-actions">
          <a className="btn-ghost" href={downloadUrl} target="_blank" rel="noreferrer">
            <Download size={16} /> Download MD
          </a>
        </div>

        <div className="search">
          <Search size={16} className="search-icon" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Section/search…"
            className="search-input"
          />
        </div>

        <nav className="nav">
          {filtered.map((s) => {
            const Icon = s.icon;
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`nav-item ${active ? 'active' : ''}`}
                type="button"
              >
                <span className={`nav-dot ${active ? 'active' : ''}`} />
                <Icon size={18} className="nav-ico" />
                <span className="nav-label">{s.title}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="muted">Made with ❤️ by ZTH Coder</div>
          <div className="muted">Ko Paing (🥧) · Docs UI</div>
        </div>
      </aside>

      <main className="content">
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-pill">
              <span className="pill-dot" />
              <span className="pill-text">Glass Docs</span>
            </div>
            <div className="topbar-title">{current?.title ?? 'Loading…'}</div>
          </div>

          <div className="topbar-right">
            <a className="btn" href={downloadUrl} target="_blank" rel="noreferrer">
              <Download size={16} /> Markdown
            </a>
          </div>
        </div>

        <div className="card">
          {loading ? (
            <div className="loading">
              <div className="skeleton h1" />
              <div className="skeleton p" />
              <div className="skeleton p" />
              <div className="skeleton p" />
              <div className="skeleton block" />
            </div>
          ) : error ? (
            <div className="error">
              <div className="error-title">Guide မဖတ်နိုင်သေးပါ</div>
              <div className="error-body">{error}</div>
              <div className="error-body">ဖိုင်: <code className="inline-code">public/guide.md</code></div>
            </div>
          ) : current ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="markdown"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children, ...props }) => {
                      const link = (href ?? '').toString();
                      if (link.startsWith('#')) {
                        const id = link.replace('#', '');
                        return (
                          <a
                            {...props}
                            href={link}
                            onClick={(e) => {
                              e.preventDefault();
                              if (sections.some((s) => s.id === id)) go(id);
                            }}
                          >
                            {children}
                          </a>
                        );
                      }

                      return (
                        <a {...props} href={link} target="_blank" rel="noreferrer">
                          {children}
                        </a>
                      );
                    },
                    code: CodeBlock,
                    table: ({ children }) => <TableWrap><table>{children}</table></TableWrap>,
                    th: ({ children }) => <th>{children}</th>,
                    td: ({ children }) => <td>{children}</td>,
                    h1: ({ children }) => {
                      const text = extractPlainText(children);
                      return (
                        <div className="hero">
                          <div className="hero-badge">🚀 ZTH Coder</div>
                          <h1 className="hero-title">{text}</h1>
                          <div className="hero-sub">
                            Lovable AI နဲ့ KMN Prompt Generator ကို Prompt-driven တည်ဆောက်ခဲ့တဲ့ Blueprint — အစကနေ အဆုံးထိ
                          </div>
                          <div className="hero-actions">
                            <button className="btn" type="button" onClick={() => go(sections.find((s) => s.num === 1)?.id ?? 'overview')}>
                              <Rocket size={16} /> စတင်ဖတ်မယ်
                            </button>
                            <a className="btn-ghost" href={downloadUrl} target="_blank" rel="noreferrer">
                              <Download size={16} /> Markdown ဖိုင်
                            </a>
                          </div>
                        </div>
                      );
                    },
                    blockquote: ({ children }) => <blockquote className="quote">{children}</blockquote>,
                    hr: () => <div className="hr" />,
                  }}
                >
                  {current.content}
                </ReactMarkdown>

                <div className="footer">
                  <div className="muted">Made with ❤️ by <b>ZTH Coder</b></div>
                  <div className="muted">Built as premium docs with Ko Paing (🥧)</div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : null}
        </div>

        {showTop ? (
          <button
            className="to-top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        ) : null}
      </main>
    </div>
  );
}
