import { Component, OnInit, AfterViewInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Including All Fonts here : except Indus & SignWriting
import "@fontsource/noto-sans";
import "@fontsource/noto-serif-dogra";
import "@fontsource/noto-sans-zanabazar-square";
import "@fontsource/noto-sans-mahajani";
import "@fontsource/noto-sans-old-sogdian";
import "@fontsource/noto-sans-sogdian";
import "@fontsource/noto-serif-nyiakeng-puachue-hmong";
import "@fontsource/noto-traditional-nushu";
import "@fontsource/noto-sans-nushu";
import "@fontsource/noto-serif-tangut";
import "@fontsource/noto-sans-elymaic";
import "@fontsource/noto-sans-masaram-gondi";
import "@fontsource/noto-sans-gunjala-gondi";
import "@fontsource/noto-sans-soyombo";
import "@fontsource/noto-serif-yezidi";
import "@fontsource/noto-nastaliq-urdu";

import { SessionManagerService } from '../core/services/session-manager.service';

import * as allLayoutPositions from './../../assets/keyboard-layouts/keysboards-layouts.json';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit, AfterViewInit {

  @ViewChild('ckeditorFull') fullmodeCkEditor;
  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;
  keyboardLayouts: any = (allLayoutPositions as any).default;
  layoutCurrentKeys: any = [];

  showEditor : Boolean = true;

  altGrCapsExists : Boolean = false;
  qwertyPos: number = 0;
  qwertyTranPos: number = 0;
  altGrPos: number = 0;
  
  typedWord = new BehaviorSubject(null);

  ckeditorContent: String = "";
  copyContents: String = "";

  ckEditorConfiguration = {
      toolbarGroups: [],
      language: '',
      defaultLanguage: '',                                // If this is used then locale among supportedCDKEditorLocales should be used
      language_list: [''],
      contentsLanguage: '',
      contentsLangDirection: '',               
      extraAllowedContent: '(*);*{*}',                    // This is ensure the <p>, <div> or <span> tags allow use of custom class
            // 'p(bousphorden-rtl,bousphorden-ltr,top-bottom-rtl,bottom-top-rtl,top-bottom-ltr,bottom-top-ltr,original-orientation)',
            //'div(icon,icon-,bousphorden-rtl,bousphorden-ltr,top-bottom-rtl,bottom-top-rtl,top-bottom-ltr,bottom-top-ltr,original-orientation);' +
            //'span(icon,icon-,bousphorden-rtl,bousphorden-ltr,top-bottom-rtl,bottom-top-rtl,top-bottom-ltr,bottom-top-ltr,original-orientation);', 
      allowedContent: true,                               // 'h1 h2 h3 p blockquote strong em a[!href] img(left,right)[!src,alt,width,height]',               
      forcePasteAsPlainText: true,                        // Paste prevention on browser side 
      removeButtons: 'Paste,PasteText,PasteFromWord', 
      pasteFilter: null,                                  // 'plain-text'
      contentsCss: '',                                    // TODO : with X-Content-Type-Options set to 'nosniff'
      startupFocus: 'end',
      //extraPlugins: ''                                  // Plugins for CKEditor https://ckeditor.com/cke4/presets-all
  };

  whenKeyIsPressed: Boolean = false;
  mappedSpaceClicked: Boolean = false;
  pasteContentSetToEditor: Boolean = false;
  upArrowKeyPressed: Boolean = false;
  downArrowKeyPressed: Boolean = false;
  rightArrowKeyPressed: Boolean = false;
  leftArrowKeyPressed: Boolean = false;
  menuKeyPressed: Boolean = false;
  deletePressed: Boolean = false;
  charInserted: Boolean = false;

  // Two letter locales - https://www.transifex.com/ckeditor/ckeditor/
  supportedCDKEditorLocales = ['cs', 'fr', 'gsw', 'de', 'it', 'sr', 'sr-ba', 'sr-sp', 'zh-cn', 'zh-hk', 'zh-sg', 'zh-mo', 'zh-tw', 'zh', 'hr', 'en-au', 'et', 'gl', 'hu', 'pl', 'pt', 'pt-br', 'sv', 'tr', 'uk', 'sq', 'da', 'no', 'nb', 'ckb', 'fa', 'ru', 'sk', 'az', 'nl', 'eo', 'vi', 'ko', 'es', 'es-mx', 'ja', 'lv', 'oc', 'ca', 'el', 'ro', 'sl', 'uyy', 'ug', 'en-gb', 'cy', 'eu', 'he', 'fr-ca', 'tt', 'bg', 'af', 'ar', 'fi', 'km', 'lt', 'fo', 'gu', 'ka', 'th', 'id', 'mn', 'hi', 'si-ta', 'is', 'en-ca', 'bn', 'ms', 'bs', 'mk', 'ast', 'lu', 'tg', 'ne', 'ti', 'si', 'tl'];

  rtlLocales = ['ar', 'he', 'ur', 'fa', 'syrc', 'rhg', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ckb', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'skr', 'pal', 'xpr', 'xsa', 'mnkar', 'jawi', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf', 'woal', 'chrs', 'elym', 'palm', 'hatr', 'ber', 'mani', 'mer', 'psal', 'kult', 'egyd', 'safa', 'nshu', 'rohg', 'estr', 'sert', 'madn', 'lad', 'nbat', 'pice', 'gars', 'cprt', 'lepo', 'sabe', 'phyg', 'khaz', 'mero', 'cana', 'sina', 'yezi', 'ug', 'mend', 'linb', 'idu', 'chun', 'kuli', 'txg', 'indus', 'hung'];

  boustrophedonScripts: string[] = ['ett', 'sabe', 'maya', 'txr', 'wole', 'phyg', 'pice', 'asom', 'luw', 'moon', 'sina', 'kmt', 'hung', 'safa', 'xsa', 'egyd', 'avo', 'lepo'];

  swaraAbugidaType : string [] = ['ahom', 'bada', 'bali', 'batk', 'tglg', 'bn', 'bhai', 'bla', 'brah', 'bug', 'buhd', 'cakm', 'cree', 'dham', 'dite', 'diak', 'dogr', 'gran', 'gu', 'gup', 'hano', 'hi', 'jv', 'kthi', 'kn', 'kawi', 'kali', 'khar', 'tang', 'km', 'khoj', 'khud', 'kuli', 'lo', 'lepc', 'limb', 'loma', 'maga', 'maha', 'ml', 'mani', 'mni', 'mr', 'modi', 'mult', 'my', 'nand', 'or', 'phag', 'newa', 'pa', 'rjng', 'renc', 'sa', 'saur', 'shan', 'shrd', 'sn', 'sidd', 'snd', 'si', 'bhat', 'leke', 'ari', 'sora', 'sund', 'sylo', 'tagb', 'talu', 'lana', 'takr', 'ta', 'tamu', 'tach', 'te', 'thaa', 'th', 'tibt', 'tiga', 'tika', 'tirh', 'toch', 'zanb'];

  imageAlternativeScript: string[] = ['cans', 'esk', 'esi', 'ipk', 'dhan', 'safa', 'txr', 'ibe', 'avo', 'ranj', 'gup', 'pall', 'toch', 'moon', 'tiga', 'xce', 'vith', 'nand', 'kada', 'estr', 'sert', 'madn', 'diak', 'ber', 'tach', 'gael', 'mwan', 'wole', 'moss', 'iba', 'maya', 'egyd', 'bhat', 'renc', 'kuli', 'sina', 'zou', 'cana', 'kaid', 'dham', 'tamu', 'geba', 'esy', 'maka', 'lad', 'kama', 'ndju', 'aztc', 'jiag', 'indus', 'bada', 'vatt', 'mikq', 'kpe', 'gars', 'dale', 'goyk', 'wolf', 'zag', 'kawi', 'loma', 'nsi', 'ion', 'tika', 'mamb', 'land', 'khat', 'leke', 'ari', 'sabe', 'dite', 'toto', 'chrs', 'tang', 'maga', 'luo', 'chik', 'adin', 'khom', 'kits', 'kitl', 'tnq', 'maha', 'ics', 'flag', 'ussign', 'desisign', 'banzsl'];

  /* KeyCode for Keyboard - Qwerty 'Mac' keyboard ONLY - TODO Generic
    229 (process) 49 50 51 52 53 54 55 56 57 48 63 192 (dead) 8 (backspace)
    9 (tab) 81 87 69 82 84 90 85 73 79 80 219 171
    20 (capslock) 65 83 68 70 71 72 74 75 76 59 222 163 13 (enter)
    2228240 (shift) 60 89 88 67 86 66 78 77 188 190 173 2228240 (shift)
    1114129 (control) 4456466 (alt) 32 1114336 (cmd) 37 (left) 38 (up) 40 (down) 39 (right)
  */
  keyCodeMap = [{"229": ["0", "0"], "160": ["0", "0"], "49": ["1", "0"], "50": ["2", "0"], "51": ["3", "0"], "52": ["4", "0"], "53": ["5", "0"], "54": ["6", "0"], "55": ["7", "0"], "56": ["8", "0"], "57": ["9", "0"], "48": ["10", "0"], "63": ["11", "0"], "192": ["12", "0"], "8": ["13", "0"], "9": ["0", "1"], "81": ["1", "1"], "87": ["2", "1"], "69": ["3", "1"], "82": ["4", "1"], "84": ["5", "1"], "90": ["6", "1"], "85": ["7", "1"], "73": ["8", "1"], "79": ["9", "1"], "80": ["10", "1"], "219": ["11", "1"], "171": ["12", "1"], "20": ["-1", "2"], "65": ["0", "2"], "83": ["1", "2"], "68": ["2", "2"], "70": ["3", "2"], "71": ["4", "2"], "72": ["5", "2"], "74": ["6", "2"], "75": ["7", "2"], "76": ["8", "2"], "59": ["9", "2"], "222": ["10", "2"], "163": ["11", "2"], "13": ["12", "2"], "2228240": ["0", "3"], "60": ["1", "3"], "89": ["2", "3"], "88": ["3", "3"], "67": ["4", "3"], "86": ["5", "3"], "66": ["6", "3"], "78": ["7", "3"], "77": ["8", "3"], "188": ["9", "3"], "190": ["10", "3"], "173": ["11", "3"], "1114129": ["0", "4"], "4456466": ["1", "4"], "32": ["2", "4"], "37": ["5", "4"], "38": ["6", "4"], "39": ["7", "4"], "40": ["8", "4"]}];

  topToBottomLR: string[] = ['sog', 'oira', 'mon', 'phag', 'mnc', 'galk', 'shui', 'soyo', 'kits', 'kitl', 'sgnw'];
  topToBottomRL: string[] = ['zhcn', 'zhtw', 'ja', 'ko', 'nshu', 'idu', 'mero', 'chun', 'kuli', 'txg', 'indus', 'khit'];
  bottomToTopLR: string[] = ['ogam', 'btk', 'hano', 'tagb'];
  bottomToTopRL: string[] = ['ber'];

  noSeparator: string[] = ["zhcn", "zhtw", "ja", "bopo", "pin"];
  visualSeparator: string[] = ["am", "tig", "ti"];
  zeroWidthSeparator: string[] = ["bali", "jv", "km", "th", "lo", "shan", "tdd", "talu", "my"];
  syllabicSeparator: string[] = ["lis", "tibt"];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  upArrowEvent: any;
  downArrowEvent: any;
  rightArrowEvent: any;
  leftArrowEvent: any;
  menuShowEvent: any;
  mouseclickEvent: any;

  position: any = "∞";
  rowPos: any;
  colPos: any;

  translateForSnackBar: string[] = [];

  fontsSourcesCSS: string[] = ['dogra', 'zanabazar-square', 'sogdian', 'old-sogdian', 'nyiakeng-puachue-hmong', 'nushu', 'tangut', 'elymaic', 'masaram-gondi', 'gunjala-gondi', 'soyombo', 'yezidi', 'arabic'];
  fonts: string[] = ['dogr', 'zanb', 'sog', 'kult', 'hmnp', 'nshu', 'txg', 'elym', 'gonm', 'gong', 'soyo', 'yezi', 'ur'];

  constructor(private sessionManager: SessionManagerService, private http: HttpClient, private _snackBar: MatSnackBar) { 
    // The toolbar groups arrangement, optimized for two toolbar rows.
    if (this.isMobile && !this.isTablet) {
      this.ckEditorConfiguration.toolbarGroups = [
        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'colors' },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'links' },
        { name: 'document',    groups: [ 'document', 'mode', 'doctools' ] },
        { name: 'insert' },
        { name: 'paragraph',   groups: [ 'bidi' ] },
        { name: 'paragraph',   groups: [ 'align' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks' ] },
        { name: 'forms' },
        { name: 'tools' },
        { name: 'others' },
        { name: 'about' },
        '/',
        { name: 'styles' }
      ];
    } else if (!this.isMobile && this.isTablet) {
      this.ckEditorConfiguration.toolbarGroups = [
        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'forms' },
        { name: 'tools' },
        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'colors' },
        { name: 'others' },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'about' },
        { name: 'styles' }
      ];
    } else if (!this.isMobile && !this.isTablet) {
      this.ckEditorConfiguration.toolbarGroups = [
        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'forms' },
        { name: 'tools' },
        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'colors' },
        { name: 'about' },
        { name: 'others' },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'styles' }
      ];
    }
    
    let URL_Code = this.sessionManager.getFromSessionURL();
    this.ckEditorConfiguration.contentsLangDirection = (this.rtlLocales.indexOf(URL_Code) !== -1)? 'rtl' : 'ltr';

    let ISO_Code = this.sessionManager.getUILocale();
    let isoCode = ISO_Code;
    if (ISO_Code.length == 4)
      isoCode = [ISO_Code.slice(0, 2), "-", ISO_Code.slice(2)].join('');
    if (this.keyboardLayouts[ISO_Code] && this.supportedCDKEditorLocales.indexOf(isoCode) > -1) {
      this.ckEditorConfiguration.language = isoCode;
      this.ckEditorConfiguration.defaultLanguage = ISO_Code;
    } else if (this.keyboardLayouts[ISO_Code] && this.supportedCDKEditorLocales.indexOf(ISO_Code) > -1) {
      this.ckEditorConfiguration.language = ISO_Code;
      this.ckEditorConfiguration.defaultLanguage = ISO_Code;
    }

    // LocalStorage limit 5MB : https://dev.to/rdegges/please-stop-using-local-storage-1i04
    if (this.sessionManager.getSessionSavedContent() && this.sessionManager.retrieveSaveSessionAllowed() == 'true') {
      this.ckeditorContent = this.sessionManager.getSessionSavedContent();
    } else if (this.sessionManager.retrieveSaveSessionAllowed() == 'false') {
      this.sessionManager.setSessionSavingOfContent("");
    }
    this.translateSnackBars();
  }

  ngOnInit(): void {
    // Prevent right-click on 'body' of HTML
    document.addEventListener('contextmenu', event => event.preventDefault());
    this.sessionManager.itemCurrentKeyboard.subscribe((layoutCurrentKeys) => {
      if (layoutCurrentKeys) {
        this.layoutCurrentKeys = layoutCurrentKeys;
        this.qwertyPos = 0, this.qwertyTranPos = 0, this.altGrPos = 0;
        this.altGrCapsExists = (this.layoutCurrentKeys) ? this.layoutCurrentKeys.some(x => x.hasOwnProperty('altGrCaps')) : false;
        for(let i = 0; i < this.layoutCurrentKeys.length; i++) {
          Object.keys(this.layoutCurrentKeys[i]).map((key) => {
            if (key != "qwerty" && key != "qwertyShift" && key != "qwertyTrans" && key != "qwertyShiftTrans" && key != "altGr" && key != "altGrCaps")
              this.qwertyPos++;
            if (key != "qwertyTrans" && key != "qwertyShiftTrans" && key != "altGr" && key != "altGrCaps")
              this.qwertyTranPos++;
            if (key != "altGr" && key != "altGrCaps")
              this.altGrPos++;
          });
        }
      }
    });
    this.sessionManager.nonExplorationMode.subscribe((editorOnly) => {
      this.showEditor = editorOnly;
      setTimeout(() => {
        if (editorOnly == true && this.sessionManager.getSessionSavedContent() != null && this.fullmodeCkEditor) {
          this.ckeditorContent = this.sessionManager.getSessionSavedContent();
          this.fullmodeCkEditor.instance.setData(this.ckeditorContent);
        }
      }, 500);
    });
  }

  ngAfterViewInit(): void {
    this.sessionManager.typedKeysMap.subscribe((value) => {
      this.typedWord.next(value);
    });
    this.sessionManager.isMobileDevice.subscribe((value) => {
      this.isMobile = value;
    });
    this.sessionManager.isTabletDevice.subscribe((value) => {
      this.isTablet = value;
    });

    this.sessionManager.pasteIntegrationOutput.subscribe((value) => {
      this.pasteContentSetToEditor = value;
    });

    var self = this;
    // On content 'dom' of Editor attach handler for the click event of the document
    this.fullmodeCkEditor.instance.on( 'contentDom', (contentEvent) => {
      contentEvent.editor.editable().on('click', (event) => {
        event = event || window.event;
        self.menuShowEvent = event;
        self.mouseclickEvent = event;
        self.position = self.positionCalculator();
        self.rowPos = self.position.split(",")[0];
        self.colPos = self.position.split(",")[1];
      });
      const isBrowserTabInView = () => document.hidden;
      if (isBrowserTabInView()) {
        setTimeout(() => { 
          contentEvent.editor.focus();
          if (self.position == "∞") {
            // Moves the cursor focus to end of the sentence
            var range = contentEvent.editor.createRange();
            range.moveToPosition( range.root, 2 );
            if (contentEvent.editor.getSelection()) 
              contentEvent.editor.getSelection().selectRanges( [ range ] );
          } else {
            self.deletePressed = false;
            self.charInserted = false;
          }
        }, 100);
      }
    });

    this.fullmodeCkEditor.instance.on( 'key', function( event ) {
      let controlActionKey = false;
      // Ensure Cursor focus moved back to Editor
      if (event.data.keyCode == 1114129 || event.data.keyCode == 1114336) {
        self.sessionManager.itemCtrlKeyPressed.next(true);
        self._snackBar.open(self.translateForSnackBar[6], "OK", {
          duration: 3000,
        });
      }
      setTimeout(() => {
        event.editor.focus();
        if (self.sessionManager.itemCtrlKeyPressed.value == false && event.data.domEvent["$"].key != "ArrowDown" && self.downArrowKeyPressed == false && event.data.domEvent["$"].key != "ArrowRight" && self.rightArrowKeyPressed == false && event.data.domEvent["$"].key != "ArrowUp" && self.upArrowKeyPressed == false && event.data.domEvent["$"].key != "ArrowLeft" && self.leftArrowKeyPressed == false) {
          var range = event.editor.createRange();
          if (range) {
            range.moveToPosition( range.root, 2 );
            if (event.editor.getSelection()) 
              event.editor.getSelection().selectRanges( [ range ] );
          }
        }
      }, 100);
      if (self.sessionManager.itemCtrlKeyPressed.value == true) {
        // Action to be done after Control
        if (event.data.keyCode == 88 || event.data.keyCode == 1114200) {
          // Ctrl + X
          self._snackBar.open(self.translateForSnackBar[13], self.translateForSnackBar[0], {
            duration: 3000,
          });
          self.fullmodeCkEditor.instance.fire('cut', event);
          self.sessionManager.itemCtrlKeyPressed.next(false);
          controlActionKey = true;
        } else if (event.data.keyCode == 65 || event.data.keyCode == 1114177) {
          // Ctrl + A
          self._snackBar.open(self.translateForSnackBar[14], self.translateForSnackBar[0], {
            duration: 3000,
          });
          self.fullmodeCkEditor.instance.fire('selectAll', event);
          self.sessionManager.itemCtrlKeyPressed.next(false);
          controlActionKey = true;
        } else if (event.data.keyCode == 88 || event.data.keyCode == 1114202) {
          // Ctrl + Z
          self._snackBar.open(self.translateForSnackBar[15], self.translateForSnackBar[0], {
            duration: 3000,
          });
          self.fullmodeCkEditor.instance.fire('undo', event);
          self.sessionManager.itemCtrlKeyPressed.next(false);
          controlActionKey = true;
        } else if (event.data.keyCode == 67 || event.data.keyCode == 1114179) {
          // Ctrl + C
          self._snackBar.open(self.translateForSnackBar[16], self.translateForSnackBar[0], {
            duration: 3000,
          });
          self.fullmodeCkEditor.instance.fire('copy', event);
          self.sessionManager.itemCtrlKeyPressed.next(false);
          controlActionKey = true;
        } else if (event.data.keyCode == 78 || event.data.keyCode == 1114190) {
          // Ctrl + N
          self._snackBar.open(self.translateForSnackBar[17], self.translateForSnackBar[0], {
            duration: 3000,
          });
          self.ckeditorContent = "";
          self.position = "∞";
          self.mouseclickEvent = null;
          self.rowPos = 0;
          self.colPos = 0;
          self.sessionManager.setSessionSavingOfContent(self.ckeditorContent);
          self.fullmodeCkEditor.instance.setData(self.ckeditorContent);
          self.sessionManager.itemCtrlKeyPressed.next(false);
          controlActionKey = true;
        } else if (event.data.keyCode == 86 || event.data.keyCode == 1114198) {
          // Ctrl + V
          self._snackBar.open(self.translateForSnackBar[18], self.translateForSnackBar[0], {
            duration: 3000,
          });
          self.pasteContentSetToEditor = true;
          self.sessionManager.itemCtrlKeyPressed.next(false);
          controlActionKey = true;
        }
        event.stop();
      }
      if (controlActionKey == false) {
        // Mapping Soft Keyboard events with Keyboard 
        if (event.data.domEvent["$"].key == "ArrowLeft") {
          self.leftArrowEvent = event;
        } else if (event.data.domEvent["$"].key == "ArrowUp") {
          self.upArrowEvent = event;
        } else if (event.data.domEvent["$"].key == "ArrowRight") {
          self.rightArrowEvent = event;
        } else if (event.data.domEvent["$"].key == "ArrowDown") {
          self.downArrowEvent = event;
        }
        // insert & delete at cursor position
        if (self.sessionManager.mappingKeyboard.value == true && (self.sessionManager.itemQwertyType.value == true || self.sessionManager.itemTransliterate.value == true)) {
          if ((event.data.domEvent["$"].key == "Shift" && event.data.keyCode == 2228240) || (event.data.domEvent["$"].key == "CapsLock" && event.data.keyCode == 20)) {
            if (self.sessionManager.itemShiftKeyPressed.value == false) {
              setTimeout(() => {
                self.sessionManager.setShiftKeyPressed(true);
                self._snackBar.open(self.translateForSnackBar[2], self.translateForSnackBar[0], {
                  duration: 1000,
                  horizontalPosition: self.horizontalPosition,
                  verticalPosition: self.verticalPosition,
                });
              }, 100);
            } else if (self.sessionManager.itemShiftKeyPressed.value == true) {
              setTimeout(() => {
                self.sessionManager.setShiftKeyPressed(false);
                self._snackBar.open(self.translateForSnackBar[3], self.translateForSnackBar[0], {
                  duration: 1000,
                  horizontalPosition: self.horizontalPosition,
                  verticalPosition: self.verticalPosition,
                });
              }, 100);
            }
            // Blur and Focus invent to change Shift layout for Keyboard
            self.fullmodeCkEditor.instance.focusManager.blur(true);
          }
          if ((event.data.domEvent["$"].key == "Alt" && event.data.keyCode == 4456466) && self.sessionManager.itemAltGrExists.value == true) {
            if (self.sessionManager.itemAltGrKeyPressed.value == false) {
              setTimeout(() => {
                self.sessionManager.setAltGrKeyPressed(true);
                self._snackBar.open(self.translateForSnackBar[4], self.translateForSnackBar[0], {
                  duration: 1000,
                  horizontalPosition: self.horizontalPosition,
                  verticalPosition: self.verticalPosition,
                });
              }, 100);
            } else if (self.sessionManager.itemAltGrKeyPressed.value == true) {
              setTimeout(() => {
                self.sessionManager.setAltGrKeyPressed(false);
                self._snackBar.open(self.translateForSnackBar[5], self.translateForSnackBar[0], {
                  duration: 1000,
                  horizontalPosition: self.horizontalPosition,
                  verticalPosition: self.verticalPosition,
                });
              }, 100);
            }
            // Blur and Focus invent to change Shift layout for Keyboard
            self.fullmodeCkEditor.instance.focusManager.blur(true);
          }
          if (event.data.domEvent["$"].key != "Meta" && event.data.domEvent["$"].key != "Shift" && event.data.domEvent["$"].key != "CapsLock" && event.data.domEvent["$"].key != "Alt" && event.data.domEvent["$"].key != "Tab" && event.data.domEvent["$"].key != "Backspace" && event.data.domEvent["$"].key != "Enter" && event.data.domEvent["$"].key != "Control" && event.data.domEvent["$"].key != "ArrowLeft" && event.data.domEvent["$"].key != "ArrowUp" && event.data.domEvent["$"].key != "ArrowRight" && event.data.domEvent["$"].key != "ArrowDown" && event.data.domEvent["$"].key != " ") {
            let rowForSoftKey = 0, columnForSoftKey = 0;
            if (self.keyCodeMap[0][event.data.keyCode] && self.sessionManager.itemQwertyType.value == true && self.sessionManager.itemTransliterate.value == false && self.sessionManager.itemShiftKeyPressed.value == false && self.sessionManager.itemAltGrKeyPressed.value == false && event.data.keyCode < 2228224) {
              rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][1]) + self.qwertyPos;
              columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][0]);
              if (self.typedWord.value != null)
                self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]);
              else 
                self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]);
              self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]);
              self.sessionManager.typedKeysMap.next(self.typedWord.value);
            } else if (self.keyCodeMap[0][event.data.keyCode] && self.sessionManager.itemQwertyType.value == true && self.sessionManager.itemTransliterate.value == false && self.sessionManager.itemShiftKeyPressed.value == true && self.sessionManager.itemAltGrKeyPressed.value == false && event.data.keyCode < 2228224) {
              rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][1]) + self.qwertyPos + 5;
              columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][0]);
              if (self.typedWord.value != null)
                self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["value"]);
              else 
                self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["value"]);
              self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["value"]);
              self.sessionManager.typedKeysMap.next(self.typedWord.value);
            } else if (self.keyCodeMap[0][event.data.keyCode] && self.sessionManager.itemQwertyType.value == true && self.sessionManager.itemTransliterate.value == false && self.sessionManager.itemShiftKeyPressed.value == false && self.sessionManager.itemAltGrKeyPressed.value == true && event.data.keyCode < 2228224) {
              rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][1]) + self.altGrPos;
              columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][0]);
              if (self.typedWord.value != null)
                self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["altGr"][columnForSoftKey]["value"]);
              else 
                self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["altGr"][columnForSoftKey]["value"]);
              self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["altGr"][columnForSoftKey]["value"]);
              self.sessionManager.typedKeysMap.next(self.typedWord.value);
            } else if (self.keyCodeMap[0][event.data.keyCode] && self.sessionManager.itemQwertyType.value == true && self.sessionManager.itemTransliterate.value == false && self.sessionManager.itemShiftKeyPressed.value == true && self.sessionManager.itemAltGrKeyPressed.value == true && event.data.keyCode < 2228224) {
              rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][1]) + self.altGrPos + 5;
              columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][0]);
              if (self.typedWord.value != null)
                self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["altGrCaps"][columnForSoftKey]["value"]);
              else 
                self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["altGrCaps"][columnForSoftKey]["value"]);
              self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["altGrCaps"][columnForSoftKey]["value"]);
              self.sessionManager.typedKeysMap.next(self.typedWord.value);
            } else if (self.keyCodeMap[0][event.data.keyCode] && self.sessionManager.itemQwertyType.value == false && self.sessionManager.itemTransliterate.value == true && self.sessionManager.itemShiftKeyPressed.value == false && self.sessionManager.itemAltGrKeyPressed.value == false && event.data.keyCode < 2228224) {
              rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][1]) + self.qwertyTranPos;
              columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][0]);
              if (self.typedWord.value != null)
                self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["qwertyTrans"][columnForSoftKey]["value"]);
              else 
                self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["qwertyTrans"][columnForSoftKey]["value"]);
              self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["qwertyTrans"][columnForSoftKey]["value"]);
              self.sessionManager.typedKeysMap.next(self.typedWord.value);
            } else if (self.keyCodeMap[0][event.data.keyCode] && self.sessionManager.itemQwertyType.value == false && self.sessionManager.itemTransliterate.value == true && self.sessionManager.itemShiftKeyPressed.value == true && self.sessionManager.itemAltGrKeyPressed.value == false && event.data.keyCode < 2228224) {
              rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][1]) + self.qwertyTranPos + 5;
              columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.keyCode][0]);
              if (self.typedWord.value != null)
                self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["qwertyShiftTrans"][columnForSoftKey]["value"]);
              else 
                self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["qwertyShiftTrans"][columnForSoftKey]["value"]);
              self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["qwertyShiftTrans"][columnForSoftKey]["value"]);
              self.sessionManager.typedKeysMap.next(self.typedWord.value);
            }
          } else if (event.data.domEvent["$"].key == " ") {
            self.typedWord.next("");
            self.mappedSpaceClicked = true;
            setTimeout(() => {
              self.sessionManager.setCharFromKeyboard(self.wordSeparator());
            }, 100);
          } else if (event.data.domEvent["$"].key == "Backspace") {
            // Do action based on Cursor position
            self.sessionManager.setActionFromKeyboard("del");
            if (self.sessionManager.typedKeysMap.value && self.sessionManager.typedKeysMap.value != null) {
              self.sessionManager.typedKeysMap.next("");
              self.typedWord.next("");
            }
          } else if (event.data.domEvent["$"].key == "Enter") {
            self.sessionManager.setCharFromKeyboard("<br/>");
            if (self.sessionManager.typedKeysMap.value && self.sessionManager.typedKeysMap.value != null) {
              self.sessionManager.typedKeysMap.next(self.sessionManager.typedKeysMap.value.substring(0, self.sessionManager.typedKeysMap.value.length - 1));
              self.typedWord.next(self.sessionManager.typedKeysMap.value);
            }
          }
        } else {
          if (event.data.domEvent["$"].key != "ArrowLeft" && event.data.domEvent["$"].key != "ArrowUp" && event.data.domEvent["$"].key != "ArrowRight" && event.data.domEvent["$"].key != "ArrowDown" && self.menuKeyPressed == false)
            event.stop();
          if (event.data.domEvent["$"].key != "Meta" && event.data.domEvent["$"].key != "Shift" && event.data.domEvent["$"].key != "CapsLock" && event.data.domEvent["$"].key != "Alt" && event.data.domEvent["$"].key != "Tab" && event.data.domEvent["$"].key != "Backspace" && event.data.domEvent["$"].key != "Enter" && event.data.domEvent["$"].key != "Control" && event.data.domEvent["$"].key != "ArrowLeft" && event.data.domEvent["$"].key != "ArrowUp" && event.data.domEvent["$"].key != "ArrowRight" && event.data.domEvent["$"].key != "ArrowDown" && event.data.domEvent["$"].key != " ") {
            self.sessionManager.setCharFromKeyboard(event.data.domEvent["$"].key);
          } else if (event.data.domEvent["$"].key == " ") {
            self.typedWord.next("");
            self.mappedSpaceClicked = true;
            setTimeout(() => {
              self.sessionManager.setCharFromKeyboard(self.wordSeparator());
            }, 100);
          } else if (event.data.domEvent["$"].key == "Backspace") {
            // Do action based on Cursor position
            self.sessionManager.setActionFromKeyboard("del");
            if (self.sessionManager.typedKeysMap != null && self.sessionManager.typedKeysMap.value != null) {
              self.sessionManager.typedKeysMap.next(self.sessionManager.typedKeysMap.value.substring(0, self.sessionManager.typedKeysMap.value.length - 1));
              self.typedWord.next(self.sessionManager.typedKeysMap.value);
            }
          } else if (event.data.domEvent["$"].key == "Enter") {
            self.sessionManager.setCharFromKeyboard("<br/>");
            if (self.sessionManager.typedKeysMap.value && self.sessionManager.typedKeysMap.value != null) {
              self.sessionManager.typedKeysMap.next("");
              self.typedWord.next("");
            }
          }
        }
      }
    });

    this.fullmodeCkEditor.instance.on( 'menuShow', function (event) {
      self.menuShowEvent = event;
      if (self.menuShowEvent && self.menuKeyPressed == true && event.editor.contextMenu && event.data["$"]) {
        event.editor.contextMenu.show( event.editor.element["$"].parentElement, (self.rtlLocales.indexOf(self.sessionManager.getFromSessionURL()) !== -1)? 2 : 1, event.data["$"].clientX, event.data["$"].clientY );
        self.menuKeyPressed = false;
        self.menuShowEvent = null;
      }
      // TODO - Right-Click Event through Soft Keyboard - "TypeError: b.getDocumentPosition is not a function" is thrown and no menu is shown
    });

    this.fullmodeCkEditor.instance.on( 'change', function( event ) {
      let content = self.fullmodeCkEditor.instance.getData();
      if (typeof(content) == 'string' && self.mappedSpaceClicked == true && self.pasteContentSetToEditor == true && (self.sessionManager.itemKeyCharacter.value == null || self.sessionManager.itemKeyCharacter.value == "  " || self.sessionManager.itemKeyCharacter.value == " " || self.sessionManager.itemKeyCharacter.value == "")) {
        self.ckeditorContent = content;
        self.sessionManager.setSessionSavingOfContent(self.ckeditorContent);
        self.fullmodeCkEditor.instance.setData(self.ckeditorContent);
      } else {
        event.stop();
      }
      // Ensure Cursor focus moved back to Editor
      setTimeout(() => {
        // Do action based on Cursor position
        if (self.pasteContentSetToEditor == false) {
          self.sessionManager.setSessionSavingOfContent(self.ckeditorContent);
          self.fullmodeCkEditor.instance.setData(self.ckeditorContent);
        } else {
          self.ckeditorContent = self.fullmodeCkEditor.instance.getData();
          self.sessionManager.setSessionSavingOfContent(self.fullmodeCkEditor.instance.getData());
          self.fullmodeCkEditor.instance.setData(self.fullmodeCkEditor.instance.getData());
        }
        if (self.ckeditorContent == "") {
          self.position = "∞";
          self.mouseclickEvent = null;
          self.rowPos = 0;
          self.colPos = 0;
        }
        self.mappedSpaceClicked = false;
        self.pasteContentSetToEditor = false;
        setTimeout(() => { 
          event.editor.focus();
          if (self.position == "∞") {
            // Moves the cursor focus to end of the sentence
            var range = event.editor.createRange();
            if (range) {
              range.moveToPosition( range.root, 2 );
              if (event.editor.getSelection())
                event.editor.getSelection().selectRanges( [ range ] );
            }
          } else {
            self.deletePressed = false;
            self.charInserted = false;
          }
        }, 100);
      }, 100);
    });
    
    // Handling the "Paste" prevention code into Browser
    this.fullmodeCkEditor.instance.on( 'instanceReady', function(event) {
      event.editor.on("beforeCommandExec", function(event) {
          // Show the paste dialog for the paste buttons and right-click paste
          if (event.data.name == "paste") {
              event.editor._.forcePasteDialog = true;
          }
          // Don't show the paste dialog for Ctrl+Shift+V
          if (event.data.name == "pastetext" && event.data.commandData.from == "keystrokeHandler") {
              event.cancel();
          }
          self.pasteContentSetToEditor = true;
      });
    });
    
    if (this.sessionManager.getSessionSavedContent() && this.sessionManager.retrieveSaveSessionAllowed() == 'true') {
      Object.keys(this.fullmodeCkEditor).map(key => {
        if (key === "_value") {
          if (this.sessionManager.getSessionSavedContent()) {
            this.fullmodeCkEditor[key] = this.sessionManager.getSessionSavedContent();
            this.ckeditorContent = this.fullmodeCkEditor[key];
          } else {
            this.fullmodeCkEditor[key] = "";
            this.ckeditorContent = this.fullmodeCkEditor[key];
          }
        }
      });
    }

    this.sessionManager.itemKeyCharacter.subscribe((character) => {
      this.whenKeyIsPressed = false;
      // Inserting Character at Cursor Position
      if (this.sessionManager.getSessionSavedContent() && parseFloat(this.rowPos) > 0 && parseFloat(this.colPos) == 0 && this.position != "∞") {
        this.ckeditorContent = this.sessionManager.getSessionSavedContent().substring(0, parseFloat(this.rowPos) + 1) + character + this.sessionManager.getSessionSavedContent().substring(parseFloat(this.rowPos) + 1, this.sessionManager.getSessionSavedContent().length);
        this.charInserted = true;
      } else if (this.sessionManager.getSessionSavedContent() && parseFloat(this.rowPos) > 0 && parseFloat(this.colPos) > 0 && this.position != "∞") {
        // Line-break encountered and this has to be handled separately
        let splitContent = this.sessionManager.getSessionSavedContent().split("<br />");
        let content = "";
        if (splitContent && splitContent.length > 0) {
          for (let i = 0; i < splitContent.length; i++) {
            if (i == parseInt(this.colPos))
              content = splitContent[i] + splitContent[i].substring(0, parseFloat(this.rowPos) + 1) + character + splitContent[i].substring(parseFloat(this.rowPos) + 1, splitContent[i].length);
            else
              content = splitContent[i]; 
          }
          this.ckeditorContent = content;
          this.charInserted = true;
        } else {
          this.ckeditorContent = this.sessionManager.getSessionSavedContent() + character;
          this.charInserted = false;
          this.mouseclickEvent = null;
        }
      } else if (this.position == "∞") {
        this.ckeditorContent = this.sessionManager.getSessionSavedContent() + character;
        this.charInserted = false;
        this.mouseclickEvent = null;
      }
      this.sessionManager.setSessionSavingOfContent(this.ckeditorContent);
      this.fullmodeCkEditor.instance.setData(this.ckeditorContent);
      this.fullmodeCkEditor.instance.insertText(character);
    });

    this.sessionManager.itemKeyAction.subscribe((action) => {
      // Do what based on type of Action
      if (action === "shift") {
        this._snackBar.open(this.translateForSnackBar[1], this.translateForSnackBar[0], {
          duration: 3000,
        });
      } else if (action === "altGr") {
        this._snackBar.open(this.translateForSnackBar[7], this.translateForSnackBar[0], {
          duration: 3000,
        });
      } else if (action === "tab") {
        // 4 &nbsp; should be added
      } else if (action === "enter") {
        // A new <br/> should be added in the editor
      } else if (action === "space") {
        // A space between characters
      } else if (action === "delAlt") {
        // TODO : Validate Bi-Di or Not - Delete character/image to the right (for LTR Language) of a character or left (for RTL Language) of a character
      } else if (action === "del") {
        // Validate Bi-Di or Not - Delete character/image to the left (for LTR Language) of a character or right (for RTL Language) of a character
        if (this.ckeditorContent.lastIndexOf("<img") > -1 && this.ckeditorContent.lastIndexOf("/>") > -1 && this.ckeditorContent.lastIndexOf("/>") == this.ckeditorContent.length - 7) {
          this.ckeditorContent = this.ckeditorContent.substring(3, this.ckeditorContent.lastIndexOf("<img"));
          // Deleting an Image : TODO at cursor position
        } else {
          if (parseFloat(this.rowPos) > 0 && parseFloat(this.colPos) == 0 && this.position != "∞") {
            this.ckeditorContent = this.ckeditorContent.substring(0, parseFloat(this.rowPos) - 1) + this.ckeditorContent.substring(parseFloat(this.rowPos) + 1, this.ckeditorContent.length);
            this.deletePressed = true;
          } else if (parseFloat(this.rowPos) > 0 && parseFloat(this.colPos) > 0 && this.position != "∞") {
            // Line-break encountered and this has to be handled separately
            let splitContent = this.ckeditorContent.split("<br />");
            let content = "";
            if (splitContent && splitContent.length > 0) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == parseInt(this.colPos))
                  content = splitContent[i] + splitContent[i].substring(0, parseFloat(this.rowPos) - 1) + splitContent[i].substring(parseFloat(this.rowPos) + 1, splitContent[i].length);
                else
                  content = splitContent[i]; 
              }
              this.ckeditorContent = content;
              this.deletePressed = true;
            } else {
              this.ckeditorContent = this.ckeditorContent.slice(0, this.ckeditorContent.length - 1);
              this.deletePressed = false;
              this.mouseclickEvent = null;
            }
          } else if (this.position == "∞") {
            this.ckeditorContent = this.ckeditorContent.slice(0, this.ckeditorContent.length - 1);
            this.deletePressed = false;
            this.mouseclickEvent = null;
          }
        }
        this.sessionManager.setSessionSavingOfContent(this.ckeditorContent);
        this.fullmodeCkEditor.instance.setData(this.ckeditorContent);
      } else if (action === "left") {
        // Move the cursor position one left of current character focus
        this.leftArrowKeyPressed = true;
        if (this.leftArrowEvent) {
          /* keyCode - 37 */
          this.fullmodeCkEditor.instance.fire('key', this.leftArrowEvent.data);
        } else {
          this._snackBar.open(this.translateForSnackBar[9], this.translateForSnackBar[0], {
            duration: 3000,
          });
        }
      } else if (action === "top") { 
        // Move the cursor position one top of current character focus
        this.upArrowKeyPressed = true;
        if (this.upArrowEvent) {
          /* keyCode - 38 */
          this.fullmodeCkEditor.instance.fire('key', this.upArrowEvent.data);
        } else {
          this._snackBar.open(this.translateForSnackBar[10], this.translateForSnackBar[0], {
            duration: 3000,
          });
        }
      } else if (action === "right") {
        // Move the cursor position one right of current character focus
        this.rightArrowKeyPressed = true;
        if (this.rightArrowEvent) {
          /* keyCode - 39 */
          this.fullmodeCkEditor.instance.fire('key', this.rightArrowEvent.data);
        } else {
          this._snackBar.open(this.translateForSnackBar[11], this.translateForSnackBar[0], {
            duration: 3000,
          });
        }
      } else if (action === "bottom") {
        // Move the cursor position one bottom of current character focus
        this.downArrowKeyPressed = true;
        if (this.downArrowEvent) {
          /* keyCode - 40 */
          this.fullmodeCkEditor.instance.fire('key', this.downArrowEvent.data);
        } else {
          this._snackBar.open(this.translateForSnackBar[12], this.translateForSnackBar[0], {
            duration: 3000,
          });
        }
      } else if (action === "control") {
        this._snackBar.open(this.translateForSnackBar[6], this.translateForSnackBar[0], {
          duration: 3000,
        });
      } else if (action === "contextmenu") {
        // Open Context Menu at position of cursor 
        if (this.menuShowEvent) {
          this.menuKeyPressed = true;
          this.fullmodeCkEditor.instance.fire('menuShow', this.menuShowEvent.data);
        } else {
          this._snackBar.open(this.translateForSnackBar[8], this.translateForSnackBar[0], {
            duration: 3000,
          });
        }
      } else if (action != undefined && action.includes("/")) {
        // action contains an image that needs to be rendered
        if (action.indexOf("class") == -1)
          this.ckeditorContent = this.ckeditorContent + "<img width='20px' height='20px' src='" + action + "' alt='Image for " + action.split("/")[3] + " " + action.split("/")[4] + "'/> ";
        else 
          this.ckeditorContent = this.ckeditorContent + "<div width='20px' height='20px' class='icon icon-" + action.split("/")[1] + "'></div>";
        this.sessionManager.setSessionSavingOfContent(this.ckeditorContent);
        setTimeout(() => {
          this.fullmodeCkEditor.instance.setData(this.sessionManager.getSessionSavedContent());
        }, 100);
      }
    });

    this.sessionManager.itemSessionURL.subscribe((url_code) => {
      if (this.fullmodeCkEditor) {
        this.fullmodeCkEditor.instance.config.contentsLangDirection = (this.rtlLocales.indexOf(url_code) !== -1)? 'rtl' : 'ltr';
      }
      this.ckEditorConfiguration.contentsLangDirection = (this.rtlLocales.indexOf(this.sessionManager.getFromSessionURL()) !== -1)? 'rtl' : 'ltr';
      if(this.fonts.indexOf(url_code) > -1) {
        this.bindFontSource(this.fontsSourcesCSS[this.fonts.indexOf(url_code)]);
      }
    });

    this.sessionManager.itemUILocale.subscribe((iso_code) => {
      let isoCode = iso_code;
      if (iso_code.length == 4)
        isoCode = [iso_code.slice(0, 2), "-", iso_code.slice(2)].join('');
      if (this.keyboardLayouts[iso_code] && this.supportedCDKEditorLocales.indexOf(isoCode) > -1) {
        this.fullmodeCkEditor.instance.config.language = isoCode;
        this.fullmodeCkEditor.instance.config.defaultLanguage = isoCode;
      } else if (this.keyboardLayouts[iso_code] && this.supportedCDKEditorLocales.indexOf(iso_code) > -1) {
        this.fullmodeCkEditor.instance.config.language = iso_code;
        this.fullmodeCkEditor.instance.config.defaultLanguage = iso_code;
      }
    });

    this.sessionManager.switchTypingDirection.subscribe((value) => {
      if (value == 'rtl') {
        if (this.fullmodeCkEditor)
          this.fullmodeCkEditor.instance.config.contentsLangDirection = 'rtl';
        this.ckEditorConfiguration.contentsLangDirection = 'rtl';
      } else if (value == 'ltr') {
        if (this.fullmodeCkEditor)
          this.fullmodeCkEditor.instance.config.contentsLangDirection = 'ltr';
        this.ckEditorConfiguration.contentsLangDirection = 'ltr';
      }
    });

    this.sessionManager.renderBiDi.subscribe((scriptBoustrophedon)=>{
      if (this.boustrophedonScripts.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
        let content = this.fullmodeCkEditor.instance.getData();
        // element is 'p' or 'div' or 'span' : Character insert at cursor position
        // TODO - Multi scripts within 'p' or 'div' or 'span' then only render bi-di for explicitly detected scripts alone
        let renderBiDiContent = "";
        if (content.indexOf("<p>") > -1) {
          let splitContent = content.split("</p>");
          if (scriptBoustrophedon == false) {
            for (let i = 0; i < splitContent.length; i++) {
              if (i == (splitContent.length - 2)) {
                renderBiDiContent = renderBiDiContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='direction: rtl;unicode-bidi: bidi-override;transform: " + ((this.fullmodeCkEditor.instance.config.contentsLangDirection == 'ltr')? "none" : "scaleX(-1)") + ";'>");
              } else
                renderBiDiContent = renderBiDiContent + splitContent[i];
            }
          } else if (scriptBoustrophedon == true) {
            for (let i = 0; i < splitContent.length; i++) {
              if (i == (splitContent.length - 2)) {
                renderBiDiContent = renderBiDiContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='direction: ltr;unicode-bidi: bidi-override;transform: " + ((this.fullmodeCkEditor.instance.config.contentsLangDirection == 'rtl')? "scaleX(-1)" : "none") + "'>");
              } else
                renderBiDiContent = renderBiDiContent + splitContent[i];
            }
          }
        } else {
          renderBiDiContent = content;
        }
        if (renderBiDiContent != "") {
          this.ckeditorContent = renderBiDiContent;
          this.sessionManager.setSessionSavingOfContent(renderBiDiContent);
          this.fullmodeCkEditor.instance.setData(renderBiDiContent);
        }
      }
    });

    this.sessionManager.typeVertically.subscribe((verticalOrient) => {
      if (this.topToBottomLR.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.topToBottomRL.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.bottomToTopLR.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.bottomToTopRL.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
        let content = this.fullmodeCkEditor.instance.getData();
        // element is 'p' or 'div' or 'span' : Character insert at cursor position
        let textOrientatedContent = "";
        if (content.indexOf("<p>") > -1 && verticalOrient == true) {
          let splitContent = content.split("</p>");
          if (this.topToBottomRL.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
            for (let i = 0; i < splitContent.length; i++) {
              if (i == (splitContent.length - 2))
                textOrientatedContent = textOrientatedContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='writing-mode: vertical-rl; text-orientation: mixed;'>");
              else
                textOrientatedContent = textOrientatedContent + splitContent[i];
            }
          } else if (this.topToBottomLR.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
            for (let i = 0; i < splitContent.length; i++) {
              if (i == (splitContent.length - 2))
                textOrientatedContent = textOrientatedContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='writing-mode: vertical-lr; text-orientation: mixed;'>");
              else
                textOrientatedContent = textOrientatedContent + splitContent[i];
            }
          } else if (this.bottomToTopLR.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
            for (let i = 0; i < splitContent.length; i++) {
              if (i == (splitContent.length - 2))
                textOrientatedContent = textOrientatedContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='writing-mode: vertical-lr; text-orientation: mixed;transform:rotate(-180deg)'>");
              else
                textOrientatedContent = textOrientatedContent + splitContent[i];
            }
          } else if (this.bottomToTopRL.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
            for (let i = 0; i < splitContent.length; i++) {
              if (i == (splitContent.length - 2))
                textOrientatedContent = textOrientatedContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='writing-mode: vertical-rl; text-orientation: mixed;'>");
              else
                textOrientatedContent = textOrientatedContent + splitContent[i];
            }
          }
        } else if (content.indexOf("<p>") > -1 && verticalOrient == false) {
          if (this.topToBottomRL.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.topToBottomLR.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.bottomToTopLR.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.bottomToTopRL.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
            textOrientatedContent = content.replace(/<p>/g, "<p style='writing-mode: vertical-lr; text-orientation: upright;'>");
          }
        } else {
          textOrientatedContent = content;
        }
        if (textOrientatedContent != "") {
          this.ckeditorContent = textOrientatedContent;
          this.sessionManager.setSessionSavingOfContent(textOrientatedContent);
          this.fullmodeCkEditor.instance.setData(textOrientatedContent);
        }
      }
    });
  }

  async translateSnackBars() {
    let translateSet = ["OK", "Shift Key Pressed", "Shift Key is Clicked", "Shift Key is Unclicked", "AltGr Key is Clicked", "AltGr Key is Unclicked", "Control Key Pressed", "AltGr Key Pressed", "Right-Click with Mouse for Mapping", "Press ← Arrow on Keyboard for Mapping", "Press ↑ Arrow on Keyboard for Mapping", "Press → Arrow on Keyboard for Mapping", "Press ↓ Arrow on Keyboard for Mapping", "Selected Text Cut", "All Text Selected", "Undo Action", "Selected Text Copied", "Open New Document", "Paste Selelected Text"];
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

  positionCalculator(): any {
    /* Cursor position Row-Column Mapping    
      0,0 ~ clientX=15, clientY=20
      clientY + 17 : row+ <move top or bottom - br/>
      Should be based on Unicode character size : https://en.wikipedia.org/wiki/List_of_Unicode_characters
    */
    let spacePerChar = 7;
    if (this.sessionManager.getFromSessionURL() == "thaa")
      spacePerChar = 5;
    else if (this.sessionManager.getFromSessionURL() == "el" || this.sessionManager.getFromSessionURL() == "ru" || this.sessionManager.getFromSessionURL() == "uk")
      spacePerChar = 8;
    else if (this.swaraAbugidaType.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
      spacePerChar = 10;
      if (this.sessionManager.getFromSessionURL() == "ta" || this.sessionManager.getFromSessionURL() == "ml" || this.sessionManager.getFromSessionURL() == "sylo")
        spacePerChar = 12;
      else if (this.sessionManager.getFromSessionURL() == "bali" || this.sessionManager.getFromSessionURL() == "jv")
        spacePerChar = 14;
    } else if (this.sessionManager.getFromSessionURL() == "zhcn" || this.sessionManager.getFromSessionURL() == "zhtw" || this.sessionManager.getFromSessionURL() == "ko" || this.sessionManager.getFromSessionURL() == "ja")
      spacePerChar = 11;
    else if (this.imageAlternativeScript.indexOf(this.sessionManager.getFromSessionURL()) > -1)
      spacePerChar = 20;    
    
    if (this.mouseclickEvent) {
      let clientX = (this.rtlLocales.indexOf(this.sessionManager.getFromSessionURL()) > -1) ? document.body.clientWidth - this.mouseclickEvent.data["$"].clientX : this.mouseclickEvent.data["$"].clientX, clientY = this.mouseclickEvent.data["$"].clientY, returnX = -1, returnY = -1, x=15, y=20;
      while(x <= clientX) {
        if ((x + spacePerChar) <= clientX) {
          returnX = returnX + 1;
          x = x + spacePerChar; // Traversing Column one character at a time
        } else {
          returnX = returnX + 1;
          x = x + spacePerChar;
        }
      }
      while(y <= clientY) {
        if ((y + 17) <= clientY) {
          returnY = returnY + 1;
          y = y + 17; // Traversing Row one line-break at a time
        } else {
          returnY = returnY + 1;
          y = y + 17;
        }
      }
      return `${returnX},${returnY}`;
    } else {
      return "∞";   // End of Text 
    }
  }

  onEditorReady(event : any) {
    setTimeout(() => { 
      event.editor.focus();
      var range = event.editor.createRange();
      if (range) {
        range.moveToPosition( range.root, 2 );
        if (event.editor.getSelection())
          event.editor.getSelection().selectRanges( [ range ] );  
      }
    }, 1000);
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

    if (this.sessionManager.getFromSessionURL() == "la") 
      return "·";
    else if (this.sessionManager.getFromSessionURL() == "geez")
      return "፡";
    else if (this.noSeparator.indexOf(this.sessionManager.getFromSessionURL()) > -1)
      return "";
    else if (this.visualSeparator.indexOf(this.sessionManager.getFromSessionURL()) > -1)
      return "\u2009";
    else if (this.syllabicSeparator.indexOf(this.sessionManager.getFromSessionURL()) > -1)
      return " ";
    else if (this.zeroWidthSeparator.indexOf(this.sessionManager.getFromSessionURL()) > -1)
      return "\u202F";
    else
      return " ";
  }

  // Indus & other Unicode v39 Script ./*.css
  bindFontSource(file): void {
    const isBrowserTabInView = () => document.hidden;
    if (isBrowserTabInView()) {
      let cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.type = "text/html"; 
      cssLink.href = "./" + file + ".css"; 

      setTimeout(() => {
        document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].ownerDocument.head.appendChild(cssLink);
        //document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].ownerDocument.head.ownerDocument.children[0].children[0].appendChild(cssLink);
      }, 5000);
    }
  }
}