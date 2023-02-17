import { CurrencyTypes } from './currency.type';

export interface RatesInterface {
  [CurrencyTypes.UAH]?: number;
  [CurrencyTypes.EUR]?: number;
  [CurrencyTypes.USD]?: number;
}
