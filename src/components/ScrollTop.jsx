import React, { useEffect } from "react";
const ScrollTop = () => {
    return (
      <a
        href="#top"
        id="scroll-top"
        className="fixed bottom-6 right-6 bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/80 transition"
      >
        <i className="bi bi-arrow-up-short text-2xl"></i>
      </a>
    );
  };
  
export default ScrollTop;
  