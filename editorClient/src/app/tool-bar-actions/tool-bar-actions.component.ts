import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { SessionManagerService } from '../core/services/session-manager.service';
import { ThemeService } from '../core/services/theme.service';
import { TranslateService } from '../core/services/translate.service';

import * as allLayoutPositions from './../../assets/keyboard-layouts/keysboards-layouts.json';

import { MatSnackBar } from '@angular/material/snack-bar';

import { HelperComponent } from '../helper/helper.component';

@Component({
  selector: 'app-tool-bar-actions',
  templateUrl: './tool-bar-actions.component.html',
  styleUrls: ['./tool-bar-actions.component.scss']
})
export class ToolBarActionsComponent implements OnInit, AfterViewInit {

  @ViewChild('selectAllLanguages') inputSelectLanguages: ElementRef;

  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;

  keyboardLayouts: any = (allLayoutPositions as any).default;
  localeUISelection : String = '';

  supportedLanguageColumn1 : any = [];
  supportedLanguageColumn2 : any = [];
  supportedLanguageColumn3 : any = [];
  supportedLanguageColumn4 : any = [];
  allSupportedLanguages : any = [];

  panelColor = new FormControl('lightsalmon');
  headerVisible : Boolean = true;

  HelperPopUp: any = HelperComponent;
  
  exploreOnly: Boolean = true;
  contentSession: string = "";

  translateForSnackBar: string[] = [];

  constructor (private translate: TranslateService, private http: HttpClient, private sessionManager: SessionManagerService, private helperDialog: MatDialog, private themeService: ThemeService, inputSelectLanguages: ElementRef, private _snackBar: MatSnackBar) {
    this.sortLanguageTranslations();
    this.inputSelectLanguages = inputSelectLanguages;
    this.translateSnackBars();
  }

  ngOnInit(): void {
    this.localeUISelection = this.keyboardLayouts[this.sessionManager.getUILocale()][2];
    this.sessionManager.itemKeyboardOnly.subscribe((flagValue) => {
      if (flagValue == true) {
        this.headerVisible = false;
      } else if (flagValue == false) {
        this.headerVisible = true;
      }
    });
    this.sessionManager.selectHelper.subscribe((trigger) => {
      if (trigger == true && this.sessionManager.selectToolbar.value == false) {
        var self = this;
        const localeUITranslate = setInterval(function() {
          self.sortLanguageTranslations();
          self.sessionManager.selectToolbar.next(false);
          clearInterval(localeUITranslate);
        }, 300);
      }
    });
  }

  ngAfterViewInit(): void {
    this.sessionManager.isMobileDevice.subscribe((value) => {
      this.isMobile = value;
    });

    this.sessionManager.isTabletDevice.subscribe((value) => {
      this.isTablet = value;
    });

    this.sessionManager.nonExplorationMode.subscribe((value) => {
      this.exploreOnly = value;
    });
  }

  localisedKeyboardLayoutDB(ISO_Code) {
    if (ISO_Code && ISO_Code != "") {
      return new Promise<any>((resolve, reject)=> {
        this.http.get<{}>(`./../../assets/keyboard-layouts/keysboards-layouts_${ISO_Code}.json`).subscribe(
          layoutDB => {
            if (layoutDB)
              resolve(layoutDB);
            else
              reject({});
          }
        );
      });
    } else if (ISO_Code && ISO_Code == "") {
      return new Promise<any>((resolve, reject)=> {
        this.http.get<{}>(`./../../assets/keyboard-layouts/keysboards-layouts.json`).subscribe(
          layoutDB => {
            if (layoutDB)
              resolve(layoutDB);
            else
              reject({});
          }
        );
      });
    }
  }

