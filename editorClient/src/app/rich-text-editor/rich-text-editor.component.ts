import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as ClassicEditor from 'ckeditor4-angular';
//import { CKEditor4, CKEditorModule } from 'ckeditor4-angular';
import { CKEditorModule } from 'ng2-ckeditor';

import { SessionManagerService } from '../core/services/session-manager.service';

import CKEditorWebpackPlugin from '@ckeditor/ckeditor5-dev-webpack-plugin';

import * as allLayoutPositions from './../../assets/keyboard-layouts/keysboards-layouts.json';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit, AfterViewInit {

  @ViewChild('ckeditorFull', { static: false }) fullmodeCkEditor: ElementRef;

  keyboardLayouts: any = (allLayoutPositions as any).default;

  // TODO - https://gist.github.com/FluffierThanThou/62dbae7426c4c5930880b6ca8eb625a9

  //public Editor = ClassicEditor;
  ckeditorContent: String = "<p>Fun Editor's World!</p>";

  //plugins: [{language : {ui: 'de', content: 'ar'}, additionalLanguages: 'all',}] = CKEditorWebpackPlugin;

  ckEditorConfiguration = {
      toolbarGroups: [],
      language: '',
      language_list: [''],
      contentsLanguage: '',
      contentsLangDirection: ''
      //skin: 'ckeditor-dark-biskrem'
      //height: 'auto'
  };

  constructor(private sessionManager: SessionManagerService) { 
    // The toolbar groups arrangement, optimized for two toolbar rows.
    this.ckEditorConfiguration.toolbarGroups = [
      { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
      { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
      { name: 'links' },
      { name: 'insert' },
      { name: 'forms' },
      { name: 'tools' },
      { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
      { name: 'others' },
      '/',
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
      { name: 'styles' },
      { name: 'colors' },
      { name: 'about' }
    ];

    if (this.sessionManager.getSessionSavedContent()) {
      // TODO prepare Dialog to load or not ?
      this.ckeditorContent = this.sessionManager.getSessionSavedContent();
    } else {
      // TODO Do user want to save 'Content' to their browser session?
    }
  }

  ngOnInit(): void {
    this.sessionManager.itemUILocale.subscribe((localeCode) => {
      // Destory ? if RTL
      let rtlLocales = ['ar', 'he', 'ur', 'fa', 'syrc', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ku', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'pal', 'xpr', 'xsa', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf'];
      this.ckEditorConfiguration.contentsLangDirection = (rtlLocales.indexOf(localeCode.split('-')[0]) !== -1)? 'rtl' : 'ltr';
      this.ckEditorConfiguration.language = localeCode;
      if (this.keyboardLayouts[localeCode])
        this.ckEditorConfiguration.language_list[0] = '' + this.keyboardLayouts[localeCode] + ':' + this.keyboardLayouts[localeCode][2] + ':' + (rtlLocales.indexOf(localeCode.split('-')[0]) !== -1)? 'rtl' : 'ltr';
    });
  }

  ngAfterViewInit(): void {
    this.sessionManager.itemKeyCharacter.subscribe((character) => {
      /*const selection = this.fullmodeCkEditor.editorInstance.model.document.selection;
      const range = selection.getFirstRange();
      this.fullmodeCkEditor.editorInstance.model.change(writer => {
        writer.insert(character, range.start);
      });*/

      this.ckeditorContent += character;
      this.sessionManager.setSessionSavingOfContent(this.ckeditorContent);

      /*if (this.sessionManager.itemElement && document.selection) {
        //IE support
        document.getElementById("ckeditorFull").focus();
        var selection = this.sessionManager.itemElement.selection.createRange();
        selection.text = character;
        document.getElementById("ckeditorFull").focus();
      } else if (document.getElementById("ckeditorFull").selectionStart || document.getElementById("ckeditorFull").selectionStart === 0) {
        //MOZILLA and others
        var startPos = document.getElementById("ckeditorFull").selectionStart;
        var endPos = document.getElementById("ckeditorFull").selectionEnd;
        var scrollTop = document.getElementById("ckeditorFull").scrollTop;
        
        if(this.sessionManager.itemKeyAction.value === 'del'){
            if(startPos === endPos){
              document.getElementById("ckeditorFull").value = document.getElementById("ckeditorFull").value.substring(0, startPos-1) + document.getElementById("ckeditorFull").value.substring(endPos, document.getElementById("ckeditorFull").value.length);
              document.getElementById("ckeditorFull").focus(); 
              document.getElementById("ckeditorFull").selectionStart = startPos - 1;
              document.getElementById("ckeditorFull").selectionEnd = startPos - 1;
            }
            else{
              document.getElementById("ckeditorFull").value = document.getElementById("ckeditorFull").value.substring(0, startPos) + document.getElementById("ckeditorFull").value.substring(endPos, document.getElementById("ckeditorFull").value.length);
              document.getElementById("ckeditorFull").focus();
              document.getElementById("ckeditorFull").selectionStart = startPos;
              document.getElementById("ckeditorFull").selectionEnd = startPos;
            }

            document.getElementById("ckeditorFull").scrollTop = scrollTop;
          } else{
            document.getElementById("ckeditorFull").value = document.getElementById("ckeditorFull").value.substring(0, startPos) + character + document.getElementById("ckeditorFull").value.substring(endPos, document.getElementById("ckeditorFull").value.length);
            document.getElementById("ckeditorFull").focus();
            document.getElementById("ckeditorFull").selectionStart = startPos + character.length;
            document.getElementById("ckeditorFull").selectionEnd = startPos + character.length;
            document.getElementById("ckeditorFull").scrollTop = scrollTop;
          }
      } else {
        document.getElementById("ckeditorFull").value += character;
        document.getElementById("ckeditorFull").focus();
      }*/
    });
    this.sessionManager.itemKeyAction.subscribe((action) => {
      // Do what based on type of Action

    });
    this.sessionManager.itemSessionURL.subscribe((newURL) => {
      // Destory ? if RTL
      let rtlLocales = ['ar', 'he', 'ur', 'fa', 'syrc', 'sd', 'bal', 'bsk', 'yi', 'jrb', 'ps', 'ku', 'ks', 'ett', 'avst', 'khar', 'phn', 'xpu', 'samr', 'mand', 'sog', 'arc', 'pal', 'xpr', 'xsa', 'nkoo', 'thaa', 'orkh', 'lydi', 'adlm', 'ajam', 'wolf'];
      this.ckEditorConfiguration.contentsLangDirection = (rtlLocales.indexOf(newURL.split('-')[0]) !== -1)? 'rtl' : 'ltr';
      this.ckEditorConfiguration.contentsLanguage = newURL;
      if (this.keyboardLayouts[newURL])
        this.ckEditorConfiguration.language_list[0] = '' + this.keyboardLayouts[newURL] + ':' + this.keyboardLayouts[newURL][2] + ':' + (rtlLocales.indexOf(newURL.split('-')[0]) !== -1)? 'rtl' : 'ltr';
    });
  }

  showChar(e) {
    console.log('what is event ', e);
    if ((e.key == "Shift" && e.keyCode == 16) || (e.key == "CapsLock" && e.keyCode == 20)) {
      if (this.sessionManager.itemShiftKeyPressed.value == false)
        this.sessionManager.setShiftKeyPressed(true);
      else if (this.sessionManager.itemShiftKeyPressed.value == true)
        this.sessionManager.setShiftKeyPressed(false);
    }
  }

}
