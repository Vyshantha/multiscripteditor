import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as allLayoutPositions from './../assets/keyboard-layouts/keysboards-layouts.json';
import { TranslateService } from './core/services/translate.service';
import { ThemeService } from './core/services/theme.service';
import { SessionManagerService } from './core/services/session-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { HelperComponent } from './helper/helper.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('openSettings') keysSettings : ElementRef;
  keyboardLayouts: any = (allLayoutPositions as any).default;

  headerVisible : Boolean = true;
  footerVisible : Boolean = true;
  onlineOnly : Boolean = true;
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
  
  constructor(private translate: TranslateService,private sessionManager: SessionManagerService, private helperDialog: MatDialog, private themeService: ThemeService) {
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
      if (this.browserLocale.indexOf("zh") == -1) {
        this.sessionManager.setUILocale(this.browserLocale.split('-')[0]);
        this.translate.use(this.browserLocale.split('-')[0]);
      } else if (this.browserLocale.indexOf("zh") != -1) {
        // Only if it zh-cn Supported Locale
        this.sessionManager.setUILocale(this.browserLocale.split('-')[0]);
        this.translate.use(this.browserLocale.split('-')[0]);
      }
    }

    // TODO document.title UPDATE based on locale

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
    });
  }

  ngOnInit () : void {
    this.themeService.isDarkTheme.subscribe((darkTheme) => {
      this.isDarkTheme = darkTheme;
    });

    this.themeService.isLightTheme.subscribe((lightTheme) => {
      this.isLightTheme = lightTheme;
    });
    
    this.themeService.isHighContrastTheme.subscribe((highContrastTheme) => {
      this.isHighContrast = highContrastTheme;
    });

    const dialogProfile = this.helperDialog.open(this.HelperPopUp, {
      width: '70%'
    });
    // Sending Session Data To Server
    //this.sessionManager.sendDataToServerAtSessionBegin().subscribe(() => {
    //});
  }

  ngAfterViewInit(): void {
    this.sessionManager.itemKeyboardOnly.subscribe((flagValue) => {
      (flagValue == true) ? this.keysSettings.nativeElement.style.display = 'none' : this.keysSettings.nativeElement.style.display = 'block';
    });
  }

/* All Todos and issues
   * 
   * 
   * RFE - 
   *  Alt-Gr Key for 3rd set of Keys and Caps Key
   *  Add search for Language or Script name (native / locale) based at the initial load in "pop-up" box
   *  Customise their own Keyboard by DnD of keys after a settings clicks
   *  Help opens at start and only ignored after multiple escapes.. there open to goto "Zen/Gyan/Dhyan/Jyañ" mode or Explore mode 'Open Settings' & rest together.
   *  Colour changing for "Fonts"
   *  Show the BACK PART OF SHIFT keys in smaller font at top-right or left or both for keys
   *  Tooltip to button, images and keys etc
   *  Counter - Locale, Language, Browser, Device and Location info
   *  Mirror image fonts for Bou-sides scripts & Phags-pa, Asomtavruli
   *  Currency extension for each Type of Keyboard : https://en.wikipedia.org/wiki/Currency_Symbols_(Unicode_block)
   *  Allow Offline Download usage for each system
   *  Order in the drop-down menu of Supported UI Language should in order of the shown UI language
   *  Sign Language - https://unicode.org/L2/L2016/16225-signwriting-pres.pdf
   *  Use Case : Layout Keyboard projected - using Projector when only Screen is present - export Keyboard as a modular - LASER VIRTUAL KEYBOARD
   *  Size of Keys big enough for space available and move about when resized CSS rules
   *  Mapping the Keys on actual Keyboard being used for a language 
   *  Caps or Shift key "press" to show Caps & without "press" for non-Caps letters - all in 1 json per language for a layout type : https://kn.wikipedia.org/wiki/%E0%B2%B8%E0%B2%B9%E0%B2%BE%E0%B2%AF:%E0%B2%B2%E0%B2%BF%E0%B2%AA%E0%B3%8D%E0%B2%AF%E0%B2%82%E0%B2%A4%E0%B2%B0
   *  Mobile, Pad and Desktop screen size & orientation for all locales and specific language (Mongolian / Nushi)
   *  Any language Intellisense for word conjunction when a few keys are pressed - Service
   *  Translate, Dictionary and Theasaurus service for a particular language
   *  Typed 'Char' or 'Action' to be transmitted the HTML Editor
   *  Geo and Locale Info : npm install geoip-lite
   *  Sankethi/Sanketi and Sanskrit translation for website & option locales
   *  keyboards-layouts.json expand to Sankethi == Kannada, Flemish == Dutch == Afrikaans, etc. etc.
   *  Letter & word-selection rotation by -90° (Ogham L2R Nüshu R2L) or +90° (Mongolian, Phags-Pa L2R) 
        Multiple browser types : -o-transform , -ms-transform , -moz-transform , -webkit-transform for transform
        writing-mode: vertical-rl;
        text-orientation: use-glyph-orientation;
  *  Help section opacity lower to explain URL scene - kn & kannada/ಕನ್ನಡ, Themes, Languages for UI, Types of Modes, Keyboards (even if language not supported) split by Types, features of it and browser default UI & Keyboard is taken when nothing in URL
  *  Accessibility aria-texts, info to be included
  *  Multi LANGUAGE URL - https://url.spec.whatwg.org/
  * 
  * Bug - 
  *  Second keyboard at bottom, should be showing Browser locale or locale to be translated
  *  Not all Swaras combine with Vyanjanas in other languages as they are no in first row not 2nd.
  *  When locale changed to RTL then page does not change sides : https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-language_list
  *  For RTL Editor type https://ckeditor.com/docs/ckeditor4/latest/examples/language.html
  *  Kaithi choti E matra wrong in Unicode
  *  Dark & Contrast modes Offline a white space towards end needs to be removed
  *  Dark button has to be clicked multiple times
  *  Kharosthi Vyanjana does not get modified with Swaras
  *  All Types of Editors should be loaded
  *  Mat-Tab when multiple 3 or 4th tab is selected then the Tab just jumps by max 2 positions
  *  Remove multiple "style" usage and use Class for better theme based adoption
  *  CSS, Text in RTL needs to be fixed
  *  
  * Services -
  *  Google Translate 100 Language translation automated 1 time : https://cloud.google.com/translate/docs/basic/quickstart#translate_translate_text-nodejs
  *  use this - https://rapidapi.com/blog/lp/google-translate-api/?utm_source=google&utm_medium=cpc&utm_campaign=Alpha_103545022459&utm_term=translate%20api%20google_e&gclid=Cj0KCQiAhs79BRD0ARIsAC6XpaVC6FenpjUR-RR8-2ReqNgeT_t3mQTkqUL6DnzW5RHtDIX22ukQTIcaAjdAEALw_wcB
  *  Google Translate capabilities - https://translate.google.com/intl/en/about/languages/
  * 
  * 
*/

}
