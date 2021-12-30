import { Component, OnInit, AfterViewInit, SecurityContext, ElementRef, ViewChild } from '@angular/core';
import { SessionManagerService } from '../core/services/session-manager.service';
import { TranslateService } from '../core/services/translate.service';
import { HttpClient } from '@angular/common/http';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as allLayoutPositions from '../../assets/keyboard-layouts/keysboards-layouts.json';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchAllScripts') searchInputAllScripts: ElementRef;

  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;

  localeOfUI : String = "English";
  localeToTranslate : String = "Zulu";
  onInputRequest : Boolean = false;

  layoutCurrentKeys: any = [];

  supportedLanguageColumn1 : any = [];
  supportedLanguageColumn2 : any = [];
  supportedLanguageColumn3 : any = [];
  supportedLanguageColumn4 : any = [];
  allSupportedLanguages : any = [];

  keysToRotate: Boolean = false;
  isShiftKeyPress2 : Boolean = false;
  isAltGrKeyPress2 : Boolean = false;
  isQwerty: Boolean = true;
  isShiftKeyPress : Boolean = false;
  isAltGrKeyPress : Boolean = false;
  altGrCapsExists : Boolean = false;
  highlightKeys: Boolean = true;

  defaultCellSize: Number = (this.isMobile && !this.isTablet) ? 22 : ((!this.isMobile && this.isTablet)? 46 : 55 );
  defaultFontSize: Number = (this.isMobile && !this.isTablet) ? 12 : ((!this.isMobile && this.isTablet)? 16 : 21 );

  translateURL: string = "https://tatoeba.org";
  omniglotURL: string = "https://omniglot.com";
  endangerScriptURL: string = "https://www.endangeredalphabets.net/alphabets";
  wikipediaURL: string = "https://en.wikipedia.org/wiki/";
  thesaurusURL: string = "https://synonyms.reverso.net/synonym/";
  dictionaryURL: string = "https://glosbe.com/all-languages";

  translateLocales: string[] = ['az', 'ca', 'et', 'eu', 'ku', 'hu', 'nds', 'sk', 'kab', 'gos', 'el', 'sr', 'hi', 'ja', 'id', 'cy', 'en', 'enus', 'enin', 'engb', 'enintl', 'fr', 'frca', 'befr', 'la', 'ia', 'nl', 'pl', 'fi', 'vi', 'be', 'ar', 'bal', 'ka', 'ko', 'bn', 'mr', 'zhcn', 'ms', 'da', 'es', 'esmx', 'fy', 'it', 'lt', 'oc', 'pt', 'ptbr', 'sv', 'tr', 'ru', 'br', 'de', 'eo', 'gl', 'zza', 'jbo', 'uz', 'ro', 'tl', 'cs', 'uk'];
  thesaurusURLs: any = {"ar": ["مرادفات"], "he": ["מלים-נרדפות"], "en": ["synonym"], "enin": ["synonym"], "enintl": ["synonym"], "engb": ["synonym"], "enus": ["synonym"], "it": ["sinonimi"], "de": ["synonym-woerterbuch"], "es": ["sinonimo"], "esmx": ["sinonimo"], "ja": ["類義語"], "nl": ["synoniem"], "nld": ["synoniem"], "pl": ["synonim"], "pt": ["dicionario-sinonimos"], "ptbr": ["dicionario-sinonimos"], "ro": ["sinonime"], "ru": ["синонимы"], "fr": ["synonyme"], "frca": ["synonyme"], "befr": ["synonyme"], "te": ["www.shabdkosh.com/dictionary/english-telugu/"], "ta": ["www.shabdkosh.com/dictionary/english-tamil/"], "kn": ["www.shabdkosh.com/dictionary/english-kannada/"], "sa": ["www.sanskritdictionary.com/"], "mr": ["www.shabdkosh.com/dictionary/english-marathi/"], "gu": ["www.shabdkosh.com/dictionary/english-gujarati/"], "pa": ["www.shabdkosh.com/dictionary/english-punjabi/"], "bn": ["www.khandbahale.com/language/bengali/"], "ml": ["www.shabdkosh.com/dictionary/english-malayalam/"], "kok": ["www.shabdkosh.com/dictionary/english-konkani/"], "kom": ["www.shabdkosh.com/dictionary/english-konkani/"], "hi": ["www.shabdkosh.com/dictionary/english-hindi/"], "as": ["www.khandbahale.com/language/assamese/"], "brx": ["www.khandbahale.com/language/bodo/"], "dogr": ["www.khandbahale.com/language/dogri/"], "ks": ["www.khandbahale.com/language/kashmiri/"], "tirh": ["www.khandbahale.com/language/maithili/"], "mni": ["www.khandbahale.com/language/manipuri/"], "ne": ["www.khandbahale.com/language/nepali/"], "or": ["www.khandbahale.com/language/oriya/"], "olck": ["www.khandbahale.com/language/santali/"], "sd": ["www.khandbahale.com/language/sindhi/"], "ur": ["www.khandbahale.com/language/urdu/"]};
  dictionaryURLs: any = {"id": ["www.babla.co.id"], "zhcn": ["www.babla.cn"], "zhtw": ["www.babla.cn"], "cs": ["cs.bab.la/slovnik/"], "da": ["da.bab.la/ordbog/"], "de": ["de.bab.la/woerterbuch/"], "el": ["www.babla.gr"], "en": ["en.bab.la/dictionary/"], "enin": ["en.bab.la/dictionary/"], "enintl": ["en.bab.la/dictionary/"], "engb": ["en.bab.la/dictionary/"], "enus": ["en.bab.la/dictionary/"], "es": ["es.bab.la/diccionario/"], "esmx": ["es.bab.la/diccionario/"], "fr": ["fr.bab.la/dictionnaire/"], "frca": ["fr.bab.la/dictionnaire/"], "befr": ["fr.bab.la/dictionnaire/"], "it": ["it.bab.la/dizionario/"], "ja": ["ja.bab.la/辞書/"], "ko": ["www.babla.kr"], "hu": ["hu.bab.la/szótár/"], "nl": ["nl.bab.la/woordenboek/"], "nld": ["nl.bab.la/woordenboek/"], "no": ["www.babla.no"], "pl": ["pl.bab.la/slownik/"], "pt": ["pt.bab.la/dicionario/"], "ptbr": ["pt.bab.la/dicionario/"], "ro": ["ro.bab.la/dicționar/"], "ru": ["www.babla.ru"], "fi": ["fi.bab.la/sanakirja/"], "sv": ["sv.bab.la/lexikon/"], "th": ["www.babla.co.th"], "tr": ["tr.bab.la/sozluk/"], "vi": ["www.babla.vn"]};
  dirSet: string = "rtl";
  isRTL: Boolean = false;
  rtlLocales : string[] = ['ar', 'he', 'ur', 'fa', 'syrc', 'rhg', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ckb', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'skr', 'pal', 'xpr', 'xsa', 'mnkar', 'jawi', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf', 'woal', 'chrs', 'elym', 'palm', 'hatr', 'ber', 'mani', 'mer', 'psal', 'kult', 'egyd', 'safa', 'nshu', 'txr', 'rohg', 'estr', 'sert', 'madn', 'lad', 'nbat', 'pice', 'gars', 'cprt', 'lepo', 'sabe', 'phyg', 'khaz', 'mero', 'cana', 'sina', 'yezi', 'ug', 'mend', 'linb', 'idu', 'chun', 'kuli', 'txg', 'indus', 'hung'];

  keyboardLayouts: any = (allLayoutPositions as any).default;

  allowSuperScript : Boolean = false;
  rowSuper : number = 0;
  columnSuper : number = 0;
  rowPositions : any = {"delPos": 0, "tabPos": 0, "enterPos": 0, "shiftPos": 0};
  qwertyPos: number = 0;

  translateForSnackBar: string[] = [];

  fontSize2(value: number) {
    localStorage.setItem('fontSize2', value.toString());
    return value + " size";
  }
  cellSize2(value: number) {
    localStorage.setItem('cellSize2', value.toString());
    if (value >= 1) {
      return value + ' px';
    }
    return value;
  }

  constructor(private sessionManager: SessionManagerService, private http: HttpClient, private translate: TranslateService, private sanitizer: DomSanitizer, searchInputAllScripts: ElementRef, private _snackBar: MatSnackBar) {
    this.sortLanguageTranslations();
    if(localStorage.getItem('fontSize2')) {
      this.defaultFontSize = Number(this.sessionManager.getFontSizeFromSession2());
    } else {
      this.sessionManager.setFontSizeForSession2(this.defaultFontSize);
    }
    if(localStorage.getItem('cellSize2')) {
      this.defaultCellSize = Number(this.sessionManager.getCellSizeFromSession2());
    } else {
      this.sessionManager.setCellSizeForSession2(this.defaultCellSize);
    }
    this.searchInputAllScripts = searchInputAllScripts;
    this.translateSnackBars();
  }

  ngOnInit(): void {
    this.sessionManager.itemUILocale.subscribe(async (locale) => {
      this.localeOfUI = this.keyboardLayouts[locale][2];
      this.layoutCurrentKeys = await this.populateKeyboard(locale);
      if (this.isMobile || this.isTablet) {
        this.sessionManager.perfectFontCellMatch("qwerty", this.isMobile, this.isTablet, 4, this.layoutCurrentKeys, this.defaultCellSize, this.defaultFontSize, "options");
      }
      this.altGrCapsExists = this.layoutCurrentKeys.some(x => x.hasOwnProperty('altGrCaps'));
      let nonSupportedLocale = locale;
      if (locale == "sank")
        nonSupportedLocale = "kn";
      else if (locale == "sa")
        nonSupportedLocale = "hi";
      this.wikipediaURL = "https://" + nonSupportedLocale + ".wikipedia.org/wiki/";
      this.translateURL = ( this.translateLocales.indexOf(locale) ) ? this.translateURL + "/" + locale : this.translateURL;
      this.dictionaryURL = ( this.dictionaryURLs[locale] ) ? "https://" + this.dictionaryURLs[locale] : this.dictionaryURL;
      this.thesaurusURL = ( this.thesaurusURLs[locale] ) ? ((this.thesaurusURLs[locale][0].indexOf("www") > -1)? "https://" + this.thesaurusURLs[locale] : "https://synonyms.reverso.net/" + this.thesaurusURLs[locale] + "/" ) : "https://synonyms.reverso.net/synonym/";
      this.dirSet = (this.rtlLocales.indexOf(locale) !== -1)? "rtl" : "ltr";
      this.isRTL = (this.rtlLocales.indexOf(locale) !== -1)? true : false;
    });

    this.sessionManager.itemSessionURL.subscribe((currentURL) =>{
      if (currentURL && !this.keyboardLayouts[currentURL] || (this.keyboardLayouts[currentURL] && this.keyboardLayouts[currentURL][11] == "Omni")) {
        this.omniglotURL = "https://omniglot.com";
      } else if (this.keyboardLayouts[currentURL]) {
        this.omniglotURL = this.keyboardLayouts[currentURL][11];
      }
      if (currentURL && !this.keyboardLayouts[currentURL] || (this.keyboardLayouts[currentURL] && this.keyboardLayouts[currentURL][10] == "End")) {
        this.endangerScriptURL = "https://www.scriptsource.org/cms/scripts/page.php?item_id=script_overview";
      } else if (this.keyboardLayouts[currentURL]) {
        this.endangerScriptURL = this.keyboardLayouts[currentURL][10];
      }
    });

    this.sessionManager.itemShiftKeyPressed2.subscribe((flagForShift) => {
      this.isShiftKeyPress2 = flagForShift;
    });
    this.sessionManager.itemAltGrKeyPressed2.subscribe((flagForAltGr) => {
      this.isAltGrKeyPress2 = flagForAltGr;
    });

    this.sessionManager.selectToolbar.subscribe((trigger) => {
      if (trigger == true && this.sessionManager.selectHelper.value == false) {
        var self = this;
        const localeUITranslate = setInterval(function() {
          self.sortLanguageTranslations();
          clearInterval(localeUITranslate);
        }, 300);
      }
    });
    this.sessionManager.selectHelper.subscribe((trigger) => {
      if (trigger == true && this.sessionManager.selectToolbar.value == false) {
        var self = this;
        const localeUITranslate = setInterval(function() {
          self.sortLanguageTranslations();
          clearInterval(localeUITranslate);
        }, 300);
      }
    });

    this.sessionManager.itemQwertyType.subscribe((flagValue)=>{
      // Constraint : Typewriter is false and Transliterate is set then it should be reset
      if (this.allowSuperScript && this.isQwerty)
          this.setSuperPosition();
      });
      this.sessionManager.itemShiftKeyPressed2.subscribe((flagForShift) => {
        this.isShiftKeyPress = flagForShift;
        if (this.allowSuperScript && this.isQwerty)
          this.setSuperPosition();
    });

    this.sessionManager.itemAltGrKeyPressed2.subscribe((flagForAltGr) => {
      this.isAltGrKeyPress = flagForAltGr;
      if (this.allowSuperScript && this.isQwerty && this.altGrCapsExists)
        this.setSuperPosition();
    });
    this.altGrCapsExists = (this.layoutCurrentKeys)? this.layoutCurrentKeys.some(x => x.hasOwnProperty('altGrCaps')) : false;
    if (this.allowSuperScript && this.isQwerty && this.altGrCapsExists)
      this.setSuperPosition();
  }

  ngAfterViewInit(): void {
    this.sessionManager.isMobileDevice.subscribe((value) => {
      this.isMobile = value;
    });

    this.sessionManager.isTabletDevice.subscribe((value) => {
      this.isTablet = value;
    });

    this.sessionManager.areKeysToBeHighlighted.subscribe((highlightOrNot)=> {
      this.highlightKeys = highlightOrNot;
    });

    /*this.sessionManager.layoutsDB.subscribe((layoutForLocale) => {
      this.keyboardLayouts = layoutForLocale;
    });*/
    
    this.sessionManager.fontSize2.subscribe((size) => {
      this.defaultFontSize = size;
    });

    this.sessionManager.cellSize2.subscribe((size) => {
      this.defaultCellSize = size;
    });
  }

  allOptionsTabs(tabChangeEvent: MatTabChangeEvent) {
    console.log("focus active ", tabChangeEvent.index, document.activeElement);
    if (tabChangeEvent.index == 0) {

    } else if (tabChangeEvent.index == 1) {
      if (document.activeElement == document.getElementById("wikipediaId")) {
        console.log("focus wikipediaId"); //id='searchInput' class='vector-search-box-input'
      }
    } else if (tabChangeEvent.index == 2) {
      if (document.activeElement == document.getElementById("linguisticInfoId")) {
        console.log("focus linguisticInfoId"); //id='gsc-i-id1' class='gsc-input'
      }
    } else if (tabChangeEvent.index == 3) {
      if (document.activeElement == document.getElementById("scriptInfoId")) {
        console.log("focus scriptInfoId"); //class='col q-input-target q-input-area'
      }
    } else if (tabChangeEvent.index == 4) {
      if (document.activeElement == document.getElementById("dictionaryId")) {
        console.log("focus dictionaryId"); //id='bablasearch' class='action-search typeahead tt-input'
      }
    } else if (tabChangeEvent.index == 5) {
      if (document.activeElement == document.getElementById("thesaurusId")) {
        console.log("focus thesaurusId"); //id='searchbox' class='keyboardInput ui-autocomplete-input ltr home'
      }
    }
  }

  populateKeyboard(locale) {
    return new Promise<any>((resolve, reject) => {
      this.http.get<{}>(`./../../assets/keyboard-layouts/${this.keyboardLayouts[locale][4]}`).subscribe(keyboards =>{
        if (keyboards)
          resolve(keyboards)
        else
          reject([]);
      });
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

  allowingSuperPositionKeys() {
    if (this.isQwerty) {
      this.allowSuperScript = !this.allowSuperScript;
      if (this.allowSuperScript) 
        this.setSuperPosition()
    }
  }

  setSuperPosition() {
    this.rowSuper = 0, this.columnSuper = 0;
    let qwertyPos = 0, transPos = 0, altGrPos = 0; 
    for(let i = 0; i < this.layoutCurrentKeys.length; i++) {
      Object.keys(this.layoutCurrentKeys[i]).map((key) => {
        if (key != "qwerty" && key != "qwertyShift" && key != "qwertyTrans" && key != "qwertyShiftTrans" && key != "altGr" && key != "altGrCaps")
          qwertyPos++;
        if (key != "qwertyTrans" && key != "qwertyShiftTrans" && key != "altGr" && key != "altGrCaps")
          transPos++;
        if (key != "altGr" && key != "altGrCaps")
          altGrPos++;
      });
    }
    if (this.isQwerty && !this.isShiftKeyPress && !this.isAltGrKeyPress) {
      this.rowSuper = qwertyPos;
      this.qwertyPos = this.rowSuper;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    } else if (this.isQwerty && this.isShiftKeyPress && !this.isAltGrKeyPress) {
      this.rowSuper = qwertyPos + 5;
      this.qwertyPos = this.rowSuper;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    } else if (this.isQwerty && !this.isShiftKeyPress && this.isAltGrKeyPress && this.altGrCapsExists) {
      this.rowSuper = altGrPos;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    } else if (this.isQwerty && this.isShiftKeyPress && this.isAltGrKeyPress && this.altGrCapsExists) {
      this.rowSuper = altGrPos + 5;
      this.rowPositions["delPos"] = this.rowSuper;
      this.rowPositions["tabPos"] = this.rowSuper + 1;
      this.rowPositions["enterPos"] = this.rowSuper + 2;
      this.rowPositions["shiftPos"] = this.rowSuper + 3;
    }
  }

  showSuperScriptCharacter(character) {
    if (!this.isShiftKeyPress) {
      if (this.isQwerty) {
        if (this.isAltGrKeyPress && this.altGrCapsExists) {
          if (character.value == this.layoutCurrentKeys[this.rowSuper]["altGr"][this.columnSuper]["value"]) {
            let charToSuper = this.layoutCurrentKeys[this.rowSuper + 5]["altGrCaps"][this.columnSuper]["value"];
            if (this.rowSuper == this.rowPositions["delPos"]) {
              // First row with Del Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGr"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["tabPos"]) {
              // Second row with Tab Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGr"].length - 1 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["enterPos"]) {
              // Third row with Enter Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGr"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
              // Fourth row with 2-Shift Keys
              if (this.layoutCurrentKeys[this.rowSuper]["altGr"].length - 2 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            }
            this.columnSuper = this.columnSuper + 1
            return charToSuper;
          }
        } else {
          if (character.value == this.layoutCurrentKeys[this.rowSuper]["qwerty"][this.columnSuper]["value"]) {
            let charToSuper = this.layoutCurrentKeys[this.rowSuper + 5]["qwertyShift"][this.columnSuper]["value"];
            if (this.rowSuper == this.rowPositions["delPos"]) {
              // First row with Del Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwerty"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["tabPos"]) {
              // Second row with Tab Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwerty"].length - 1 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["enterPos"]) {
              // Third row with Enter Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwerty"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
              // Fourth row with 2-Shift Keys
              if (this.layoutCurrentKeys[this.rowSuper]["qwerty"].length - 2 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            }
            this.columnSuper = this.columnSuper + 1
            return charToSuper;
          }
        }
      }
    } else {
      if (this.isQwerty) {
        if (this.isAltGrKeyPress && this.altGrCapsExists) {
          if (character.value == this.layoutCurrentKeys[this.rowSuper]["altGrCaps"][this.columnSuper]["value"]) {
            let charToSuper = this.layoutCurrentKeys[this.rowSuper - 5]["altGr"][this.columnSuper]["value"];
            if (this.rowSuper == this.rowPositions["delPos"]) {
              // First row with Del Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGrCaps"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["tabPos"]) {
              // Second row with Tab Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGrCaps"].length - 1 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["enterPos"]) {
              // Third row with Enter Key
              if (this.layoutCurrentKeys[this.rowSuper]["altGrCaps"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
              // Fourth row with 2-Shift Keys
              if (this.layoutCurrentKeys[this.rowSuper]["altGrCaps"].length - 2 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            }
            this.columnSuper = this.columnSuper + 1
            return charToSuper;
          }
        } else {
          if (character.value == this.layoutCurrentKeys[this.rowSuper]["qwertyShift"][this.columnSuper]["value"]) {
            let charToSuper = this.layoutCurrentKeys[this.rowSuper - 5]["qwerty"][this.columnSuper]["value"];
            if (this.rowSuper == this.rowPositions["delPos"]) {
              // First row with Del Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwertyShift"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["tabPos"]) {
              // Second row with Tab Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwertyShift"].length - 1 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["enterPos"]) {
              // Third row with Enter Key
              if (this.layoutCurrentKeys[this.rowSuper]["qwertyShift"].length - 2 == this.columnSuper) {
                this.columnSuper = 0;
                this.rowSuper++;
              }
            } else if (this.rowSuper == this.rowPositions["shiftPos"]) {
              // Fourth row with 2-Shift Keys
              if (this.layoutCurrentKeys[this.rowSuper]["qwertyShift"].length - 2 == this.columnSuper) {
                this.columnSuper = 1;
                this.rowSuper++;
              }
            }
            this.columnSuper = this.columnSuper + 1
            return charToSuper;
          } 
        }
      }
    }
  }

  cleanURL(url): SafeResourceUrl {
    return this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  localeForUI(ISO_BCP_Code) {
    this.localeToTranslate = this.keyboardLayouts[ISO_BCP_Code][2];

    // Take each of the languages which needs to be translated
    this.sortLanguageTranslations();
  }

  async sortLanguageTranslations() {
    this.sessionManager.selectHelper.next(false);
    this.sessionManager.selectToolbar.next(false);
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
    //this.keyboardLayouts = await this.localisedKeyboardLayoutDB("");
  }

  keyPressed(element, value, action, type) {
    if (action === "shift") {
      if (this.sessionManager.itemAltGrKeyPressed2.value == false) {
        if (this.sessionManager.itemShiftKeyPressed2.value == false)
          this.sessionManager.setShiftKeyPressed2(true);
        else if (this.sessionManager.itemShiftKeyPressed2.value == true)
          this.sessionManager.setShiftKeyPressed2(false);
      } else if (this.sessionManager.itemAltGrKeyPressed2.value == true) {
        if (this.sessionManager.itemShiftKeyPressed2.value == false && this.altGrCapsExists)
          this.sessionManager.setShiftKeyPressed2(true);
        else if (this.sessionManager.itemShiftKeyPressed2.value == true && this.altGrCapsExists)
          this.sessionManager.setShiftKeyPressed2(false);
      }
    } else if (action === "altGr") {
      if (this.sessionManager.itemShiftKeyPressed2.value == false) {
        if (this.sessionManager.itemAltGrKeyPressed2.value == false)
          this.sessionManager.setAltGrKeyPressed2(true);
        else if (this.sessionManager.itemAltGrKeyPressed2.value == true)
          this.sessionManager.setAltGrKeyPressed2(false);
      } else if (this.sessionManager.itemShiftKeyPressed2.value == true) {
        if (this.sessionManager.itemAltGrKeyPressed2.value == false && this.altGrCapsExists)
          this.sessionManager.setAltGrKeyPressed2(true);
        else if (this.sessionManager.itemAltGrKeyPressed2.value == true && this.altGrCapsExists)
          this.sessionManager.setAltGrKeyPressed2(false);
      }
    } else if (action === "control") {
      // No action
    } else if (action === "tab") {
      // No action
    } else if (action === "enter") {
      /*this.sessionManager.setElementForCharacterSelection(element);
      this.sessionManager.setCharFromKeyboard(value + "<br/>");
      this.sessionManager.setActionFromKeyboard(action);*/
    } else if (action === "char" && value === "\u00A0") {
      //this.sessionManager.setCharFromKeyboard("");
    } else if (action === "space" && value === "\u00A0") {
      //this.sessionManager.setCharFromKeyboard(value + " ");
    } else if (type == "vyanjana") {
      /*this.sessionManager.setElementForCharacterSelection(element);
      this.sessionManager.setCharFromKeyboard(value);
      this.sessionManager.setActionFromKeyboard(action);*/
    } else {
      /*if (this.sessionManager.itemSessionURL.value == "iub") {
        value = value.split(' ')[1];
      }
      this.sessionManager.setElementForCharacterSelection(element);
      this.sessionManager.setCharFromKeyboard(value);
      this.sessionManager.setActionFromKeyboard(action);*/
    }
  }

  swapLanguage() {
    let localeForSwap = this.localeOfUI;
    this.localeOfUI = this.localeToTranslate;
    this.localeToTranslate = localeForSwap;
  }

  inputRequest() {
    this.onInputRequest = true;
  }

  duplicateKeyboard() {
    this.sessionManager.selectedKeyboard.next(this.sessionManager.itemUILocale.value);
    this.sessionManager.itemQwertyType.next(true);
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

  pasteInputFieldForAttacks(eventInput) {
    setTimeout(() => {
      if (eventInput.target.value.indexOf("*") > -1 || eventInput.target.value.indexOf("$") > -1 || eventInput.target.value.indexOf("%") > -1 || eventInput.target.value.indexOf("=") > -1 || eventInput.target.value.indexOf("!") > -1 || eventInput.target.value.indexOf("?") > -1 || eventInput.target.value.indexOf("&") > -1 || eventInput.target.value.indexOf("<") > -1 || eventInput.target.value.indexOf(">") > -1 || eventInput.target.value.indexOf("(") > -1 || eventInput.target.value.indexOf(")") > -1 || eventInput.target.value.indexOf("{") > -1 || eventInput.target.value.indexOf("}") > -1) {
        this._snackBar.open(this.translateForSnackBar[1], this.translateForSnackBar[0], {
          duration: 3000,
        });
        setTimeout(()=>{
          this.searchInputAllScripts.nativeElement.value = "";
        }, 200);
      }
      eventInput.stopPropagation();
    });
  }

}
