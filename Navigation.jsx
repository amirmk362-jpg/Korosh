import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION } from "../utils/UIUtils.jsx";

const LINKS = [
  { href: "#hero", label: "Anshan" },
  { href: "#history", label: "Annals" },
  { href: "#legacy", label: "Legacy" },
];

export default function Navigation() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const scrolled = self.scroll() > 48;
          gsap.to(navRef.current, {
            backgroundColor: scrolled ? "rgba(5,5,5,0.62)" : "rgba(5,5,5,0)",
            backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
            borderColor: scrolled
              ? "rgba(202,162,74,0.28)"
              : "rgba(202,162,74,0)",
            duration: DURATION.fast,
            ease: EASE.silk,
            overwrite: "auto",
          });
        },
      });

      return () => trigger.kill();
    });

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 border-b border-transparent"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#hero"
          className="font-display text-sm uppercase tracking-[0.35em] text-ivory"
        >
          amirmk<span className="text-gold">13</span>
        </a>

        <ul className="hidden gap-10 font-body text-xs uppercase tracking-[0.25em] text-ivory/80 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-gold">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-gold transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-gold transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-gold transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-4 border-t border-gold/15 bg-obsidian-deep/95 px-6 py-6 font-body text-sm uppercase tracking-[0.25em] text-ivory/80 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
