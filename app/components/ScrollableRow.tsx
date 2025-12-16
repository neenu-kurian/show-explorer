"use client";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useEffect, useRef, useState } from "react";

const ScrollableRow = ({ children }: { children: React.ReactNode }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const setArrowsVisibility = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
    setShowLeftArrow(scrollContainer.scrollLeft > 5);
    setShowRightArrow(
      scrollContainer.scrollLeft + scrollContainer.clientWidth <
        scrollContainer.scrollWidth - 5
    );
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
    setArrowsVisibility();
    const resizeObserver = new ResizeObserver(() => {
      setArrowsVisibility();
    });
    resizeObserver.observe(scrollContainer);
    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  const scrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft - 300,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft + 300,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative group">
      <div
        className="overflow-x-scroll"
        ref={scrollContainerRef}
        onScroll={setArrowsVisibility}
      >
        <GoChevronLeft
          size={35}
          onClick={scrollLeft}
          className={`absolute z-20 left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            showLeftArrow ? "" : "hidden"
          }`}
        />
        {children}
        <GoChevronRight
          size={35}
          onClick={scrollRight}
          className={`absolute z-20 right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            showRightArrow ? "" : "hidden"
          }`}
        />
      </div>
    </div>
  );
};

export default ScrollableRow;
