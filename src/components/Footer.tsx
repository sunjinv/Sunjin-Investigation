import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white/40 py-12 px-6 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif tracking-[0.3em] font-light text-white mb-2">
            SUNJIN
          </h2>
          <span className="text-[10px] tracking-[0.5em] font-sans opacity-60">
            INVESTIGATION
          </span>
        </div>

        <div className="w-full relative flex items-center justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {[
              { name: 'COMPANY', href: '/company/story' },
              { name: 'BUSINESS', href: '/business/divorce' },
              { name: 'FRAMEWORK', href: '/framework/model' },
              { name: 'PORTFOLIO', href: '/portfolio/performance' },
              { name: 'CONTACT', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white/40 text-[10px] tracking-[0.6em] font-bold uppercase whitespace-nowrap hover:text-brand-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <button
            onClick={scrollToTop}
            className="hidden md:flex absolute right-0 group flex-col items-center justify-center transition-all duration-500"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-gold text-white/40 group-hover:text-brand-gold transition-colors">
              <ArrowUp size={16} strokeWidth={1} />
            </div>
          </button>
        </div>

        <div className="w-full text-center text-[10px] tracking-[0.2em] space-y-4">
          <p>COPYRIGHT © 2024 SUNJIN INVESTIGATION. ALL RIGHTS RESERVED.</p>
        </div>

        <div className="mt-8 w-full flex justify-between items-end">
           <div className="flex gap-4">
             {/* Left side placeholders if needed */}
           </div>
           
           <div className="flex items-center gap-6">
             <button 
               onClick={onOpenAdmin}
               className="text-[9px] opacity-20 hover:opacity-100 transition-opacity uppercase tracking-tighter"
             >
               Admin
             </button>
             
             <button
               onClick={scrollToTop}
               className="md:hidden group flex flex-col items-center justify-center transition-all duration-500"
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
