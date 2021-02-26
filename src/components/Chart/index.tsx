import { useLayoutEffect, useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import {
  PriceScaleMode,
  createChart,
  IChartApi,
  HistogramData,
  LineData,
} from 'lightweight-charts';
import useResizeObserver from 'use-resize-observer';
import { Candle, CoreStatistics, PositionStatistics } from 'models';
import MarkerTooltip from './MarkerTooltip';
import useHoldKeyToScroll from './useHoldKeyToScroll';

function timestamp(value: string): number {
  return new Date(value).getTime() / 1000;
}

type ChartProps = {
  symbol: string;
  candles: Candle[];
  stats: CoreStatistics;
  positions: PositionStatistics[];
};

export default function Chart({ symbol, candles, stats, positions }: ChartProps) {
  const { palette } = useTheme();
  const [chart, setChart] = useState<IChartApi | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useResizeObserver({
    ref: containerRef,
    onResize: ({ width }) => containerRef.current && chart?.applyOptions({ width }),
  });

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const nonEmptyCandles = candles.filter((candle) => candle.volume > 0);

    const newChart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 360,
      layout: {
        backgroundColor: palette.background.paper,
        textColor: palette.text.primary,
      },
      localization: {
        dateFormat: 'yyyy-MM-dd',
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      leftPriceScale: {
        visible: true,
        mode: PriceScaleMode.Logarithmic,
      },
      rightPriceScale: {
        visible: true,
        mode: PriceScaleMode.Logarithmic,
      },
      watermark: {
        visible: true,
        text: symbol,
        vertAlign: 'top',
        horzAlign: 'left',
        color: palette.text.primary,
        fontSize: 20,
      },
    });

    // Candles.
    const candleSeries = newChart.addCandlestickSeries({
      // TODO: Calculate dynamically.
      priceFormat: {
        type: 'price',
        precision: 8,
        minMove: 0.0000001,
      },
    });
    candleSeries.setData(
      nonEmptyCandles.map((candle) => ({
        time: timestamp(candle.time) as any,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volume,
      })),
    );
    candleSeries.setMarkers(
      positions.flatMap((pos, i) => {
        const shape = pos.type === 'Long' ? 'arrowUp' : 'arrowDown';
        const id = i + 1;
        return [
          {
            // We keep the id 1-based to distinguish between open and pos (neg and pos).
            id: -id as any,
            time: timestamp(pos.openTime) as any,
            position: 'aboveBar',
            shape,
            color: palette.info[palette.type],
          },
          {
            id: +id as any,
            time: timestamp(pos.closeTime) as any,
            position: 'aboveBar',
            shape,
            color: palette.warning[palette.type],
          },
        ];
      }),
    );

    // Volume.
    const volumeSeries = newChart.addHistogramSeries({
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    volumeSeries.setData(
      nonEmptyCandles
        .reduce(
          ([prevClose, volume], candle) => {
            const color = candle.close >= prevClose ? '#26a69a80' : '#ef535080';
            volume.push({
              time: timestamp(candle.time) as any,
              value: candle.volume,
              color,
            });
            return [candle.close, volume] as [number, HistogramData[]];
          },
          [0, []] as [number, HistogramData[]],
        )[1],
    );

    // Line graph for running balance.
    newChart
      .addLineSeries({
        priceScaleId: 'left',
        // @ts-ignore
        lineWidth: 1.2,
      })
      .setData(
        positions.reduce(
          ([quote, points], pos) => {
            const newQuote = quote + pos.profit;
            points.push({
              time: timestamp(pos.closeTime) as any,
              value: newQuote,
            });
            return [newQuote, points] as [number, LineData[]];
          },
          [
            stats.cost,
            [
              {
                time: timestamp(stats.start),
                value: stats.cost,
              },
            ],
          ] as [number, LineData[]],
        )[1],
      );

    // Fit everything into view.
    newChart.timeScale().fitContent();

    setChart(newChart);

    return () => newChart.remove();
  }, [symbol, candles, stats, positions, palette]);

  useHoldKeyToScroll(chart, 'ControlLeft');

  return (
    <Box my={1} style={{ position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%' }} />
      {chart && <MarkerTooltip chart={chart} positions={positions} />}
    </Box>
  );
}
