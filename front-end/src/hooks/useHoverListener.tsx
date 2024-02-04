import { useState, useEffect, useRef, type RefObject } from "react";

export function useHoverListener<T extends HTMLElement>(): [
  RefObject<T>,
  boolean
] {
  const [isHovered, setIsHovered] = useState(false);
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const target = targetRef.current;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    if (target) {
      target.addEventListener("mouseenter", handleMouseEnter);
      target.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [targetRef]);

  return [targetRef, isHovered];
}
