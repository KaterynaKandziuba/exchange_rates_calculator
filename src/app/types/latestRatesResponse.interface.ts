import { RatesInterface } from './ratesInterface';

export interface LatestRatesResponce {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: RatesInterface;
}
