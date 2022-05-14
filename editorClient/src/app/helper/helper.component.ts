import { Component, ComponentRef, OnInit, AfterViewInit, SecurityContext, ElementRef, ViewChild, Inject } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {startWith, map} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import SVAConfig from '../../assets/environments/sva_config.json';

import * as allLayoutPositions from './../../assets/keyboard-layouts/keysboards-layouts.json';

import { ThemeService } from '../core/services/theme.service';
import { TranslateService } from '../core/services/translate.service';
import { SessionManagerService } from '../core/services/session-manager.service';

export interface AvailableKeyboards {
  scriptType: string;
  scriptName: string[];
}

export interface SupportedWrittenLanguage {
  name: string;
  code: string;
}

export interface HelpOrPrivacy {
  show: 'privacy' | 'help' | 'upload';
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.split(' ')[0].toLowerCase().indexOf(filterValue) === 0 || item.split(' ')[2].toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent implements OnInit, AfterViewInit {

  @ViewChild('searchAllScripts') searchInputAllScripts: ElementRef;
  @ViewChild('countOfSuggestionPerDevice') suggestionsForDevice : ElementRef;

  hostname: string = SVAConfig.hostname;
  port: number = SVAConfig.port;

  supportedScripts: FormGroup = this._formBuilder.group({
    script: ''
  });
  allScripts: AvailableKeyboards[] = [{"scriptType": "", "scriptName": []},{"scriptType": "", "scriptName": []},{"scriptType": "", "scriptName": []},{"scriptType": "", "scriptName": []},{"scriptType": "", "scriptName": []},{"scriptType": "", "scriptName": []},{"scriptType": "", "scriptName": []},{"scriptType": "", "scriptName": []},{"scriptType": "", "scriptName": []}];
  supportedScriptsOptions: Observable<AvailableKeyboards[]>;

  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;

  keyboardLayouts: any = (allLayoutPositions as any).default;

  localeUISelection : String = '';
  currentKeyboard: String = '';
  keyboardStyle: string = '';

  supportedLanguageColumn1 : any = [];
  supportedLanguageColumn2 : any = [];
  supportedLanguageColumn3 : any = [];
  supportedLanguageColumn4 : any = [];
  allSupportedLanguages : any = [];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  supportedWrittenLanguage: SupportedWrittenLanguage[] = [];

  showEditor : Boolean = true;

  appStatus: Boolean = false;
  defaultLocale: String = "";
  overridenUILocale: String = "";
  contentSession: string = "";
  isRTL: Boolean = false;
  offlineUsage : Boolean = false;

  exploreOnly: Boolean = true;
  helpOrPrivacy: Boolean = false;
  uploadDialog: Boolean = false;
  initialDataSend: Boolean = true;
  saveBrowser: Boolean = false;
  suggestionForUser: Boolean = true;
  countOfSuggestions: Number = (this.isMobile)? 4 : ((this.isTablet)? 7 : 14);
  shareWordsFromContent: Boolean = false;
  continousIntegration: Boolean = false;
  highlightInKeyboard: Boolean = true;
  unusedKeys: Boolean = false;
  criteriaNotMet: Boolean = false;
  urlOfKeyboard: string = '';
  githubPagesURL: string = "https://vyshantha.github.io/multiscripteditor/";

  allQwertyKeyboards = ["ace", "adlm", "iai", "af", "ak", "sq", "gsw", "am", "njo", "ar", "an", "hy", "as", "ast", "az", "aze", "bjn", "ban", "bm", "bak", "eu", "bar", "be", "befr", "bn", "tfng", "bharati", "bcl", "bis", "brx", "brxla", "bopo", "bs", "bsla", "brah", "iub", "br", "bug", "bugla", "bg", "cans", "ca", "ceb", "cakm", "ch", "cher", "zhcn", "zhtw", "cjk", "kw", "co", "hr", "cs", "dgabf", "dgagh", "dag", "da", "de", "din", "nl", "dz", "bin", "engb", "enin", "enintl", "enus", "eo", "et", "eurkey", "evncy", "ee", "fo", "fa", "fj", "fi", "fon", "latf", "fr", "frca", "fy", "ff", "fur", "gd", "gag", "gl", "gall", "geez", "ka", "gor", "el", "kl", "apu", "gn", "gu", "ht", "haj", "ko", "rohg", "ha", "haw", "he", "hi", "hira", "hmn", "hu", "is", "ig", "ilo", "hil", "id", "esi", "iu", "esk", "ipa", "ga", "it", "jam", "jv", "lad", "ladla", "kbp", "ja", "pam", "csb", "kata", "kaz", "kk", "kha", "km", "ki", "rw", "gil", "rn", "kon", "ko", "ku", "ky", "lbj", "lld", "lo", "ltg", "la", "lv", "lij", "li", "ln", "lis", "lt", "liv", "lmo", "lg", "lb", "lwo", "mk", "mad", "mg", "ms", "ml", "mt", "malt", "mnc", "mnk", "mni", "gv", "mi", "mrw", "mr", "mh", "masu", "mfe", "mic", "min", "mwl", "lus", "mn", "mnla", "mon", "mos", "my", "nag", "na", "nv", "nde", "nap", "nia", "jpn", "njz", "nkoo", "nrf", "no", "ny", "oc", "or", "oira", "olck", "om", "osge", "osma", "pau", "pln", "pag", "pap", "ps", "phag", "pms", "pin", "pl", "pt", "ptbr", "pa", "kaa", "rally", "ranj", "rom", "ro", "ru", "se", "sm", "sgs", "iast", "sa", "srm", "sc", "nds", "sr", "st", "tn", "crs", "sii", "sn", "scu", "sd", "si", "ss", "sk", "sl", "so", "sora", "wen", "es", "esmx", "sun", "sw", "sv", "gsw", "syrc", "tl", "ty", "tale", "talu", "tg", "ta", "tt", "te", "tdt", "thaa", "th", "tibt", "tig", "ti", "tpi", "tokp", "to", "tso", "tr", "tk", "tuk", "uk", "ur", "ipk", "ug", "uz", "uzb", "ven", "vec", "vi", "wym", "wa", "war", "cy", "wo", "xh", "sah", "yi", "bjyo", "ngyo", "zza", "zu"];
  allTransliterateKeyboards = ['as', 'bn', 'brx', 'gu', 'haj', 'hi', 'kn', 'ml', 'malt', 'mr', 'or', 'pa', 'sa', 'ta', 'te', 'ur', 'tirh', 'mni', 'hy', 'bg', 'km'];
  qwertyKeyboardNames : string = "";
  qwertyTransliterateKeyboards : string = "";

  imageDataBase64: string = "";

  translateForSnackBar: string[] = [];

  runProgressIndicator: Boolean = false;

  // EasyOCR Supported Languages
  supported_written_language = [];

  constructor(private dialogRef: MatDialogRef<HelperComponent>, private _formBuilder: FormBuilder, private http: HttpClient, private translate: TranslateService, private sessionManager: SessionManagerService, private themeService: ThemeService, searchInputAllScripts: ElementRef, private sanitizer: DomSanitizer, suggestionsForDevice: ElementRef, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: HelpOrPrivacy) { 
    if (this.data.show == 'privacy') {
      this.helpOrPrivacy = true;
    } else if (this.data.show == 'help') {
      this.helpOrPrivacy = false;
    } else if (this.data.show == 'upload') {
      this.uploadDialog = true;
      this.helpOrPrivacy = false;
    }
    this.appStatus = this.sessionManager.itemOfflineOnly.value;
    this.defaultLocale = this.keyboardLayouts[window.navigator.language.split('-')[0]][5];
    this.localeUISelection = this.keyboardLayouts[this.sessionManager.getUILocale()][2];
    if (this.sessionManager.getOverridenUILocaleInSession())
      this.overridenUILocale = this.keyboardLayouts[this.sessionManager.getOverridenUILocaleInSession()][5];
    else
      this.overridenUILocale = this.localeUISelection;
    if (this.sessionManager.getFromSessionURL())
      this.currentKeyboard = this.keyboardLayouts[this.sessionManager.getFromSessionURL()][5];
    this.typeOfKeyboardTranslation();
    this.sortLanguageTranslations();
    this.populateSupportedScripts();
    this.offlineUsage = this.sessionManager.itemOfflineOnly.value;
    this.searchInputAllScripts = searchInputAllScripts;
    this.suggestionsForDevice = suggestionsForDevice;

    // Users Choice Loading
    this.initialDataSend = (this.sessionManager.isSendInitialLoadDataAllowed() == 'true') ? true : false;
    this.saveBrowser = (this.sessionManager.retrieveSaveSessionAllowed() == 'true') ? true : false;
    this.suggestionForUser = (this.sessionManager.suggestionForLanguage() == 'true') ? true : false;
    this.shareWordsFromContent = (this.sessionManager.isShareContentWordSuggestionsAllowed() == 'true') ? true : false;
    this.continousIntegration = (this.sessionManager.isIntegrationContinous() == 'true') ? true : false;
    this.highlightInKeyboard = (this.sessionManager.isHighlightKeysSet() == 'true') ? true : false;
    this.unusedKeys = (this.sessionManager.areUnusedKeysToBeShown() == 'true') ? true : false;
    this.urlOfKeyboard = this.sessionManager.getFromSessionURL();
    if (this.sessionManager.countOfSuggestionForSession() == 0) {
      if ((this.isMobile && !this.isTablet)) {
        this.sessionManager.setCountSuggestions(4);
      } else if (!this.isMobile && this.isTablet) {
        this.sessionManager.setCountSuggestions(7);
      } else if (!this.isMobile && !this.isTablet) {
        this.sessionManager.setCountSuggestions(14);
      }
    }
    this.countOfSuggestions = this.sessionManager.countOfSuggestionForSession();
    this.translateSnackBars();
  }

  ngOnInit(): void {
    this.supportedScriptsOptions = this.supportedScripts.get('script')!.valueChanges.pipe(startWith(''), map(value => this._filterScript(value)));
    if (this.sessionManager.getUILocale()) {
      let rtlLocales = ['ar', 'he', 'ur', 'fa', 'syrc', 'rhg', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ckb', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'skr', 'pal', 'xpr', 'xsa', 'mnkar', 'jawi', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf', 'woal', 'chrs', 'elym', 'palm', 'hatr', 'ber', 'mani', 'mer', 'psal', 'kult', 'egyd', 'safa', 'nshu', 'rohg', 'estr', 'sert', 'madn', 'lad', 'nbat', 'pice', 'gars', 'cprt', 'lepo', 'sabe', 'phyg', 'khaz', 'mero', 'cana', 'sina', 'yezi', 'ug', 'mend', 'linb', 'idu', 'chun', 'kuli', 'txg', 'indus', 'hung'];
      this.isRTL = (rtlLocales.indexOf(this.sessionManager.getUILocale()) !== -1)? true : false;
    }
    this.sessionManager.selectToolbar.subscribe((trigger) => {
      if (trigger == true && this.sessionManager.selectHelper.value == false) {
        var self = this;
        const localeUITranslate = setInterval(function() {
          self.sortLanguageTranslations();
          self.sessionManager.selectHelper.next(false);
          clearInterval(localeUITranslate);
        }, 300);
      }
    });
    this.sessionManager.nonExplorationMode.subscribe((editorOnly) => {
      this.showEditor = editorOnly;
    });
  }

  ngAfterViewInit(): void {
    this.sessionManager.isMobileDevice.subscribe((value) => {
      this.isMobile = value;
    });

    this.sessionManager.isTabletDevice.subscribe((value) => {
      this.isTablet = value;
    });

    this.sessionManager.countOfSuggestions.subscribe((count) => {
      this.countOfSuggestions = count;
    });
    /*this.sessionManager.layoutsDB.subscribe((layoutForLocale) => {
      this.keyboardLayouts = layoutForLocale;
    });*/
  }

  async populateSupportedScripts() {
    let translateSet = ["Abjad", "Alphabet", "Abugida", "Syllabery", "Ideogram", "Logogram", "Pictogram", "Braille", "Sign", "Code", "Shorthand", "Emoji", "Unclassified"];
    let translationsForSet = await this.loadFromFile(this.sessionManager.getUILocale(), translateSet);
    if (this.allScripts[0].scriptType == "" && this.allScripts[0]) {
      this.allScripts[0].scriptType = translationsForSet[0];
    }
    if (this.allScripts[1].scriptType == "" && this.allScripts[1]) {
      this.allScripts[1].scriptType = translationsForSet[1];
    }
    if (this.allScripts[2].scriptType == "" && this.allScripts[2]) {
      this.allScripts[2].scriptType = translationsForSet[2];
    }
    if (this.allScripts[3].scriptType == "" && this.allScripts[3]) {
      this.allScripts[3].scriptType = translationsForSet[3];
    } 
    if (this.allScripts[4].scriptType == "" && this.allScripts[4]) {
      this.allScripts[4].scriptType = translationsForSet[4] + "-" + translationsForSet[5] + "-" + translationsForSet[6];
    }
    if (this.allScripts[5].scriptType == "" && this.allScripts[5]) {
      this.allScripts[5].scriptType = translationsForSet[7];
    }
    if (this.allScripts[6].scriptType == "" && this.allScripts[6]) {
      this.allScripts[6].scriptType = translationsForSet[8];
    }
    if (this.allScripts[7].scriptType == "" && this.allScripts[7]) {
      this.allScripts[7].scriptType = translationsForSet[9] + "-" + translationsForSet[10] + "-" + translationsForSet[11];
    }
    if (this.allScripts[8].scriptType == "" && this.allScripts[8]) {
      this.allScripts[8].scriptType = translationsForSet[12];
    }
    this.keyboardLayouts = await this.localisedKeyboardLayoutDB(this.sessionManager.getUILocale());
    Object.keys(this.keyboardLayouts).map(key => {
      let forTypeOfScript = this.allScripts[this.keyboardLayouts[key][0]];
      (forTypeOfScript) ? forTypeOfScript.scriptName.push(this.keyboardLayouts[key][2] + " - " + this.keyboardLayouts[key][5] + " (" + key + ")") : [];
    });
    // Sort each of the Script Types as per Localised name
    this.allScripts[0].scriptName = this.allScripts[0].scriptName.sort((a, b)=> {
      return a.localeCompare(b);
    });
    this.allScripts[1].scriptName = this.allScripts[1].scriptName.sort((a, b)=> {
      return a.localeCompare(b);
    });
    this.allScripts[2].scriptName = this.allScripts[2].scriptName.sort((a, b)=> {
      return a.localeCompare(b);
    });
    this.allScripts[3].scriptName = this.allScripts[3].scriptName.sort((a, b)=> {
      return a.localeCompare(b);
    });
    this.allScripts[4].scriptName = this.allScripts[4].scriptName.sort((a, b)=> {
      return a.localeCompare(b);
    });
    this.allScripts[5].scriptName = this.allScripts[5].scriptName.sort((a, b)=> {
      return a.localeCompare(b);
    });
    this.allScripts[6].scriptName = this.allScripts[6].scriptName.sort((a, b)=> {
      return a.localeCompare(b);
    });
    this.allScripts[7].scriptName = this.allScripts[7].scriptName.sort((a, b)=> {
      return a.localeCompare(b);
    });
    this.allScripts[8].scriptName = this.allScripts[8].scriptName.sort((a, b)=> {
      return a.localeCompare(b);
    });
    // All the Qwerty Keyboard that are available
    let unSortedLocales = [];
    for (let key = 0; key < this.allQwertyKeyboards.length; key++) {
      if (this.keyboardLayouts[this.allQwertyKeyboards[key]])
        unSortedLocales.push(" " + this.keyboardLayouts[this.allQwertyKeyboards[key]][2]);
    }
    unSortedLocales = unSortedLocales.sort((a,b) => {
      return a.localeCompare(b);
    });
    this.qwertyKeyboardNames = unSortedLocales.toString();
    unSortedLocales = [];
    for (let key = 0; key < this.allTransliterateKeyboards.length; key++) {
      if (this.keyboardLayouts[this.allTransliterateKeyboards[key]])
        unSortedLocales.push(" " + this.keyboardLayouts[this.allTransliterateKeyboards[key]][2]);
    }
    unSortedLocales = unSortedLocales.sort((a,b) => {
      return a.localeCompare(b);
    });
    this.qwertyTransliterateKeyboards = unSortedLocales.toString();
  }

  updateSortSupportedWrittenLanguage() {
    this.supported_written_language = [{"easyocr":"Abaza","code":"abq"},{"easyocr":"Adyghe","code":"ady"},{"easyocr":this.keyboardLayouts['af'][2],"code":"af"},{"easyocr":"Angika","code":"ang"},{"easyocr":this.keyboardLayouts['ar'][2],"code":"ar"},{"easyocr":this.keyboardLayouts['as'][2],"code":"as"},{"easyocr":"Avar","code":"ava"},{"easyocr":this.keyboardLayouts['az'][2],"code":"az"},{"easyocr":this.keyboardLayouts['be'][2],"code":"be"},{"easyocr":this.keyboardLayouts['bg'][2],"code":"bg"},{"easyocr":"Bihari","code":"bh"},{"easyocr":this.keyboardLayouts['bho'][2],"code":"bho"},{"easyocr":this.keyboardLayouts['bn'][2],"code":"bn"},{"easyocr":this.keyboardLayouts['bs'][2],"code":"bs"},{"easyocr":this.keyboardLayouts['zhcn'][2],"code":"ch_sim"},{"easyocr":this.keyboardLayouts['zhtw'][2],"code":"ch_tra"},{"easyocr":"Chechen","code":"che"},{"easyocr":this.keyboardLayouts['cs'][2],"code":"cs"},{"easyocr":this.keyboardLayouts['cy'][2],"code":"cy"},{"easyocr":this.keyboardLayouts['da'][2],"code":"da"},{"easyocr":"Dargwa","code":"dar"},{"easyocr":this.keyboardLayouts['de'][2],"code":"de"},{"easyocr":this.keyboardLayouts['en'][2],"code":"en"},{"easyocr":this.keyboardLayouts['es'][2],"code":"es"},{"easyocr":this.keyboardLayouts['et'][2],"code":"et"},{"easyocr":this.keyboardLayouts['fa'][2],"code":"fa"},{"easyocr":this.keyboardLayouts['fr'][2],"code":"fr"},{"easyocr":this.keyboardLayouts['ga'][2],"code":"ga"},{"easyocr":this.keyboardLayouts['kom'][2],"code":"gom"},{"easyocr":this.keyboardLayouts['hi'][2],"code":"hi"},{"easyocr":this.keyboardLayouts['hr'][2],"code":"hr"},{"easyocr":this.keyboardLayouts['hu'][2],"code":"hu"},{"easyocr":this.keyboardLayouts['id'][2],"code":"id"},{"easyocr":"Ingush","code":"inh"},{"easyocr":this.keyboardLayouts['is'][2],"code":"is"},{"easyocr":this.keyboardLayouts['it'][2],"code":"it"},{"easyocr":this.keyboardLayouts['ja'][2],"code":"ja"},{"easyocr":"Kabardian","code":"kbd"},{"easyocr":this.keyboardLayouts['kn'][2],"code":"kn"},{"easyocr":this.keyboardLayouts['ko'][2],"code":"ko"},{"easyocr":this.keyboardLayouts['ku'][2],"code":"ku"},{"easyocr":this.keyboardLayouts['la'][2],"code":"la"},{"easyocr":"Lak","code":"lbe"},{"easyocr":"Lezghian","code":"lez"},{"easyocr":this.keyboardLayouts['lt'][2],"code":"lt"},{"easyocr":this.keyboardLayouts['lv'][2],"code":"lv"},{"easyocr":"Magahi","code":"mah"},{"easyocr":this.keyboardLayouts['tirh'][2],"code":"mai"},{"easyocr":this.keyboardLayouts['mi'][2],"code":"mi"},{"easyocr":this.keyboardLayouts['mn'][2],"code":"mn"},{"easyocr":this.keyboardLayouts['mr'][2],"code":"mr"},{"easyocr":this.keyboardLayouts['ms'][2],"code":"ms"},{"easyocr":this.keyboardLayouts['mt'][2],"code":"mt"},{"easyocr":this.keyboardLayouts['ne'][2],"code":"ne"},{"easyocr":"Newari","code":"new"},{"easyocr":this.keyboardLayouts['nl'][2],"code":"nl"},{"easyocr":this.keyboardLayouts['no'][2],"code":"no"},{"easyocr":this.keyboardLayouts['oc'][2],"code":"oc"},{"easyocr":this.keyboardLayouts['pi'][2],"code":"pi"},{"easyocr":this.keyboardLayouts['pl'][2],"code":"pl"},{"easyocr":this.keyboardLayouts['pt'][2],"code":"pt"},{"easyocr":this.keyboardLayouts['ro'][2],"code":"ro"},{"easyocr":this.keyboardLayouts['ru'][2],"code":"ru"},{"easyocr":this.keyboardLayouts['sr'][2],"code":"rs_cyrillic"},{"easyocr":"Serbian (latin)","code":"rs_latin"},{"easyocr":"Nagpuri","code":"sck"},{"easyocr":this.keyboardLayouts['sk'][2],"code":"sk"},{"easyocr":this.keyboardLayouts['sl'][2],"code":"sl"},{"easyocr":this.keyboardLayouts['sq'][2],"code":"sq"},{"easyocr":this.keyboardLayouts['sv'][2],"code":"sv"},{"easyocr":this.keyboardLayouts['sw'][2],"code":"sw"},{"easyocr":this.keyboardLayouts['ta'][2],"code":"ta"},{"easyocr":"Tabassaran","code":"tab"},{"easyocr":this.keyboardLayouts['te'][2],"code":"te"},{"easyocr":this.keyboardLayouts['th'][2],"code":"th"},{"easyocr":this.keyboardLayouts['tg'][2],"code":"tjk"},{"easyocr":this.keyboardLayouts['tl'][2],"code":"tl"},{"easyocr":this.keyboardLayouts['tr'][2],"code":"tr"},{"easyocr":this.keyboardLayouts['ug'][2],"code":"ug"},{"easyocr":this.keyboardLayouts['uk'][2],"code":"uk"},{"easyocr":this.keyboardLayouts['ur'][2],"code":"ur"},{"easyocr":this.keyboardLayouts['uz'][2],"code":"uz"},{"easyocr":this.keyboardLayouts['vi'][2],"code":"vi"}];

    this.supported_written_language.sort((a, b)=>{
      return a.easyocr.localeCompare(b.easyocr);
    });
  }

  populateSupportedWrittenLanguage(language, code) {
    this.criteriaNotMet = false;
    this.supportedWrittenLanguage.push({name: language, code: code});
  }

  addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let input = event.input;
    if (value && this.supported_written_language.indexOf(value) > 0) {
      this.supportedWrittenLanguage.push({name: value.split(" ")[0], code:  value.split(" ")[1]});
    }
    if (input) {
      input.value = '';
    }
  }

