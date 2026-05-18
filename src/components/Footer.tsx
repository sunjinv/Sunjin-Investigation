import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white/40 py-16 px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-xl lg:text-2xl font-serif tracking-[0.3em] font-light text-white mb-2 uppercase">
            Sunjin
          </h2>
          <span className="text-[8px] lg:text-[10px] tracking-[0.5em] font-sans opacity-60 block">
            INVESTIGATION
          </span>
        </div>

        <div className="w-full relative flex items-center justify-center mb-10">
          <button
            onClick={scrollToTop}
            className="hidden lg:flex absolute right-0 group flex-col items-center justify-center transition-all duration-500"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-gold text-white/40 group-hover:text-brand-gold transition-colors">
              <ArrowUp size={16} strokeWidth={1} />
            </div>
          </button>

          <div className="flex gap-4">
            <Link 
              to="/terms" 
              className="text-[12px] tracking-widest text-white/60 hover:text-brand-gold transition-all outline-none focus:text-brand-gold"
            >
              이용약관
            </Link>
            <span className="text-white/20">|</span>
            <Link 
              to="/privacy" 
              className="text-[12px] tracking-widest text-white/60 hover:text-brand-gold transition-all outline-none focus:text-brand-gold"
            >
              개인정보처리방침
            </Link>
            <span className="text-white/20">|</span>
            <Link 
              to="/sitemap" 
              className="text-[12px] tracking-widest text-white/60 hover:text-brand-gold transition-all outline-none focus:text-brand-gold"
            >
              사이트맵
            </Link>
          </div>
        </div>

        <div className="w-full text-center text-[10px] tracking-[0.2em] space-y-4">
          <p>COPYRIGHT © 2024 SUNJIN INVESTIGATION. ALL RIGHTS RESERVED.</p>
        </div>

        <div className="mt-8 w-full flex justify-end items-end">
           <div className="flex items-center gap-6">
             <button
               onClick={scrollToTop}
               className="lg:hidden group flex flex-col items-center justify-center transition-all duration-500"
             >
               <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-gold text-white/40 group-hover:text-brand-gold transition-colors">
                 <ArrowUp size={16} strokeWidth={1} />
               </div>
             </button>
           </div>
        </div>
      </div>
    </footer>
  );
}
