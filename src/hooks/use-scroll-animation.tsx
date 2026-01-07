import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  end?: string;
  toggleActions?: string;
  once?: boolean;
  markers?: boolean;
}

export const useScrollAnimation = (
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      start = "top 80%",
      end = "bottom 20%",
      toggleActions = "play none none none",
      once = true,
      markers = false,
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        from,
        {
          ...to,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            toggleActions,
            once,
            markers,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [options]);

  return elementRef;
};




