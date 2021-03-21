import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';   

import { SessionManagerService } from '../core/services/session-manager.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-for-keyboard',
  templateUrl: './service-for-keyboard.component.html',
  styleUrls: ['./service-for-keyboard.component.scss']
})
export class ServiceForKeyboardComponent implements OnInit {

  languageBased: Boolean = true;
  keyboardDisassociateLocale : Boolean = true;
  showAllInitially : Boolean = true;
  onlyKeyboardToggle : Boolean = false;
  standardKeyboard : Boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  allowTransliterate: Boolean = true;
  transliterationScripts: string[] = ['kn', 'te', 'ta', 'ml', 'hi', 'mr', 'sa', 'bn', 'as', 'or', 'ur', 'pu', 'tirh', 'mni'];

  constructor(private sessionManager: SessionManagerService, private _snackBar: MatSnackBar) {
    if (localStorage.getItem('qwertyStyle') != undefined) {
      if (localStorage.getItem('qwertyStyle') === 'true')
        this.languageBased = false;
      else if (localStorage.getItem('qwertyStyle') === 'false')
        this.languageBased = true;
    }
    if (localStorage.getItem('transliterate') != undefined) {
      if (localStorage.getItem('transliterate') === 'true')
        this.standardKeyboard = true;
      else if (localStorage.getItem('transliterate') === 'true')
        this.standardKeyboard = false;
    }
    if (this.sessionManager.getFromSessionURL()) {
      this.showAllInitially = this.sessionManager.itemKeyboardOnly.value;
      this.onlyKeyboardToggle = !this.sessionManager.itemKeyboardOnly.value;
      this.sessionManager.setInSessionOnlyKeyboard(true); 
    } else {
      this.showAllInitially = true;
      this.onlyKeyboardToggle = false;
      this.sessionManager.setInSessionOnlyKeyboard(false);
    }
    this.sessionManager.itemSessionURL.subscribe((url) => {
      if (this.transliterationScripts.indexOf(url) == -1) {
        this.allowTransliterate = false;
      } else {
        this.allowTransliterate = true;
      }
    });
  }

  ngOnInit(): void {
    this.sessionManager.itemKeyboardOnly.subscribe((flagValue) => {
      this.onlyKeyboardToggle = flagValue;
    });
    /*this.sessionManager.itemQwertyType.subscribe(() => {
      if (this.sessionManager.itemQwertyType.value == false)
        this.languageBased = true;
      else if (this.sessionManager.itemQwertyType.value == true)
        this.languageBased = false;
    });*/
  }

  showOnlyKeyboard() {
    // Hide All unwanted sections
    if (this.sessionManager.itemKeyboardOnly.value == false)
      this.sessionManager.setInSessionOnlyKeyboard(true);
    else if (this.sessionManager.itemKeyboardOnly.value == true)
      this.sessionManager.setInSessionOnlyKeyboard(false);
    this.showAllInitially = !this.sessionManager.itemKeyboardOnly.value;
  }

  qwertyKeyboard() {
    // Switch Keyboard to Qwerty Style Keyboard
    if (this.sessionManager.itemQwertyType.value == false)
      this.sessionManager.setInSessionQwerty(true);
    else if (this.sessionManager.itemQwertyType.value == true)
      this.sessionManager.setInSessionQwerty(false);
  }

  minDeviceKeyboard() {
    
  }

  qwertyKeyboardMapping() {
    // ISO Keyboard for Laptop to be mapped to Qwerty Type keyboard for a particular Language or Script type
  }

  transliterationKeysClicked() {
    // No Transliteration for Latin based Alphabets
    if (this.standardKeyboard == false) {
      this.standardKeyboard = true;
      this.sessionManager.setTransliterate(false);
    } else if (this.standardKeyboard == true) { 
      this.standardKeyboard = false;
      this.sessionManager.setTransliterate(true);
    }
  }

  switchTogther() {
    if (this.sessionManager.itemKeyboardDisassociateLocale.value == false) {
      this.sessionManager.setKeyboardDisassociateLocale(true);
      this._snackBar.open('Use Browser Set Language or Selected Language', 'Cool', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      // 
    } else if (this.sessionManager.itemKeyboardDisassociateLocale.value == true) {
      this.sessionManager.setKeyboardDisassociateLocale(false);
      this._snackBar.open('Overriding Browser\'s Default Language', 'OK', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

}
