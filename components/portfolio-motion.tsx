"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import './portfolio-motion.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const DESKTOP_SEQUENCE = "(min-width: 1024px) and (min-height: 700px)";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const falseOnServer = () => false;

/** Only media-query changes render React. Scroll and pointer frames never do. */
function useMediaQuery(query: string) {
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", notify);
    return () => media.removeEventListener("change", notify);
  }, [query]);
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, snapshot, falseOnServer);
}

/** Render once at the page root. A decorative reading-position rail, not a live region. */
export function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.3 });
  return (
    <div className={`pm-scroll-progress ${className}`} aria-hidden="true">
      <m.span className="pm-scroll-progress__fill" style={{ scaleY: progress }} />
    </div>
  );
}

type ManifestoProps = {
  text?: string;
  className?: string;
  accentWords?: readonly string[];
};

/** Words gain contrast as the manifesto enters the viewport. The full sentence stays accessible. */
export function ScrollManifesto({
  text = "A little obsession. A lot of shipped code.",
  className = "",
  accentWords = ["shipped", "code."],
}: ManifestoProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.86", "end 0.4"] });
  const words = text.trim().split(/\s+/);
  return (
    <h2 ref={ref} className={`pm-manifesto ${className}`}>
      <span className="pm-sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <ManifestoWord
            key={`${index}-${word}`}
            word={word}
            index={index}
            total={words.length}
            progress={scrollYProgress}
            reduced={Boolean(reduced)}
            accent={accentWords.includes(word)}
          />
        ))}
      </span>
    </h2>
  );
}

function ManifestoWord({ word, index, total, progress, reduced, accent }: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
  accent: boolean;
}) {
  const start = (index / Math.max(total, 1)) * 0.7;
  const opacity = useTransform(progress, [start, start + 0.24], [0.27, 1]);
  return <><m.span className={`pm-manifesto__word${accent ? " pm-manifesto__word--accent" : ""}`} style={reduced ? undefined : { opacity }}>{word}</m.span>{index < total - 1 ? " " : null}</>;
}

/** Use at most once. This ribbon has no clock or loop: it only moves with the reader. */
export function KineticRibbon({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-19%"]);
  const phrases = ["Idea", "Interface", "System", "Ship"];
  return (
    <div ref={ref} className={`pm-ribbon ${className}`}>
      <p className="pm-sr-only">An idea becomes an interface, a system, and shipped work.</p>
      <m.div className="pm-ribbon__track" aria-hidden="true" style={reduced ? undefined : { x }}>
        {[0, 1].map(copy => (
          <span key={copy} className={`pm-ribbon__copy${copy ? " pm-ribbon__copy--duplicate" : ""}`}>
            {phrases.map((phrase, index) => <span className={`pm-ribbon__phrase${index % 2 ? " pm-ribbon__phrase--outline" : ""}`} key={phrase}>{phrase}<ArrowUpRight className="pm-ribbon__arrow" strokeWidth={1.3} /></span>)}
          </span>
        ))}
      </m.div>
    </div>
  );
}

type MagneticBase = { children: ReactNode; className?: string; strength?: number; maxDistance?: number };
type MagneticAnchor = MagneticBase & Omit<HTMLMotionProps<"a">, "children" | "className" | "style" | "whileTap" | "transition"> & { as?: "a"; href: string };
type MagneticButton = MagneticBase & Omit<HTMLMotionProps<"button">, "children" | "className" | "style" | "whileTap" | "transition"> & { as: "button" };

/** The outer hit area stays still, so the target never chases the pointer. Native links/buttons retain keyboard behavior. */
export function MagneticAction(props: MagneticAnchor | MagneticButton) {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery(FINE_POINTER);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.35 });
  const disabled = props.as === "button" && Boolean(props.disabled);
  const enabled = finePointer && !reduced && !disabled;
  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  useEffect(() => {
    if (!enabled) reset();
    return reset;
  }, [enabled, reset]);
  function move(event: PointerEvent<HTMLSpanElement>) {
    if (!enabled || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const strength = props.strength ?? 0.12;
    const limit = props.maxDistance ?? 8;
    const clamp = (value: number) => Math.max(-limit, Math.min(limit, value));
    x.set(clamp((event.clientX - box.left - box.width / 2) * strength));
    y.set(clamp((event.clientY - box.top - box.height / 2) * strength));
  }
  const common = {
    className: `pm-magnetic-action ${props.className ?? ""}`,
    style: enabled ? { x: springX, y: springY } : undefined,
    whileTap: reduced || disabled ? undefined : { scale: 0.975 },
    transition: { type: "spring" as const, stiffness: 450, damping: 28 },
  };
  let action: ReactNode;
  if (props.as === "button") {
    const { as, className, children, strength, maxDistance, ...buttonProps } = props;
    void as; void className; void strength; void maxDistance;
    action = <m.button {...buttonProps} {...common} type={props.type ?? "button"}>{children}</m.button>;
  } else {
    const { as, className, children, strength, maxDistance, ...anchorProps } = props;
    void as; void className; void strength; void maxDistance;
    action = <m.a {...anchorProps} {...common}>{children}</m.a>;
  }
  return <span className="pm-magnetic-shell" onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset} onFocusCapture={reset} onBlurCapture={reset}>{action}</span>;
}

