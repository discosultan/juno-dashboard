export type BacktestParams = {
  missedCandlePolicy: string;
  strategy: {
    type: string;
  };
  stopLoss: {
    type: string;
  };
  takeProfit: {
    type: string;
  };
  exchange: string;
  symbols: string[];
  interval: string;
  start: string;
  end: string;
  quote: number;
};
