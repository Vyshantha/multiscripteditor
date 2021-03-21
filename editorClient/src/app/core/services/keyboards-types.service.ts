import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';   
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class KeyboardsTypesService {

    constructor(private router: Router, private http: HttpClient) { 
    }

    // Keyboard for a Script with specific Type (Qwerty, Transliterate or Language-Learning)
    renderThisKeyboard(whichKeyboardStyle, keyboardCode, isCustom) {

    }

    // Keyboard for a Script where the URL should not be changed
    renderKeyboardWithoutURLUpdate(whichKeyboardStyle, keyboardCode) {

    }

    // Keyboard Classification could be switched
    switchKeyboardType(whichScriptType, isCustom) {

    }
}
    