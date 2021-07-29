export type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type PositionStatistics = {
  type: "Long" | "Short";
  openTime: string;
  closeTime: string;
  cost: number;
  gain: number;
  profit: number;
  duration: string;
  roi: number;
  annualizedRoi: number;
  closeReason: "Strategy" | "Cancelled" | "StopLoss" | "TakeProfit";
};

export type CoreStatistics = {
  start: string;
  end: string;
  duration: string;
  cost: number;
  gain: number;
  profit: number;
  roi: number;
  annualizedRoi: number;
  meanPositionProfit: number;
  meanPositionDuration: string;
  maxDrawdown: number;
  meanDrawdown: number;
  returnOverMaxDrawdown: number;
  numPositions: number;
  numPositionsInProfit: number;
  numPositionsInLoss: number;
  numStopLosses: number;
  numTakeProfits: number;
};

export type ExtendedStatistics = {
  gReturns: number[];
  annualizedReturn: number;
  sharpeRatio: number;
  sortinoRatio: number;
};

export type Statistics = {
  core: CoreStatistics;
  extended: ExtendedStatistics;
  positions: PositionStatistics[];
};

export type TradingParams = {
  strategy: {
    type: string;
    [key: string]: any;
  };
  stopLoss: {
    type: string;
    [key: string]: any;
  };
  takeProfit: {
    type: string;
    [key: string]: any;
  };
  trader: {
    interval: string;
    missedCandlePolicy: string;
  };
};

export type Session<TInput, TOutput> = {
  id: string;
  start: string;
  status: "pending" | "fulfilled" | "rejected";
  input: TInput;
  output?: TOutput;
};
