import { TradingParams } from "models";

export type BacktestParams = {
  trading: TradingParams,
  exchange: string;
  symbols: string[];
  start: string;
  end: string;
  quote: number;
};
