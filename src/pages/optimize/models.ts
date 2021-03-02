import { Statistics, TradingParams } from 'models';

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
  start: string;
  end: string;
  quote: number;
  evaluationStatistic: string;
  evaluationAggregation: string;
  populationSize: number;
  generations: number;
  hallOfFameSize: number;
  seed: number | null;
  context: {
    trader: {
      intervals: string[];
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

// export type TradingResult = {
//   args: {
//     exchange: string;
//     start: string;
//     end: string;
//     trainingSymbols: string[];
//     validationSymbols?: string[];
//   };
//   config: TradingParams;
//   symbolStats: {
//     [symbol: string]: Statistics;
//   };
//   title: string;
// };
