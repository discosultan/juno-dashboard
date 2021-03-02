import { Statistics, TradingParams } from 'models';

export type BacktestInput = {
  trading: TradingParams;
  exchange: string;
  symbols: string[];
  start: string;
  end: string;
  quote: number;
};

export type BacktestOutput = {
  symbolStats: { [symbol: string]: Statistics };
};
