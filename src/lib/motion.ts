import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EASE_STANDARD = "power3.out";

const MOTION = {
  reveal: { duration: 0.46, y: 16 },
  stagger: { duration: 0.38, y: 12, each: 0.07 },
  hero: {
    badgeDuration: 0.34,
    titleDuration: 0.72,
    subtitleDuration: 0.45,
    ctaDuration: 0.34,
    visualDuration: 0.62,
  },
  hover: { duration: 0.2, y: -2 },
  parallax: { yPercent: -4, scrub: 0.65 },
} as const;

type Cleanup = () => void;

type RevealKind = "fade-up" | "fade-left" | "fade-right" | "scale-in" | "clip-up" | "clip-right";

function getRevealKind(el: HTMLElement): RevealKind {
  if (el.dataset.reveal) {
    const rawKind = el.dataset.reveal;
    return (rawKind === "up" ? "fade-up" : rawKind) as RevealKind;
  }

  if (el.classList.contains("motion-reveal-left")) return "fade-left";
  if (el.classList.contains("motion-reveal-right")) return "fade-right";
  return "fade-up";
}

function getRevealFrom(kind: RevealKind) {
  const from = { opacity: 0, x: 0, y: MOTION.reveal.y, scale: 1 };

  if (kind === "fade-left") {
    from.x = 24;
    from.y = 0;
  } else if (kind === "fade-right") {
    from.x = -24;
    from.y = 0;
  } else if (kind === "scale-in") {
    from.scale = 0.97;
    from.y = 12;
  }

  return from;
}

export function initReveal(root: ParentNode = document): void {
  const revealTargets = root.querySelectorAll<HTMLElement>(
    "[data-reveal], .motion-reveal-up, .motion-reveal-left, .motion-reveal-right",
  );

  revealTargets.forEach((el) => {
    const kind = getRevealKind(el);
    const from = getRevealFrom(kind);

    const clipFrom = kind === "clip-up" ? "inset(100% 0 0 0)" : kind === "clip-right" ? "inset(0 100% 0 0)" : undefined;

    gsap.fromTo(
      el,
      {
        ...from,
        ...(clipFrom ? { clipPath: clipFrom } : {}),
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clipPath: "inset(0 0 0 0)",
        duration: MOTION.reveal.duration,
        ease: EASE_STANDARD,
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true,
        },
      },
    );
  });
}

export function initStagger(root: ParentNode = document): void {
  const staggerGroups = root.querySelectorAll<HTMLElement>("[data-stagger], .motion-stagger");

  staggerGroups.forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>("[data-stagger-item], .motion-stagger-item");
    if (!items.length) return;

    gsap.from(items, {
      y: MOTION.stagger.y,
      opacity: 0,
      duration: MOTION.stagger.duration,
      stagger: MOTION.stagger.each,
      ease: EASE_STANDARD,
      scrollTrigger: {
        trigger: group,
        start: "top 86%",
        once: true,
      },
    });
  });
}

export function initHeroMotion(root: ParentNode = document): void {
  const hero = root.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;

  const badge = hero.querySelector<HTMLElement>('[data-hero-el="badge"]');
  const title = hero.querySelector<HTMLElement>('[data-hero-el="title"]');
  const subtitle = hero.querySelector<HTMLElement>('[data-hero-el="subtitle"]');
  const ctas = hero.querySelector<HTMLElement>('[data-hero-el="ctas"]');
  const visual = hero.querySelector<HTMLElement>('[data-hero-el="visual"]');
  const floats = hero.querySelectorAll<HTMLElement>('[data-hero-el="float"]');
  const hint = hero.querySelector<HTMLElement>(".hero-scroll-hint span");

  const timeline = gsap.timeline({ defaults: { ease: EASE_STANDARD } });

  if (badge) timeline.from(badge, { y: 10, opacity: 0, duration: MOTION.hero.badgeDuration });
  if (title) {
    const titleLines = title.querySelectorAll(".hero-video-mask__fallback span, .hero-title-line");
    if (titleLines.length) {
      timeline.from(titleLines, { yPercent: 100, opacity: 0, stagger: 0.1, duration: MOTION.hero.titleDuration }, "-=0.14");
    } else {
      timeline.from(title, { y: 16, opacity: 0, duration: MOTION.hero.titleDuration }, "-=0.16");
    }
  }
  if (subtitle) timeline.from(subtitle, { y: 12, opacity: 0, duration: MOTION.hero.subtitleDuration }, "-=0.24");
  if (ctas?.children.length) {
    timeline.from(
      ctas.children,
      {
        y: 9,
        opacity: 0,
        duration: MOTION.hero.ctaDuration,
        stagger: 0.06,
      },
      "-=0.2",
    );
  }
  if (visual) timeline.from(visual, { x: 18, opacity: 0, duration: MOTION.hero.visualDuration }, "-=0.26");
  if (hint) {
    timeline.from(hint, { y: 8, opacity: 0, duration: 0.3 }, "-=0.15");
    gsap.to(hint, { y: 5, duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true });
  }

  if (floats.length) {
    timeline.from(floats, { y: 8, opacity: 0, duration: 0.32, stagger: 0.1 }, "-=0.24");
  }

  floats.forEach((el, index) => {
    gsap.to(el, {
      y: index % 2 === 0 ? -7 : 7,
      duration: 2.6 + index * 0.3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
}

export function initParallax(root: ParentNode = document): void {
  const parallaxTargets = root.querySelectorAll<HTMLElement>("[data-parallax]");
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (isMobile) return;

  parallaxTargets.forEach((el) => {
    const yPercent = Number(el.dataset.parallax) || MOTION.parallax.yPercent;

    gsap.to(el, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: MOTION.parallax.scrub,
      },
    });
  });
}

export function initCardHover(root: ParentNode = document): Cleanup {
  const hoverTargets = Array.from(root.querySelectorAll<HTMLElement>(".card-hover"));
  const listeners: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = [];

  hoverTargets.forEach((el) => {
    const enter = () => {
      gsap.to(el, {
        y: MOTION.hover.y,
        duration: MOTION.hover.duration,
        ease: EASE_STANDARD,
        overwrite: "auto",
      });
    };

    const leave = () => {
      gsap.to(el, {
        y: 0,
        duration: MOTION.hover.duration,
        ease: EASE_STANDARD,
        overwrite: "auto",
      });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    listeners.push({ el, enter, leave });
  });

  return () => {
    listeners.forEach(({ el, enter, leave }) => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform" });
    });
  };
}

export function cleanupMotion(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

export function initMotionSystem(root: ParentNode = document): Cleanup {
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return () => {};

  const scope = root instanceof Element ? root : document.body;
  const context = gsap.context(() => {
    initHeroMotion(root);
    initReveal(root);
    initStagger(root);
    initParallax(root);
  }, scope);

  const removeHoverListeners = initCardHover(root);
  const refreshOnLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", refreshOnLoad, { once: true });

  return () => {
    window.removeEventListener("load", refreshOnLoad);
    removeHoverListeners();
    context.revert();
  };
}
