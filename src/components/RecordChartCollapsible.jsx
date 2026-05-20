import { useEffect, useState } from "react";
import clsx from "clsx";

const DURATION_MS = 320;

/**
 * Animates chart panel open/close (height + opacity). Keeps children mounted briefly on close.
 */
export default function RecordChartCollapsible({ open, children, className }) {
  const [holdMount, setHoldMount] = useState(open);
  const [revealed, setRevealed] = useState(false);
  const mounted = open || holdMount;

  useEffect(() => {
    if (open) {
      const latchTimer = window.setTimeout(() => setHoldMount(true), 0);
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => {
        window.clearTimeout(latchTimer);
        cancelAnimationFrame(frame);
      };
    }

    const collapseTimer = window.setTimeout(() => setRevealed(false), 0);
    const unmountTimer = window.setTimeout(
      () => setHoldMount(false),
      DURATION_MS,
    );
    return () => {
      window.clearTimeout(collapseTimer);
      window.clearTimeout(unmountTimer);
    };
  }, [open]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={clsx(
        "grid ease-in-out motion-reduce:transition-none",
        "transition-[grid-template-rows,opacity,margin-top]",
        revealed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className,
      )}
      style={{ transitionDuration: `${DURATION_MS}ms` }}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
