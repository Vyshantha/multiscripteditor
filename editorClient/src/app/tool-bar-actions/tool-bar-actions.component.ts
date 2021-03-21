import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { SessionManagerService } from '../core/services/session-manager.service';
import { ThemeService } from '../core/services/theme.service';
import { TranslateService } from '../core/services/translate.service';

import * as allLayoutPositions from './../../assets/keyboard-layouts/keysboards-layouts.json';
import { HelperComponent } from '../helper/helper.component';

@Component({
  selector: 'app-tool-bar-actions',
  templateUrl: './tool-bar-actions.component.html',
  styleUrls: ['./tool-bar-actions.component.scss']
})
export class ToolBarActionsComponent implements OnInit {
  keyboardLayouts: any = (allLayoutPositions as any).default;
  localeUISelection : String = '';
  offlineUsage : Boolean = false;

  panelColor = new FormControl('lightsalmon');
  headerVisible : Boolean = true;

  HelperPopUp: any = HelperComponent;

  constructor (private translate: TranslateService, private sessionManager: SessionManagerService, private helperDialog: MatDialog, private themeService: ThemeService) {
    this.offlineUsage = this.sessionManager.itemOfflineOnly.value;
  }

  ngOnInit(): void {
    this.localeUISelection = this.keyboardLayouts[this.sessionManager.itemUILocale.value][2];
    this.sessionManager.itemKeyboardOnly.subscribe((flagValue) => {
      if (flagValue == true) {
        this.headerVisible = false;
      } else if (flagValue == false) {
        this.headerVisible = true;
      }
    });
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

  helpForUser() {
    const dialogProfile = this.helperDialog.open(this.HelperPopUp, {
      width: '70%'
    });

    dialogProfile.afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed - ', result);
      }
    );
  }

  localeForUI(ISO_BCP_Code) {
    // The default Keyboard to be shown and View
    this.sessionManager.setUILocale(ISO_BCP_Code);
    this.translate.use(ISO_BCP_Code);
    // Override the browser locale over session
    if (this.sessionManager.itemKeyboardDisassociateLocale.value == false) {
      this.sessionManager.setOverridenUILocaleInSession(ISO_BCP_Code);
    }
  }

  offlineOnly() {
    if (this.sessionManager.itemOfflineOnly.value == false)
      this.sessionManager.setOfflineOnly(true);
    else if (this.sessionManager.itemOfflineOnly.value == true)
      this.sessionManager.setOfflineOnly(false);
  }

}
