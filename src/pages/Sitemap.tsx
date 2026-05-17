import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../components/Navbar';

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-brand-charcoal pt-32 pb-24 px-6 md:px-12 text-white/70">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif tracking-[0.2em] text-white">SITEMAP</h1>
          <p className="text-white/40 tracking-widest text-sm">사이트맵</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-12 border-t border-white/10">
          {navLinks.map((category) => (
            <div key={category.name} className="space-y-6">
              <h2 className="text-xl font-serif tracking-[0.2em] text-brand-gold border-b border-brand-gold/20 pb-4">
                {category.name}
              </h2>
              {category.children && category.children.length > 0 ? (
                <ul className="space-y-3">
                  {category.children.map((child) => (
                    <li key={child.name}>
                      <Link 
                        to={child.href} 
                        className="text-[15px] font-light tracking-wide text-white/60 hover:text-white transition-colors"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to={category.href} 
                      className="text-[15px] font-light tracking-wide text-white/60 hover:text-white transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
