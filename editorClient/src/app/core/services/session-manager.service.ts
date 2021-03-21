import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';   
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TranslateService } from './translate.service';

import * as allLayoutPositions from './../../../assets/keyboard-layouts/keysboards-layouts.json';

import * as SVAConfig from '../../../../../env/sva_config.json';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  keyboardLayouts: any = (allLayoutPositions as any).default;

  itemKeyboardOnly = new BehaviorSubject(false);
  itemOfflineOnly = new BehaviorSubject(false);
  itemQwertyType = new BehaviorSubject(false);
  itemKeyboardDisassociateLocale = new BehaviorSubject(true);
  itemSessionURL = new BehaviorSubject('');
  itemUILocale = new BehaviorSubject('English');
  itemKeyCharacter = new BehaviorSubject('');
  itemKeyAction = new BehaviorSubject('');
  itemElement = new BehaviorSubject([]);
  itemShiftKeyPressed = new BehaviorSubject(false);
  itemTransliterate = new BehaviorSubject(false);

  uri = 'https://' + SVAConfig.hostname + ':' + SVAConfig.port + '';

  constructor(private translate: TranslateService, private router: Router, private http: HttpClient) {
    if (localStorage.getItem('qwertyStyle') != undefined) {
      let qwertyStyleFlag;
      if (localStorage.getItem('qwertyStyle') === 'true')
        qwertyStyleFlag = true
      else if (localStorage.getItem('qwertyStyle') === 'false')
        qwertyStyleFlag = false;
      this.itemQwertyType.next(qwertyStyleFlag);
    }
    if (localStorage.getItem('transliterate') != undefined) {
      let transliterateStyleFlag;
      if (localStorage.getItem('transliterate') === 'true')
        transliterateStyleFlag = true;
      else if (localStorage.getItem('transliterate') === 'true')
        transliterateStyleFlag = false;
      this.itemTransliterate.next(transliterateStyleFlag);
    }
  }

  // When Show Only Keyboard Slider is Selected
  setInSessionOnlyKeyboard(flagForKeyboardOnly) {
    this.itemKeyboardOnly.next(flagForKeyboardOnly); 
  }

  // Retrieve Session's Qwerty/Typewriter style
  getInSessionQwerty() {
    localStorage.getItem('qwertyStyle');
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
      window.history.replaceState({}, "Every Writer's Choice", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + ISO_BCP_Code);
      localStorage.setItem('anywriterschoiceURL', ISO_BCP_Code);
    } else if (ISO_BCP_Code != "") {
      // When using alternative URL with language name in Latin alphabet is used
      let langCodeFound = false;
      for (let langCode in this.keyboardLayouts) {
        if (this.keyboardLayouts[langCode][2].toLowerCase() == ISO_BCP_Code.toLowerCase() && this.keyboardLayouts[langCode][6] == "UI") {
          this.itemSessionURL.next(langCode);
          window.history.replaceState({}, "Every Writer's Choice", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + langCode);
          localStorage.setItem('anywriterschoiceURL', langCode);
          this.setUILocale(langCode);
          this.translate.use(langCode);
          langCodeFound = true;
          break;
        } else if (this.keyboardLayouts[langCode][2].toLowerCase() == ISO_BCP_Code.toLowerCase() && this.keyboardLayouts[langCode][6] == "noUI") {
          this.itemSessionURL.next(langCode);
          window.history.replaceState({}, "Every Writer's Choice", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + langCode);
          localStorage.setItem('anywriterschoiceURL', langCode);
          langCodeFound = true;
          break;
        }
        // When the endemic name is used - BUG not working for non-Latin alphabets
        if ((this.keyboardLayouts[langCode][5].toLowerCase() === ISO_BCP_Code.toLowerCase() || this.keyboardLayouts[langCode][5].toLowerCase() === decodeURI(ISO_BCP_Code)) && this.keyboardLayouts[langCode][6] == "UI") {
          this.itemSessionURL.next(langCode);
          window.history.replaceState({}, "Every Writer's Choice", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + langCode);
          localStorage.setItem('anywriterschoiceURL', langCode);
          this.setUILocale(langCode);
          this.translate.use(langCode);
          langCodeFound = true;
          break;
        } else if ((this.keyboardLayouts[langCode][5].toLowerCase() === ISO_BCP_Code.toLowerCase() || this.keyboardLayouts[langCode][5].toLowerCase() === decodeURI(ISO_BCP_Code)) && this.keyboardLayouts[langCode][6] == "noUI") {
          this.itemSessionURL.next(langCode);
          window.history.replaceState({}, "Every Writer's Choice", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/' + langCode);
          localStorage.setItem('anywriterschoiceURL', langCode);
          langCodeFound = true;
          break;
        }
      }
      if (langCodeFound == false)
        window.history.replaceState({}, "Every Writer's Choice", window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2]);
    }
  }

  // Get the URL/***** Language ISO-639-1/2/3 or BCP-47 code (2 to 5 char code) from Session
  getFromSessionURL() {
    return localStorage.getItem('anywriterschoiceURL');
  }

  // Offline - Translate, Dictionary, Theasaurus and Intellisense services off
  setOfflineOnly(flagForOfflineOnly) {
    this.itemOfflineOnly.next(flagForOfflineOnly);
  }

  // Locale or Supported Language for User Interface
  setUILocale(Locale) {
    this.itemUILocale.next(Locale);
  }

  // Whenever the URL with /ಕನ್ನಡ or /Kannada (or equivalent UI Supported Locale) and/or Keyboard and Locale are "Associate" then set session Locale for future use
  setOverridenUILocaleInSession(Locale) {
    localStorage.setItem('overrideUILocale', Locale);
  }

  // Return the value of overridden locale
  getOverridenUILocaleInSession() {
    return localStorage.getItem('overrideUILocale');
  }

  // Transfer Character Typed from Keyboard to Editor
  setCharFromKeyboard(whichCharacter) {
    this.itemKeyCharacter.next(whichCharacter);
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

  // When Shift or Caps Keys is pressed on Physical or Virtual Keyboard
  setShiftKeyPressed(flagForShiftKey) {
    this.itemShiftKeyPressed.next(flagForShiftKey);
  }

  // Retrieve if Transliterate Keyboard style for Session
  getTransliterate() {
    localStorage.getItem('transliterate');
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
    return localStorage.getItem('typeOfTheme');
  }

  // Ensuring the User content is present on the Local Storage on Browser
  setSessionSavingOfContent(content) {
    localStorage.setItem('sessionData', content);
  }

  // Retrieving the User content to be rendered with new session
  getSessionSavedContent() {
    return localStorage.getItem('sessionData');
  }

  // Capturing Session Data that would be sent to the Server to be stored for analysis
  sendDataToServerAtSessionBegin() {
    let counter = 1;

    const sessionPayload = {
      sessionCounter: counter,
      browsersLocale: window.navigator.language,
      currentLocale: this.keyboardLayouts[this.itemUILocale.value][2],
      overridenUILocale: (this.getOverridenUILocaleInSession()) ? this.keyboardLayouts[this.getOverridenUILocaleInSession()][2] : 'None',
      sessionURL: localStorage.getItem('anywriterschoiceURL'),
      sessionTheme: localStorage.getItem('typeOfTheme'),
      qwertyUsed: (localStorage.getItem('qwertyStyle')? localStorage.getItem('qwertyStyle'): 'false'),
      translateUsed: (localStorage.getItem('transliterate')? localStorage.getItem('transliterate'): 'false'),
      locationOfSession: "Berlin",
      deviceScreenSize: "Large",
      deviceType: "MacOS"
    };
    console.log('sendDataToServerAtSessionBegin ', sessionPayload);
    return this.http.put<any[]>(`${this.uri}/v1/multiscripteditor/collectingData`, sessionPayload);
  }

}