  exploreMode() {
    if (this.exploreOnly == true) {
      this.contentSession = this.sessionManager.getSessionSavedContent();
      this.sessionManager.nonExplorationMode.next(false);
    } else if (this.exploreOnly == false) {
      if (this.contentSession != "")
        this.sessionManager.setSessionSavingOfContent(this.contentSession);
      this.sessionManager.nonExplorationMode.next(true);
    }
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

  helpForUser(type) {
    const dialogProfile = this.helperDialog.open(this.HelperPopUp, {
      width: (type == 'privacy') ? (
        (!this.isMobile && !this.isTablet)?
          '60%':
          (
            (!this.isMobile && this.isTablet)?
              '85%':
              '95%'
          )
      ):(
        (!this.isMobile && !this.isTablet)?
          '70%':
          (
            (!this.isMobile && this.isTablet)?
              '85%':
              '95%'
          )
        ),
      data: {show: type}
    });

    dialogProfile.afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed - ', result);
      }
    );
  }

  async translateSnackBars() {
    let translateSet = ["OK", "These characters < > ( ) { } $ % = ! ? & * are not allowed in this field"];
    this.translateForSnackBar = await this.loadFromFile(this.sessionManager.getUILocale(), translateSet);
  }

  loadFromFile(ISO_Code, translateSet) {
    return new Promise<any>((resolve, reject)=> {
      this.http.get<{}>(`assets/i18n/${ISO_Code}.json`).subscribe(
        translation => {
          if (translateSet && translation) {
            let translationsForSet = [];
            for (let i = 0; i < translateSet.length; i++) {
              translationsForSet[i] = translation[translateSet[i]];
            }
            resolve(translationsForSet);
          }
          else
            reject("");
        }
      );
    });
  }

  localeForUI(ISO_BCP_Code) {
    // The default Keyboard to be shown and View
    this.sessionManager.setUILocale(ISO_BCP_Code);
    this.translate.use(ISO_BCP_Code);
    this.localeUISelection = this.keyboardLayouts[ISO_BCP_Code][2];
    
    // Override the browser locale over session
    if (this.sessionManager.getKeyboardDisassociateLocale() == true) {
      this.sessionManager.setOverridenUILocaleInSession(ISO_BCP_Code);
    } else if (this.sessionManager.getKeyboardDisassociateLocale() == false) {
      this.sessionManager.setSelectedKeyboard(ISO_BCP_Code);
    }
    this.sortLanguageTranslations();
    this.sessionManager.selectToolbar.next(true);
  }

  async sortLanguageTranslations() {
    this.allSupportedLanguages = [];
    this.supportedLanguageColumn1 = [];
    this.supportedLanguageColumn2 = [];
    this.supportedLanguageColumn3 = [];
    this.supportedLanguageColumn4 = [];
    this.keyboardLayouts = await this.localisedKeyboardLayoutDB(this.sessionManager.getUILocale());
    for (let key in this.keyboardLayouts) {
      if (this.keyboardLayouts[key][6] === "UI") {
        this.allSupportedLanguages.push({"value": this.keyboardLayouts[key][2], "url": key.valueOf().toString()});
      }
    }
    this.allSupportedLanguages = this.allSupportedLanguages.sort((a, b)=> {
      return a.value.localeCompare(b.value);
    });
    if (!this.isMobile && this.isTablet) {
      for(let index = 0 ; index < this.allSupportedLanguages.length ; index++) {
        if(index < 37)
          this.supportedLanguageColumn1[index] = this.allSupportedLanguages[index];
        else if(index > 36 && index < 74)
          this.supportedLanguageColumn2[index - 37] = this.allSupportedLanguages[index];
        else if(index > 73 && index < 110)
          this.supportedLanguageColumn3[index - 74] = this.allSupportedLanguages[index];
      }
    } else {
      for(let index = 0 ; index < this.allSupportedLanguages.length ; index++) {
        if(index < 27)
          this.supportedLanguageColumn1[index] = this.allSupportedLanguages[index];
        else if(index > 26 && index < 55)
          this.supportedLanguageColumn2[index - 27] = this.allSupportedLanguages[index];
        else if(index > 54 && index < 82)
          this.supportedLanguageColumn3[index - 55] = this.allSupportedLanguages[index];
        else if(index > 81 && index < 110)
          this.supportedLanguageColumn4[index - 82] = this.allSupportedLanguages[index];
      }

    }
  }

  pasteInputFieldForAttacks(eventInput) {
    setTimeout(() => {
      if (eventInput.target.value.indexOf("*") > -1 || eventInput.target.value.indexOf("$") > -1 || eventInput.target.value.indexOf("%") > -1 || eventInput.target.value.indexOf("=") > -1 || eventInput.target.value.indexOf("!") > -1 || eventInput.target.value.indexOf("?") > -1 || eventInput.target.value.indexOf("&") > -1 || eventInput.target.value.indexOf("<") > -1 || eventInput.target.value.indexOf(">") > -1 || eventInput.target.value.indexOf("(") > -1 || eventInput.target.value.indexOf(")") > -1 || eventInput.target.value.indexOf("{") > -1 || eventInput.target.value.indexOf("}") > -1) {
        this._snackBar.open(this.translateForSnackBar[1], this.translateForSnackBar[0], {
          duration: 3000,
        });
        setTimeout(()=>{
          this.inputSelectLanguages.nativeElement.value = "";
        }, 200);
      }
      eventInput.stopPropagation();
    });
  }

}
