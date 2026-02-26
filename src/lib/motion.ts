import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EASE_STANDARD = "power2.out";

const MOTION = {
  reveal: { duration: 0.96, distance: 24, stagger: 0.09 },
  hero: {
    badgeDuration: 0.36,
    titleDuration: 0.84,
    subtitleDuration: 0.52,
    ctaDuration: 0.36,
    visualDuration: 0.7,
  },
  hover: { duration: 0.2, y: -2 },
  parallax: { yPercent: -4, scrub: 0.65 },
} as const;

type Cleanup = () => void;

type RevealDirection = "left" | "right" | "up" | "down";

type RevealKind = RevealDirection | "scale-in" | "clip-up" | "clip-right";

const AUTO_REVEAL_PATTERN: RevealDirection[] = [
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "up",
  "down",
];

function isRevealKind(value: string): value is RevealKind {
  return ["left", "right", "up", "down", "scale-in", "clip-up", "clip-right"].includes(value);
}

function getDirectionalOffset(direction: RevealDirection, distance = MOTION.reveal.distance) {
  if (direction === "left") return { x: -distance, y: 0 };
  if (direction === "right") return { x: distance, y: 0 };
  if (direction === "down") return { x: 0, y: distance };
  return { x: 0, y: -distance };
}

function getAutoDirection(index: number): RevealDirection {
  return AUTO_REVEAL_PATTERN[index % AUTO_REVEAL_PATTERN.length];
}

function getRevealDirection(el: HTMLElement, index: number): RevealKind {
  const raw = el.dataset.reveal?.trim().toLowerCase();

  if (raw && raw !== "auto") {
    const normalized =
      raw === "left"
        ? "left"
        : raw === "right"
          ? "right"
          : raw === "fade-up" || raw === "up"
            ? "up"
            : raw === "fade-down" || raw === "down"
              ? "down"
              : raw;

    if (isRevealKind(normalized)) return normalized;
  }

  if (el.classList.contains("motion-reveal-left")) return "left";
  if (el.classList.contains("motion-reveal-right")) return "right";
  if (el.classList.contains("motion-reveal-up")) return "up";

  return getAutoDirection(index);
}

function setRevealWillChange(el: HTMLElement) {
  el.classList.add("reveal-item");
}

function clearRevealWillChange(el: HTMLElement) {
  el.classList.remove("reveal-item");
}

function setRevealState(el: HTMLElement, kind: RevealKind, reduceMotion: boolean) {
  if (reduceMotion) {
    gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "clipPath" });
    return;
  }

  const from = { opacity: 0, x: 0, y: 0, scale: 1 };

  if (kind === "scale-in") {
    from.scale = 0.98;
    from.y = 16;
  } else if (kind === "clip-up") {
    from.y = 18;
  } else if (kind === "clip-right") {
    from.x = 20;
  } else {
    const offset = getDirectionalOffset(kind);
    from.x = offset.x;
    from.y = offset.y;
  }

  const clipFrom = kind === "clip-up" ? "inset(100% 0 0 0)" : kind === "clip-right" ? "inset(0 100% 0 0)" : undefined;

  gsap.set(el, {
    ...from,
    ...(clipFrom ? { clipPath: clipFrom } : {}),
  });
}

function animateReveal(elements: HTMLElement[], reduceMotion: boolean) {
  if (!elements.length) return;

  if (reduceMotion) {
    gsap.to(elements, {
      opacity: 1,
      duration: 0.12,
      stagger: 0.02,
      ease: "none",
      overwrite: "auto",
      onComplete: () => elements.forEach(clearRevealWillChange),
    });

    return;
  }

  gsap.to(elements, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    clipPath: "inset(0 0 0 0)",
    duration: MOTION.reveal.duration,
    ease: EASE_STANDARD,
    stagger: { each: MOTION.reveal.stagger, from: "start" },
    overwrite: "auto",
    onComplete: () => elements.forEach(clearRevealWillChange),
  });
}

