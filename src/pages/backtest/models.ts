import { Statistics, TradingParams } from "models";

export type BacktestInput = {
  trading: TradingParams;
  exchange: string;
  symbols: string[];
  start: number;
  end: number;
  quote: number;
};

export type BacktestOutput = {
  symbolStats: { [symbol: string]: Statistics };
};