/** A real separator that draws once when its content enters. No animated dimensions or SVG path work. */
export function InViewLine({ className = "", delay = 0, vertical = false }: { className?: string; delay?: number; vertical?: boolean }) {
  const reduced = useReducedMotion();
  const scale = vertical ? { scaleY: 0 } : { scaleX: 0 };
  return (
    <m.span
      aria-hidden="true"
      className={`pm-inview-line${vertical ? " pm-inview-line--vertical" : ""} ${className}`}
      initial={reduced ? false : { ...scale, opacity: 0.5 }}
      whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: EASE }}
    />
  );
}

const BUILD_STEPS = [
  { name: "Idea", statement: "Start with the right question.", detail: "Shape the problem before shaping the solution." },
  { name: "Interface", statement: "Make the next step clear.", detail: "React and Next.js interfaces, down to the interaction details." },
  { name: "System", statement: "Connect the moving parts.", detail: "Node.js services, Qdrant/CLIP vector search, and OpenRouter LLM integration." },
  { name: "Ship", statement: "Put the work into the world.", detail: "Release the working version. Keep refining what matters." },
] as const;

/**
 * A CSS sticky story, never a scroll hijack. CSS selects the desktop composition;
 * mobile, short windows, and reduced motion always receive a natural vertical list.
 */
export function MotionSequence({ className = "", id = "build-sequence" }: { className?: string; id?: string }) {
  const section = useRef<HTMLElement>(null);
  const headingId = useId();
  const reduced = useReducedMotion();
  const desktop = useMediaQuery(DESKTOP_SEQUENCE);
  const animated = desktop && !reduced;
  const settled = useMotionValue(1);
  return (
    <section ref={section} id={id} className={`pm-sequence ${className}`} aria-labelledby={headingId}>
      {animated ? <AnimatedSequence section={section} headingId={headingId} /> : <SequenceLayout headingId={headingId} progress={settled} animated={false} />}
    </section>
  );
}

/** The static phone/tablet layout doesn't need a scroll listener or a running spring. */
function AnimatedSequence({ section, headingId }: { section: RefObject<HTMLElement | null>; headingId: string }) {
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 170, damping: 34, mass: 0.4, restDelta: 0.001 });
  return <SequenceLayout headingId={headingId} progress={progress} animated />;
}

function SequenceLayout({ headingId, progress, animated }: { headingId: string; progress: MotionValue<number>; animated: boolean }) {
  return (
      <div className="pm-sequence__pin">
        <div className="pm-sequence__layout">
          <div className="pm-sequence__content">
            <header className="pm-sequence__heading">
              <h2 id={headingId}>Build sequence<span>.</span></h2>
              <p>The path from a useful idea to a working product.</p>
            </header>
            <ol className="pm-sequence__steps">
              {BUILD_STEPS.map((step, index) => <SequenceStep key={step.name} step={step} index={index} progress={progress} animated={animated} />)}
            </ol>
          </div>
          <div className="pm-sequence__board" aria-hidden="true">
            {BUILD_STEPS.map((step, index) => <SequenceScene key={step.name} index={index} progress={progress} animated={animated} />)}
          </div>
        </div>
      </div>
  );
}

function SequenceStep({ step, index, progress, animated }: {
  step: typeof BUILD_STEPS[number];
  index: number;
  progress: MotionValue<number>;
  animated: boolean;
}) {
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  const opacity = useTransform(progress,
    index === 0 ? [0, end - 0.07, end + 0.02] : index === 3 ? [start - 0.07, start + 0.02, 1] : [start - 0.07, start + 0.02, end - 0.07, end + 0.02],
    index === 0 ? [1, 1, 0.6] : index === 3 ? [0.6, 1, 1] : [0.6, 1, 1, 0.6]);
  const line = useTransform(progress, [start, end - 0.04], [0, 1]);
  return (
    <li className="pm-sequence__step">
      <m.div className="pm-sequence__step-copy">
        <m.h3 style={animated ? { opacity } : undefined}>{step.name}</m.h3>
        <div><p className="pm-sequence__statement">{step.statement}</p><p className="pm-sequence__detail">{step.detail}</p></div>
      </m.div>
      <span className="pm-sequence__step-rule" aria-hidden="true"><m.span style={animated ? { scaleX: line } : undefined} /></span>
      <div className="pm-sequence__mobile-graphic" aria-hidden="true"><BuildGraphic index={index} /></div>
    </li>
  );
}

