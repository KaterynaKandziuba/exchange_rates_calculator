import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalculatorModule } from './calculator/calculator.module';
import { HeaderModule } from './header/header.module';
import { GetExchangeRateService } from './services/getExchangeRate.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CalculatorModule, HeaderModule],
  providers: [GetExchangeRateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
