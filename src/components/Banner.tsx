export default function Banner() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 grayscale opacity-20">
         <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
            alt="Office" 
            className="w-full h-full object-cover"
         />
      </div>
      <div className="relative z-10 text-center text-brand-charcoal px-6">
        <h2 className="text-3xl md:text-5xl font-serif tracking-[0.2em] mb-6">
          SUNJIN INVESTIGATION
        </h2>
        <div className="w-16 h-[1px] bg-brand-charcoal mx-auto mb-6" />
        <p className="text-xs md:text-sm tracking-[0.4em] font-medium opacity-70 break-keep">
          타협하지 않는 원칙, 100% 기밀 유지 시스템.
        </p>
      </div>
    </section>
  );
}
