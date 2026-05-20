import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle, logout } from '../lib/firebase';
import { cn } from '../lib/utils';

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

export const navLinks: NavItem[] = [
  { 
    name: 'COMPANY', 
    href: '/company/story',
    children: [
      { name: '브랜드 스토리', href: '/company/story' },
      { name: '회사 소개', href: '/company/about' },
      { name: '책임과 비전', href: '/company/values' },
      { name: '핵심 역량', href: '/company/competency' },
    ]
  },
  { 
    name: 'BUSINESS', 
    href: '/business/divorce',
    children: [
      { name: '이혼·가사 조사', href: '/business/divorce' },
      { name: '소송·증거 조사', href: '/business/litigation' },
      { name: 'TSCM 및 포렌식', href: '/business/forensics' },
      { name: '실종·소재 파악', href: '/business/missing' },
      { name: '기업 리스크·보안', href: '/business/corporate' },
    ]
  },
  { 
    name: 'FRAMEWORK', 
    href: '/framework/model',
    children: [
      { name: '분쟁 해결 모델', href: '/framework/model' },
    ]
  },
  { 
    name: 'PORTFOLIO', 
    href: '/portfolio/performance',
    children: [
      { name: '기대성과', href: '/portfolio/performance' },
    ]
  },
  { 
    name: 'CONTACT', 
    href: '/contact',
    children: [
      { name: '예약 및 문의', href: '/contact' },
    ]
  },
];

function NavDropdown({ item, isScrolled }: { item: NavItem; isScrolled: boolean; key?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to={item.href}
        className={cn(
          "text-[15px] tracking-[0.2em] font-medium transition-colors flex items-center gap-1.5 py-6",
          location.pathname.startsWith(item.href.split('/')[1]) ? "text-brand-gold" : "hover:text-brand-gold"
        )}
      >
        {item.name}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
      </Link>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 bg-brand-charcoal border border-white/10 min-w-[220px] py-5 shadow-2xl backdrop-blur-xl bg-opacity-95"
          >
            {item.children?.map((child) => (
              <Link
                key={child.name}
                to={child.href}
                className="block px-8 py-3 text-[14px] tracking-widest text-white/60 hover:text-brand-gold hover:bg-white/5 transition-all outline-none focus:text-brand-gold"
              >
                {child.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-6 py-3 lg:px-12',
        (isScrolled || isMobileMenuOpen) ? 'bg-brand-charcoal border-b border-white/5 backdrop-blur-md py-2' : 'bg-transparent'
      )}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center py-6 flex-shrink-0">
          <h1 className="text-2xl lg:text-[32px] font-serif tracking-[0.4em] font-light leading-none">
            SUNJIN
          </h1>
          <span className="text-[9px] lg:text-[11px] tracking-[0.6em] font-sans opacity-50 mt-2 uppercase">
            Investigation
          </span>
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center justify-end gap-12 flex-1">
          {navLinks.map((link) => (
            <NavDropdown key={link.name} item={link} isScrolled={isScrolled} />
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 relative z-[70]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-brand-charcoal z-50 pt-[100px] overflow-y-auto"
          >
            <div className="p-8 space-y-2">
              {/* Mobile Menu Logo */}
              <div className="flex flex-col items-center mb-16 opacity-30">
                <h1 className="text-2xl font-serif tracking-[0.4em] font-light leading-none">
                  SUNJIN
                </h1>
                <span className="text-[9px] tracking-[0.6em] font-sans mt-2 uppercase">
                  Investigation
                </span>
                <div className="w-8 h-[1px] bg-white/20 mt-6" />
              </div>

              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-white/5 last:border-0 overflow-hidden">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                    className="w-full flex items-center justify-between py-6 text-[15px] tracking-[0.3em] font-light text-left"
                  >
                    {link.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpanded === link.name && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === link.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white/5 mb-4"
                      >
                        {link.children?.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-6 py-4 text-[14px] tracking-widest text-white/60 hover:text-brand-gold"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