function SequenceScene({ index, progress, animated }: { index: number; progress: MotionValue<number>; animated: boolean }) {
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  const opacity = useTransform(progress,
    index === 0 ? [0, end - 0.07, end + 0.02] : index === 3 ? [start - 0.07, start + 0.02, 1] : [start - 0.07, start + 0.02, end - 0.07, end + 0.02],
    index === 0 ? [1, 1, 0] : index === 3 ? [0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, [Math.max(0, start - 0.07), start + 0.02, end - 0.07, end + 0.02], [24, 0, 0, -24]);
  const local = useTransform(progress, [Math.max(0, start - 0.04), end - 0.07], [0, 1]);
  return (
    <m.div className={`pm-sequence__scene pm-sequence__scene--${index}`} style={animated ? { opacity, y } : undefined}>
      <BuildGraphic index={index} progress={animated ? local : undefined} />
    </m.div>
  );
}

function BuildGraphic({ index, progress }: { index: number; progress?: MotionValue<number> }) {
  const settled = useMotionValue(1);
  const value = progress ?? settled;
  if (index === 0) return <IdeaGraphic progress={value} />;
  if (index === 1) return <InterfaceGraphic progress={value} />;
  if (index === 2) return <SystemGraphic progress={value} />;
  return <ShipGraphic progress={value} />;
}

function IdeaGraphic({ progress }: { progress: MotionValue<number> }) {
  const rotate = useTransform(progress, [0, 1], [-9, -3]);
  const y = useTransform(progress, [0, 1], [12, 0]);
  const noteY = useTransform(progress, [0, 1], [16, -8]);
  return (
    <div className="pm-idea-graphic">
      <m.div className="pm-idea-graphic__question" style={{ rotate, y }}>What<br />if<span>?</span></m.div>
      <m.div className="pm-idea-graphic__notes" style={{ y: noteY }}><p>Who is it for?</p><p>What should it do?</p><p>What can be simpler?</p></m.div>
    </div>
  );
}

function InterfaceGraphic({ progress }: { progress: MotionValue<number> }) {
  const left = useTransform(progress, [0, 1], [-32, 0]);
  const right = useTransform(progress, [0, 1], [32, 0]);
  const line = useTransform(progress, [0.1, 0.75], [0, 1]);
  const y = useTransform(progress, [0, 1], [18, 0]);
  return (
    <div className="pm-interface-graphic">
      <m.span className="pm-interface-graphic__bracket" style={{ x: left }}>&lt;</m.span>
      <m.div className="pm-interface-graphic__type" style={{ y }}>Make<br /><span>it clear.</span><m.i className="pm-interface-graphic__baseline" style={{ scaleX: line }} /></m.div>
      <m.span className="pm-interface-graphic__bracket" style={{ x: right }}>&gt;</m.span>
    </div>
  );
}

/** These connectors organize actual stack labels; this is a diagram, not a simulated product screenshot. */
function SystemGraphic({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 1], [0.94, 1]);
  const edge = useTransform(progress, [0.05, 0.7], [0, 1]);
  const opacity = useTransform(progress, [0.15, 0.75], [0.25, 1]);
  return (
    <m.div className="pm-system-graphic" style={{ scale }}>
      <div className="pm-system-node pm-system-node--interface"><strong>React / Next.js</strong><span>Interface</span></div>
      <div className="pm-system-node pm-system-node--server"><strong>Node.js</strong><span>Application</span></div>
      <m.div className="pm-system-node pm-system-node--search" style={{ opacity }}><strong>Qdrant + CLIP</strong><span>Vector search</span></m.div>
      <m.div className="pm-system-node pm-system-node--llm" style={{ opacity }}><strong>OpenRouter</strong><span>LLM integration</span></m.div>
      <m.span className="pm-system-edge pm-system-edge--interface" style={{ scaleY: edge }} />
      <m.span className="pm-system-edge pm-system-edge--trunk" style={{ scaleX: edge }} />
      <m.span className="pm-system-edge pm-system-edge--branch" style={{ scaleY: edge }} />
      <m.span className="pm-system-edge pm-system-edge--search" style={{ scaleX: edge }} />
      <m.span className="pm-system-edge pm-system-edge--llm" style={{ scaleX: edge }} />
    </m.div>
  );
}

function ShipGraphic({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [40, 0]);
  const echoY = useTransform(progress, [0, 1], [-40, 0]);
  const echoOpacity = useTransform(progress, [0, 0.9], [0.5, 0]);
  const arrowX = useTransform(progress, [0, 1], [-24, 0]);
  const arrowY = useTransform(progress, [0, 1], [24, 0]);
  return (
    <div className="pm-ship-graphic">
      <m.span className="pm-ship-graphic__echo" style={{ y: echoY, opacity: echoOpacity }}>Ship.</m.span>
      <m.span className="pm-ship-graphic__word" style={{ y }}>Ship.</m.span>
      <m.span className="pm-ship-graphic__arrow" style={{ x: arrowX, y: arrowY }}><ArrowUpRight strokeWidth={1.1} /></m.span>
      <p>Release. Learn. Refine.</p>
    </div>
  );
}
