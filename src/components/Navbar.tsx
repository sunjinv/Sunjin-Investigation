import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle, logout } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT US', href: '#about' },
    { name: 'EXPERTISE', href: '#expertise' },
    { name: 'RESERVATION', href: '#reservation' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 md:px-12',
        isScrolled ? 'bg-brand-charcoal/80 backdrop-blur-md py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.slice(0, 2).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs tracking-[0.2em] font-medium hover:text-brand-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Logo */}
        <a href="/" className="flex flex-col items-center">
          <h1 className="text-xl md:text-2xl font-serif tracking-[0.3em] font-light">
            SUNJIN
          </h1>
          <span className="text-[8px] md:text-[10px] tracking-[0.5em] font-sans opacity-60">
            INVESTIGATION
          </span>
        </a>

        {/* Right Links */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#reservation"
            className="text-xs tracking-[0.2em] font-medium hover:text-brand-gold transition-colors"
          >
            RESERVATION
          </a>
          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => logout()}
                className="text-xs tracking-[0.2em] font-medium hover:text-brand-gold transition-colors"
              >
                LOGOUT
              </button>
              {isAdmin && (
                 <a href="#admin" className="p-2 rounded-full border border-white/20 hover:border-brand-gold transition-colors">
                    <User className="w-4 h-4" />
                 </a>
              )}
            </div>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="text-xs tracking-[0.2em] font-medium hover:text-brand-gold transition-colors"
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-charcoal border-b border-white/10 p-8 flex flex-col items-center gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm tracking-[0.2em] font-medium"
              >
                {link.name}
              </a>
            ))}
            {user ? (
               <button onClick={() => logout()} className="text-sm tracking-[0.2em] font-medium text-brand-gold">LOGOUT</button>
            ) : (
               <button onClick={() => signInWithGoogle()} className="text-sm tracking-[0.2em] font-medium text-brand-gold">LOGIN</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
