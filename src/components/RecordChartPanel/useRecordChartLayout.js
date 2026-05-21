import { useEffect, useState } from "react";

export function useAxisTickFontSize() {
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setFontSize(12);
      } else if (window.matchMedia("(max-width: 1200px)").matches) {
        setFontSize(13);
      } else {
        setFontSize(14);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return fontSize;
}

/** Fixed plot heights — must match Tailwind breakpoints on the chart container. */
export function useChartPlotHeight() {
  const [height, setHeight] = useState(300);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setHeight(460);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setHeight(400);
      } else {
        setHeight(300);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}
