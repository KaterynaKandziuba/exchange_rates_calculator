import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CalculateExchangeRateService } from 'src/app/services/calculateExchangeRate.service';
import { CurrencyTypes } from 'src/app/types/currency.type';
import { RatesInterface } from 'src/app/types/ratesInterface';

@Component({
  selector: 'cec-calculator',
  styleUrls: ['./calculator.component.scss'],
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent implements OnInit {
  form!: FormGroup;
  @Input() rates!: RatesInterface | null;

  constructor(
    private fb: FormBuilder,
    private calculateExchangeRateService: CalculateExchangeRateService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fromInput: new FormControl('', [Validators.pattern('[0-9]*(.[0-9]+)?')]),
      fromCurrency: new FormControl(CurrencyTypes.EUR),
      toInput: new FormControl('', [Validators.pattern('([0-9]*[.])?[0-9]+')]),
      toCurrency: new FormControl(CurrencyTypes.USD),
    });
  }

  onAmountChange(event: any, backwardDirection = false) {
    if (
      !this.form?.get('fromInput')?.errors &&
      !this.form?.get('toInput')?.errors
    ) {
      if (backwardDirection) {
        this.setFromValues(
          'toInput',
          'toCurrency',
          'fromInput',
          'fromCurrency'
        );
        return;
      }
      this.setFromValues('fromInput', 'fromCurrency', 'toInput', 'toCurrency');
    }
  }

  setFromValues(
    startInput: 'fromInput' | 'toInput',
    startCurrency: 'fromCurrency' | 'toCurrency',
    endInput: 'fromInput' | 'toInput',
    endCurrency: 'fromCurrency' | 'toCurrency'
  ) {
    let fromAmountValue = 0;
    let toAmountValue = 0;
    let fromCurrencyValue: CurrencyTypes = CurrencyTypes.UAH;
    let toCurrencyValue: CurrencyTypes = CurrencyTypes.USD;

    fromAmountValue = Number(this.form?.get(startInput)?.value);
    fromCurrencyValue = this.form?.get(startCurrency)?.value as CurrencyTypes;
    toCurrencyValue = this.form?.get(endCurrency)?.value as CurrencyTypes;
    toAmountValue = this.calculateExchangeRateService.getConversionResult(
      fromAmountValue,
      fromCurrencyValue,
      toCurrencyValue,
      this.rates
    );

    this.form.controls[startInput].setValue(fromAmountValue);
    this.form.controls[startCurrency].setValue(fromCurrencyValue);
    this.form.controls[endInput].setValue(toAmountValue);
    this.form.controls[endCurrency].setValue(toCurrencyValue);
  }
}
