import { Statistics, TradingParams } from "models";

export type Individual = {
  chromosome: TradingParams;
  fitness: number;
};

export type IndividualStats = {
  individual: Individual;
  symbolStats: { [symbol: string]: Statistics };
};

export type Generation = {
  nr: number;
  hallOfFame: IndividualStats[];
};

export type OptimizeInput = {
  exchange: string;
  trainingSymbols: string[];
  validationSymbols: string[];
  start: number;
  end: number;
  quote: number;
  evaluationStatistic: string;
  evaluationAggregation: string;
  populationSize: number;
  generations: number;
  hallOfFameSize: number;
  seed: number | null;
  context: {
    trader: {
      intervals: number[];
      missedCandlePolicies: string[];
    };
    strategy?: {
      type: string;
    };
    stopLoss?: {
      type: string;
    };
    takeProfit?: {
      type: string;
    };
  };
};

export type OptimizeOutput = {
  generations: Generation[];
  seed: number;
};
