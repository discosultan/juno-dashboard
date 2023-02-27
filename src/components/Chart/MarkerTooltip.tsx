import { useEffect, useRef, useState } from "react";
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material/styles";
import { IChartApi, MouseEventParams } from "lightweight-charts";
import { PositionStatistics } from "models";

function fmtPct(value: number): string {
  return value.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 2 });
}

type MarkerTooltipProps = {
  chart: IChartApi;
  positions: PositionStatistics[];
};

export default function MarkerTooltip({ chart, positions }: MarkerTooltipProps) {
  const { palette } = useTheme();
  const [tooltipStyle, setTooltipStyle] = useState({
    position: "absolute" as "absolute",
    display: "none",
    padding: "8px",
    zIndex: 1000,
    border: "1px solid",
    backgroundColor: palette.background.paper,
    whiteSpace: "pre-line" as "pre-line",
  });
  const [tooltipText, setTooltipText] = useState("");
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onCrosshairMove(event: MouseEventParams): void {
      const { hoveredObjectId, point } = event;
      if (typeof hoveredObjectId === "number" && point) {
        const yOffset = 5;
        const x = Math.round(point.x);
        const y = Math.round(point.y) + yOffset;

        const newStyle = {
          display: "block",
          left: `${x}px`,
          top: `${y}px`,
          borderColor: "#26a69a",
        };
        if (hoveredObjectId < 0) {
          // open
          const pos = positions[-hoveredObjectId - 1];
          setTooltipText(`time: ${pos.openTime}\ncost: ${pos.cost.toFixed(8)}`);
        } else {
          // close
          const pos = positions[hoveredObjectId - 1];
          if (pos.roi < 0) {
            newStyle.borderColor = "#ef5350";
          }
          setTooltipText(
            `time: ${pos.closeTime}\n` +
              `gain: ${pos.gain.toFixed(8)}\n` +
              `profit: ${pos.profit.toFixed(8)}\n` +
              `duration: ${pos.duration}\n` +
              `roi: ${fmtPct(pos.roi)}\n` +
              `aroi: ${fmtPct(pos.annualizedRoi)}\n` +
              `reason: ${pos.closeReason}`,
          );
        }
        setTooltipStyle((style) => ({ ...style, ...newStyle }));
      } else if (tooltipRef.current && tooltipRef.current.style.display !== "none") {
        setTooltipStyle((style) => ({ ...style, display: "none" }));
      }
    }
    chart.subscribeCrosshairMove(onCrosshairMove);

    return () => chart.unsubscribeCrosshairMove(onCrosshairMove);
  }, [chart, positions]);

  return (
    <div ref={tooltipRef} style={tooltipStyle}>
      <Typography variant="caption">{tooltipText}</Typography>
    </div>
  );
}
