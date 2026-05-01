export default function Footer({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  return (
    <footer className="bg-black text-white/40 py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif tracking-[0.3em] font-light text-white mb-2">
            SUNJIN
          </h2>
          <span className="text-[10px] tracking-[0.5em] font-sans opacity-60">
            INVESTIGATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-center md:text-left text-[10px] tracking-[0.2em]">
          <div className="space-y-2">
            <h4 className="text-white/60 mb-4">ADDRESS</h4>
            <p>123 Teheran-ro, Gangnam-gu, Seoul</p>
            <p>South Korea 06000</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white/60 mb-4">CONTACT</h4>
            <p>T +82 2 1234 5678</p>
            <p>E ops.yu@sunjinv.com</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white/60 mb-4">LEGAL</h4>
            <p>Registration No. 000-00-00000</p>
            <p>© 2024 SUNJIN INVESTIGATION. ALL RIGHTS RESERVED.</p>
          </div>
        </div>

        <div className="mt-16 w-full flex justify-end">
           <button 
             onClick={onOpenAdmin}
             className="text-[9px] opacity-20 hover:opacity-100 transition-opacity uppercase tracking-tighter"
           >
             Admin
           </button>
        </div>
      </div>
    </footer>
  );
}
