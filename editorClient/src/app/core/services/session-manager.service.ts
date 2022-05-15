import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';   
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TranslateService } from './translate.service';

import * as allLayoutPositions from './../../../assets/keyboard-layouts/keysboards-layouts.json';

import SVAConfig from '../../../assets/environments/sva_config.json';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  keyboardLayouts: any = (allLayoutPositions as any).default;

  itemKeyboardOnly = new BehaviorSubject(false);
  itemOfflineOnly = new BehaviorSubject(false);
  itemQwertyType = new BehaviorSubject(false);
  itemCurrentKeyboard = new BehaviorSubject([]);
  itemKeyboardDisassociateLocale = new BehaviorSubject(true);
  itemSessionURL = new BehaviorSubject('');
  itemUILocale = new BehaviorSubject('English');
  itemKeyCharacter = new BehaviorSubject('');
  itemKeyAction = new BehaviorSubject('');
  itemElement = new BehaviorSubject([]);
  itemShiftKeyPressed = new BehaviorSubject(false);
  itemAltGrKeyPressed = new BehaviorSubject(false);
  itemShiftKeyPressed2 = new BehaviorSubject(false);
  itemAltGrKeyPressed2 = new BehaviorSubject(false);
  itemAltGrExists = new BehaviorSubject(false);
  itemCtrlKeyPressed = new BehaviorSubject(false);
  itemTransliterate = new BehaviorSubject(false);
  itemTypewriterExists = new BehaviorSubject(false);
  itemSaveToBrowser = new BehaviorSubject(false);
  tabScriptType = new BehaviorSubject(0);
  countOfSuggestions = new BehaviorSubject(0);
  fontSize = new BehaviorSubject(12);
  fontSize2 = new BehaviorSubject(12);
  cellSize = new BehaviorSubject(55);
  cellSize2 = new BehaviorSubject(55);
  selectedKeyboard = new BehaviorSubject('');
  favouriteKeyboards = new BehaviorSubject('');
  layoutsDB = new BehaviorSubject({});
  renderBiDi = new BehaviorSubject(false);
  switchTypingDirection = new BehaviorSubject('');
  typeVertically = new BehaviorSubject(false);
  selectToolbar = new BehaviorSubject(false);
  selectHelper = new BehaviorSubject(false);
  suggestWords = new BehaviorSubject(true);
  isMobileDevice = new BehaviorSubject(false);
  isTabletDevice = new BehaviorSubject(false);
  areKeysToBeHighlighted = new BehaviorSubject(true);
  mappingKeyboard = new BehaviorSubject(true);
  typedKeysMap = new BehaviorSubject(null);
  unusedKeys = new BehaviorSubject(false);
  nonExplorationMode = new BehaviorSubject(true);
  textOrientationMode = new BehaviorSubject(false);
  triggerWindowsKeys = new BehaviorSubject(false);
  pasteIntegrationOutput = new BehaviorSubject(false);
  clearCanvas = new BehaviorSubject(false);
  continousIntegrationComplete = new BehaviorSubject(false);
  targetIntegrationScript = new BehaviorSubject('IAST');
  softKeyboardState = new BehaviorSubject(false);
  detectWordTyped = false;

  internalSession : string = '';

  sentenceSeparator : string[] = [".", "·", "։", "՝","~", "՞", "。", "｡", "︒", "、", "?", "!", "‽", ";", ":", ",", "¿", "¡", "؟", "⹁", "⸴", "⸲", "ʻ", "︐", "،", "︑", "﹐", "﹑", "，", "､", "।", "॥", "෴", "⸼", "∘","۔", "።", "└", "▄", "჻", "߸", "፣", "᠂", "᠈", "꓾", "꘍", "꛵", "𑑍", "𝪇", "᭞", "᭟", "᭟᭜᭟", "꧈", "꧉", "꧊", "꧋", "꧋꧆꧋", "꧉꧆꧉", "\u2E4C", "\uD805\uDC5A", "\uD81B\uDE97"];

  noSeparator: string[] = ["zhcn", "zhtw", "ja", "bopo", "pin"];
  visualSeparator: string[] = ["am", "tig", "ti"];
  zeroWidthSeparator: string[] = ["bali", "jv", "km", "th", "lo", "shan", "tdd", "talu", "my"];
  syllabicSeparator: string[] = ["lis", "tibt"];

  uri = 'https://' + SVAConfig.hostname + ':' + SVAConfig.port + '';

  constructor(private translate: TranslateService, private router: Router, private http: HttpClient) {
    if (window.outerWidth < 500) {
      this.isMobileDevice.next(true);
      this.isTabletDevice.next(false);
    } else if (window.outerWidth > 499 && window.outerWidth < 1200) {
      this.isMobileDevice.next(false);
      this.isTabletDevice.next(true);
    } else {
      this.isMobileDevice.next(false);
      this.isTabletDevice.next(false);
    }
    if (localStorage.getItem('qwertyStyle') != undefined) {
      let qwertyStyleFlag = false;
      if (localStorage.getItem('qwertyStyle') == 'true')
        qwertyStyleFlag = true;
      else if (localStorage.getItem('qwertyStyle') == 'false')
        qwertyStyleFlag = false;
      this.itemQwertyType.next(qwertyStyleFlag);
    }
    if (localStorage.getItem('transliterate') != undefined) {
      let transliterateStyleFlag = false;
      if (localStorage.getItem('transliterate') == 'true')
        transliterateStyleFlag = true;
      else if (localStorage.getItem('transliterate') == 'false')
        transliterateStyleFlag = false;
      this.itemTransliterate.next(transliterateStyleFlag);
    }
    if (localStorage.getItem('Windows') != undefined) {
      if (localStorage.getItem('Windows') == 'true')
        this.triggerWindowsKeys.next(true);
      else if (localStorage.getItem('Windows') == 'false')
        this.triggerWindowsKeys.next(false);
    }
  }

  // Keyboard Layout DB changes based on Local updation
  setLayoutDB(layoutForLocale) {
    this.layoutsDB.next(layoutForLocale);
  }

  // Capture the current Layout DB
  getLayoutDB() {
    return this.layoutsDB.value;
  }

  // Add to the Favourite Keyboard 
  addFavouriteKeyboard(ISO_Code) {
    if (this.favouriteKeyboards.value.indexOf(ISO_Code) == -1) {
      if (localStorage.getItem('favourites'))
        this.favouriteKeyboards.next(this.preventInputFieldForAttacks(localStorage.getItem('favourites')) + ISO_Code + ',');
      else
        this.favouriteKeyboards.next(ISO_Code + ',');
      localStorage.setItem('favourites', this.favouriteKeyboards.value);
    }
  }

  // Retrieve All the Favourite Keyboards
  getAllFavouriteKeyboards() {
    if (localStorage.getItem('favourites'))
      return this.preventInputFieldForAttacks(localStorage.getItem('favourites'));
    else
      return "";
  }

  // Remmove a Favourite Keyaboard
  removeFromFavouriteKeyboards(ISO_Code) {
    if (localStorage.getItem('favourites')) {
      let bookmarks = this.preventInputFieldForAttacks(localStorage.getItem('favourites')).split(",");
      bookmarks.splice(bookmarks.indexOf(ISO_Code), 1);
      localStorage.setItem('favourites', bookmarks.toString());
      this.favouriteKeyboards.next(bookmarks.toString());
    }
  }

  // When Show Only Keyboard Slider is Selected
  setInSessionOnlyKeyboard(flagForKeyboardOnly) {
    this.itemKeyboardOnly.next(flagForKeyboardOnly); 
  }

  // Retrieve Session's Qwerty/Typewriter style
  getInSessionQwerty() {
    if (localStorage.getItem('qwertyStyle'))
      return this.preventInputFieldForAttacks(localStorage.getItem('qwertyStyle'));
    else
      return "";
  }

  // Language Based Layout Slider is Selected
  setInSessionQwerty(flagForQwerty) {
    this.itemQwertyType.next(flagForQwerty);
    localStorage.setItem('qwertyStyle', flagForQwerty);
  }

  // Once Keyboard is selected Set the URL/***** in Session
  setInSessionURL(ISO_BCP_Code) {
    // Only replace and URL if the ISO_BCP_Code is valid or the name/endemic name is used in the URL  
    if (this.keyboardLayouts[ISO_BCP_Code] != undefined) {
      // when using keyboard reference URL
      this.itemSessionURL.next(ISO_BCP_Code);
      window.history.replaceState({}, "", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + ISO_BCP_Code);
      localStorage.setItem('anywriterschoiceURL', ISO_BCP_Code);
    } else if (ISO_BCP_Code != "") {
      // When using alternative URL with language name in Latin alphabet is used
      let langCodeFound = false;
      for (let langCode in this.keyboardLayouts) {
        if (this.keyboardLayouts[langCode][2].toLowerCase() == ISO_BCP_Code.toLowerCase() && this.keyboardLayouts[langCode][6] == "UI") {
          this.itemSessionURL.next(langCode);
          window.history.replaceState({}, "", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + langCode);
          localStorage.setItem('anywriterschoiceURL', langCode);
          this.setUILocale(langCode);
          this.translate.use(langCode);
          langCodeFound = true;
          break;
        } else if (this.keyboardLayouts[langCode][2].toLowerCase() == ISO_BCP_Code.toLowerCase() && this.keyboardLayouts[langCode][6] == "noUI") {
          this.itemSessionURL.next(langCode);
          window.history.replaceState({}, "", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + langCode);
          localStorage.setItem('anywriterschoiceURL', langCode);
          langCodeFound = true;
          break;
        }
        if ((this.keyboardLayouts[langCode][5].toLowerCase() === ISO_BCP_Code.toLowerCase() || this.keyboardLayouts[langCode][5].toLowerCase() === decodeURI(ISO_BCP_Code)) && this.keyboardLayouts[langCode][6] == "UI") {
          this.itemSessionURL.next(langCode);
          window.history.replaceState({}, "", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + langCode);
          localStorage.setItem('anywriterschoiceURL', langCode);
          this.setUILocale(langCode);
          this.translate.use(langCode);
          langCodeFound = true;
          break;
        } else if ((this.keyboardLayouts[langCode][5].toLowerCase() === ISO_BCP_Code.toLowerCase() || this.keyboardLayouts[langCode][5].toLowerCase() === decodeURI(ISO_BCP_Code)) && this.keyboardLayouts[langCode][6] == "noUI") {
          this.itemSessionURL.next(langCode);
          window.history.replaceState({}, "", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + langCode);
          localStorage.setItem('anywriterschoiceURL', langCode);
          langCodeFound = true;
          break;
        }
      }
      if (langCodeFound == false)
        window.history.replaceState({}, "", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2]);
    }
  }

  // Get the URL/***** Language ISO-639-1/2/3 or BCP-47 code (2 to 5 char code) from Session
  getFromSessionURL() {
    if (localStorage.getItem('anywriterschoiceURL'))
      return this.preventInputFieldForAttacks(localStorage.getItem('anywriterschoiceURL'));
    else
      return "";
  }

  // Offline - Translate, Dictionary, Thesaurus and Intellisense services off
  setOfflineOnly(flagForOfflineOnly) {
    this.itemOfflineOnly.next(flagForOfflineOnly);
  }

  // Determine if the Session is set to Offline
  getOfflineOnly() {
    return this.itemOfflineOnly.value;
  }

  // Locale or Supported Language for User Interface
  setUILocale(Locale) {
    this.itemUILocale.next(Locale);
    localStorage.setItem('uiLocale', Locale);
  }

  // Retrieve the Locale or Language set for the User Interface
  getUILocale() {
    if (localStorage.getItem('uiLocale')) 
      return this.preventInputFieldForAttacks(localStorage.getItem('uiLocale'));
    else
      return (window.navigator.language.indexOf("-") > -1) ? window.navigator.language.split('-')[0] : window.navigator.language;
  }

  // Whenever the URL with /ಕನ್ನಡ or /Kannada (or equivalent UI Supported Locale) and/or Keyboard and Locale are "Associate" then set session Locale for future use
  setOverridenUILocaleInSession(Locale) {
    localStorage.setItem('overrideUILocale', Locale);
  }

  // Return the value of Default Locale
  getOverridenUILocaleInSession() {
    if (localStorage.getItem('overrideUILocale'))
      return this.preventInputFieldForAttacks(localStorage.getItem('overrideUILocale'));
    else
      return "";
  }

  // Transfer Character Typed from Keyboard to Editor
  setCharFromKeyboard(whichCharacter) {
    /*if (this.sentenceSeparator.indexOf(whichCharacter) > -1) {
      this.sentenceComplete(whichCharacter).subscribe((storagedSentence) => {
        console.info("[MUlTISCRIPTEDITOR] Sentence Written is being processed by back-end NLP and no personal data is stored ", storagedSentence);
      });;
    }*/
    if (this.isIntegrationContinous() == 'true' && whichCharacter != "" && this.sentenceSeparator.indexOf(whichCharacter) == -1 && this.detectWordTyped == true && this.targetIntegrationScript.value && this.targetIntegrationScript.value != "" && this.targetIntegrationScript.value != null && this.getOfflineOnly() == false) {
      this.integrateContinous(this.targetIntegrationScript.value, whichCharacter).subscribe((resultContent: any) => {
        this.pasteIntegrationOutput.next(true);
        console.info("[MUlTISCRIPTEDITOR] Continous transliteration through Aksharamukha Integration to Target Script ", this.targetIntegrationScript.value);
        whichCharacter = resultContent + this.wordSeparator();
        this.itemKeyCharacter.next(whichCharacter);
        this.continousIntegrationComplete.next(true);
      }, (error) => {
        this.pasteIntegrationOutput.next(true);
        console.info("[MUlTISCRIPTEDITOR] Continous transliteration through Aksharamukha Integration to Target Script ", this.targetIntegrationScript.value);
        whichCharacter = error.error.text + this.wordSeparator();
        this.itemKeyCharacter.next(whichCharacter);
        this.continousIntegrationComplete.next(true);
      });
    } else {
      this.itemKeyCharacter.next(whichCharacter);
      this.continousIntegrationComplete.next(false);
    }
  }

  wordSeparator() {
    /* Word-Separator https://r12a.github.io/scripts/featurelist/
      [space] " "
      [interpunct] "·" (la)
      [visually separate] "\u2009" bzw. "፡" (am, geez)
      [no separator] "" (zhcn, zhtw, ja)
      [syllabic] (lisu, tibetan)
      [0 width space] "\u202F" (khmer, bali, burmese, javanese, lao, thai, shan, tai lü, tai nüa)
      */

    if (this.getFromSessionURL() == "la") 
      return "·";
    else if (this.getFromSessionURL() == "geez")
      return "፡";
    else if (this.noSeparator.indexOf(this.getFromSessionURL()) > -1)
      return "";
    else if (this.visualSeparator.indexOf(this.getFromSessionURL()) > -1)
      return "\u2009";
    else if (this.syllabicSeparator.indexOf(this.getFromSessionURL()) > -1)
      return " ";
    else if (this.zeroWidthSeparator.indexOf(this.getFromSessionURL()) > -1)
      return "\u202F";
    else
      return " ";
  }

  // Keyboard Font Size is saved for session
  setFontSizeForSession(size) {
    localStorage.setItem('fontSize', size);
    this.fontSize.next(size);
  }

  // Retrieve Font Size from Session
  getFontSizeFromSession() {
    if (localStorage.getItem('fontSize') && parseInt(this.preventInputFieldForAttacks(localStorage.getItem('fontSize'))))
      return parseInt(this.preventInputFieldForAttacks(localStorage.getItem('fontSize')));
    else {
      this.setFontSizeForSession('12');
      return '12';
    }
  }

  // Keyboard Font Size is saved for session for keyboard below
  setFontSizeForSession2(size) {
    localStorage.setItem('fontSize2', size);
    this.fontSize2.next(size);
  }

  // Retrieve Font Size from Session for keyboard below
  getFontSizeFromSession2() {
    if (localStorage.getItem('fontSize2') && parseInt(this.preventInputFieldForAttacks(localStorage.getItem('fontSize2'))))
      return parseInt(this.preventInputFieldForAttacks(localStorage.getItem('fontSize2')));
    else {
      this.setFontSizeForSession2('12');
      return '12';
    }
  }

  // Keyboard Cell Size is saved for session
  setCellSizeForSession(size) {
    localStorage.setItem('cellSize', size);
    this.cellSize.next(size);
  }

  // Retrieve Cell Size from session
  getCellSizeFromSession() {
    if (localStorage.getItem('cellSize') && parseInt(this.preventInputFieldForAttacks(localStorage.getItem('cellSize'))))
      return parseInt(this.preventInputFieldForAttacks(localStorage.getItem('cellSize')));
    else {
      this.setCellSizeForSession('55');
      return '55';
    }
  }

  // Keyboard Cell Size is saved for session for keyboard below
  setCellSizeForSession2(size) {
    localStorage.setItem('cellSize2', size);
    this.cellSize2.next(size);
  }

  // Retrieve Cell Size from session for keyboard below
  getCellSizeFromSession2() {
    if (localStorage.getItem('cellSize2') && parseInt(this.preventInputFieldForAttacks(localStorage.getItem('cellSize2'))))
      return parseInt(this.preventInputFieldForAttacks(localStorage.getItem('cellSize2')));
    else {
      this.setCellSizeForSession2('55');
      return '55';
    }
  }

  // Transfer Action Pressed from Keyboard to Editor
  setActionFromKeyboard(whatAction) {
    this.itemKeyAction.next(whatAction);
  }

  // Pass the Element selected on Keyboard
  setElementForCharacterSelection(elementSent) {
    this.itemElement.next(elementSent);
  }

  // Prevent Keyboard change when UI Language is updated
  setKeyboardDisassociateLocale(flagForKeyboardDisassociateLocale) {
    this.itemKeyboardDisassociateLocale.next(flagForKeyboardDisassociateLocale);
  }

  // Find the value of if Keyboard change is disassociated from Locale change
  getKeyboardDisassociateLocale() {
    return this.itemKeyboardDisassociateLocale.value;
  }

  // Render the Boustrophedon script style
  setBoustrophedonScript(value) {
    this.renderBiDi.next(value);
  }

  // When Shift or Caps Keys is pressed on Physical or Virtual Keyboard
  setShiftKeyPressed(flagForShiftKey) {
    this.itemShiftKeyPressed.next(flagForShiftKey);
  }

  // When AltGr Keys is pressed on Physical or Virtual Keyboard
  setAltGrKeyPressed(flagForAltGrKey) {
    this.itemAltGrKeyPressed.next(flagForAltGrKey);
  }

  // When Shift or Caps Keys is pressed on Physical or Virtual Keyboard for keyboard below
  setShiftKeyPressed2(flagForShiftKey) {
    this.itemShiftKeyPressed2.next(flagForShiftKey);
  }

  // When AltGr Keys is pressed on Physical or Virtual Keyboard for keyboard below
  setAltGrKeyPressed2(flagForAltGrKey) {
    this.itemAltGrKeyPressed2.next(flagForAltGrKey);
  }

  // Keyboard have Typewriter style layout or only Language Learning
  getAvailabilityOfTypewriter() {
    return this.itemTypewriterExists.value;
  }

  // Set this if Typewriter style is also available for the Keyboard 
  setAvalabilityOfTypewriter(flagForTypewriter) {
    this.itemTypewriterExists.next(flagForTypewriter);
  }

  // Retrieve if Transliterate Keyboard style for Session
  getTransliterate() {
    if (localStorage.getItem('transliterate'))
      return this.preventInputFieldForAttacks(localStorage.getItem('transliterate'));
    else
      return "";
  }

  // When non-Latin based Keyboards need to be transliterated or 'nudi' stylised
  setTransliterate(flagForTrans) {
    this.itemTransliterate.next(flagForTrans);
    localStorage.setItem('transliterate', flagForTrans);
  }

  // Setting the current Theme used in Session
  setThemeInSession(typeOfTheme) {
    localStorage.setItem('typeOfTheme', typeOfTheme);
  }

  // Getting the current Theme used in Session
  getThemeFromSession() {
    if (localStorage.getItem('typeOfTheme') === "dark" || localStorage.getItem('typeOfTheme') === "light" || localStorage.getItem('typeOfTheme') == "contrast")
      return this.preventInputFieldForAttacks(localStorage.getItem('typeOfTheme'));
    else {
      this.setThemeInSession('light');
      return "light";
    }
  }

  // Retrieve the tab change in helper component
  getScriptTypeTab() {
    return this.tabScriptType.value;
  }

  // In helper component when tab is changed then set it
  setScriptTypeTab(tab) {
    this.tabScriptType.next(tab);
  }

  // Gather the keyboard change that is anticipated
  getSelectedKeyboard() {
    return this.selectedKeyboard.value;
  }

  // Set the keyboard change that is needed
  setSelectedKeyboard(selectKeyboardLayout) {
    this.selectedKeyboard.next(selectKeyboardLayout);
  }

  // When Help popup needs to be ignore after a couple of "Zen" mode clicks
  setMultiIgnore() {
    if (this.getMultiIgnore() == 'reset') 
      localStorage.setItem('multiIgnore', 'set');
    else 
      localStorage.setItem('multiIgnore', (this.getMultiIgnore())? 'set' : 'reset');
  }

  // What is the current status of ignore the Help popup
  getMultiIgnore() {
    if (localStorage.getItem('multiIgnore') === null || localStorage.getItem('multiIgnore') === undefined)
      return "";
    return this.preventInputFieldForAttacks(localStorage.getItem('multiIgnore'));
  }

  // Setter for show unused keys
  setUnusedKeysShow(value) {
    localStorage.setItem('unusedKeys', value);
    if (value == 'true')
      this.unusedKeys.next(true);
    else if (value == 'false')
      this.unusedKeys.next(false);
  }

  // Find if the unused keys should be shown
  areUnusedKeysToBeShown() {
    if (localStorage.getItem('unusedKeys') && (localStorage.getItem('unusedKeys') == 'false' || localStorage.getItem('unusedKeys') == 'true'))
      return this.preventInputFieldForAttacks(localStorage.getItem('unusedKeys'));
    else
      return this.setUnusedKeysShow('false');
  }

  // Setter Swara markers / Vowels to be highlighted
  highlightOrNot(value) {
    localStorage.setItem('highlightKeys', value);
    if (value == 'true')
      this.areKeysToBeHighlighted.next(true);
    else if (value == 'false')
      this.areKeysToBeHighlighted.next(false);
  }

  // Check if Mapping Keys from Keyboard set or not
  shouldKeyboardBeMapped() {
    if (localStorage.getItem('mappingKeyboard') && (localStorage.getItem('mappingKeyboard') == 'false' || localStorage.getItem('mappingKeyboard') == 'true'))
      return this.preventInputFieldForAttacks(localStorage.getItem('mappingKeyboard'));
    else {
      this.mapKeysFromKeyboard('true');
      return 'true';
    }
  }

  // Setter Mapping Keys from Keyboard
  mapKeysFromKeyboard(value) {
    localStorage.setItem('mappingKeyboard', value);
    if (value == 'true')
      this.mappingKeyboard.next(true);
    else if (value == 'false')
      this.mappingKeyboard.next(false);
  }

  // Check if the Swara markers / Vowels should be highlighted
  isHighlightKeysSet() {
    if (localStorage.getItem('highlightKeys') && (localStorage.getItem('highlightKeys') == 'false' || localStorage.getItem('highlightKeys') == 'true'))
      return this.preventInputFieldForAttacks(localStorage.getItem('highlightKeys'));
    else
      return this.highlightOrNot('true');
  }

  // Aksharamukha Integration Type Defined
  shouldIntegrationBeContinous(set) {
    localStorage.setItem('continousIntegration', set);
  }
  
  // Is continous integration with Aksharamukha setup
  isIntegrationContinous () {
    if (localStorage.getItem('continousIntegration') && (localStorage.getItem('continousIntegration') == 'false' || localStorage.getItem('continousIntegration') == 'true'))
      return this.preventInputFieldForAttacks(localStorage.getItem('continousIntegration'));
    else
      return this.shouldIntegrationBeContinous('false');
  }

  // Allow Sharing non-PII data from Content of Editor
  shareContentWordSuggestions(valueToSet) {
    localStorage.setItem('shareContentWords', valueToSet);
  }

  // Is sharing non-PII data from Content of Editor allowed
  isShareContentWordSuggestionsAllowed() {
    if (localStorage.getItem('shareContentWords') && (localStorage.getItem('shareContentWords') == 'false' || localStorage.getItem('shareContentWords') == 'true'))
      return this.preventInputFieldForAttacks(localStorage.getItem('shareContentWords'));
    else
      return this.shareContentWordSuggestions('false');
  }

  // At initial load is all non-PII data allowed to be send
  allowSendInitialLoadDataAllowed(valueToSet) {
    localStorage.setItem('sendInitialData', valueToSet);
  }

  // Set allow Initial Load Data to be sent
  isSendInitialLoadDataAllowed() {
    if (localStorage.getItem('sendInitialData') && (localStorage.getItem('sendInitialData') == 'false' || localStorage.getItem('sendInitialData') == 'true'))
      return this.preventInputFieldForAttacks(localStorage.getItem('sendInitialData'));
    else
      return this.allowSendInitialLoadDataAllowed('false');
  }

  // Based on User's choice allow saving content to session on browser (localstorage)
  allowSaveSessionToBrowser(valueToSet) {
    if (valueToSet == 'true')
      this.itemSaveToBrowser.next(true);
    else if (valueToSet == 'false') {
      this.itemSaveToBrowser.next(false);
      localStorage.removeItem('sessionData');
    }
    localStorage.setItem('saveSessionAllow', valueToSet);
  }

  // Get if save session is allowed
  retrieveSaveSessionAllowed() {
    if (localStorage.getItem('saveSessionAllow') && (localStorage.getItem('saveSessionAllow') == 'false' || localStorage.getItem('saveSessionAllow') == 'true'))
      return this.preventInputFieldForAttacks(localStorage.getItem('saveSessionAllow'));
    else
      return this.allowSaveSessionToBrowser('false');
  }

  // Find the count of the suggestion requested for a session
  countOfSuggestionForSession() {
    if (Number.isInteger(parseInt(localStorage.getItem('suggestionCount')))) {
      this.countOfSuggestions.next(parseInt(localStorage.getItem('suggestionCount')));
      return parseInt(localStorage.getItem('suggestionCount'));
    } else {
      return 0;
    }
  }

  // Set the count of suggestions for the session
  setCountSuggestions(count) {
    this.countOfSuggestions.next(count);
    localStorage.setItem('suggestionCount', count);
  }

  // Suggestions for User depending on Language
  suggestionForLanguage() {
    if (localStorage.getItem('suggestWords') && (localStorage.getItem('suggestWords') == 'false' || localStorage.getItem('suggestWords') == 'true'))
      return this.preventInputFieldForAttacks(localStorage.getItem('suggestWords'));
    else {
      this.configSuggesionForLanguage('true');
      return this.suggestWords.value;
    }
  }

  // Configure Suggestions of Words as per User's Choice
  configSuggesionForLanguage(valueToSet) {
    if (valueToSet == 'true')
      this.suggestWords.next(true);
    else if (valueToSet == 'false')
      this.suggestWords.next(false);
    localStorage.setItem('suggestWords', valueToSet);
  }

  // Ensuring the User content is present on the Local Storage on Browser
  setSessionSavingOfContent(content) {
    if (this.retrieveSaveSessionAllowed() == 'true')
      localStorage.setItem('sessionData', content);
    this.internalSession = content;
  }

  // Retrieving the User content to be rendered with new session - BIGGEST VULNERABILITY OF DATA
  getSessionSavedContent() {
    if (this.retrieveSaveSessionAllowed() == 'true') {
      if (localStorage.getItem('sessionData') == undefined || localStorage.getItem('sessionData') == null || localStorage.getItem('sessionData') == "") {
        this.setSessionSavingOfContent(this.internalSession);
        return localStorage.getItem('sessionData');
      } else
        return localStorage.getItem('sessionData');
    } else
      return this.internalSession;
  }

  // Prevent Attacks from the vulnerable input such as the "Local-Storage" on the Browser
  preventInputFieldForAttacks(input) {
    if (input === null || input === undefined || input === "" || input.indexOf("*") > -1 || input.indexOf("$") > -1 || input.indexOf("%") > -1 || input.indexOf("=") > -1 || input.indexOf("!") > -1 ||input.indexOf("?") > -1 || input.indexOf("&") > -1 || input.indexOf("<") > -1 || input.indexOf(">") > -1 || input.indexOf("(") > -1 || input.indexOf(")") > -1 || input.indexOf("{") > -1 || input.indexOf("}") > -1) {
      return "";
    } else {
      return input;
    }
  }

  // Settings determmine if Device is Mobile - window.outerWidth < 500
  setIsMobileDevice(value) {
    this.isMobileDevice.next(value);
  }

  // Settings determmine if Device is Tablet - window.outerWidth > 499 && window.outerWidth < 1200
  setIsTabletDevice(value) {
    this.isTabletDevice.next(value);
  }

  /* Resize Keyboard Key size and Font size based on space available to render
    Recommendation cellSize 55 , fontSize 16 : Desktop
    Recommendation cellSize 46 , fontSize 14 : isTablet
    Recommendation cellSize 22 , fontSize 12 : isMobile + "superscript" fontSize 8
    Every keyboard type : Typewriter(Qwerty) / Transliterate and Language Learning should be independent 
    Note - swara + "large" vyanjana is a problem with size of cell calulation for above when probing for "row2*" and the superscript back side keys options will distort if space is not enough
  */
  perfectFontCellMatch(keyboardType, mobile, tablet, typeFlag, layoutCurrentKeys, cellSize, fontSize, where) {
    if (layoutCurrentKeys != undefined && layoutCurrentKeys != null && layoutCurrentKeys != []) {
      let rowsMaxWidth = 0, currentRowMax = 0, marginWidth = (mobile)? 1 : ((tablet)? 2 : 3);
      for(let i = 0; i < layoutCurrentKeys.length; i++) {
        Object.keys(layoutCurrentKeys[i]).map((key) => {
          if (key == keyboardType) {
            rowsMaxWidth = (rowsMaxWidth < currentRowMax) ? currentRowMax : rowsMaxWidth;
            for (let j = 0; j < layoutCurrentKeys[i][key].length; j++) {
              if (layoutCurrentKeys[i][key][j]["action"] == "char" || layoutCurrentKeys[i][key][j]["action"] == "shift" || layoutCurrentKeys[i][key][j]["action"] == "del" || layoutCurrentKeys[i][key][j]["action"] == "altGr" || layoutCurrentKeys[i][key][j]["action"] == "contextmenu" || layoutCurrentKeys[i][key][j]["action"] == "control" || layoutCurrentKeys[i][key][j]["action"] == "left" || layoutCurrentKeys[i][key][j]["action"] == "right" || layoutCurrentKeys[i][key][j]["action"] == "top" || layoutCurrentKeys[i][key][j]["action"] == "bottom")
                currentRowMax = cellSize * (j + marginWidth)
              else if (layoutCurrentKeys[i][key][j]["action"] == "space") { 
                if (typeFlag == 4)
                  currentRowMax = cellSize * 3.4 + marginWidth;
                else
                  currentRowMax = cellSize * 3.3 + marginWidth;
              } else if (layoutCurrentKeys[i][key][j]["action"] == "enter") {
                if (typeFlag == 1)
                  currentRowMax = cellSize * 3.3 + marginWidth;
                else
                  currentRowMax = cellSize * 2.2 + marginWidth;
              }
            }
          }
        });
      }

      if ((rowsMaxWidth + 80) > window.outerWidth && mobile && !tablet && cellSize >= 9 && fontSize >= 7) {
        this.perfectFontCellMatch(keyboardType, mobile, tablet, typeFlag, layoutCurrentKeys, cellSize - 1, fontSize - 0.5, where);
      } else if ((rowsMaxWidth + 80) > window.outerWidth && mobile && !tablet && cellSize >= 9) {
        this.perfectFontCellMatch(keyboardType, mobile, tablet, typeFlag, layoutCurrentKeys, cellSize - 1, fontSize, where);
      } else if ((rowsMaxWidth + 140) > window.outerWidth && !mobile && tablet && cellSize >= 22 && fontSize >= 13) {
        this.perfectFontCellMatch(keyboardType, mobile, tablet, typeFlag, layoutCurrentKeys, cellSize - 1, fontSize - 0.5, where);
      } else if ((rowsMaxWidth + 140) > window.outerWidth && !mobile && tablet && cellSize >= 22) {
        this.perfectFontCellMatch(keyboardType, mobile, tablet, typeFlag, layoutCurrentKeys, cellSize - 1, fontSize, where);
      } else if ((rowsMaxWidth + 200) > window.outerWidth && !mobile && !tablet && cellSize >= 46 && fontSize >= 15) {
        this.perfectFontCellMatch(keyboardType, mobile, tablet, typeFlag, layoutCurrentKeys, cellSize - 1, fontSize - 0.5, where);
      } else if ((rowsMaxWidth + 200) > window.outerWidth && !mobile && !tablet && cellSize >= 46) {
        this.perfectFontCellMatch(keyboardType, mobile, tablet, typeFlag, layoutCurrentKeys, cellSize - 1, fontSize, where);
      } else if ((rowsMaxWidth + 400) < window.outerWidth && cellSize <= 55) {
        this.perfectFontCellMatch(keyboardType, mobile, tablet, typeFlag, layoutCurrentKeys, cellSize + 1, fontSize + 0.5, where);
      } else {
        //console.log(cellSize, fontSize, marginWidth, mobile, tablet, window.outerWidth, rowsMaxWidth, where, typeFlag, keyboardType);
        if (where === "layouts") {
          this.setCellSizeForSession(cellSize);
          this.setFontSizeForSession(fontSize);
        } else if (where === "options") {
          this.setCellSizeForSession2(cellSize);
          this.setFontSizeForSession2(fontSize);
        }
      }
    }
  }

  // Capturing Session Data that would be sent to the Server to be stored for analysis
  sendDataToServerAtSessionBegin() {
    let counter = 1;

    let sBrowser = "", sUsrAg = navigator.userAgent;
    // The order matters here, and this may report false positives for unlisted browsers.

    if (sUsrAg.indexOf("Firefox") > -1) {
      sBrowser = "Mozilla Firefox";
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
      sBrowser = "Samsung Internet";
      // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
      sBrowser = "Opera";
      // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
      sBrowser = "Microsoft Internet Explorer";
      // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
      sBrowser = "Microsoft Edge";
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = "Google Chrome or Chromium";
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
      sBrowser = "Apple Safari";
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
      sBrowser = "unknown";
    }

    var locationData = ""
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        locationData = "Geolocation is not supported or enabled on this browser.";
      }
      console.info("[MULTISCRIPTEDITTOR] Request for Location Data to be shared ", locationData);
    };

    function showPosition(position) {
      locationData = "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude;
    };

    var sessionPayload = {
      sessionCounter: counter,
      browsersLocale: window.navigator.language,
      currentLocale: this.keyboardLayouts[this.getUILocale()][2],
      overridenUILocale: (this.getOverridenUILocaleInSession()) ? this.keyboardLayouts[this.getOverridenUILocaleInSession()][2] : 'None',
      sessionURL: this.preventInputFieldForAttacks(localStorage.getItem('anywriterschoiceURL')),
      sessionTheme: this.preventInputFieldForAttacks(localStorage.getItem('typeOfTheme')),
      cellSize: this.preventInputFieldForAttacks(localStorage.getItem('cellSize')),
      fontSize: this.preventInputFieldForAttacks(localStorage.getItem('fontSize')),
      qwertyUsed: (localStorage.getItem('qwertyStyle')? this.preventInputFieldForAttacks(localStorage.getItem('qwertyStyle')): 'false'),
      translateUsed: (localStorage.getItem('transliterate')? this.preventInputFieldForAttacks(localStorage.getItem('transliterate')): 'false'),
      locationOfSession: getLocation(),
      deviceScreenSizeX: window.outerWidth,
      deviceScreenSizeY: window.outerHeight,
      browser: sBrowser,
      token: localStorage.getItem("ltpaToken"),
      deviceType: window.navigator["platform"]
    };
    if (sBrowser.indexOf("Microsoft") > -1 || window.navigator["platform"].indexOf("Win") > -1) {
      localStorage.setItem("Windows", "true");
      this.triggerWindowsKeys.next(true);
    }
    console.info("[MUlTISCRIPTEDITOR] sendDataToServerAtSessionBegin ", sessionPayload);
    return this.http.put<any[]>(`${this.uri}/v1/multiscripteditor/collectingData`, sessionPayload);
  }

  // Token for Session
  tokenForSession() {
    return this.http.post<any[]>(`${this.uri}/v1/multiscripteditor/tokenForSession`, {"session": "MULTISCRIPTEDITOR"});
  }
    
  // When sentence completion is encountered then send the words of the sentence to NodeJS for NLP and storing ONLY the non-Noun words given that no PII of user should be stored (like names, phone numbers, etc.)
  sentenceComplete(endOfSentenceCharacter) {
    const parseSentence = {
      sentence: this.getSessionSavedContent().split(endOfSentenceCharacter)[this.getSessionSavedContent().split(endOfSentenceCharacter).length - 1], 
      language: this.keyboardLayouts[this.getFromSessionURL()][2], 
      locale: this.getFromSessionURL(), 
      sentenceMarker: endOfSentenceCharacter
    };
    console.info("[MUlTISCRIPTEDITOR] sendSentenceToProcess ", parseSentence);
    return this.http.put<any[]>(`${this.uri}/v1/multiscripteditor/sentenceParsing`, parseSentence);
  }

  // Gather all the Word Suggestions from Server
  retrieveSuggestionsFromServer(lang_code) {
    return this.http.get<any[]>(`${this.uri}/v1/multiscripteditor/GetWordsList/${lang_code}/suggestionWords`);
  }

  // Aksharamukha Integration for Transliteration of every word
  integrateContinous(targetScript, word) {
    return this.http.get<any[]>(`https://aksharamukha-plugin.appspot.com/api/public?target=${targetScript}&text=${word.trim()}`);
  }
  // Aksharamukha Integration for Transliteration of all Session Data
  integrateTransliteration(targetScript) {
      return this.http.get<any[]>(`https://aksharamukha-plugin.appspot.com/api/public?target=${targetScript}&text=${this.getSessionSavedContent()}`);
  }

  // Image to Text sending image data to NodeJS server
  image2TextConvert(type, supportedWrittenLanguage, dataImageOrURL) {
    console.info("[MULTISCRIPTEDITOR] Convert Image To Text via API ", type.toUpperCase(), " ", supportedWrittenLanguage, " ", dataImageOrURL);
    return this.http.post<any[]>(`${this.uri}/v1/multiscripteditor/convertImage2Text`, {"type": type, "languages": supportedWrittenLanguage, "dataImageOrURL": dataImageOrURL});
  }
}