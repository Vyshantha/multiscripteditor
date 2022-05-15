import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as allLayoutPositions from './../assets/keyboard-layouts/keysboards-layouts.json';

import { TranslateService } from './core/services/translate.service';
import { ThemeService } from './core/services/theme.service';
import { SessionManagerService } from './core/services/session-manager.service';

import { MatDialog } from '@angular/material/dialog';
import { HelperComponent } from './helper/helper.component';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

import SVAConfig from '../assets/environments/sva_config.json';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('openSettings') keysSettings : ElementRef;
  @ViewChild('writeUpTypes') allWriteUps: MatTabGroup;

  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;
  
  keyboardLayouts: any = (allLayoutPositions as any).default;

  hostname: string = SVAConfig.hostname;
  port: number = SVAConfig.port;

  headerVisible : Boolean = true;
  footerVisible : Boolean = true;
  onlineOnly : Boolean = true;
  apiURL: string = "";
  currentURL : String = window.location.href;
  alternativeURL : String = window.location.href;
  endemicURL : String = window.location.href;
  browserLocale : String = window.navigator.language;
  isSupportedLocale : Boolean = false;
  isLightTheme: Boolean = true;
  isDarkTheme: Boolean = false;
  isHighContrast: Boolean = false;
  urlLanguageInfo: Boolean = false;
  HelperPopUp: any = HelperComponent;

  translateForSnackBar: string[] = [];
  
  constructor(private translate: TranslateService, private http: HttpClient, private sessionManager: SessionManagerService, private helperDialog: MatDialog, private themeService: ThemeService, private _snackBar: MatSnackBar) {
    if (!this.sessionManager.getFromSessionURL())
      this.sessionManager.setInSessionURL(this.sessionManager.getUILocale());
    
    if(this.sessionManager.getThemeFromSession() == "dark") {
      this.themeService.setDarkTheme(true);
      this.themeService.setLightTheme(false);
      this.themeService.setHighContrastTheme(false);
    } else if(this.sessionManager.getThemeFromSession() == "light") {
      this.themeService.setDarkTheme(false);
      this.themeService.setLightTheme(true);
      this.themeService.setHighContrastTheme(false);
    } else if(this.sessionManager.getThemeFromSession() == "contrast") {
      this.themeService.setDarkTheme(false);
      this.themeService.setLightTheme(false);
      this.themeService.setHighContrastTheme(true);
    } else if(this.sessionManager.getThemeFromSession() == undefined || this.sessionManager.getThemeFromSession() == "") {
      this.themeService.setDarkTheme(false);
      this.themeService.setLightTheme(true);
      this.themeService.setHighContrastTheme(false);
      this.sessionManager.setThemeInSession("light");
    }

    if(localStorage.getItem('shareContentWords') == "" || localStorage.getItem('shareContentWords') == undefined || localStorage.getItem('shareContentWords') == null) {
      this.sessionManager.shareContentWordSuggestions('false');
    }

    if(localStorage.getItem('sendInitialData') == "" || localStorage.getItem('sendInitialData') == undefined || localStorage.getItem('sendInitialData') == null) {
      this.sessionManager.allowSendInitialLoadDataAllowed('true');
    }

    if(localStorage.getItem('saveSessionAllow') == "" || localStorage.getItem('saveSessionAllow') == undefined || localStorage.getItem('saveSessionAllow') == null) {
      this.sessionManager.allowSaveSessionToBrowser('false');
    }

    document.addEventListener("orientationchange", function(event){
      switch(window.orientation) 
      {  
          case -90: case 90:
              /* Device is in landscape mode */
              break; 
          default:
              /* Device is in portrait mode */
      }
    });
    
    if (this.sessionManager.getOverridenUILocaleInSession() && this.keyboardLayouts[this.sessionManager.getOverridenUILocaleInSession()] != undefined && this.keyboardLayouts[this.sessionManager.getOverridenUILocaleInSession()][6] == "UI") {
      this.translate.use(this.sessionManager.getOverridenUILocaleInSession());
      this.sessionManager.setUILocale(this.sessionManager.getOverridenUILocaleInSession());
    } else if (this.keyboardLayouts[this.sessionManager.getOverridenUILocaleInSession()] == undefined || !this.sessionManager.getOverridenUILocaleInSession() || this.keyboardLayouts[this.sessionManager.getOverridenUILocaleInSession()][6] != "UI") {
      this.sessionManager.setUILocale(this.browserLocale.split('-')[0]);
      this.translate.use(this.browserLocale.split('-')[0]);
    }

    this.sessionManager.itemKeyboardOnly.subscribe((flagValue) => {
      if (flagValue == true) {
        this.headerVisible = false;
        this.footerVisible = false;
      } else if (flagValue == false) {
        this.headerVisible = true;
        this.footerVisible = true;
      }
    });
    this.sessionManager.itemOfflineOnly.subscribe((flagValue) => {
      if (flagValue == true) {
        this.onlineOnly = false;
      } else if (flagValue == false) {
        this.onlineOnly = true;
      }
    });
    this.sessionManager.itemSessionURL.subscribe((newURL) => {
      this.currentURL = window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + newURL;
      if (newURL == '' || newURL == null) {
        this.isSupportedLocale = (this.keyboardLayouts[this.browserLocale.split('-')[0]][6] == "UI")? true : false;
        this.alternativeURL = window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/'  + (this.keyboardLayouts[this.browserLocale.split('-')[0]][2]).toLowerCase();
        this.endemicURL = window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/'  + (this.keyboardLayouts[this.browserLocale.split('-')[0]][5]).toLowerCase();
      } else {
        this.isSupportedLocale = (this.keyboardLayouts[newURL][6] == "UI")? true : false;
        this.alternativeURL = window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/'  + this.keyboardLayouts[newURL][2]
        this.endemicURL = window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/'  + (this.keyboardLayouts[newURL][5]).toLowerCase();
      }
      this.apiURL = (newURL) ? newURL : this.sessionManager.getFromSessionURL();
    });
    this.sessionManager.itemUILocale.subscribe((locale) => {
      this.loadFromFile(locale, "Every Writers Choice");
      let rtlLocales = ['ar', 'he', 'ur', 'fa', 'syrc', 'rhg', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ckb', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'skr', 'pal', 'xpr', 'xsa', 'mnkar', 'jawi', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf', 'woal', 'chrs', 'elym', 'palm', 'hatr', 'ber', 'mani', 'mer', 'psal', 'kult', 'egyd', 'safa', 'nshu', 'rohg', 'estr', 'sert', 'madn', 'lad', 'nbat', 'pice', 'gars', 'cprt', 'lepo', 'sabe', 'phyg', 'khaz', 'mero', 'cana', 'sina', 'yezi', 'ug', 'mend', 'linb', 'idu', 'chun', 'kuli', 'txg', 'indus', 'hung'];
      document.dir = (rtlLocales.indexOf(locale) > -1)? "rtl" : "ltr";
      this.translateSnackBars();
    });

    // Setup for Fonts & Cell Size based on Device size
    if (this.isMobile) {
      this.sessionManager.setCountSuggestions(4);
      this.sessionManager.setCellSizeForSession(22);
      this.sessionManager.setFontSizeForSession(12);
      this.sessionManager.setCellSizeForSession2(22);
      this.sessionManager.setFontSizeForSession2(12);
    } else if (this.isTablet) {
      this.sessionManager.setCountSuggestions(7);
      this.sessionManager.setCellSizeForSession(46);
      this.sessionManager.setFontSizeForSession(14);
      this.sessionManager.setCellSizeForSession2(46);
      this.sessionManager.setFontSizeForSession2(14);
    } else {
      this.sessionManager.setCountSuggestions(14);
      this.sessionManager.setCellSizeForSession(55);
      this.sessionManager.setFontSizeForSession(16);
      this.sessionManager.setCellSizeForSession2(55);
      this.sessionManager.setFontSizeForSession2(16);
    }
    // Soft Mapping setup
    if (this.sessionManager.getInSessionQwerty() == 'true' || this.sessionManager.getTransliterate() == 'true') 
      this.sessionManager.mapKeysFromKeyboard('true');
    else if (this.sessionManager.getInSessionQwerty() == 'false' || this.sessionManager.getTransliterate() == 'false')
      this.sessionManager.mapKeysFromKeyboard('false');
    
  }

  ngOnInit () : void {
    // Prevent right-click on 'body' of HTML
    document.addEventListener('contextmenu', event => event.preventDefault());

    this.themeService.isDarkTheme.subscribe((darkTheme) => {
      this.isDarkTheme = darkTheme;
    });

    this.themeService.isLightTheme.subscribe((lightTheme) => {
      this.isLightTheme = lightTheme;
    });
    
    this.themeService.isHighContrastTheme.subscribe((highContrastTheme) => {
      this.isHighContrast = highContrastTheme;
    });

    // Clear All existing Cookies
    const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));

    // Multiple Ignore option then do not show Help at initial load
    if (this.sessionManager.getMultiIgnore() != 'set') {
      const dialogProfile = this.helperDialog.open(this.HelperPopUp, {
        width: (!this.isMobile && !this.isTablet)?
          '70%':
          (
            (!this.isMobile && this.isTablet)?
              '85%':
              '95%'
          ),
        data: {show: 'help'}
      });
    }
    // Sending Session Data To Server
    this.sessionManager.tokenForSession().subscribe((sessionData: any) => {
        // Session Manager Service sends these Device, Browser, Locale & User Interface Data
        console.info("[MUlTISCRIPTEDITOR] Session is initiated from Browser");
        localStorage.setItem("ltpaToken", sessionData.idToken);
        localStorage.setItem("expires", sessionData.expiresIn);
        if (this.sessionManager.isSendInitialLoadDataAllowed() == 'true') {
          this.sessionManager.sendDataToServerAtSessionBegin().subscribe(() => {
            // Session Manager Service sends these Device, Browser, Locale & User Interface Data
            console.info("[MUlTISCRIPTEDITOR] User's Choice Session Data is sent to server");
          });
        }
    });
    
    if (localStorage.getItem("ltpaToken") == "" || localStorage.getItem("ltpaToken") == null || localStorage.getItem("ltpaToken") == undefined) {
      // Explorer mode by default
      setTimeout(() => {
        this.sessionManager.setInSessionOnlyKeyboard(false);
        this.sessionManager.itemKeyboardOnly.next(false); 
      }, 100);
    }
  }

  ngAfterViewInit(): void {
    this.sessionManager.itemKeyboardOnly.subscribe((flagValue) => {
      (flagValue == true) ? this.keysSettings.nativeElement.style.display = 'none' : this.keysSettings.nativeElement.style.display = 'block';
    });

    var self = this;
    window.onresize = async function(event) {
      if (window.outerWidth < 500) {
        self.sessionManager.setIsMobileDevice(true);
        self.sessionManager.setIsTabletDevice(false);
        self.isMobile = true;
        self.isTablet = false;
      } else if (window.outerWidth > 499 && window.outerWidth < 1200) {
        self.sessionManager.setIsMobileDevice(false);
        self.sessionManager.setIsTabletDevice(true);
        self.isMobile = false;
        self.isTablet = true;
      } else {
        self.sessionManager.setIsMobileDevice(false);
        self.sessionManager.setIsTabletDevice(false);
        self.isMobile = false;
        self.isTablet = false;
      }
      let layoutCurrentKeys = await self.populateKeyboard(self.sessionManager.getFromSessionURL());
      if (!self.sessionManager.itemQwertyType.value && !self.sessionManager.itemTransliterate.value)
        self.sessionManager.perfectFontCellMatch("row", self.isMobile, self.isTablet, 1, layoutCurrentKeys, self.sessionManager.cellSize.value, self.sessionManager.fontSize.value, "layouts");
      else if (self.sessionManager.itemQwertyType.value && !self.sessionManager.itemTransliterate.value)
        self.sessionManager.perfectFontCellMatch("qwerty", self.isMobile, self.isTablet, 2, layoutCurrentKeys, self.sessionManager.cellSize.value, self.sessionManager.fontSize.value, "layouts");
      else if (!self.sessionManager.itemQwertyType.value && self.sessionManager.itemTransliterate.value)
        self.sessionManager.perfectFontCellMatch("qwertyTrans", self.isMobile, self.isTablet, 3, layoutCurrentKeys, self.sessionManager.cellSize.value, self.sessionManager.fontSize.value, "layouts");

      // Commented out Lower Keyboard in Options
      //let optionsLayoutCurrentKeys = await self.populateKeyboard(self.sessionManager.getUILocale());
      //self.sessionManager.perfectFontCellMatch("qwerty", self.isMobile, self.isTablet, 4, optionsLayoutCurrentKeys, self.sessionManager.cellSize2.value, self.sessionManager.fontSize2.value, "options");
    };
    window.onorientationchange = async function(event) {
      if (window.outerWidth < 500) {
        self.sessionManager.setIsMobileDevice(true);
        self.sessionManager.setIsTabletDevice(false);
        self.isMobile = true;
        self.isTablet = false;
      } else if (window.outerWidth > 499 && window.outerWidth < 1200) {
        self.sessionManager.setIsMobileDevice(false);
        self.sessionManager.setIsTabletDevice(true);
        self.isMobile = false;
        self.isTablet = true;
      } else {
        self.sessionManager.setIsMobileDevice(false);
        self.sessionManager.setIsTabletDevice(false);
        self.isMobile = false;
        self.isTablet = false;
      }
      let layoutCurrentKeys = await self.populateKeyboard(self.sessionManager.getFromSessionURL());
      if (!self.sessionManager.itemQwertyType.value && !self.sessionManager.itemTransliterate.value)
        self.sessionManager.perfectFontCellMatch("row", self.isMobile, self.isTablet, 1, layoutCurrentKeys, self.sessionManager.cellSize.value, self.sessionManager.fontSize.value, "layouts");
      else if (self.sessionManager.itemQwertyType.value && !self.sessionManager.itemTransliterate.value)
        self.sessionManager.perfectFontCellMatch("qwerty", self.isMobile, self.isTablet, 2, layoutCurrentKeys, self.sessionManager.cellSize.value, self.sessionManager.fontSize.value, "layouts");
      else if (!self.sessionManager.itemQwertyType.value && self.sessionManager.itemTransliterate.value)
        self.sessionManager.perfectFontCellMatch("qwertyTrans", self.isMobile, self.isTablet, 3, layoutCurrentKeys, self.sessionManager.cellSize.value, self.sessionManager.fontSize.value, "layouts");

      let optionsLayoutCurrentKeys = await self.populateKeyboard(self.sessionManager.getUILocale());
      self.sessionManager.perfectFontCellMatch("qwerty", self.isMobile, self.isTablet, 4, optionsLayoutCurrentKeys, self.sessionManager.cellSize2.value, self.sessionManager.fontSize2.value, "options");
    };

    setTimeout(() => {
      this._snackBar.open(this.translateForSnackBar[1], this.translateForSnackBar[0], {
        duration: 10000,
      });
    }, 2000);
  }

  populateKeyboard(ISO_Code) {
    if (this.keyboardLayouts) {
      return new Promise<any>((resolve, reject) => {
        this.http.get<{}>(`assets/keyboard-layouts/${this.keyboardLayouts[ISO_Code][4]}`).subscribe(keyboards =>{
          if (keyboards)
            resolve(keyboards)
          else
            reject([]);
        });
      });
    }
  }

  async translateSnackBars() {
    let translateSet = ["OK", "No Cookies Used for this Website - View 'Help Assistance' for further details on use of Local Storage on your Browser"];
    this.translateForSnackBar = await this.loadFromFileForPopup(this.sessionManager.getUILocale(), translateSet);
  }

  loadFromFileForPopup(ISO_Code, translateSet) {
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

  loadFromFile(ISO_Code, translate) {
    let supplyResponse = new Promise<string>((resolve, reject)=> {
      this.http.get<{}>(`assets/i18n/${ISO_Code}.json`).subscribe(
        translation => {
          if (translate && translation)
            resolve(translation[translate]);
          else
            reject("");
        }
      );
    });
    supplyResponse.then((translation) => {
      document.title = translation;
    })
  }
}