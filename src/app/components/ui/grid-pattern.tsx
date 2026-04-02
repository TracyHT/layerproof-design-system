import { useId, useRef, useState } from "react";
import { cn } from "./utils";

const HOVER_COLORS = [
  "#fff8c0", // yellow-200
  "#fff094", // yellow-300
  "#FFDE42", // yellow-500 (brand accent)
  "#ffd6eb", // pink-100
  "#ffb3d9", // pink-200
  "#ff85c2", // pink-300
];

interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: string;
  hoverable?: boolean;
  className?: string;
  [key: string]: unknown;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  hoverable = false,
  className,
  ...props
}: GridPatternProps) {
  const id = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState<{ cell: [number, number]; color: string } | null>(null);

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;

    // Use the SVG transform matrix to correctly account for CSS transforms (e.g. skew)
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const svgPt = pt.matrixTransform(ctm.inverse());

    const cx = Math.floor((svgPt.x - x) / width);
    const cy = Math.floor((svgPt.y - y) / height);

    setHovered((prev) => {
      if (prev?.cell[0] === cx && prev?.cell[1] === cy) return prev;
      const color = HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)];
      return { cell: [cx, cy], color };
    });
  }

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        hoverable ? "pointer-events-auto" : "pointer-events-none",
        className
      )}
      onMouseMove={hoverable ? handleMouseMove : undefined}
      onMouseLeave={hoverable ? () => setHovered(null) : undefined}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

      {/* Static highlighted squares */}
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]) => (
            <rect
              strokeWidth="0"
              key={`${sx}-${sy}`}
              width={width - 1}
              height={height - 1}
              x={sx * width + 1}
              y={sy * height + 1}
            />
          ))}
        </svg>
      )}

      {/* Hover-highlighted square */}
      {hoverable && hovered && (
        <svg x={x} y={y} className="overflow-visible">
          <rect
            strokeWidth="0"
            width={width - 1}
            height={height - 1}
            x={hovered.cell[0] * width + 1}
            y={hovered.cell[1] * height + 1}
            fill={hovered.color}
            opacity={0.7}
          />
        </svg>
      )}
    </svg>
  );
}
