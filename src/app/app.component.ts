import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetExchangeRateService } from './services/getExchangeRate.service';
import { RatesInterface } from './types/ratesInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  usdValue!: number;
  eurValue!: number;

  exchangeRates$!: Observable<RatesInterface>;

  constructor(private getExchangeRatesService: GetExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRates$ =
      this.getExchangeRatesService.fetchMultipleCurrencies();
    this.exchangeRates$.subscribe(
      (rates) => (this.usdValue = Math.round((rates.USD ?? 0) * 100) / 100)
    );
    this.exchangeRates$.subscribe(
      (rates) => (this.eurValue = Math.round((rates.EUR ?? 0) * 100) / 100)
    );
  }
}
