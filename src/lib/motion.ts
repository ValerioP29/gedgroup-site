import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EASE_STANDARD = "power3.out";

type MotionConfig = {
  reveal: { duration: number; distance: number; stagger: number };
  stagger: { duration: number; y: number; each: number };
  hero: {
    badgeDuration: number;
    titleDuration: number;
    subtitleDuration: number;
    ctaDuration: number;
    visualDuration: number;
    visualOffset: number;
    postPaintDelay: number;
  };
  hover: { duration: number; y: number };
  parallax: { yPercent: number; scrub: number };
};

const MOTION: MotionConfig = {
  reveal: { duration: 0.52, distance: 18, stagger: 0.06 },
  stagger: { duration: 0.46, y: 10, each: 0.085 },
  hero: {
    badgeDuration: 0.34,
    titleDuration: 0.72,
    subtitleDuration: 0.45,
    ctaDuration: 0.36,
    visualDuration: 0.6,
    visualOffset: 14,
    postPaintDelay: 180,
  },
  hover: { duration: 0.2, y: -2 },
  parallax: { yPercent: -4, scrub: 0.65 },
};

type Cleanup = () => void;
type RevealDirection = "left" | "right" | "up" | "down";
type RevealKind = RevealDirection | "clip-up" | "clip-right";

type BatchLike = ArrayLike<Element> | Element[];

const managedTargets = new Set<HTMLElement>();

function trackTargets(targets: Iterable<HTMLElement>): void {
  for (const el of targets) managedTargets.add(el);
}

function toHtmlElements(batch: BatchLike | null | undefined): HTMLElement[] {
  if (!batch) return [];
  return Array.from(batch).filter((el): el is HTMLElement => el instanceof HTMLElement);
}

function readResolvedKind(el: HTMLElement): RevealKind {
  const resolved = el.dataset.revealResolved;
  if (resolved === "left" || resolved === "right" || resolved === "up" || resolved === "down" || resolved === "clip-up" || resolved === "clip-right") {
    return resolved;
  }
  return "up";
}

function pickAutoDirection(index: number): RevealDirection {
  const mod = index % 10;
  if (mod === 0) return "up";
  if (mod === 5) return "down";
  return index % 2 === 0 ? "left" : "right";
}

function getRevealKind(el: HTMLElement, index: number): RevealKind {
  const raw = el.dataset.reveal;
  if (raw === "auto" || !raw) return pickAutoDirection(index);
  if (raw === "fade-left") return "left";
  if (raw === "fade-right") return "right";
  if (raw === "fade-up") return "up";
  if (raw === "clip-up" || raw === "clip-right") return raw;
  if (raw === "left" || raw === "right" || raw === "up" || raw === "down") return raw;
  return "up";
}

function getRevealFrom(kind: RevealKind): gsap.TweenVars {
  const from: gsap.TweenVars = { opacity: 0, x: 0, y: 0 };
  if (kind === "left") from.x = MOTION.reveal.distance;
  if (kind === "right") from.x = -MOTION.reveal.distance;
  if (kind === "up") from.y = MOTION.reveal.distance;
  if (kind === "down") from.y = -MOTION.reveal.distance;
  if (kind === "clip-up") {
    from.y = Math.round(MOTION.reveal.distance * 0.66);
    from.clipPath = "inset(100% 0 0 0)";
  }
  if (kind === "clip-right") {
    from.x = -Math.round(MOTION.reveal.distance * 0.66);
    from.clipPath = "inset(0 100% 0 0)";
  }
  return from;
}

function setReducedMotionState(root: ParentNode): void {
  const revealTargets = root.querySelectorAll<HTMLElement>("[data-reveal], .motion-reveal-up, .motion-reveal-left, .motion-reveal-right");
  const staggerItems = root.querySelectorAll<HTMLElement>("[data-stagger-item], .motion-stagger-item");
  const parallaxTargets = root.querySelectorAll<HTMLElement>("[data-parallax]");
  const hoverTargets = root.querySelectorAll<HTMLElement>(".card-hover");
  const hero = root.querySelector<HTMLElement>("[data-hero]");

  gsap.set([...revealTargets, ...staggerItems, ...parallaxTargets, ...hoverTargets], {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    clearProps: "clipPath,transform",
  });

  if (hero) {
    const heroTargets = hero.querySelectorAll<HTMLElement>(
      '[data-hero-el="badge"], [data-hero-el="title"], [data-hero-el="subtitle"], [data-hero-el="ctas"], [data-hero-el="visual"], [data-hero-el="float"]',
    );
    gsap.set(heroTargets, { opacity: 1, x: 0, y: 0, clearProps: "transform" });
  }
}

function getGroupRevealTargets(group: HTMLElement): HTMLElement[] {
  const inGroup = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal], .motion-reveal-up, .motion-reveal-left, .motion-reveal-right"));
  if (group.matches("[data-reveal], .motion-reveal-up, .motion-reveal-left, .motion-reveal-right")) {
    inGroup.unshift(group);
  }
  return inGroup;
}

function prepareRevealTarget(el: HTMLElement, index: number): void {
  const kind = getRevealKind(el, index);
  el.dataset.revealResolved = kind;
  gsap.set(el, getRevealFrom(kind));
  trackTargets([el]);
}

function animateRevealTarget(el: HTMLElement, delay = 0): void {
  const kind = readResolvedKind(el);
  const hasClip = kind === "clip-up" || kind === "clip-right";

  el.classList.add("reveal-item");

  gsap.to(el, {
    opacity: 1,
    x: 0,
    y: 0,
    duration: MOTION.reveal.duration,
    delay,
    ease: EASE_STANDARD,
    overwrite: "auto",
    ...(hasClip ? { clipPath: "inset(0 0 0 0)" } : {}),
    onComplete: () => {
      el.classList.remove("reveal-item");
      if (hasClip) gsap.set(el, { clearProps: "clipPath" });
    },
  });
}

