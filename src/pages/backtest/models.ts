export type BacktestParams = {
  missedCandlePolicy: string;
  strategy: string;
  strategyParams: object;
  stopLoss: string;
  stopLossParams: object;
  takeProfit: string;
  takeProfitParams: object;
  exchange: string;
  symbols: string[];
  interval: string;
  start: string;
  end: string;
  quote: number;
};
