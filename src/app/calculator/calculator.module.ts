import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculateExchangeRateService } from '../services/calculateExchangeRate.service';
import { CalculatorComponent } from './components/calculator.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CalculatorComponent],
  exports: [CalculatorComponent],
  providers: [CalculateExchangeRateService],
})
export class CalculatorModule {}
