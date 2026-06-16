import Navigation from "./components/Navigation.jsx";
import Hero from "./components/Hero.jsx";
import History from "./components/History.jsx";
import { registerGSAP } from "./utils/UIUtils.jsx";

registerGSAP();

export default function App() {
  return (
    <div className="relative min-h-screen bg-obsidian text-ivory">
      <Navigation />

      <main>
        <Hero />
        <History />

        <section
          id="legacy"
          className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-obsidian px-6 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold/70">
            2,500 years later
          </p>
          <h2 className="max-w-2xl font-display text-3xl uppercase leading-tight text-ivory sm:text-4xl">
            A king remembered less for what he conquered, more for what he gave
            back.
          </h2>
          <p className="max-w-xl font-body text-sm leading-relaxed text-ivory/60">
            This site is a personal project by Amir — built in React, GSAP and
            pure CSS 3D, with no rendering library, in tribute to Cyrus the
            Great and the terraces of Persepolis.
          </p>
        </section>
      </main>

      <footer className="border-t border-gold/15 bg-obsidian-deep px-6 py-8 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-ivory/40">
        amirmk13.ir — built with React · Tailwind · GSAP
      </footer>
    </div>
  );
}
