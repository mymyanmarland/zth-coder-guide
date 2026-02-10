import React, { useState, useEffect } from 'react';
import { sections } from './data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Rocket, 
  ShieldCheck, 
  Terminal, 
  Code2, 
  Image as ImageIcon, 
  Video, 
  Palette, 
  Zap, 
  Cpu, 
  Settings, 
  BookOpen, 
  Link2,
  Copy,
  Check,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap: Record<string, any> = {
  intro: Rocket,
  auth: ShieldCheck,
  core: Terminal,
  "coding-tab": Code2,
  "image-tab": ImageIcon,
  "video-tab": Video,
  "img-gen": Palette,
  "ad-poster": Zap,
  "img-to-prompt": ImageIcon,
  execute: Cpu,
  uiux: Palette,
  "how-to": BookOpen,
  admin: Settings,
  seo: Link2,
  "api-integration": Link2,
  "use-case-guide": BookOpen,
};

const StarryBackground = () => {
  return (
    <div className="stars-container">
      {[...Array(100)].map((_, i) => (
        <div 
          key={i} 
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

const CodeBlock = ({ children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, '');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={copyToClipboard}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          padding: '5px',
          borderRadius: '4px',
          cursor: 'pointer',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '12px'
        }}
      >
        {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre>
        <code {...props}>{children}</code>
      </pre>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sections.find(s => s.id === hash)) {
        setActiveSection(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <div className="app-container">
      <StarryBackground />
      
      {/* Mobile Toggle */}
      <button 
        className="mobile-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 200,
          background: 'var(--accent-color)',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          color: '#fff',
          display: 'none' // Controlled by CSS media query in production
        }}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '0 10px 30px 10px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '5px', color: '#fff' }}>ZTH Coder</h2>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>AI Prompt Guide</p>
        </div>
        
        <nav>
          {sections.map((s) => {
            const Icon = iconMap[s.id] || Rocket;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  setIsSidebarOpen(false);
                  window.location.hash = s.id;
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 15px',
                  background: activeSection === s.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  border: 'none',
                  borderLeft: `3px solid ${activeSection === s.id ? 'var(--accent-color)' : 'transparent'}`,
                  color: activeSection === s.id ? '#fff' : '#aaa',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '4px',
                  borderRadius: '0 8px 8px 0',
                  transition: 'all 0.2s ease',
                  fontSize: '0.9rem',
                  fontWeight: activeSection === s.id ? '600' : '400'
                }}
              >
                <Icon size={18} />
                {s.title}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {React.createElement(iconMap[currentSection.id] || Rocket, { size: 36, color: '#3b82f6' })}
              {currentSection.title}
            </h1>
            
            <div className="markdown-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlock
                }}
              >
                {currentSection.content}
              </ReactMarkdown>
            </div>

            <div style={{ marginTop: '100px', padding: '40px 0', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>
                Made with ❤️ by <strong>ZTH Coder</strong>
              </p>
              <p style={{ fontSize: '0.8rem', color: '#444', marginTop: '10px' }}>
                Built using Lovable AI & Ko Paing (🥧)
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
