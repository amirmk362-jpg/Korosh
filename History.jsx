import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, prefersReducedMotion } from "../utils/UIUtils.jsx";

const MARKERS = [
  {
    id: "gate",
    title: "Gate of All Nations",
    era: "486 BCE",
    text: "Built under Darius and Xerxes, flanked by stone bulls with human heads, guarding the terrace at Persepolis.",
  },
  {
    id: "apadana",
    title: "The Apadana Staircase",
    era: "515 BCE",
    text: "Reliefs of twenty-three delegations climb the stairs, each nation bearing its own tribute toward the King of Kings.",
  },
  {
    id: "cylinder",
    title: "The Cyrus Cylinder",
    era: "539 BCE",
    text: "A foundation deposit in cuneiform, buried beneath Babylon, now read by historians as an early statement of restored rights.",
  },
  {
    id: "tomb",
    title: "Tomb at Pasargadae",
    era: "530 BCE",
    text: "Six receding steps support a single gabled chamber — modest beside Persepolis, and far older than it.",
  },
];

export default function History() {
  const sectionRef = useRef(null);
  const tunnelRef = useRef(null);

  useGSAP(() => {
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const markerEls = gsap.utils.toArray(".tunnel-marker", tunnelRef.current);

      if (reduced) {
        gsap.set(markerEls, { opacity: 1, z: 0, scale: 1 });
        return undefined;
      }

      const tl = gsap.timeline();
      markerEls.forEach((el, i) => {
        tl.fromTo(
          el,
          { z: -1500, opacity: 0, scale: 0.55 },
          // TUNNEL DEPTH: push -1500 further out for a longer approach.
          { z: 250, opacity: 1, scale: 1.08, duration: 1, ease: EASE.linear },
          i,
        ).to(
          el,
          { z: 900, opacity: 0, duration: 0.45, ease: EASE.linear },
          i + 0.75,
        );
      });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%", // SCROLL LENGTH: larger % = slower, longer tunnel ride
        pin: true,
        scrub: 1,
        animation: tl,
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="history"
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-obsidian-deep"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian-deep via-obsidian to-obsidian-deep opacity-90" />

      <div
        ref={tunnelRef}
        className="perspective-1600 preserve-3d relative z-10 flex h-full w-full items-center justify-center"
      >
        {MARKERS.map((m) => (
          <article
            key={m.id}
            className="tunnel-marker absolute w-[min(90vw,30rem)] rounded-sm border border-gold/25 bg-obsidian-raised/80 p-8 text-center shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-sm"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-crimson">
              {m.era}
            </p>
            <h3 className="mt-3 font-display text-2xl uppercase text-gold-bright sm:text-3xl">
              {m.title}
            </h3>
            <p className="mt-4 font-body text-sm leading-relaxed text-ivory/70">
              {m.text}
            </p>
          </article>
        ))}
      </div>

      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-ivory/40">
        scroll to walk the terrace
      </p>
    </section>
  );
}
