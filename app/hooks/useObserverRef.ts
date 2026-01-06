"use client";
import { useEffect, useRef } from "react";

export const useObserverRef = (callback: () => void): (node: HTMLDivElement | null) => void => {
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
  useEffect(() => {
    return () => {
      observer.current?.disconnect();
    };
  }, []);
  return setObserverRef;
};