export function initReveals(root: ParentNode = document): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const groups = root.querySelectorAll<HTMLElement>("[data-reveal-group]");
  const groupedItems = new Set<HTMLElement>();

  groups.forEach((group) => {
    const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length) return;

    items.forEach((el, index) => {
      const kind = getRevealDirection(el, index);
      setRevealWillChange(el);
      setRevealState(el, kind, reduceMotion);
      groupedItems.add(el);
    });

    ScrollTrigger.batch(items, {
      start: "top 85%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: (batch) => animateReveal(batch as HTMLElement[], reduceMotion),
    });
  });

  const singularItems = Array.from(
    root.querySelectorAll<HTMLElement>(
      "[data-reveal], .motion-reveal-up, .motion-reveal-left, .motion-reveal-right",
    ),
  ).filter((el) => !groupedItems.has(el));

  singularItems.forEach((el, index) => {
    const kind = getRevealDirection(el, index);
    setRevealWillChange(el);
    setRevealState(el, kind, reduceMotion);

    if (reduceMotion) {
      gsap.to(el, {
        opacity: 1,
        duration: 0.12,
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => clearRevealWillChange(el),
      });

      return;
    }

    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: "inset(0 0 0 0)",
      duration: MOTION.reveal.duration,
      ease: EASE_STANDARD,
      overwrite: "auto",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
        invalidateOnRefresh: true,
      },
      onComplete: () => clearRevealWillChange(el),
    });
  });
}


export function initStagger(root: ParentNode = document): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const staggerGroups = root.querySelectorAll<HTMLElement>("[data-stagger], .motion-stagger");

  staggerGroups.forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>("[data-stagger-item], .motion-stagger-item");
    if (!items.length) return;

    items.forEach((item) => setRevealWillChange(item));

    if (reduceMotion) {
      gsap.fromTo(
        items,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.12,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: group,
            start: "top 92%",
            once: true,
            invalidateOnRefresh: true,
          },
          onComplete: () => items.forEach(clearRevealWillChange),
        },
      );

      return;
    }

    gsap.fromTo(
      items,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.82,
        stagger: 0.08,
        ease: EASE_STANDARD,
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => items.forEach(clearRevealWillChange),
      },
    );
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

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run = () => {
    const timeline = gsap.timeline({ defaults: { ease: EASE_STANDARD } });

    if (badge) timeline.fromTo(badge, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: MOTION.hero.badgeDuration });
    if (title) {
      const titleLines = title.querySelectorAll(".hero-video-mask__fallback span, .hero-title-line");
      if (titleLines.length) {
        timeline.fromTo(titleLines, { y: 26, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: MOTION.hero.titleDuration }, "-=0.08");
      } else {
        timeline.fromTo(title, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: MOTION.hero.titleDuration }, "-=0.12");
      }
    }
    if (subtitle) timeline.fromTo(subtitle, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: MOTION.hero.subtitleDuration }, "-=0.3");
    if (ctas?.children.length) {
      timeline.fromTo(
        ctas.children,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: MOTION.hero.ctaDuration,
          stagger: 0.08,
        },
        "-=0.24",
      );
    }
    if (visual) timeline.fromTo(visual, { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: MOTION.hero.visualDuration }, "-=0.24");
    if (hint) {
      timeline.fromTo(hint, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.26 }, "-=0.1");
      gsap.to(hint, { y: 5, duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true });
    }

    if (floats.length) {
      timeline.fromTo(floats, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.34, stagger: 0.08 }, "-=0.22");
    }
  };

  if (reduceMotion) {
    gsap.set([badge, title, subtitle, ctas, visual], { opacity: 1, x: 0, y: 0 });
    return;
  }

  requestAnimationFrame(() => {
    window.setTimeout(run, 180);
  });

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

  const scope = root instanceof Element ? root : document.body;
  const context = gsap.context(() => {
    initHeroMotion(root);
    initReveals(root);
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
