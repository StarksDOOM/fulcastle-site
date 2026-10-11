"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section:not(:first-child), main section article.group",
      ),
    );

    const pending = targets.filter(
      (target) => target.getBoundingClientRect().top > window.innerHeight * 0.85,
    );
    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-scroll-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    pending.forEach((target) => {
      target.classList.add("scroll-reveal-target");
      if (target.matches("article.group")) {
        const siblings = Array.from(target.parentElement?.querySelectorAll("article.group") ?? []);
        const index = siblings.indexOf(target);
        target.style.setProperty("--scroll-reveal-delay", `${Math.min(index * 90, 360)}ms`);
      }
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
