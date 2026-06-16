import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

let registered = false;

export function registerGSAP() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
  registered = true;
}

export const THEME = {
  obsidian: "#0b0a08",
  obsidianDeep: "#050505",
  obsidianRaised: "#14120f",
  gold: "#caa24a",
  goldBright: "#e8c873",
  crimson: "#7a1228",
  crimsonDeep: "#4a0a18",
  ivory: "#ece3cf",
  lapis: "#1f3a5f",
};

export const EASE = {
  silk: "power3.out",
  snap: "back.out(1.7)",
  drift: "sine.inOut",
  linear: "none",
};

export const DURATION = {
  fast: 0.35,
  base: 0.8,
  slow: 1.6,
};

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isTouchDevice() {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches
  );
}
