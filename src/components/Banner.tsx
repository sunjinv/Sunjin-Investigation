export default function Banner() {
  return (
    <section className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 grayscale opacity-20">
         <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
            alt="Office" 
            className="w-full h-full object-cover"
         />
      </div>
      <div className="relative z-10 text-center text-brand-charcoal px-6 lg:px-24">
        <h2 className="text-3xl lg:text-7xl font-serif tracking-[0.2em] lg:tracking-[0.3em] mb-8 lg:mb-10">
          SUNJIN INVESTIGATION
        </h2>
        <div className="w-16 lg:w-24 h-[1px] bg-brand-charcoal mx-auto mb-8 lg:mb-10" />
        <p className="text-xs lg:text-base tracking-[0.4em] lg:tracking-[0.6em] font-medium opacity-70 break-keep leading-relaxed">
          타협하지 않는 원칙, 철저한 기밀 유지 시스템.
        </p>
      </div>
    </section>
  );
}
