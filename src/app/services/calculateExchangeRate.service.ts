import { Injectable } from '@angular/core';
import { CurrencyTypes } from '../types/currency.type';
import { RatesInterface } from '../types/ratesInterface';

@Injectable()
export class CalculateExchangeRateService {
  getConversionResult(
    amount: number,
    currencyFrom: CurrencyTypes,
    currencyTo: CurrencyTypes,
    rates: RatesInterface | any
  ): number {
    return (
      Math.round((rates[currencyFrom] / rates[currencyTo]) * amount * 100) / 100
    );
  }
}
