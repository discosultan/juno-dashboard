import { useEffect } from "react";
import { IChartApi } from "lightweight-charts";

export default function useHoldKeyToScroll(chart: IChartApi | null, key: string): void {
  useEffect(() => {
    if (chart === null) return;

    let isPressed = false;
    setMouseWheelEnabled(chart, false);

    function onKeyDown(event: KeyboardEvent): void {
      if (!isPressed && event.code === key) {
        isPressed = true;
        setMouseWheelEnabled(chart!, true);
      }
    }

    function onKeyUp(event: KeyboardEvent): void {
      if (event.code === key) {
        isPressed = false;
        setMouseWheelEnabled(chart!, false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [chart, key]);
}

function setMouseWheelEnabled(chart: IChartApi, value: boolean): void {
  chart.applyOptions({
    handleScroll: {
      mouseWheel: value,
    },
    handleScale: {
      mouseWheel: value,
    },
  });
}
