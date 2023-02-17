import { Component, Input } from '@angular/core';

@Component({
  selector: 'cec-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input('usdValue')
  usdValueProps!: number;

  @Input('eurValue')
  eurValueProps!: number;
}
