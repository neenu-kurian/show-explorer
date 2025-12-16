"use client";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const ScrollableRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative group">
      <GoChevronLeft size={35} className="absolute z-20 left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
      {children}
      <GoChevronRight size={35} className="absolute z-20 right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
    </div>
  );
};

export default ScrollableRow;
