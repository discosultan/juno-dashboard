import { useEffect } from 'react';
import { IChartApi } from 'lightweight-charts';

export function useHoldKeyToScroll(chart: IChartApi | null, key: string): void {
  useEffect(() => {
    if (chart === null) return;

    console.log('APPLIED');

    let isPressed = false;
    setMouseWheelEnabled(chart, false);

    function onKeyDown(event: KeyboardEvent): void {
      if (!isPressed && event.code === key) {
        console.log('KEYDOWN');
        isPressed = true;
        setMouseWheelEnabled(chart!, true);
      }
    }

    function onKeyUp(event: KeyboardEvent): void {
      if (event.code === key) {
        console.log('KEYUP');
        isPressed = false;
        setMouseWheelEnabled(chart!, false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onKeyDown);
    }
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