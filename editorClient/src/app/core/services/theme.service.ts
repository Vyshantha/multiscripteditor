import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeService {
  private _darkTheme = new BehaviorSubject(false);
  private _lightTheme = new BehaviorSubject(true);
  private _highContrastTheme = new BehaviorSubject(false);

  isDarkTheme = this._darkTheme.asObservable();
  isLightTheme = this._lightTheme.asObservable();
  isHighContrastTheme = this._highContrastTheme.asObservable();

  setDarkTheme(isDarkTheme): void {
    this._darkTheme.next(isDarkTheme);
  }

  setLightTheme(isLightTheme): void {
    this._lightTheme.next(isLightTheme);
  }

  setHighContrastTheme(isHighContrastTheme): void {
    this._highContrastTheme.next(isHighContrastTheme);
  }

}