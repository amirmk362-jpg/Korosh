import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import {
  EASE,
  DURATION,
  prefersReducedMotion,
  isTouchDevice,
} from "../utils/UIUtils.jsx";

const FACES = [
  {
    era: "c. 600 BCE",
    title: "Anshan",
    text: "Born to the house of a minor Persian vassal king, on the eastern edge of the Elamite world.",
  },
  {
    era: "550 BCE",
    title: "Media",
    text: "Cyrus overthrows his grandfather Astyages and unites Persians and Medes under one crown.",
  },
  {
    era: "547 BCE",
    title: "Lydia",
    text: "Sardis falls. Croesus's wealth, and the Aegean coast, pass into Persian hands.",
  },
  {
    era: "539 BCE",
    title: "Babylon",
    text: "The city's gates open without a siege; Marduk's priests greet Cyrus as a liberator, not a conqueror.",
  },
  {
    era: "539 BCE",
    title: "The Cylinder",
    text: "A baked-clay decree, buried in Babylon's foundations, records the return of exiled peoples and their gods.",
  },
  {
    era: "530 BCE",
    title: "Pasargadae",
    text: "Cyrus is laid to rest beneath a six-stepped plinth, in the garden city he built for himself.",
  },
];

const FACE_COUNT = FACES.length;
const FACE_ANGLE = 360 / FACE_COUNT;
// FACE_DEPTH: tuned for the h-72/w-72 (md:h-80/w-80) box below.
// If you resize the monument, scale this roughly proportionally (depth ≈ 0.85 × box width).
const FACE_DEPTH = 240;

export default function Hero() {
  const sceneRef = useRef(null);
  const monumentRef = useRef(null);
  const proxyRef = useRef(null);
  const rotation = useRef({ dragX: 0, dragY: 0, tiltX: 0, tiltY: 0, flip: 0 });

  function render() {
    const r = rotation.current;
    gsap.set(monumentRef.current, {
      rotateX: r.dragX + r.tiltX,
      rotateY: r.dragY + r.tiltY + r.flip,
    });
  }

  useGSAP(() => {
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const cleanups = [];

      const [draggable] = Draggable.create(proxyRef.current, {
        type: "x,y",
        inertia: !reduced,
        allowNativeTouchScrolling: false,
        onPress() {
          gsap.killTweensOf(rotation.current);
        },
        onDrag: updateFromProxy,
        onThrowUpdate: updateFromProxy,
        onClick() {
          gsap.to(rotation.current, {
            flip: rotation.current.flip + 180,
            // FLIP SPEED / CHARACTER: lower duration = quicker flip;
            // swap EASE.snap for "power2.out" for a calmer, less bouncy reveal.
            duration: DURATION.slow,
            ease: EASE.snap,
            onUpdate: render,
          });
        },
      });
      cleanups.push(() => draggable.kill());

      function updateFromProxy() {
        // SPIN SENSITIVITY: raise these multipliers for a twitchier drag,
        // lower them for something heavier and more monumental.
        rotation.current.dragY = this.x * 0.4;
        rotation.current.dragX = gsap.utils.clamp(-22, 22, -this.y * 0.22);
        render();
      }

      if (!isTouchDevice() && !reduced) {
        const handlePointerMove = (e) => {
          const rect = sceneRef.current.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(rotation.current, {
            // TILT INTENSITY: degrees of lean at the edge of the hero section.
            tiltY: px * 18,
            tiltX: py * -14,
            duration: 0.6,
            ease: EASE.silk,
            overwrite: "auto",
            onUpdate: render,
          });
        };
        sceneRef.current.addEventListener("pointermove", handlePointerMove);
        cleanups.push(() =>
          sceneRef.current?.removeEventListener(
            "pointermove",
            handlePointerMove,
          ),
        );
      }

      if (!reduced) {
        gsap.to(rotation.current, {
          dragY: "+=360",
          duration: 90, // IDLE SPIN SPEED: a full rotation every 90s
          ease: EASE.linear,
          repeat: -1,
          onUpdate: render,
        });
      }

      return () => cleanups.forEach((fn) => fn());
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sceneRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian px-6 pt-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/10 blur-[160px]" />

      <div className="relative z-10 grid w-full max-w-6xl items-center gap-16 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold/80">
            559–530 BCE · Achaemenid Persia
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[1.1] text-ivory sm:text-5xl lg:text-6xl">
            Cyrus
            <br /> the Great
          </h1>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-ivory/70 sm:text-base">
            Drag the cylinder to turn it. Click it to flip through the six faces
            of an empire built, by Cyrus's own account, on returning rather than
            taking.
          </p>
        </div>

        <div className="perspective-1600 relative order-1 flex h-[420px] items-center justify-center md:order-2 md:h-[520px]">
          <div
            ref={monumentRef}
            className="preserve-3d relative h-72 w-72 md:h-80 md:w-80"
          >
            {FACES.map((face, i) => (
              <div
                key={face.title}
                // SHADOW INTENSITY: deepen rgba alpha below for more dramatic depth between faces.
                className="backface-hidden absolute inset-0 flex flex-col justify-center gap-2 rounded-sm border border-gold/30 bg-gradient-to-b from-obsidian-raised to-obsidian-deep p-6 text-center shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                style={{
                  transform: `rotateY(${i * FACE_ANGLE}deg) translateZ(${FACE_DEPTH}px)`,
                }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/70">
                  {face.era}
                </span>
                <h3 className="font-display text-xl uppercase text-ivory">
                  {face.title}
                </h3>
                <p className="font-body text-xs leading-relaxed text-ivory/60">
                  {face.text}
                </p>
              </div>
            ))}
          </div>

          <div
            ref={proxyRef}
            className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
