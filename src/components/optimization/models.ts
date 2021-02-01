import { Statistics } from 'models';

export type Individual = {
  chromosome: {
    strategy: {};
    stopLoss: {};
    takeProfit: {};
    trader: {
      interval: string;
      missedCandlePolicy: string;
    };
  };
  fitness: number;
};

export type IndividualStats = {
  ind: Individual;
  symbolStats: { [symbol: string]: Statistics };
};

export type Generation = {
  nr: number;
  hallOfFame: IndividualStats[];
};

export type EvolutionStats = {
  generations: Generation[];
  seed: number;
};

export type OptimizeParams = {
  strategy: string,
  stopLoss: string,
  takeProfit: string,
  exchange: string,
  trainingSymbols: string[],
  validationSymbols: string[],
  start: string,
  end: string,
  quote: number,
  evaluationStatistic: string,
  evaluationAggregation: string,
  populationSize: number,
  generations: number,
  hallOfFameSize: number,
  seed: number | null,
  context: {
    trader: {
      intervals: string[],
      missedCandlePolicies: string[],
    },
    strategy: object,
    stopLoss: object,
    takeProfit: object,
  }
};

export type GenerationsInfo = {
  args: OptimizeParams & { seed: number };
  gens: Generation[];
};