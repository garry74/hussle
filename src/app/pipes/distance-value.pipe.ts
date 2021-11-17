/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
import { Pipe, PipeTransform } from '@angular/core';
import { LoginService } from '../services/login.service';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'distanceValue',
})
export class DistanceValuePipe implements PipeTransform {
  constructor(
    private loginService: LoginService,
    private languageService: LanguageService
  ) {}

  transform(value: any, withoutUnit: boolean = false): string {
    if (
      !['string', 'number'].includes(typeof value) ||
      !this.loginService.LogedUser
    )
      return `${value} km`;
    const coefficient = this.loginService.LogedUser.destination_coefficient;
    // const distanceUnit = withoutUnit ? '' : (coefficient == 1.6 ? this.languageService.apptext.mile : this.languageService.apptext.km);
    const distanceUnit = withoutUnit
      ? ''
      : coefficient == 1.6
      ? 'mile'
      : coefficient == 1
      ? 'km'
      : 'metr';
    return `${(+value / coefficient).toFixed(2)} ${distanceUnit}`;
  }
}