  removeLanguage(language: SupportedWrittenLanguage): void {
    const index = this.supportedWrittenLanguage.indexOf(language);

    if (index >= 0) {
      this.supportedWrittenLanguage.splice(index, 1);
    }
  }

  loadMyKeyboard() {
    // Load the Keyboard selection of Choice before closing the Dialogue box
    this.sessionManager.setSelectedKeyboard(this.supportedScripts.get('script').value.split('(')[1].split(')')[0]);
    this.done();
  }

  private _filterScript(value: string): AvailableKeyboards[] {
    if (value) {
      return this.allScripts
                 .map(script => ({scriptType: script.scriptType, scriptName: _filter(script.scriptName, value)}))
                 .filter(script => script.scriptName.length > 0);
    }
    return this.allScripts;
  }

  async typeOfKeyboardTranslation() {
    let translateSet = ["QWERTY", "Transliteration", "Language Learning"];
    let translationsForSet = await this.loadFromFile(this.sessionManager.getUILocale(), translateSet);
    if (this.sessionManager.getInSessionQwerty() === "true") {
      this.keyboardStyle = translationsForSet[0];
    } else if (this.sessionManager.getTransliterate() === "true") {
      this.keyboardStyle = translationsForSet[1];
    } else {
      this.keyboardStyle = translationsForSet[2];
    }
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

  localisedKeyboardLayoutDB(ISO_Code) {
    if (ISO_Code && ISO_Code != "") {
      return new Promise<any>((resolve, reject)=> {
        this.http.get<{}>(`assets/keyboard-layouts/keysboards-layouts_${ISO_Code}.json`).subscribe(
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

  exploreMode() {
    if (this.exploreOnly == true) {
      this.contentSession = this.sessionManager.getSessionSavedContent();
      this.sessionManager.nonExplorationMode.next(false);
      if (localStorage.getItem("ltpaToken")) {
        this.sessionManager.setInSessionOnlyKeyboard(false);
        this.sessionManager.itemKeyboardOnly.next(false); 
      }
    } else if (this.exploreOnly == false) {
      if (this.contentSession != "")
        this.sessionManager.setSessionSavingOfContent(this.contentSession);
      this.sessionManager.nonExplorationMode.next(true);
    }
    this.exploreOnly = !this.exploreOnly;
    this.done();
  }

  done() {
    if (this.helpOrPrivacy) {
      this.sessionManager.setCountSuggestions(this.preventInputFieldForAttacks(this.suggestionsForDevice.nativeElement.value));
    }
    this.supportedWrittenLanguage = [];
    this.dialogRef.close();
  }

  zenMode() {
    if (this.helpOrPrivacy) {
      this.sessionManager.setCountSuggestions(this.preventInputFieldForAttacks(this.suggestionsForDevice.nativeElement.value));
    }
    if (this.sessionManager.itemKeyboardOnly.value == false)
      this.sessionManager.setInSessionOnlyKeyboard(true);
    this.done();
    this.sessionManager.setMultiIgnore();
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

    let rtlLocales = ['ar', 'he', 'ur', 'fa', 'syrc', 'rhg', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ckb', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'skr', 'pal', 'xpr', 'xsa', 'mnkar', 'jawi', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf', 'woal', 'chrs', 'elym', 'palm', 'hatr', 'ber', 'mani', 'mer', 'psal', 'kult', 'egyd', 'safa', 'nshu', 'rohg', 'estr', 'sert', 'madn', 'lad', 'nbat', 'pice', 'gars', 'cprt', 'lepo', 'sabe', 'phyg', 'khaz', 'mero', 'cana', 'sina', 'yezi', 'ug', 'mend', 'linb', 'idu', 'chun', 'kuli', 'txg', 'indus', 'hung'];
    this.isRTL = (rtlLocales.indexOf(ISO_BCP_Code) !== -1)? true : false;

    this.defaultLocale = this.keyboardLayouts[window.navigator.language.split('-')[0]][5];
    this.overridenUILocale = this.keyboardLayouts[ (this.sessionManager.getOverridenUILocaleInSession()) ? this.sessionManager.getOverridenUILocaleInSession() : window.navigator.language.split('-')[0] ][5];

    this.typeOfKeyboardTranslation();
    this.sortLanguageTranslations();
    this.populateSupportedScripts();
    this.sessionManager.selectHelper.next(true);
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
    this.updateSortSupportedWrittenLanguage();
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

  selectKeyboard() {
    if (this.helpOrPrivacy) {
      this.sessionManager.setCountSuggestions(this.preventInputFieldForAttacks(this.suggestionsForDevice.nativeElement.value));
    }
    if (this.sessionManager.itemKeyboardOnly.value == true)
      this.sessionManager.setInSessionOnlyKeyboard(false);
    this.done();
  }

  switchType(index) {
    if (this.sessionManager.itemKeyboardOnly.value == true)
      this.sessionManager.setInSessionOnlyKeyboard(false);
    this.sessionManager.setScriptTypeTab(index);
    // Close the Helper pop-up after a short period
    setTimeout(() => {
      this.done();
    }, 500);
  }

  offlineOnly() {
    if (this.sessionManager.itemOfflineOnly.value == false)
      this.sessionManager.setOfflineOnly(true);
    else if (this.sessionManager.itemOfflineOnly.value == true)
      this.sessionManager.setOfflineOnly(false);
    this.appStatus = this.sessionManager.itemOfflineOnly.value;
  }

  usersChoice(type) {
    if (type == 'initialData') {
      this.sessionManager.allowSendInitialLoadDataAllowed((this.initialDataSend) ? 'false' : 'true');
    } else if (type == 'saveContent') {
      this.sessionManager.allowSaveSessionToBrowser((this.saveBrowser) ? 'false' : 'true');
    } else if (type == 'showSuggestions') {
      this.sessionManager.configSuggesionForLanguage((this.suggestionForUser) ? 'false' : 'true');
    } else if (type == 'shareWords') {
      this.sessionManager.shareContentWordSuggestions((this.shareWordsFromContent) ? 'false': 'true');
    } else if (type == 'continous') {
      this.sessionManager.shouldIntegrationBeContinous((this.continousIntegration)? 'false': 'true')
    } else if (type == 'highlightKeys') {
      this.sessionManager.highlightOrNot((this.highlightInKeyboard) ? 'false': 'true');
    } else if (type == 'unusedKeys') {
      this.sessionManager.setUnusedKeysShow((this.unusedKeys) ? 'false': 'true');
    }
  }

  cleanURL(url): SafeResourceUrl {
    return this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  convertImage2Text(type, imageInput: any) {
    if (type == 'url' && imageInput) {
      this.criteriaNotMet = false;
      if (this.supportedWrittenLanguage.length > 0 && imageInput.value != "") {
        this.runProgressIndicator = true;
        this.sessionManager.image2TextConvert(type, this.supportedWrittenLanguage, imageInput.value).subscribe((result: any) => {
          console.info("[MUlTISCRIPTEDITOR] Convert Image To Text URL ", result);
          this.runProgressIndicator = false;
        }, (error) => {
          let convertedText = error.error.text;
          if (convertedText && convertedText != null) {
            convertedText = convertedText.replace(/\\"/g,"'").match(/'(.*?)'/g);
            for(let i = 0; i < convertedText.length ; i++) {
              if (convertedText[i].indexOf("', 0.") == -1 && convertedText[i].indexOf("([[") == -1 && convertedText[i].indexOf("]]") == -1) {
                this.sessionManager.setCharFromKeyboard(convertedText[i].replace(/'/g, "").replace(/\\"/g, "").replace(/\\'/g, "") + " ");
              }
            }
            console.info("[MUlTISCRIPTEDITOR] Convert Image To Text URL ", convertedText);
          }
          this.runProgressIndicator = false;
        });
      } else {
        this.criteriaNotMet = true;
      }
    } else if (type == 'file' && (imageInput || this.imageDataBase64)) {
      this.criteriaNotMet = false;
      if (this.supportedWrittenLanguage.length > 0 && this.imageDataBase64 && this.imageDataBase64 != "" && imageInput == "button") {
        this.runProgressIndicator = true;
        this.sessionManager.image2TextConvert(type, this.supportedWrittenLanguage, this.imageDataBase64).subscribe((result: any) => {
          console.info("[MUlTISCRIPTEDITOR] Convert Image To Text File ", result)
          this.runProgressIndicator = false;
        }, (error) => {
          let convertedText = error.error.text;
          if (convertedText && convertedText != null) {
            convertedText = convertedText.replace(/\\"/g,"'").match(/'(.*?)'/g);
            for(let i = 0; i < convertedText.length ; i++) {
              if (convertedText[i].indexOf("', 0.") == -1 && convertedText[i].indexOf("([[") == -1 && convertedText[i].indexOf("]]") == -1) {
                this.sessionManager.setCharFromKeyboard(convertedText[i].replace(/'/g, "").replace(/\\"/g, "").replace(/\\'/g, "") + " ");
              }
            }
            console.info("[MUlTISCRIPTEDITOR] Convert Image To Text URL ", convertedText);
          }
          this.runProgressIndicator = false;
        });
      } else if (imageInput && imageInput.files){
        const file: File = imageInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.imageDataBase64 = event.target.result;
          if (this.supportedWrittenLanguage.length > 0) {
            this.runProgressIndicator = true;
            this.sessionManager.image2TextConvert(type, this.supportedWrittenLanguage, event.target.result).subscribe((result: any) => {
              console.info("[MUlTISCRIPTEDITOR] Convert Image To Text File & Memory ", result);
              this.runProgressIndicator = false;
            }, (error) => {
              let convertedText = error.error.text;
              if (convertedText && convertedText != null) {
                convertedText = convertedText.replace(/\\"/g,"'").match(/'(.*?)'/g);
                for(let i = 0; i < convertedText.length ; i++) {
                  if (convertedText[i].indexOf("', 0.") == -1 && convertedText[i].indexOf("([[") == -1 && convertedText[i].indexOf("]]") == -1) {
                    this.sessionManager.setCharFromKeyboard(convertedText[i].replace(/'/g, "").replace(/\\"/g, "").replace(/\\'/g, "") + " ");
                  }
                }
                console.info("[MUlTISCRIPTEDITOR] Convert Image To Text URL ", convertedText);
              }
              this.runProgressIndicator = false;
            });
          } else {
            this.criteriaNotMet = true;
          }
        });
        reader.readAsDataURL(file);
      } else {
        this.criteriaNotMet = true;
      }
    } else if (type == 'draw' && imageInput == '') {
      // Convert Drawn Image to Text with EasyOCR
      this.criteriaNotMet = false;
      if (this.supportedWrittenLanguage.length == 0) {
        // If you do not choose language, then it defaults to keyboard script
        this.supportedWrittenLanguage.push({"code": this.sessionManager.getFromSessionURL(), "name": this.keyboardLayouts[this.sessionManager.getFromSessionURL()][5]});
      }
      var canvas = <HTMLCanvasElement> document.getElementById("canvasDraw");        
      this.imageDataBase64 = canvas.toDataURL("image/png");      
      if (this.supported_written_language.findIndex(obj => obj.code==this.supportedWrittenLanguage[0]["code"]) > -1 && this.imageDataBase64 && this.imageDataBase64 != "") {
        this.runProgressIndicator = true;
        this.sessionManager.image2TextConvert('file', this.supportedWrittenLanguage, this.imageDataBase64).subscribe((result: any) => {
          console.info("[MUlTISCRIPTEDITOR] Convert Image To Text File ", result)
          this.runProgressIndicator = false;
        }, (error) => {
          let convertedText = error.error.text;
          if (convertedText && convertedText != null) {
            convertedText = convertedText.replace(/\\"/g,"'").match(/'(.*?)'/g);
            for(let i = 0; i < convertedText.length ; i++) {
              if (convertedText[i].indexOf("', 0.") == -1 && convertedText[i].indexOf("([[") == -1 && convertedText[i].indexOf("]]") == -1) {
                this.sessionManager.setCharFromKeyboard(convertedText[i].replace(/'/g, "").replace(/\\"/g, "").replace(/\\'/g, "") + " ");
              }
            }
            console.info("[MUlTISCRIPTEDITOR] Convert Image To Text URL ", convertedText);
          }
          this.runProgressIndicator = false;
        });
      } else {
        // If it is not an Easy OCR Supported Language then just send that to editor
        // Pass the Image via SessionManager API to Editor
        this.sessionManager.setActionFromKeyboard(this.imageDataBase64)
      }
    }
  }

  clearCanvas() {
    this.sessionManager.clearCanvas.next(true);
  }

  async translateSnackBars() {
    let translateSet = ["OK", "These characters < > ( ) { } $ % = ! ? & * are not allowed in this field"];
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

  preventInputFieldForAttacks(eventInput) {
    if (eventInput.key && (eventInput.key.indexOf("*") > -1 || eventInput.key.indexOf("$") > -1 || eventInput.key.indexOf("%") > -1 || eventInput.key.indexOf("=") > -1 || eventInput.key.indexOf("!") > -1 || eventInput.key.indexOf("?") > -1 || eventInput.key.indexOf("&") > -1 || eventInput.key.indexOf("<") > -1 || eventInput.key.indexOf(">") > -1 || eventInput.key.indexOf("(") > -1 || eventInput.key.indexOf(")") > -1 || eventInput.key.indexOf("{") > -1 || eventInput.key.indexOf("}") > -1)) {
      this._snackBar.open(this.translateForSnackBar[1], this.translateForSnackBar[0], {
        duration: 3000,
      });
      setTimeout(()=>{
        this.suggestionsForDevice.nativeElement.value = "";
      }, 200);
    } else {
      return eventInput;
    }
  }
}
