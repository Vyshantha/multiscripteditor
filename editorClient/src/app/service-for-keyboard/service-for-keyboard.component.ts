import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';   
import { HttpClient } from '@angular/common/http';
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

  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;

  languageBased: Boolean = true;
  keyboardDisassociateLocale : Boolean = true;
  showAllInitially : Boolean = true;
  onlyKeyboardToggle : Boolean = false;
  noTypewriterPresent : Boolean = true;
  allowTransliterate: Boolean = true;
  transliterateKeyboard: Boolean = false;

  inExplorerMode: Boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  transliterationScripts: string[] = ['as', 'bn', 'brx', 'gu', 'haj', 'hi', 'kn', 'ml', 'malt', 'mr', 'or', 'pa', 'sa', 'ta', 'te', 'ur', 'tirh', 'mni', 'hy', 'bg', 'km'];

  constructor(private sessionManager: SessionManagerService, private http: HttpClient, private _snackBar: MatSnackBar) {
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
    this.sessionManager.itemTransliterate.subscribe((value)=> {
      this.transliterateKeyboard = value;
    });
  }

  ngOnInit(): void {
    this.sessionManager.shouldKeyboardBeMapped();

    this.sessionManager.itemKeyboardOnly.subscribe((flagValue) => {
      this.onlyKeyboardToggle = flagValue;
    });

    this.sessionManager.itemTypewriterExists.subscribe((flagValue) => {
      this.noTypewriterPresent = !flagValue;
    });

    this.sessionManager.nonExplorationMode.subscribe((flagvalue) => {
      this.inExplorerMode = !flagvalue;
    });
  }

  ngAfterViewInit(): void {
    this.sessionManager.isMobileDevice.subscribe((value) => {
      this.isMobile = value;
    });

    this.sessionManager.isTabletDevice.subscribe((value) => {
      this.isTablet = value;
    });

    if (localStorage.getItem('qwertyStyle') != undefined) {
      if (localStorage.getItem('qwertyStyle') === 'true') {
        if (localStorage.getItem('transliterate') != undefined) {
          if (localStorage.getItem('transliterate') === 'true'){
            this.transliterateKeyboard = true;
            this.sessionManager.setTransliterate(true);
          } else if (localStorage.getItem('transliterate') === 'false') {
            this.transliterateKeyboard = false;
            this.sessionManager.setTransliterate(false);
            this.languageBased = false;
            this.sessionManager.setInSessionQwerty(true);
          }
        }
      } else if (localStorage.getItem('qwertyStyle') === 'false') {
        this.transliterateKeyboard = false;
        this.sessionManager.setTransliterate(false);
        this.languageBased = true;
        this.sessionManager.setInSessionQwerty(false);
      }
    }
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
    if (this.sessionManager.itemQwertyType.value == false) {
      this.sessionManager.setInSessionQwerty(true);
      this.transliterateKeyboard = false;
    } else if (this.sessionManager.itemQwertyType.value == true) {
      this.sessionManager.setInSessionQwerty(false);
      this.sessionManager.setTransliterate(false);
      this.transliterateKeyboard = false;
    }
  }

  minDeviceKeyboard() {
    // Minimise the OS Keyboard implementation
  }

  qwertyKeyboardMapping() {
    // ISO Keyboard for Laptop to be mapped to Qwerty Type keyboard for a particular Language or Script type
  }

  transliterationKeysClicked() {
    // No Transliteration for Latin based Alphabets
    if (this.transliterateKeyboard == true) {
      this.sessionManager.setTransliterate(false);
    } else if (this.transliterateKeyboard == false) {
      this.sessionManager.setTransliterate(true);
    }
    this.transliterateKeyboard = !this.transliterateKeyboard;
  }

  async switchTogther() {
    let translateSet = ["Use Browser Set Language or Selected Language", "Done", "Overriding Browser\'s Default Language", "OK"];
    let translationsForSet = await this.loadFromFile(this.sessionManager.getUILocale(), translateSet);
    if (this.sessionManager.itemKeyboardDisassociateLocale.value == false) {
      this.sessionManager.setKeyboardDisassociateLocale(true);
      this._snackBar.open(translationsForSet[0], translationsForSet[1], {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else if (this.sessionManager.itemKeyboardDisassociateLocale.value == true) {
      this.sessionManager.setKeyboardDisassociateLocale(false);
      this._snackBar.open(translationsForSet[2], translationsForSet[3], {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
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

}