export function initReveals(root: ParentNode = document): void {
  const groups = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-group]"));
  const groupedTargets = new Set<HTMLElement>();

  groups.forEach((group) => {
    const targets = getGroupRevealTargets(group);
    if (!targets.length) return;

    targets.forEach((el, index) => {
      groupedTargets.add(el);
      prepareRevealTarget(el, index);
    });

    ScrollTrigger.batch(targets, {
      start: "top 85%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: (batch) => {
        const elements = toHtmlElements(batch);
        elements.forEach((el, batchIndex) => {
          animateRevealTarget(el, batchIndex * MOTION.reveal.stagger);
        });
      },
    });
  });

  const standaloneTargets = Array.from(
    root.querySelectorAll<HTMLElement>("[data-reveal], .motion-reveal-up, .motion-reveal-left, .motion-reveal-right"),
  ).filter((el) => !groupedTargets.has(el));

  standaloneTargets.forEach((el, index) => {
    prepareRevealTarget(el, index);

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        animateRevealTarget(el);
      },
    });
  });
}

export function initStagger(root: ParentNode = document): void {
  const staggerGroups = root.querySelectorAll<HTMLElement>("[data-stagger], .motion-stagger");

  staggerGroups.forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>("[data-stagger-item], .motion-stagger-item");
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: MOTION.stagger.y });
    trackTargets(toHtmlElements(items));

    ScrollTrigger.create({
      trigger: group,
      start: "top 85%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: MOTION.stagger.duration,
          stagger: MOTION.stagger.each,
          ease: EASE_STANDARD,
          overwrite: "auto",
        });
      },
    });
  });
}

function waitForVisualMedia(visual: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const img = visual.querySelector("img") as HTMLImageElement | null;
    const video = visual.querySelector("video") as HTMLVideoElement | null;

    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        if (typeof img.decode === "function") {
          img.decode().then(resolve).catch(resolve);
        } else {
          resolve();
        }
        return;
      }

      const onDone = () => {
        if (typeof img.decode === "function") {
          img.decode().then(resolve).catch(resolve);
        } else {
          resolve();
        }
      };

      img.addEventListener("load", onDone, { once: true });
      img.addEventListener("error", onDone, { once: true });
      return;
    }

    if (video) {
      if (video.readyState >= 2) {
        resolve();
        return;
      }

      const onReady = () => resolve();
      video.addEventListener("loadeddata", onReady, { once: true });
      video.addEventListener("canplay", onReady, { once: true });
      video.addEventListener("error", onReady, { once: true });
      return;
    }

    resolve();
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

  trackTargets(toHtmlElements([...(floats ?? [])]));
  if (badge) trackTargets([badge]);
  if (title) trackTargets([title]);
  if (subtitle) trackTargets([subtitle]);
  if (ctas) trackTargets([ctas]);
  if (visual) trackTargets([visual]);
  if (hint) trackTargets([hint]);

  const timeline = gsap.timeline({ paused: true, defaults: { ease: EASE_STANDARD, immediateRender: false } });

  if (badge) timeline.from(badge, { y: 10, opacity: 0, duration: MOTION.hero.badgeDuration });

  if (title) {
    const titleLines = title.querySelectorAll(".hero-video-mask__fallback span, .hero-title-line");
    if (titleLines.length) {
      timeline.from(titleLines, { yPercent: 100, opacity: 0, stagger: 0.11, duration: MOTION.hero.titleDuration }, "-=0.14");
    } else {
      timeline.from(title, { y: 16, opacity: 0, duration: MOTION.hero.titleDuration }, "-=0.16");
    }
  }

  if (subtitle) timeline.from(subtitle, { y: 12, opacity: 0, duration: MOTION.hero.subtitleDuration }, "-=0.24");

  if (ctas?.children.length) {
    timeline.from(ctas.children, { y: 9, opacity: 0, duration: MOTION.hero.ctaDuration, stagger: 0.08 }, "-=0.2");
  }

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

  const startTimeline = () => {
    requestAnimationFrame(() => {
      window.setTimeout(() => timeline.play(0), MOTION.hero.postPaintDelay);
    });
  };

  startTimeline();

  if (!visual) return;

  gsap.set(visual, { opacity: 1, x: 0 });

  const media = visual.querySelector<HTMLElement>("video") ?? visual.querySelector<HTMLElement>("img");
  if (!media) return;

  gsap.set(media, { opacity: 0.001 });

  waitForVisualMedia(visual).then(() => {
    gsap.to(media, {
      opacity: 1,
      duration: MOTION.hero.visualDuration,
      ease: EASE_STANDARD,
      overwrite: "auto",
    });
  });
}

export function initParallax(root: ParentNode = document): void {
  const parallaxTargets = root.querySelectorAll<HTMLElement>("[data-parallax]");
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (isMobile) return;

  parallaxTargets.forEach((el) => {
    const yPercent = Number(el.dataset.parallax) || MOTION.parallax.yPercent;
    trackTargets([el]);

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

  trackTargets(hoverTargets);

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
    });
  };
}

export function cleanupMotion(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  if (managedTargets.size > 0) {
    gsap.killTweensOf(Array.from(managedTargets));
  }
}

export function initMotionSystem(root: ParentNode = document): Cleanup {
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    setReducedMotionState(root);
    return () => cleanupMotion();
  }

  const removeHoverListeners = initCardHover(root);
  initHeroMotion(root);
  initReveals(root);
  initStagger(root);
  initParallax(root);

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

  return () => {
    removeHoverListeners();
    cleanupMotion();
  };
}
