import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle, logout } from '../lib/firebase';
import { cn } from '../lib/utils';

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

const navLinks: NavItem[] = [
  { 
    name: 'COMPANY', 
    href: '#about',
    children: [
      { name: '브랜드 스토리', href: '#brand-story' },
      { name: '회사 소개', href: '#company-intro' },
      { name: '책임과 가치', href: '#responsibility' },
      { name: '핵심 역량', href: '#core-competency' },
    ]
  },
  { 
    name: 'BUSINESS', 
    href: '#expertise',
    children: [
      { name: '이혼·가사 조사', href: '#divorce' },
      { name: '소송·증거 조사', href: '#litigation' },
      { name: '불법장치탐지 및 포렌식', href: '#tscm' },
      { name: '실종·소재 파악', href: '#missing' },
      { name: '기업 리스크·보안', href: '#corporate-risk' },
    ]
  },
  { 
    name: 'FRAMEWORK', 
    href: '#framework',
    children: [
      { name: '분쟁 해결 모델', href: '#model' },
    ]
  },
  { 
    name: 'PORTFOLIO', 
    href: '#portfolio',
    children: [
      { name: '기대성과', href: '#outcome' },
    ]
  },
  { 
    name: 'CONTACT', 
    href: '#reservation',
    children: [
      { name: '예약 및 문의', href: '#inquiry' },
    ]
  },
];

function NavDropdown({ item, isScrolled }: { item: NavItem; isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a
        href={item.href}
        className="text-[11px] tracking-[0.2em] font-medium hover:text-brand-gold transition-colors flex items-center gap-1.5 py-4"
      >
        {item.name}
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isOpen && "rotate-180")} />
      </a>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 bg-brand-charcoal border border-white/10 min-w-[200px] py-4 shadow-2xl backdrop-blur-xl bg-opacity-95"
          >
            {item.children?.map((child) => (
              <a
                key={child.name}
                href={child.href}
                className="block px-6 py-2.5 text-[10px] tracking-widest text-white/60 hover:text-brand-gold hover:bg-white/5 transition-all"
              >
                {child.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-2 md:px-12',
        isScrolled ? 'bg-brand-charcoal/90 border-b border-white/5 backdrop-blur-md py-1' : 'bg-transparent'
      )}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden lg:flex items-center gap-10 flex-1">
          {navLinks.slice(0, 3).map((link) => (
            <NavDropdown key={link.name} item={link} isScrolled={isScrolled} />
          ))}
        </div>

        {/* Logo */}
        <a href="/" className="flex flex-col items-center py-4">
          <h1 className="text-xl md:text-2xl font-serif tracking-[0.4em] font-light leading-none">
            SUNJIN
          </h1>
          <span className="text-[7px] md:text-[9px] tracking-[0.6em] font-sans opacity-50 mt-1 uppercase">
            Investigation
          </span>
        </a>

        {/* Right Links */}
        <div className="hidden lg:flex items-center justify-end gap-10 flex-1">
          {navLinks.slice(3).map((link) => (
            <NavDropdown key={link.name} item={link} isScrolled={isScrolled} />
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          {user ? (
            <div className="flex items-center gap-6">
              <button
                onClick={() => logout()}
                className="text-[10px] tracking-[0.2em] font-medium hover:text-brand-gold transition-colors opacity-70"
              >
                LOGOUT
              </button>
              {isAdmin && (
                 <a href="#admin" className="p-2 rounded-full border border-white/10 hover:border-brand-gold hover:bg-brand-gold/5 transition-all">
                    <User className="w-4 h-4 text-brand-gold" />
                 </a>
              )}
            </div>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="text-[10px] tracking-[0.2em] font-medium hover:text-brand-gold transition-colors opacity-70"
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[72px] bg-brand-charcoal z-40 lg:hidden overflow-y-auto"
          >
            <div className="p-8 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-white/5 last:border-0 overflow-hidden">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                    className="w-full flex items-center justify-between py-6 text-sm tracking-[0.3em] font-light"
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
                          <a
                            key={child.name}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-6 py-4 text-xs tracking-widest text-white/60 hover:text-brand-gold"
                          >
                            {child.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              <div className="pt-10 flex flex-col gap-4">
                {user ? (
                   <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                    className="w-full border border-white/10 py-5 text-xs tracking-widest font-bold"
                   >
                     LOGOUT
                   </button>
                ) : (
                   <button 
                    onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }} 
                    className="w-full bg-brand-gold text-black py-5 text-xs tracking-widest font-bold"
                   >
                     SIGN IN
                   </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
