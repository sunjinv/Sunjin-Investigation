import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../components/Navbar';

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-brand-charcoal pt-32 pb-32 px-6 md:px-12 text-white/70">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-serif tracking-[0.2em] text-white">SITEMAP</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-16 lg:gap-x-24 mt-24 md:mt-32 pt-16 border-t border-white/5">
          {navLinks.map((category) => (
            <div key={category.name} className="space-y-8">
              <h2 className="text-[14px] md:text-[16px] font-sans font-medium tracking-[0.2em] text-white border-b border-white/5 pb-4 uppercase">
                {category.name}
              </h2>
              {category.children && category.children.length > 0 ? (
                <ul className="space-y-5">
                  {category.children.map((child) => (
                    <li key={child.name}>
                      <Link 
                        to={child.href} 
                        className="inline-block text-[16px] font-light tracking-wide text-white/50 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-5">
                  <li>
                    <Link 
                      to={category.href} 
                      className="inline-block text-[16px] font-light tracking-wide text-white/50 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out"
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
