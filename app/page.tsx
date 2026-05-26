import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream">
      {/* Decorative background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(201,160,160,0.18) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(143,175,143,0.12) 0%, transparent 55%)",
        }}
      />

      {/* Fine line decoration top */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-dusty-rose" />
        <div className="w-1 h-1 rounded-full bg-dusty-rose" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto animate-fade-up">
        {/* Eyebrow */}
        <p
          className="text-dusty-rose tracking-[0.25em] uppercase text-xs font-dmsans mb-8"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          A moment to remember
        </p>

        {/* Couple names */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl text-[#3a3333] leading-none mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
        >
          Ananya
          <span className="block text-dusty-rose italic" style={{ fontWeight: 300 }}>
            &amp; Atip
          </span>
        </h1>

        {/* Date */}
        <p
          className="text-[#8a7070] tracking-widest text-sm font-light mt-6 mb-12"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          25 · 05 · 2025
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-dusty-rose-light" />
          <div className="w-1.5 h-1.5 rounded-full bg-dusty-rose opacity-60" />
          <div className="h-px w-16 bg-dusty-rose-light" />
        </div>

        {/* CTA */}
        <Link
          href="/gallery"
          className="inline-block border border-dusty-rose text-dusty-rose hover:bg-dusty-rose hover:text-white transition-all duration-300 tracking-[0.2em] uppercase text-xs px-10 py-4"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          View Gallery
        </Link>
      </div>

      {/* Fine line decoration bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-1 h-1 rounded-full bg-dusty-rose" />
        <div className="w-px h-12 bg-dusty-rose" />
      </div>

      {/* Subtle footer note */}
      <p
        className="absolute bottom-6 right-8 text-[10px] tracking-widest text-[#c5b0b0] uppercase opacity-60"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        Si Sa Ket, Thailand
      </p>
    </main>
  );
}
