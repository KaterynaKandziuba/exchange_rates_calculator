import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrencyTypes } from '../types/currency.type';
import { LatestRatesResponce } from '../types/latestRatesResponse.interface';
import { RatesInterface } from '../types/ratesInterface';

@Injectable()
export class GetExchangeRateService {
  constructor(private http: HttpClient) {}

  fetchCurrency(
    from = CurrencyTypes.UAH,
    to = CurrencyTypes.USD
  ): Observable<{ UAH?: number; USD?: number; EUR?: number }> {
    const url = environment.apiUrl + `/fixer/latest?base=${from}&symbols=${to}`;
    return this.http
      .get<LatestRatesResponce>(url, {
        headers: {
          apikey: 'E8G6SPhGwHEZkXhaIXcMVl98oIhN3ZrY',
        },
      })
      .pipe(
        map((response) => response.rates),
        catchError(() => {
          return throwError(() =>
            console.error('Sorry, exchange rates are unavailable at the moment')
          );
        })
      );
  }

  fetchMultipleCurrencies(
    baseCurrency = CurrencyTypes.UAH,
    currency1 = CurrencyTypes.USD,
    currency2 = CurrencyTypes.EUR
  ): Observable<RatesInterface> {
    return combineLatest(
      this.fetchCurrency(baseCurrency, currency1),
      this.fetchCurrency(baseCurrency, currency2)
    ).pipe(
      map((rates: any) => ({
        UAH: 1,
        USD: this.getCurrencyValueToBase(rates[0]['USD']),
        EUR: this.getCurrencyValueToBase(rates[1]['EUR']),
      }))
    );
  }

  getCurrencyValueToBase(currencyValue: number): number {
    return 1 / currencyValue;
  }
}
