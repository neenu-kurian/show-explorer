"use client"
import { useRef } from "react";

export const useObserverRef = (callback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const setObserverRef = (node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    if (node) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });
      observer.current.observe(node);
    }
  };
  return setObserverRef;
};
