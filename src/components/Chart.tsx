import React, { useLayoutEffect, useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import {
  PriceScaleMode,
  createChart,
  IChartApi,
  MouseEventParams,
  HistogramData,
  LineData,
} from 'lightweight-charts';
import useResizeObserver from 'use-resize-observer';
import { Candle, CoreStatistics } from 'models';

function fmtPct(value: number): string {
  return value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
}

function timestamp(value: string): number {
  return new Date(value).getTime() / 1000;
}

type ChartProps = {
  symbol: string;
  candles: Candle[];
  stats: CoreStatistics;
};

export default function Chart({ symbol, candles, stats }: ChartProps) {
  const { palette } = useTheme();
  const chartRef = useRef<IChartApi | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [tooltipStyle, setTooltipStyle] = useState({
    position: 'absolute' as 'absolute',
    display: 'none',
    padding: '8px',
    zIndex: 1000,
    border: '1px solid',
    backgroundColor: palette.background.paper,
    whiteSpace: 'pre-line' as 'pre-line',
  });
  const [tooltipText, setTooltipText] = useState('');

  useResizeObserver({
    ref: containerRef,
    onResize: ({ width }) => {
      chartRef.current && chartRef.current.applyOptions({ width });
    },
  });

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Delete existing chart from container if any.
    chartRef.current && chartRef.current.remove();

    const chart = createChart(containerRef.current, {
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
    chartRef.current = chart;

    // Candles.
    const candleSeries = chart.addCandlestickSeries({
      // TODO: Calculate dynamically.
      priceFormat: {
        type: 'price',
        precision: 8,
        minMove: 0.0000001,
      },
    });
    candleSeries.setData(
      candles.map((candle) => ({
        time: timestamp(candle.time) as any,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volume,
      })),
    );
    candleSeries.setMarkers(
      stats.positions.flatMap((pos, i) => {
        const shape = pos.type === 'long' ? 'arrowUp' : 'arrowDown';
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
    const volumeSeries = chart.addHistogramSeries({
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
      candles.reduce(
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

    // Tooltip on markers.
    function onCrosshairMove(event: MouseEventParams): void {
      const { hoveredMarkerId, point } = event;
      if (typeof hoveredMarkerId === 'number' && point) {
        const yOffset = 5;
        const x = Math.round(point.x);
        const y = Math.round(point.y) + yOffset;

        const newStyle = {
          display: 'block',
          left: `${x}px`,
          top: `${y}px`,
          borderColor: '#26a69a',
        };
        if (hoveredMarkerId < 0) {
          // open
          const pos = stats.positions[-hoveredMarkerId - 1];
          setTooltipText(`time: ${pos.openTime}\ncost: ${pos.cost.toFixed(8)}`);
        } else {
          // close
          const pos = stats.positions[hoveredMarkerId - 1];
          if (pos.roi < 0) {
            newStyle.borderColor = '#ef5350';
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
      } else if (tooltipRef.current && tooltipRef.current.style.display !== 'none') {
        setTooltipStyle((style) => ({ ...style, display: 'none' }));
      }
    }
    chart.subscribeCrosshairMove(onCrosshairMove);

    // Line graph for running balance.
    chart
      .addLineSeries({
        priceScaleId: 'left',
        // TODO: test with 1.2
        // lineWidth: 1.2,
        lineWidth: 1,
      })
      .setData(
        stats.positions.reduce(
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
    chart.timeScale().fitContent();

    return () => chart.unsubscribeCrosshairMove(onCrosshairMove);
  }, [symbol, candles, stats, palette]);

  return (
    <Box my={1} style={{ position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%' }} />
      <div ref={tooltipRef} style={tooltipStyle}>
        <Typography variant="caption">{tooltipText}</Typography>
      </div>
    </Box>
  );
}
