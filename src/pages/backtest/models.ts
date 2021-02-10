export type BacktestParams = {
  missedCandlePolicy: string;
  strategy: string;
  strategyParams: object;
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
