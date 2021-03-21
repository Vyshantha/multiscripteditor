import { Component, ComponentRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

import * as allLayoutPositions from './../../assets/keyboard-layouts/keysboards-layouts.json';

import { ThemeService } from '../core/services/theme.service';
import { TranslateService } from '../core/services/translate.service';
import { SessionManagerService } from '../core/services/session-manager.service';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent implements OnInit {

  keyboardLayouts: any = (allLayoutPositions as any).default;
  localeUISelection : String = '';

  appStatus: Boolean = false;
  defaultLocale: String = "";
  overridenUILocale: String = "";

  mySearch = new FormControl();
  languagesScripts: Observable<string[]>;

  constructor(private dialogRef: MatDialogRef<HelperComponent>, private translate: TranslateService, private sessionManager: SessionManagerService, private themeService: ThemeService) { 
    this.appStatus = this.sessionManager.itemOfflineOnly.value;
    this.defaultLocale = this.keyboardLayouts[window.navigator.language.split('-')[0]][5];
    this.localeUISelection = this.keyboardLayouts[this.sessionManager.itemUILocale.value][2];
    if (this.sessionManager.getOverridenUILocaleInSession())
      this.overridenUILocale = this.keyboardLayouts[this.sessionManager.getOverridenUILocaleInSession()][5];
    else
      this.overridenUILocale = this.localeUISelection;
  }

  ngOnInit(): void {
    /*this.languagesScripts = this.mySearch.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );*/
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.keyboardLayouts.filter(script => this._normalizeValue(script).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  swapToDarkTheme() {
    this.themeService.setDarkTheme(true);
    this.themeService.setLightTheme(false);
    this.themeService.setHighContrastTheme(false);
    this.sessionManager.setThemeInSession("dark");
  }

  swapToLightTheme() {
    this.themeService.setDarkTheme(false);
    this.themeService.setLightTheme(true);
    this.themeService.setHighContrastTheme(false);
    this.sessionManager.setThemeInSession("light");
  }

  swapToHighContrastTheme() {
    this.themeService.setDarkTheme(false);
    this.themeService.setLightTheme(false);
    this.themeService.setHighContrastTheme(true);
    this.sessionManager.setThemeInSession("contrast");
  }

  done() {
    this.dialogRef.close();
  }

  zenMode() {
    if (this.sessionManager.itemKeyboardOnly.value == false)
      this.sessionManager.setInSessionOnlyKeyboard(true);
    this.done();
  }

  localeForUI(ISO_BCP_Code) {
    // The default Keyboard to be shown and View
    this.sessionManager.setUILocale(ISO_BCP_Code);
    this.translate.use(ISO_BCP_Code);
    // Override the browser locale over session
    if (this.sessionManager.itemKeyboardDisassociateLocale.value == false) {
      this.sessionManager.setOverridenUILocaleInSession(ISO_BCP_Code);
    }
    this.defaultLocale = this.keyboardLayouts[window.navigator.language.split('-')[0]][5];
    this.overridenUILocale = this.keyboardLayouts[this.sessionManager.getOverridenUILocaleInSession()][5];
  }

  searchKeyboard() {
    if (this.sessionManager.itemKeyboardOnly.value == true)
      this.sessionManager.setInSessionOnlyKeyboard(false);
    this.done();
  }

  switchType(tabChangeEvent: MatTabChangeEvent, index) {
    // this.keyboardsTypes.switchKeyboardType(index, false);
  }

  keyboardTypeService(keyboardCode) {
    // this.keyboardsTypes.renderThisKeyboard(0, keyboardCode, false);
  }

  offlineOnly() {
    if (this.sessionManager.itemOfflineOnly.value == false)
      this.sessionManager.setOfflineOnly(true);
    else if (this.sessionManager.itemOfflineOnly.value == true)
      this.sessionManager.setOfflineOnly(false);
    this.appStatus = this.sessionManager.itemOfflineOnly.value;
  }
}
