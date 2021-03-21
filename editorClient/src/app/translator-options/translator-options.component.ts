import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SessionManagerService } from '../core/services/session-manager.service';

import * as allLayoutPositions from './../../assets/keyboard-layouts/keysboards-layouts.json';

@Component({
  selector: 'app-translator-options',
  templateUrl: './translator-options.component.html',
  styleUrls: ['./translator-options.component.scss']
})
export class TranslatorOptionsComponent implements OnInit, AfterViewInit {

  localeOfUI : String = "English";
  localeToTranslate : String = "Zulu";
  onInputRequest : Boolean = false;
  layoutCurrentKeys: any = [];
  keysToRotate: Boolean = false;
  enableRotateKeyboard: Boolean = false;
  isQwerty: Boolean = false;
  standardKeyboard: Boolean = true;
  isShiftKeyPress: Boolean = false;

  keyboardLayouts: any = (allLayoutPositions as any).default;

  constructor(private sessionManager: SessionManagerService) { 
    if (localStorage.getItem('qwertyStyle') != undefined) {
      if (localStorage.getItem('qwertyStyle') === 'true')
        this.isQwerty = true;
      else if (localStorage.getItem('qwertyStyle') === 'false')
        this.isQwerty = false;
    }
    if (localStorage.getItem('transliterate') != undefined) {
      if (localStorage.getItem('transliterate') === 'true')
        this.standardKeyboard = false;
      else if (localStorage.getItem('transliterate') === 'true')
        this.standardKeyboard = true;
    }
  }

  ngOnInit(): void {
    this.sessionManager.itemUILocale.subscribe((locale) => {
      this.localeOfUI = this.keyboardLayouts[locale][2];
      this.layoutCurrentKeys = this[this.keyboardLayouts[this.sessionManager.itemUILocale.value][3]];
    });
    this.sessionManager.itemQwertyType.subscribe((flagForQwerty)=>{
      this.isQwerty = flagForQwerty;
    });
    this.sessionManager.itemTransliterate.subscribe((flagForTrans) => {
      this.standardKeyboard = flagForTrans;
    });
    this.sessionManager.itemShiftKeyPressed.subscribe((flagForShift) => {
      this.isShiftKeyPress = flagForShift;
    });
  }

  ngAfterViewInit(): void {
    
  }

  localeForUI(ISO_BCP_Code) {
    // TODO if 'detect language' service from Translate used then do this
    this.localeToTranslate = this.keyboardLayouts[ISO_BCP_Code][2];

    // TODO else take each of the languages which needs to be translated
  }

  keyPressed(element, value, action, type) {
    
  }

  swapLanguage() {
    let localeForSwap = this.localeOfUI;
    this.localeOfUI = this.localeToTranslate;
    this.localeToTranslate = localeForSwap;
  }

  inputRequest() {
    this.onInputRequest = true;
  }

}
