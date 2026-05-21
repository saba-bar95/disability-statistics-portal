import { useLayoutEffect, useRef, useState } from "react";
import { ResponsiveContainer } from "recharts";

export default function ChartPlotContainer({
  height,
  children,
  onPlotWidthChange,
}) {
  const containerRef = useRef(null);
  const [canRender, setCanRender] = useState(false);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const update = () => {
      const { clientWidth, clientHeight } = element;
      setCanRender(clientWidth > 0 && clientHeight > 0);
      onPlotWidthChange?.(clientWidth);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, [height, onPlotWidthChange]);

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0 shrink-0 overflow-visible"
      style={{ height }}
    >
      {canRender ? (
        <ResponsiveContainer width="100%" height={height} minWidth={0}>
          {children}
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}
