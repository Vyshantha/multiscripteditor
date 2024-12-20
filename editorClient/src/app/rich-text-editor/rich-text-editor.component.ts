import { Component, OnInit, AfterViewInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { default as SVAConfig } from './../../assets/environments/sva_config.json';

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
  isMobile: Boolean = window.outerWidth < 500 || (window.outerWidth > 500 && window.outerHeight < 500);
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200 && window.outerHeight > 500;
  keyboardLayouts: any = (allLayoutPositions as any).default;
  layoutCurrentKeys: any = [];

  showEditor : Boolean = true;
  calculatorOnly: Boolean = SVAConfig.calculatorOnly;

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
      contentsCss: '',                                    
      startupFocus: 'end',
      //extraPlugins: ''                                  // Plugins for CKEditor https://ckeditor.com/cke4/presets-all
  };

  mappedSpaceClicked: Boolean = false;
  pasteContentSetToEditor: Boolean = false;
  upArrowKeyPressed: Boolean = false;
  downArrowKeyPressed: Boolean = false;
  rightArrowKeyPressed: Boolean = false;
  leftArrowKeyPressed: Boolean = false;
  menuKeyPressed: Boolean = false;
  deletePressed: Boolean = false;
  charInserted: Boolean = false;
  fireOnce: Boolean = true;
  exploreOnly: Boolean = false;
  noSoftKeyboard: Boolean = false; 
  unicode5AndHigher: Boolean = false;

  // Two letter locales - https://www.transifex.com/ckeditor/ckeditor/
  supportedCDKEditorLocales = ['af','ar','ast','az','bg','bn','bs','ca','ckb','cs','cy','da','de','el','en-au','en-ca','en-gb','eo','es','es-mx','et','eu','fa','fi','fo','fr','fr-ca','gl','gsw','gu','he','hi','hr','hu','id','is','it','ja','ka','km','ko','lt','lu','lv','mk','mn','ms','nb','ne','nl','no','oc','pl','pt','pt-br','ro','ru','si','si-ta','sk','sl','sq','sr','sr-ba','sr-sp','sv','tg','th','ti','tl','tr','tt','ug','uk','uyy','vi','zh','zh-cn','zh-hk','zh-mo','zh-sg','zh-tw'];

  rtlLocales = ['adlm','ajam','ar','arc','avst','bal','ber','bsk','cana','chrs','chun','ckb','cprt','dv','egyd','elym','estr','ett','fa','gars','hatr','he','hung','idu','indus','jawi','jrb','khar','khaz','ks','kuli','kult','lad','lepo','linb','lydi','madn','mand','mani','mend','mer','mero','mnkar','nbat','nkoo','nshu','odu','orkh','ougr','pal','palm','phn','phyg','pice','ps','psal','rhg','rohg','sabe','safa','samr','sd','sert','sina','skr','sog','syrc','thaa','txg','txr','ug','ur','woal','wolf','xpr','xpu','xsa','yezi','yi'];

  boustrophedonScripts: string[] = ['asom','egyd','ett','hung','kmt','lepo','luw','maya','moon','phyg','pice','sabe','safa','sina','txr','wole','xsa'];

  reverseBoustrophedonScripts : string[] = ['avo','rongo'];

  swaraAbugidaType : string [] = ['ahom', 'aima', 'ari', 'bada', 'bali', 'batk', 'bhai', 'bhat', 'bhp', 'bla', 'bn', 'brah', 'bug', 'buhd', 'bya', 'cakm', 'cree', 'dham', 'diak', 'dite', 'dogr', 'dv', 'gong', 'gonm', 'gran', 'gu', 'gup', 'hano', 'hi', 'jv', 'kali', 'kawi', 'khar', 'khoj', 'khor', 'khud', 'km', 'kn', 'koch', 'kru', 'kthi', 'kuli', 'lana', 'leke', 'lepc', 'limb', 'lo', 'loma', 'maga', 'maha', 'mai', 'mani', 'mguj', 'ml', 'mni', 'modi', 'mr', 'mult', 'my', 'nand', 'newa', 'or', 'pa', 'phag', 'renc', 'rjng', 'sa', 'saur', 'scha', 'shan', 'shrd', 'si', 'sidd', 'snd', 'sora', 'soyo', 'sund', 'sylo', 'ta', 'tach', 'tagb', 'takr', 'talu', 'tamu', 'tang', 'te', 'tglg', 'th', 'thaa', 'tibt', 'tiga', 'tika', 'tirh', 'toch', 'zanb'];

  imageAlternativeScript: string[] = ['adin', 'aima', 'ary', 'avst', 'avo', 'aztc', 'bada', 'banzsl', 'ber', 'bhat', 'bhp', 'bya', 'cana', 'cans', 'chik', 'chis', 'coorg', 'dale', 'desisign', 'dham', 'dhan', 'diak', 'dite', 'egyd', 'esi', 'esk', 'estr', 'esy', 'flag', 'gael', 'gars', 'geba', 'goyk', 'gup', 'iba', 'ibe', 'ics', 'indus', 'ion', 'ipk', 'jiag', 'kada', 'kaid', 'kama', 'kawi', 'khat', 'khom', 'khor', 'kitl', 'kits', 'koch', 'kpe', 'kru', 'kthi', 'kuli', 'lad', 'land', 'leke', 'loma', 'luo', 'madn', 'maga', 'mamb', 'maya', 'mguj', 'mikq', 'moon', 'mwan', 'nagm', 'nand', 'ndju', 'nsi', 'orkh', 'pall', 'ranj', 'renc', 'runr', 'sabe', 'safa', 'scha', 'sert', 'sina', 'suz', 'tach', 'tamu', 'tang', 'tdd', 'tani', 'tiga', 'tika', 'tnq', 'toch', 'toto', 'txr', 'umw', 'ussign', 'vatt', 'vith', 'wole', 'wolf', 'xce', 'zou'];

  // Keyboard Mapping Template based on https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system
  keyCodeMap = [{"Backquote": ["0", "0"], "Digit1": ["1", "0"], "Digit2": ["2", "0"], "Digit3": ["3", "0"], "Digit4": ["4", "0"], "Digit5": ["5", "0"], "Digit6": ["6", "0"], "Digit7": ["7", "0"], "Digit8": ["8", "0"], "Digit9": ["9", "0"], "Digit0": ["10", "0"], "Minus": ["11", "0"], "Equal": ["12", "0"], "IntlYen": ["13", "0"], "Backspace": ["14", "0"], "Tab": ["0", "1"], "KeyQ": ["1", "1"], "KeyW": ["2", "1"], "KeyE": ["3", "1"], "KeyR": ["4", "1"], "KeyT": ["5", "1"], "KeyY": ["6", "1"], "KeyU": ["7", "1"], "KeyI": ["8", "1"], "KeyO": ["9", "1"], "KeyP": ["10", "1"], "BracketLeft": ["11", "1"], "BracketRight": ["12", "1"], "Backslash": ["13", "1"], "CapsLock": ["-1", "2"], "KeyA": ["0", "2"], "KeyS": ["1", "2"], "KeyD": ["2", "2"], "KeyF": ["3", "2"], "KeyG": ["4", "2"], "KeyH": ["5", "2"], "KeyJ": ["6", "2"], "KeyK": ["7", "2"], "KeyL": ["8", "2"], "Semicolon": ["9", "2"], "Quote": ["10", "2"], "Back slash": ["11", "2"], "Enter": ["12", "2"], "ShiftLeft": ["0", "3"], "IntlBackslash": ["0", "3"], "KeyZ": ["1", "3"], "KeyX": ["2", "3"], "KeyC": ["3", "3"], "KeyV": ["4", "3"], "KeyB": ["5", "3"], "KeyN": ["6", "3"], "KeyM": ["7", "3"], "Comma": ["8", "3"], "Period": ["9", "3"], "Slash": ["10", "3"], "ShiftRight": ["0", "3"], "ControlLeft": ["0", "4"], "AltLeft": ["1", "4"], "Space": ["2", "4"], "ArrowLeft": ["5", "4"], "ArrowUp": ["6", "4"], "ArrowRight": ["7", "4"], "ArrowDown": ["8", "4"], "AltRight": ["1", "4"], "ControlRight": ["0", "4"]}];

  diphthongsMappingOduduwa : string[] = ["diba","die̱","dilo̱","dio̱","dire","diu","diwu","eba","ee̱","elo̱","eo̱","ere","eu","ewu","huba","hue̱","hulo̱","huo̱","hure","huu","huwu","iba","ie̱","ilo̱","io̱","ire","iu","iwu","miba","mie̱","milo̱","mio̱","mire","miu","miwu","niba","nie̱","nilo̱","nio̱","nire","niu","niwu","oba","oe̱","olo̱","oo̱","ore","ou","owu","´a","`a","´e","`e","´e̱","`e̱","´i","`i","´mi","`mi","´ni","`ni","´o","`o","´o̱","`o̱","´u","`u","`eba","`ee̱","`elo̱","`eo̱","`ere","`eu","`ewu","´e´e̱","´e´o̱","´e´u","´e´wu","´eba","´ee̱","´elo̱","´eo̱","´ere","´eu","´ewu","´oba","´oe̱","´olo̱","´oo̱","´ore","´ou","´owu","`oba","`oe̱","`olo̱","`oo̱","`ore","`ou","`owu","e´e̱","e´o̱","e´u","e´wu","di`e̱","di`o̱","di`u","di`wu","e`e̱","e`o̱","e`u","e`wu","`e´e̱","`e´o̱","`e´u","`e´wu","`o´e̱","`o´o̱","`o´u","`o´wu","´o`e̱","´o`o̱","´o`u","´o`wu","o`e̱","o`o̱","o`u","o`wu","´o´e̱","´o´o̱","´o´u","´o´wu","o´e̱","o´o̱","o´u","o´wu","`mi`e̱","`mi`o̱","`mi`u","`mi`wu","`mi´e̱","`mi´o̱","`mi´u","`mi´wu","`miba","`mie̱","`milo̱","`mio̱","`mire","`miu","`miwu","´mi`e̱","´mi`o̱","´mi`u","´mi`wu","´mi´e̱","´mi´o̱","´mi´u","´mi´wu","´miba","´mie̱","´milo̱","´mio̱","´mire","´miu","´miwu","mi`e̱","mi`o̱","mi`u","mi`wu","mi´e̱","mi´o̱","mi´u","mi´wu","`ni`e̱","`ni`o̱","`ni`u","`ni`wu","`ni´e̱","`ni´o̱","`ni´u","`ni´wu","`niba","`nie̱","`nilo̱","`nio̱","`nire","`niu","`niwu","´ni´e̱","´ni´o̱","´ni´u","´ni´wu","´niba","´nie̱","´nilo̱","´nio̱","´nire","´niu","´niwu","ni`e̱","ni`o̱","ni`u","ni`wu","ni´e̱","ni´o̱","ni´u","ni´wu","`i`e̱","`i`o̱","`i`u","`i`wu","`i´e̱","`i´o̱","`i´u","`i´wu","`iba","`ie̱","`ilo̱","`io̱","`ire","`iu","`iwu","´i`e̱","´i`o̱","´i`u","´i`wu","´i´e̱","´i´o̱","´i´u","´i´wu","´iba","´ie̱","´ilo̱","´io̱","´ire","´iu","´iwu","i`e̱","i`o̱","i`u","i`wu","i´e̱","i´o̱","i´u","i´wu","`o`e̱","`o`o̱","`o`u","`o`wu","´e`e̱","´e`o̱","´e`u","´e`wu","di´e̱","hu`e̱","hu`o̱","hu`u","hu`wu","hu´e̱","hu´o̱","hu´u","hu´wu","di´o̱","di´u","di´wu"];

  topToBottomLR: string[] = ['evn','galk','ja','ko','mnc','mon','oira','phag','shui','sog','soyo','zhcn','zhtw'];
  topToBottomRL: string[] = ['chun','idu','ja','ko','kuli','mero','nshu','ougr','txg','yii','zhcn','zhtw'];
  bottomToTopLR: string[] = ['btk','hano','ogam','tagb'];
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

  previousTypedKey =  "";
  possibleCombine = "";

  position: any = "∞";
  rowPos: any;
  colPos: any;
  FOCUS_TIMEOUT : number = 100;
  POPUP_TIMEOUT : number = 100;
  SHOW_POPUP_TIMEOUT : number = 1000;
  INITIAL_LOAD_TIMEOUT : number = 1000;

  translateForSnackBar: string[] = [];

  fontFamily: any = {
    "ari" : ["@font-face {font-family: 'Ariyaka';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/ariyaka/files/ARIYAKA.woff') format('woff')} body {font-family: 'Ariyaka'}"],
    "chrs" : ["@font-face {font-family: 'Noto Sans Chorasmian';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-chorasmian/files/NotoSansChorasmian-Regular.woff') format('woff')} body {font-family: 'Noto Sans Chorasmian'}"],
    "dogr": ["@font-face {font-family: 'Noto Serif Dogra';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-serif-dogra/files/noto-serif-dogra-dogra-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-serif-dogra/files/noto-serif-dogra-dogra-400-normal.woff') format('woff');} body {font-family: 'Noto Serif Dogra'}"],
    "elym": ["@font-face {font-family: 'Noto Sans Elymaic';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-elymaic/files/noto-sans-elymaic-elymaic-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-sans-elymaic/files/noto-sans-elymaic-elymaic-400-normal.woff') format('woff');} body {font-family: 'Noto Sans Elymaic'}"],
    "gonm": ["@font-face {font-family: 'Noto Sans Masaram Gondi';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-masaram-gondi/files/noto-sans-masaram-gondi-masaram-gondi-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-sans-masaram-gondi/files/noto-sans-masaram-gondi-masaram-gondi-400-normal.woff') format('woff');} body {font-family: 'Noto Sans Masaram Gondi'}"],
    "gong": ["@font-face {font-family: 'Noto Sans Gunjala Gondi';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-gunjala-gondi/files/noto-sans-gunjala-gondi-gunjala-gondi-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-sans-gunjala-gondi/files/noto-sans-gunjala-gondi-gunjala-gondi-400-normal.woff') format('woff');} body {font-family: 'Noto Sans Gunjala Gondi'}"],
    "hmnp": ["@font-face {font-family: 'Noto Serif Nyiakeng Puachue Hmong';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-serif-nyiakeng-puachue-hmong/files/noto-serif-nyiakeng-puachue-hmong-nyiakeng-puachue-hmong-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-serif-nyiakeng-puachue-hmong/files/noto-serif-nyiakeng-puachue-hmong-nyiakeng-puachue-hmong-400-normal.woff') format('woff');} body {font-family: 'Noto Serif Nyiakeng Puachue Hmong'}"],
    "indus": ["@font-face {font-family: 'indus-script'; src:url('./../../assets/font-families/indus-script/IS/indus-script.eot');src:url('./../../assets/font-families/indus-script/IS/indus-script.eot?#iefix') format('embedded-opentype'),url('./../../assets/font-families/indus-script/IS/indus-script.woff') format('woff'),url('./../../assets/font-families/indus-script/IS/indus-script.ttf') format('truetype'),url('./../../assets/font-families/indus-script/IS/indus-script.svg#indus-script') format('svg');font-weight: normal;font-style: normal;} body {font-family: 'indus-script'}"],
    "khar" : ["@font-face {font-family: 'Noto Sans Kharoshthi';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-kharoshthi/files/NotoSansKharoshthi-Regular.woff') format('woff')} body {font-family: 'Noto Sans Kharoshthi'}"],
    "khud" : ["@font-face {font-family: 'Noto Sans Khudawadi';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-khudawadi/files/NotoSansKhudawadi-Regular.woff') format('woff')} body {font-family: 'Noto Sans Khudawadi'}"],
    "kult": ["@font-face {font-family: 'Noto Sans Old Sogdian';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-old-sogdian/files/noto-sans-old-sogdian-old-sogdian-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-sans-old-sogdian/files/noto-sans-old-sogdian-old-sogdian-400-normal.woff') format('woff');} body {font-family: 'Noto Sans Old Sogdian'}"],
    "luw" : ["@font-face {font-family: 'Noto Sans Anatolian Hieroglyphs';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-anatolian-hieroglyphs/files/NotoSansAnatolianHieroglyphs-Regular.woff') format('woff')} body {font-family: 'Noto Sans Anatolian Hieroglyphs'}"],
    "maha": ["@font-face {font-family: 'Noto Sans Mahajani';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-mahajani/files/noto-sans-mahajani-mahajani-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-sans-mahajani/files/noto-sans-mahajani-mahaji-400-normal.woff') format('woff');} body {font-family: 'Noto Sans Mahajani'}"],
    "maka" : ["@font-face {font-family: 'Noto Serif Makasar';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-serif-makasar/files/NotoSerifMakasar-Regular.woff') format('woff')} body {font-family: 'Noto Serif Makasar'}"],
    "moss" : ["@font-face {font-family: 'Noto Sans Tangsa';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-tangsa/files/NotoSansTangsa-Regular.woff') format('woff')} body {font-family: 'Noto Sans Tangsa'}"],
    "nand" : ["@font-face {font-family: 'Noto Sans Nandinagari';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-nandinagari/files/NotoSansNandinagari-Regular.woff') format('woff')} body {font-family: 'Noto Sans Nandinagari'}"],
    "nshu": ["@font-face {font-family: 'Noto Sans Nushu';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-nushu/files/noto-sans-nushu-nushu-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-sans-nushu/files/noto-sans-nushu-nushu-400-normal.woff') format('woff');} body {font-family: 'Noto Sans Nushu'}"],
    "odu" : ["@font-face {font-family: 'Aebajiogbe Oduduwa'; font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/aebajiogbe-oduduwa/files/Aebajiogbe_oduduwa_font-Regular.woff') format('woff')} body {font-family: 'Aebajiogbe Oduduwa';font-size: 25px;}"],
    "ougr" : ["@font-face {font-family: 'Noto Serif Old Uyghur';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-serif-old-uyghur/files/NotoSerifOldUyghur-Regular.woff') format('woff')} body {font-family: 'Noto Serif Old Uyghur'}"],
    "runr" : ["@font-face {font-family: 'Noto Sans Runic';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans/files/NotoSansRunic-Regular.woff') format('woff')} body {font-family: 'Noto Sans Runic'}"],
    "sgnw" : ["@font-face {font-family: 'Noto Sans Sign Writing';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-sign-writing/files/NotoSansSignWriting-Regular.woff') format('woff')} body {font-family: 'Noto Sans Sign Writing'}"],
    "sog": ["@font-face {font-family: 'Noto Sans Sogdian';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-sogdian/files/noto-sans-sogdian-sogdian-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-sans-sogdian/files/noto-sans-sogdian-sogdian-400-normal.woff') format('woff')} body {font-family: 'Noto Sans Sogdian'}"],
    "soyo": ["@font-face {font-family: 'Noto Sans Soyombo';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-soyombo/files/noto-sans-soyombo-soyombo-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-sans-soyombo/files/noto-sans-soyombo-soyombo-400-normal.woff') format('woff')} body {font-family: 'Noto Sans Soyombo'}"],
    "txg": ["@font-face {font-family: 'Noto Serif Tangut';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-serif-tangut/files/noto-serif-tangut-tangut-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-serif-tangut/files/noto-serif-tangut-tangut-400-normal.woff') format('woff');} body {font-family: 'Noto Serif Tangut'}"],
    "ur": ["@font-face {font-family: 'Noto Nastaliq Urdu';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-nastaliq-urdu/files/noto-nastaliq-urdu-arabic-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-nastaliq-urdu/files/noto-nastaliq-urdu-arabic-400-normal.woff') format('woff');} body {font-family: 'Noto Nastaliq Urdu'}"],
    "vatt" : ["@font-face {font-family: 'Vatteluttu';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/vatteluttu/files/VatteluttuOT.woff') format('woff')} body {font-family: 'Vatteluttu'}"],
    "yezi": ["@font-face {font-family: 'Noto Serif Yezidi';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-serif-yezidi/files/noto-serif-yezidi-yezidi-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-serif-yezidi/files/noto-serif-yezidi-yezidi-400-normal.woff') format('woff');} body {font-family: 'Noto Serif Yezidi'}"],
    "zag" : ["@font-face {font-family: 'Zaghawa Beria';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/zaghawa-beria/files/ZaghawaBeria.woff') format('woff')} body {font-family: 'Zaghawa Beria'}"],
    "zanb": ["@font-face {font-family: 'Noto Sans Zanabazar Square';font-style: normal;font-display: swap;font-weight: 400;src: url('./../../assets/font-families/noto-sans-zanabazar-square/files/noto-sans-zanabazar-square-zanabazar-square-400-normal.woff2') format('woff2'), url('./../../assets/font-families/noto-sans-zanabazar-square/files/noto-sans-zanabazar-square-zanabazar-square-400-normal.woff') format('woff');} body {font-family: 'Noto Sans Zanabazar Square'}"]
  };

  constructor(private sessionManager: SessionManagerService, private http: HttpClient, private _snackBar: MatSnackBar) { 
    // The toolbar groups arrangement, optimized for two toolbar rows.
    if (this.isMobile && !this.isTablet) {
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
    } else if (!this.isMobile && this.isTablet) {
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
    } else if (!this.isMobile && !this.isTablet) {
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
    
    let URL_Code = (window.location.href.split('/')[3] && window.location.href.split('/')[3] != "") ? window.location.href.split('/')[3] : this.sessionManager.getFromSessionURL();
    this.ckEditorConfiguration.contentsLangDirection = (this.rtlLocales.indexOf(URL_Code) > -1)? 'rtl' : 'ltr';

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

    if (this.imageAlternativeScript.indexOf(this.sessionManager.getFromSessionURL()) != -1) {
      this.unicode5AndHigher = true;
    } else {
      this.unicode5AndHigher = false;
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
      this.showEditor = (!this.calculatorOnly) ? editorOnly : false;
      setTimeout(() => {
        if (editorOnly == true && this.sessionManager.getSessionSavedContent() != null && this.fullmodeCkEditor && this.fullmodeCkEditor.instance) {
          this.ckeditorContent = this.sessionManager.getSessionSavedContent();
          this.fullmodeCkEditor.instance.setData(this.ckeditorContent);
        }
      }, 500);
    });
    this.sessionManager.softKeyboardState.subscribe((value)=>{
      if (this.sessionManager.floatKeyboardState.value == false)
        this.noSoftKeyboard = value;
    });
    if (this.unicode5AndHigher && this.sessionManager.itemQwertyType.value == true)
      this.sessionManager.nonUnicodeScript.next(true);
    else if (this.sessionManager.itemQwertyType.value == true)
      this.sessionManager.nonUnicodeScript.next(false);
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

    this.sessionManager.nonExplorationMode.subscribe((value) => {
      this.exploreOnly = value;
    });

    this.sessionManager.pasteIntegrationOutput.subscribe((value) => {
      this.pasteContentSetToEditor = value;
    });

    var self = this;
    if (this.fullmodeCkEditor && this.fullmodeCkEditor.instance) {
      // On content 'dom' of Editor attach handler for the click event of the document
      this.fullmodeCkEditor.instance.on( 'contentDom', (contentEvent) => {
        contentEvent.editor.editable().on('click', (event) => {
          event = event || window.event;
          self.menuShowEvent = event;
          self.mouseclickEvent = event;
          self.position = self.positionCalculator();
          self.rowPos = self.position.split(",")[0];
          self.colPos = self.position.split(",")[1];
          // TODO - Cursor Position Map Update
          console.log(event);
        });
        const isBrowserTabInView = () => document.hidden;
        if (isBrowserTabInView() && !self.isMobile && !self.isTablet) {
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
          }, self.FOCUS_TIMEOUT);
        }
        // TODO Spacing between non-Unicode letters
        //if (self.unicode5AndHigher && self.fullmodeCkEditor.instance.getData().indexOf("<p>") > -1)
        // self.fullmodeCkEditor.instance.setData(self.fullmodeCkEditor.instance.getData().replace("<p>","<p style='letter-spacing:-5px'>"));
      });

      this.fullmodeCkEditor.instance.on( 'key', ( event ) => {
        // TODO - Cursor Position Map Update
        if (event.data.domEvent["$"].key != "Escape" && self.noSoftKeyboard == false) {
          let controlActionKey = false;
          // Ensure Cursor focus moved back to Editor
          if (event.data.keyCode == 1114129 || event.data.keyCode == 1114336 || event.data.keyCode == 1114203) {
            self.sessionManager.itemCtrlKeyPressed.next(true);
            self._snackBar.open(self.translateForSnackBar[6], "OK", {
              duration: 3000,
            });
          }
          setTimeout(() => {
            event.editor.focus();
            if (self.sessionManager.itemCtrlKeyPressed.value == false && event.data.domEvent["$"].key != "ArrowDown" && self.downArrowKeyPressed == false && event.data.domEvent["$"].key != "ArrowRight" && self.rightArrowKeyPressed == false && event.data.domEvent["$"].key != "ArrowUp" && self.upArrowKeyPressed == false && event.data.domEvent["$"].key != "ArrowLeft" && self.leftArrowKeyPressed == false && !this.isMobile && !this.isTablet) {
              var range = event.editor.createRange();
              if (range) {
                range.moveToPosition( range.root, 2 );
                if (event.editor.getSelection()) 
                  event.editor.getSelection().selectRanges( [ range ] );
              }
            }
          }, self.FOCUS_TIMEOUT);
          if (self.sessionManager.itemCtrlKeyPressed.value == true) {
            // Action to be done after Control
            if (event.data.keyCode == 88 || event.data.keyCode == 1114200) {
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
            } else if (event.data.keyCode == 88 || event.data.keyCode == 1114202) {
              // Ctrl + Z
              self._snackBar.open(self.translateForSnackBar[15], self.translateForSnackBar[0], {
                duration: 3000,
              });
              self.fullmodeCkEditor.instance.fire('undo', event);
              self.sessionManager.itemCtrlKeyPressed.next(false);
              controlActionKey = true;
            } else if (event.data.keyCode == 67 || event.data.keyCode == 1114179) {
              // Ctrl + C
              self._snackBar.open(self.translateForSnackBar[16], self.translateForSnackBar[0], {
                duration: 3000,
              });
              self.fullmodeCkEditor.instance.fire('copy', event);
              self.sessionManager.itemCtrlKeyPressed.next(false);
              controlActionKey = true;
            } else if (event.data.keyCode == 78 || event.data.keyCode == 1114190) {
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
                if (self.sessionManager.itemShiftKeyPressed.value == false && ((self.sessionManager.itemAltGrKeyPressed.value == true && self.sessionManager.itemAltGrCapsExists.value == true) || (self.sessionManager.itemAltGrKeyPressed.value == false && self.sessionManager.itemAltGrCapsExists.value == true) || (self.sessionManager.itemAltGrKeyPressed.value == false && self.sessionManager.itemAltGrCapsExists.value == false))) {
                  setTimeout(() => {
                    self.sessionManager.setShiftKeyPressed(true);
                    self._snackBar.open(self.translateForSnackBar[2], self.translateForSnackBar[0], {
                      duration: self.SHOW_POPUP_TIMEOUT,
                      horizontalPosition: self.horizontalPosition,
                      verticalPosition: self.verticalPosition,
                    });
                  }, self.POPUP_TIMEOUT);
                } else if (self.sessionManager.itemShiftKeyPressed.value == true) {
                  setTimeout(() => {
                    self.sessionManager.setShiftKeyPressed(false);
                    self._snackBar.open(self.translateForSnackBar[3], self.translateForSnackBar[0], {
                      duration: self.SHOW_POPUP_TIMEOUT,
                      horizontalPosition: self.horizontalPosition,
                      verticalPosition: self.verticalPosition,
                    });
                  }, self.POPUP_TIMEOUT);
                }
                self.sessionManager.nonUnicodeScript.next(false);
                // Blur and Focus invent to change Shift layout for Keyboard
                self.fullmodeCkEditor.instance.focusManager.blur(true);
              }
              if ((event.data.domEvent["$"].key == "Alt" || event.data.domEvent["$"].key == "AltGraph" || event.data.domEvent["$"].key == "AltGr") && event.data.keyCode == 4456466 && self.layoutCurrentKeys.some(x => x.hasOwnProperty('altGr'))) {
                if (self.sessionManager.itemAltGrKeyPressed.value == false && self.sessionManager.itemShiftKeyPressed.value == false && self.sessionManager.itemAltGrCapsExists.value == true) {
                  setTimeout(() => {
                    self.sessionManager.setAltGrKeyPressed(true);
                    self._snackBar.open(self.translateForSnackBar[4], self.translateForSnackBar[0], {
                      duration: self.SHOW_POPUP_TIMEOUT,
                      horizontalPosition: self.horizontalPosition,
                      verticalPosition: self.verticalPosition,
                    });
                  }, self.POPUP_TIMEOUT);
                } else if (self.sessionManager.itemAltGrKeyPressed.value == true) {
                  setTimeout(() => {
                    self.sessionManager.setAltGrKeyPressed(false);
                    self._snackBar.open(self.translateForSnackBar[5], self.translateForSnackBar[0], {
                      duration: self.SHOW_POPUP_TIMEOUT,
                      horizontalPosition: self.horizontalPosition,
                      verticalPosition: self.verticalPosition,
                    });
                  }, self.POPUP_TIMEOUT);
                }
                // Blur and Focus invent to change Shift layout for Keyboard
                self.fullmodeCkEditor.instance.focusManager.blur(true);
              }
              if (event.data.domEvent["$"].key != "Meta" && event.data.domEvent["$"].key != "Shift" && event.data.domEvent["$"].key != "CapsLock" && event.data.domEvent["$"].key != "Alt" && event.data.domEvent["$"].key != "AltGraph" && event.data.domEvent["$"].key != "AltGr" && event.data.domEvent["$"].key != "Tab" && event.data.domEvent["$"].key != "Backspace" && event.data.domEvent["$"].key != "Enter" && event.data.domEvent["$"].key != "Control" && event.data.domEvent["$"].key != "ArrowLeft" && event.data.domEvent["$"].key != "ArrowUp" && event.data.domEvent["$"].key != "ArrowRight" && event.data.domEvent["$"].key != "ArrowDown" && event.data.domEvent["$"].key != " " && event.data.domEvent["$"].key != "Unidentified") {
                let rowForSoftKey = 0, columnForSoftKey = 0;
                if (self.keyCodeMap[0][event.data.domEvent["$"].code] && self.sessionManager.itemQwertyType.value == true && self.sessionManager.itemTransliterate.value == false && self.sessionManager.itemShiftKeyPressed.value == false && self.sessionManager.itemAltGrKeyPressed.value == false && event.data.keyCode < 2228224) {
                  rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][1]) + self.qwertyPos;
                  columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][0]);
                  if (self.unicode5AndHigher == true && self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["src"]) {
                    var src = self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["src"];
                    let wide = "16px";
                    if (self.sessionManager.getFromSessionURL() == "odu" && self.previousTypedKey == "" && /[a-ze̱o̱`´]+/i.test(self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]) && self.possibleCombine == "") {
                      self.previousTypedKey = self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"];
                    } else if (self.sessionManager.getFromSessionURL() == "odu" && self.diphthongsMappingOduduwa.indexOf(self.possibleCombine + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]) > -1 && self.possibleCombine != "" && /[a-ze̱o̱`´]+/i.test(self.previousTypedKey) == false){
                      // Diphthongs for Oduduwa : "./assets/characters/odu/xx.png"
                      src = self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["src"].split("odu")[0] + "odu/" + self.possibleCombine + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"] + ".png";
                      self.sessionManager.setActionFromKeyboard("del");
                      self.possibleCombine = "";
                      wide = "24px";
                    } else if (self.sessionManager.getFromSessionURL() == "odu" && self.diphthongsMappingOduduwa.indexOf(self.possibleCombine + self.previousTypedKey + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]) > -1 && self.possibleCombine != "" && /[a-ze̱o̱`´]+/i.test(self.previousTypedKey)){
                      // Diphthongs for Oduduwa : "./assets/characters/odu/xx.png"
                      src = self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["src"].split("odu")[0] + "odu/" + self.possibleCombine + self.previousTypedKey + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"] + ".png";
                      self.sessionManager.setActionFromKeyboard("del");
                      self.sessionManager.setActionFromKeyboard("del");
                      self.possibleCombine = "";
                      self.previousTypedKey = "";
                      wide = "24px";
                    } else if (self.sessionManager.getFromSessionURL() == "odu" && self.diphthongsMappingOduduwa.indexOf(self.previousTypedKey + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]) > -1){
                      // Diphthongs for Oduduwa : "./assets/characters/odu/xx.png"
                      src = self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["src"].split("odu")[0] + "odu/" + self.previousTypedKey + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"] + ".png";
                      if (/[`´]+/i.test(self.previousTypedKey)) {
                        self.possibleCombine = self.previousTypedKey + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"];
                        wide = "16px";
                      } else {
                        wide = "24px";
                      }
                      self.sessionManager.setActionFromKeyboard("del");
                      self.previousTypedKey = "";
                    } else if (self.sessionManager.getFromSessionURL() == "odu" && self.diphthongsMappingOduduwa.indexOf(self.previousTypedKey + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]) == -1 && /[a-ze̱o̱`´]+/i.test(self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"])) {
                      self.previousTypedKey = self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"];
                    }
                    self.imageAsContent(src, wide);
                  } else if (self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["action"] != "shift") {
                    if (self.typedWord.value != null) {
                      self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]);
                    } else {
                      self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]);
                    }
                    self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]);
                    self.sessionManager.typedKeysMap.next(self.typedWord.value);
                  }
                  self.sessionManager.currentPressedKey.next(self.layoutCurrentKeys[rowForSoftKey]["qwerty"][columnForSoftKey]["value"]);
                } else if (self.keyCodeMap[0][event.data.domEvent["$"].code] && self.sessionManager.itemQwertyType.value == true && self.sessionManager.itemTransliterate.value == false && self.sessionManager.itemShiftKeyPressed.value == true && self.sessionManager.itemAltGrKeyPressed.value == false && event.data.keyCode < 2228224) {
                  rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][1]) + self.qwertyPos + 5;
                  columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][0]);
                  if (self.unicode5AndHigher == true && self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["src"]) {
                    self.imageAsContent(self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["src"], "15px");
                  } else if (self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["action"] != "shift"){
                    if (self.typedWord.value != null)
                      self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["value"]);
                    else 
                      self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["value"]);
                    self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["value"]);
                    self.sessionManager.typedKeysMap.next(self.typedWord.value);
                  }
                  self.sessionManager.currentPressedKey.next(self.layoutCurrentKeys[rowForSoftKey]["qwertyShift"][columnForSoftKey]["value"]);
                } else if (self.keyCodeMap[0][event.data.domEvent["$"].code] && self.sessionManager.itemQwertyType.value == true && self.sessionManager.itemTransliterate.value == false && self.sessionManager.itemShiftKeyPressed.value == false && self.sessionManager.itemAltGrKeyPressed.value == true && event.data.keyCode < 2228224) {
                  rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][1]) + self.altGrPos;
                  columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][0]);
                  if (self.typedWord.value != null)
                    self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["altGr"][columnForSoftKey]["value"]);
                  else 
                    self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["altGr"][columnForSoftKey]["value"]);
                  self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["altGr"][columnForSoftKey]["value"]);
                  self.sessionManager.typedKeysMap.next(self.typedWord.value);
                  self.sessionManager.currentPressedKey.next(self.layoutCurrentKeys[rowForSoftKey]["altGr"][columnForSoftKey]["value"]);
                } else if (self.keyCodeMap[0][event.data.domEvent["$"].code] && self.sessionManager.itemQwertyType.value == true && self.sessionManager.itemTransliterate.value == false && self.sessionManager.itemShiftKeyPressed.value == true && self.sessionManager.itemAltGrKeyPressed.value == true && event.data.keyCode < 2228224) {
                  rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][1]) + self.altGrPos + 5;
                  columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][0]);
                  if (self.typedWord.value != null)
                    self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["altGrCaps"][columnForSoftKey]["value"]);
                  else 
                    self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["altGrCaps"][columnForSoftKey]["value"]);
                  self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["altGrCaps"][columnForSoftKey]["value"]);
                  self.sessionManager.typedKeysMap.next(self.typedWord.value);
                  self.sessionManager.currentPressedKey.next(self.layoutCurrentKeys[rowForSoftKey]["altGrCaps"][columnForSoftKey]["value"]);
                } else if (self.keyCodeMap[0][event.data.domEvent["$"].code] && self.sessionManager.itemQwertyType.value == false && self.sessionManager.itemTransliterate.value == true && self.sessionManager.itemShiftKeyPressed.value == false && self.sessionManager.itemAltGrKeyPressed.value == false && event.data.keyCode < 2228224) {
                  rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][1]) + self.qwertyTranPos;
                  columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][0]);
                  if (self.typedWord.value != null)
                    self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["qwertyTrans"][columnForSoftKey]["value"]);
                  else 
                    self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["qwertyTrans"][columnForSoftKey]["value"]);
                  self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["qwertyTrans"][columnForSoftKey]["value"]);
                  self.sessionManager.typedKeysMap.next(self.typedWord.value);
                  self.sessionManager.currentPressedKey.next(self.layoutCurrentKeys[rowForSoftKey]["qwertyTrans"][columnForSoftKey]["value"]);
                } else if (self.keyCodeMap[0][event.data.domEvent["$"].code] && self.sessionManager.itemQwertyType.value == false && self.sessionManager.itemTransliterate.value == true && self.sessionManager.itemShiftKeyPressed.value == true && self.sessionManager.itemAltGrKeyPressed.value == false && event.data.keyCode < 2228224) {
                  rowForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][1]) + self.qwertyTranPos + 5;
                  columnForSoftKey = parseInt(self.keyCodeMap[0][event.data.domEvent["$"].code][0]);
                  if (self.typedWord.value != null)
                    self.typedWord.next(self.typedWord.value + self.layoutCurrentKeys[rowForSoftKey]["qwertyShiftTrans"][columnForSoftKey]["value"]);
                  else 
                    self.typedWord.next(self.layoutCurrentKeys[rowForSoftKey]["qwertyShiftTrans"][columnForSoftKey]["value"]);
                  self.sessionManager.setCharFromKeyboard(self.layoutCurrentKeys[rowForSoftKey]["qwertyShiftTrans"][columnForSoftKey]["value"]);
                  self.sessionManager.typedKeysMap.next(self.typedWord.value);
                  self.sessionManager.currentPressedKey.next(self.layoutCurrentKeys[rowForSoftKey]["qwertyShiftTrans"][columnForSoftKey]["value"]);
                }
              } else if (event.data.domEvent["$"].key == " ") {
                self.typedWord.next("");
                self.possibleCombine = "";
                self.previousTypedKey = "";
                self.mappedSpaceClicked = true;
                self.sessionManager.currentPressedKey.next(" ");
                setTimeout(() => {
                  self.sessionManager.setCharFromKeyboard(self.wordSeparator());
                }, self.FOCUS_TIMEOUT);
              } else if (event.data.domEvent["$"].key == "Backspace") {
                // Do action based on Cursor position
                self.sessionManager.setActionFromKeyboard("del");
                if (self.sessionManager.typedKeysMap.value && self.sessionManager.typedKeysMap.value != null) {
                  self.sessionManager.typedKeysMap.next(self.sessionManager.typedKeysMap.value.substring(0, self.sessionManager.typedKeysMap.value.length - 1));
                  self.typedWord.next(self.sessionManager.typedKeysMap.value);
                }
                self.sessionManager.currentPressedKey.next("⌫");
              } else if (event.data.domEvent["$"].key == "Enter") {
                self.sessionManager.setCharFromKeyboard("<br/>");
                if (self.sessionManager.typedKeysMap.value && self.sessionManager.typedKeysMap.value != null) {
                  self.sessionManager.typedKeysMap.next(self.sessionManager.typedKeysMap.value.substring(0, self.sessionManager.typedKeysMap.value.length - 1));
                  self.typedWord.next(self.sessionManager.typedKeysMap.value);
                }
                self.sessionManager.currentPressedKey.next("⏎");
              }
            } else {
              if (event.data.domEvent["$"].key != "ArrowLeft" && event.data.domEvent["$"].key != "ArrowUp" && event.data.domEvent["$"].key != "ArrowRight" && event.data.domEvent["$"].key != "ArrowDown" && self.menuKeyPressed == false)
                event.stop();
              if (event.data.domEvent["$"].key != "Meta" && event.data.domEvent["$"].key != "Shift" && event.data.domEvent["$"].key != "CapsLock" && event.data.domEvent["$"].key != "Alt" && event.data.domEvent["$"].key != "AltGraph" && event.data.domEvent["$"].key != "AltGr" && event.data.domEvent["$"].key != "Tab" && event.data.domEvent["$"].key != "Backspace" && event.data.domEvent["$"].key != "Enter" && event.data.domEvent["$"].key != "Control" && event.data.domEvent["$"].key != "ArrowLeft" && event.data.domEvent["$"].key != "ArrowUp" && event.data.domEvent["$"].key != "ArrowRight" && event.data.domEvent["$"].key != "ArrowDown" && event.data.domEvent["$"].key != " " && event.data.domEvent["$"].key != "Unidentified") {
                self.sessionManager.setCharFromKeyboard(event.data.domEvent["$"].key);
              } else if (event.data.domEvent["$"].key == " ") {
                self.typedWord.next("");
                self.possibleCombine = "";
                self.previousTypedKey = "";
                self.mappedSpaceClicked = true;
                setTimeout(() => {
                  self.sessionManager.setCharFromKeyboard(self.wordSeparator());
                }, self.FOCUS_TIMEOUT);
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
              } else if ((event.data.domEvent["$"].key == "Shift" && event.data.keyCode == 2228240) || (event.data.domEvent["$"].key == "CapsLock" && event.data.keyCode == 20)) {
                if (self.sessionManager.itemShiftKeyPressed.value == false) {
                  setTimeout(() => {
                    self.sessionManager.setShiftKeyPressed(true);
                    self._snackBar.open(self.translateForSnackBar[2], self.translateForSnackBar[0], {
                      duration: self.SHOW_POPUP_TIMEOUT,
                      horizontalPosition: self.horizontalPosition,
                      verticalPosition: self.verticalPosition,
                    });
                  }, self.POPUP_TIMEOUT);
                } else if (self.sessionManager.itemShiftKeyPressed.value == true) {
                  setTimeout(() => {
                    self.sessionManager.setShiftKeyPressed(false);
                    self._snackBar.open(self.translateForSnackBar[3], self.translateForSnackBar[0], {
                      duration: self.SHOW_POPUP_TIMEOUT,
                      horizontalPosition: self.horizontalPosition,
                      verticalPosition: self.verticalPosition,
                    });
                  }, self.POPUP_TIMEOUT);
                }
                self.sessionManager.nonUnicodeScript.next(false);
                // Blur and Focus invent to change Shift layout for Keyboard
                self.fullmodeCkEditor.instance.focusManager.blur(true);
              }
            }
          }
        }
      });

      this.fullmodeCkEditor.instance.on( 'menuShow', (event) => {
        self.menuShowEvent = event;
        if (self.menuShowEvent && self.menuKeyPressed == true && event.editor.contextMenu && event.data["$"]) {
          event.editor.contextMenu.show( event.editor.element["$"].parentElement, (self.rtlLocales.indexOf(self.sessionManager.getFromSessionURL()) > -1)? 2 : 1, event.data["$"].clientX, event.data["$"].clientY );
          self.menuKeyPressed = false;
          self.menuShowEvent = null;
        }
        // TODO - Right-Click Event through Soft Keyboard - "TypeError: b.getDocumentPosition is not a function" is thrown and no menu is shown
      });

      this.fullmodeCkEditor.instance.on( 'change', ( event ) => {
        // TODO - Cursor Position Map Update
        if (self.noSoftKeyboard == false) {
          let content = self.fullmodeCkEditor.instance.getData();
          if (typeof(content) == 'string' && self.mappedSpaceClicked == true && self.pasteContentSetToEditor == true && (self.sessionManager.itemKeyCharacter.value == null || self.sessionManager.itemKeyCharacter.value == "  " || self.sessionManager.itemKeyCharacter.value == " " || self.sessionManager.itemKeyCharacter.value == "")) {
            self.ckeditorContent = content;
            self.sessionManager.setSessionSavingOfContent(self.ckeditorContent);
            self.fullmodeCkEditor.instance.setData(self.ckeditorContent);
          } else if (!this.isMobile && !this.isTablet) {
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
            }, self.FOCUS_TIMEOUT);
            event.stop();
          }
          // Ensure Cursor focus moved back to Editor
          setTimeout(() => {
            // Do action based on Cursor position
            if (self.pasteContentSetToEditor)  {
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
          }, self.FOCUS_TIMEOUT);
        }
      });
      
      // Handling the "Paste" prevention code into Browser
      this.fullmodeCkEditor.instance.on( 'instanceReady', (event) => {
        // TODO - Cursor Position Map Update
        event.editor.on("beforeCommandExec", function(event) {
            // Show the paste dialog for the paste buttons and right-click paste
            if (event.data.name == "paste") {
                event.editor._.forcePasteDialog = true;
            }
            // Don't show the paste dialog for Ctrl+Shift+V
            if (event.data.name == "pastetext" && event.data.commandData.from == "keystrokeHandler") {
                //event.cancel();
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
        if (this.noSoftKeyboard == false) {
          // Inserting Character at Cursor Position : TODO Cursor position
          if (this.sessionManager.getSessionSavedContent() && parseInt(this.rowPos) > 0 && parseInt(this.colPos) == 0 && this.position != "∞") {
            this.ckeditorContent = this.sessionManager.getSessionSavedContent().substring(0, parseInt(this.rowPos) + 1) + character + this.sessionManager.getSessionSavedContent().substring(parseInt(this.rowPos) + 1, this.sessionManager.getSessionSavedContent().length);
            this.charInserted = true;
          } else if (this.sessionManager.getSessionSavedContent() && parseInt(this.rowPos) > 0 && parseInt(this.colPos) > 0 && this.position != "∞") {
            // Line-break encountered and this has to be handled separately
            let splitContent = this.sessionManager.getSessionSavedContent().split("<br />");
            let content = "";
            if (splitContent && splitContent.length > 0) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == parseInt(this.colPos))
                  content = splitContent[i] + splitContent[i].substring(0, parseInt(this.rowPos) + 1) + character + splitContent[i].substring(parseInt(this.rowPos) + 1, splitContent[i].length);
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
          if (this.exploreOnly && this.fireOnce && character != "") {
            this.fireOnce = false;
            setTimeout(()=>{
              this.sessionManager.setCharFromKeyboard("");
            },100);
          } else {
            this.fireOnce = true;
          }
          if (this.sessionManager.getFromSessionURL() == "odu" && /[`´]/.test(character) && this.possibleCombine == ""){
            this.possibleCombine = this.previousTypedKey;
            this.previousTypedKey = character;
          } else if (this.sessionManager.getFromSessionURL() == "odu" && /[`´]/.test(character)){
            this.previousTypedKey = character;
          }
        }
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
          if (parseInt(this.rowPos) > 0 && parseInt(this.colPos) == 0 && this.position != "∞") {
            this.ckeditorContent = this.ckeditorContent.substring(0, parseInt(this.rowPos) - 1) + this.ckeditorContent.substring(parseInt(this.rowPos) + 1, this.ckeditorContent.length);
            this.deletePressed = true;
          } else if (parseInt(this.rowPos) > 0 && parseInt(this.colPos) > 0 && this.position != "∞") {
            // Line-break encountered and this has to be handled separately
            let splitContent = this.ckeditorContent.split("<br />");
            let content = "";
            if (splitContent && splitContent.length > 0) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == parseInt(this.colPos))
                  content = splitContent[i] + splitContent[i].substring(0, parseInt(this.rowPos) - 1) + splitContent[i].substring(parseInt(this.rowPos) + 1, splitContent[i].length);
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
            if (this.ckeditorContent.lastIndexOf("<img") > -1 && this.ckeditorContent.lastIndexOf("/>") > -1 && this.ckeditorContent.lastIndexOf("/>") == this.ckeditorContent.length - 3) {
              this.ckeditorContent = this.ckeditorContent.substring(0, this.ckeditorContent.lastIndexOf("<img"));
              // Deleting an Image : TODO at cursor position
            } else {
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
          if (action.indexOf("data:image/png;base64,") > -1) {
            this.ckeditorContent = this.ckeditorContent + "<img width='50px' height='50px' src='" + action + "'/> ";
            this.contentToEditor();
          } else if (action.indexOf("class") == -1) {
            this.imageAsContent(action, this.sessionManager.imageWidthAction.value);
          } else {
            // Indus Script Font inclusion - Hex Conversion of IS font number
            let hexNum = Number(parseInt(action.split("/")[1].split("-")[1]) + 29).toString(16);
            this.ckeditorContent = this.ckeditorContent + "<span class='icon icon-" + action.split("/")[1] + "'>`</span>";
            this.contentToEditor();
          }
        }
      });

      this.sessionManager.itemSessionURL.subscribe((url_code) => {
        if (this.fullmodeCkEditor) {
          this.fullmodeCkEditor.instance.config.contentsLangDirection = (this.rtlLocales.indexOf(url_code) > -1)? 'rtl' : 'ltr';
        }
        this.ckEditorConfiguration.contentsLangDirection = (this.rtlLocales.indexOf(this.sessionManager.getFromSessionURL()) > -1)? 'rtl' : 'ltr';
        if(this.fontFamily[url_code]) {
          window.frames["CKEDITOR"].addCss(this.fontFamily[url_code][0]);
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
        if (this.boustrophedonScripts.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.reverseBoustrophedonScripts.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
          let content = this.fullmodeCkEditor.instance.getData();
          // element is 'p' or 'div' or 'span' : Character insert at cursor position
          // TODO - Multi scripts within 'p' or 'div' or 'span' then only render bi-di for explicitly detected scripts alone
          let renderBiDiContent = "";
          if (content.indexOf("<p>") > -1) {
            let splitContent = content.split("</p>");
            if (scriptBoustrophedon == false) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == (splitContent.length - 2)) {
                  renderBiDiContent = renderBiDiContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='direction: rtl;unicode-bidi: bidi-override;transform: " + ((this.ckEditorConfiguration.contentsLangDirection == 'ltr')? "none" : "scaleX(-1)") + ";'>");
                } else
                  renderBiDiContent = renderBiDiContent + splitContent[i];
              }
            } else if (scriptBoustrophedon == true && this.boustrophedonScripts.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == (splitContent.length - 2)) {
                  renderBiDiContent = renderBiDiContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='direction: ltr;unicode-bidi: bidi-override;transform: " + ((this.ckEditorConfiguration.contentsLangDirection == 'rtl')? "scaleX(-1)" : "none") + "'>");
                } else
                  renderBiDiContent = renderBiDiContent + splitContent[i];
              }
            } else if (scriptBoustrophedon == true && this.reverseBoustrophedonScripts.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == (splitContent.length - 2)) {
                  renderBiDiContent = renderBiDiContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='direction: ltr;unicode-bidi: bidi-override;transform: " + ((this.ckEditorConfiguration.contentsLangDirection == 'rtl')? "scaleX(-1)" : "none") + "'>");
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
        if (this.topToBottomLR.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.topToBottomRL.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.bottomToTopLR.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.bottomToTopRL.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
          let content = this.fullmodeCkEditor.instance.getData();
          // element is 'p' or 'div' or 'span' : Character insert at cursor position
          let textOrientatedContent = "";
          if ((content.indexOf("<p ") > -1 || content.indexOf("<p>") > -1) && verticalOrient == true) {
            let splitContent = content.split("</p>");
            if (this.topToBottomRL.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == (splitContent.length - 2) && this.sessionManager.getFromSessionURL() != "ougr")
                  textOrientatedContent = textOrientatedContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='writing-mode: vertical-rl;text-orientation: mixed;letter-spacing: 1em;'>").replace('<p style=\"', '<p style=\"writing-mode: vertical-rl;text-orientation: mixed;letter-spacing: 1em;');
                else if (this.sessionManager.getFromSessionURL() != "ougr")
                  textOrientatedContent = textOrientatedContent + splitContent[i];
                else if (i == (splitContent.length - 2) && this.sessionManager.getFromSessionURL() == "ougr") 
                  textOrientatedContent = textOrientatedContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='writing-mode: vertical-rl;text-orientation: mixed;transform: rotate(180deg);'>");
                else if (this.sessionManager.getFromSessionURL() == "ougr")
                  textOrientatedContent = textOrientatedContent + splitContent[i];
              }
            } else if (this.topToBottomLR.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == (splitContent.length - 2))
                  textOrientatedContent = textOrientatedContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='writing-mode: vertical-lr;text-orientation: mixed;'>");
                else
                  textOrientatedContent = textOrientatedContent + splitContent[i];
              }
            } else if (this.bottomToTopLR.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == (splitContent.length - 2))
                  textOrientatedContent = textOrientatedContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='writing-mode: vertical-lr;text-orientation: mixed;transform: rotate(-180deg);'>");
                else
                  textOrientatedContent = textOrientatedContent + splitContent[i];
              }
            } else if (this.bottomToTopRL.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
              for (let i = 0; i < splitContent.length; i++) {
                if (i == (splitContent.length - 2))
                  textOrientatedContent = textOrientatedContent + splitContent[splitContent.length - 2].replace(/<p>/g, "<p style='writing-mode: vertical-rl;text-orientation: mixed;'>").replace('<p style=\"', '<p style=\"writing-mode: vertical-rl; text-orientation: mixed;');
                else
                  textOrientatedContent = textOrientatedContent + splitContent[i];
              }
            }
          } else if ((content.indexOf("<p ") > -1 || content.indexOf("<p>") > -1) && verticalOrient == false) {
            if (this.topToBottomRL.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.topToBottomLR.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.bottomToTopLR.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.bottomToTopRL.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
              textOrientatedContent = content.replace("writing-mode: vertical-lr;", "").replace("writing-mode: vertical-rl;","").replace("transform: rotate(-180deg);","").replace("transform: rotate(-90deg);","").replace("text-orientation: mixed", "").replace("letter-spacing: 1em;","");
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
  }

  imageAsContent(action, wide) {
    if (action && action.indexOf("ZWJ") == -1) {
      let styleTBRL = (this.sessionManager.getFromSessionURL() == "ougr" && this.sessionManager.typeVertically.value == true) ? 'style="transform: rotate(-90deg);"' : '';
      wide = (this.sessionManager.getFromSessionURL() == "runr") ? '9px' : wide;
      let high = (this.sessionManager.getFromSessionURL() == "runr") ? '12px' : ((this.sessionManager.getFromSessionURL() == "runr"));
      this.ckeditorContent = this.ckeditorContent + "<img " + styleTBRL + "  width='" + wide + "' height='" + high + "' src='" + action + "' alt='Image for " + action.split("/")[3] + " " + action.split("/")[4] + "'/> ";
      this.contentToEditor();
    }/* else if (this.unicode5AndHigher && this.ckeditorContent.indexOf("/> <img") > -1 && parseInt(this.rowPos) > 0 && parseInt(this.colPos) == 0 && this.position != "∞") {
      let insertImage = this.ckeditorContent.split("/> <img", this.rowPos).join("/> <img").length + 3;
      let determineSpaces = this.ckeditorContent.substr(0, insertImage);
      let intermediateImagesCount = this.rowPos - determineSpaces.split("　").length + 2;
      insertImage = this.ckeditorContent.split("/> <img", intermediateImagesCount).join("/> <img").length + 3;
      let lengthOfContent = this.ckeditorContent.length;
      this.ckeditorContent = this.ckeditorContent.substr(0, insertImage) + "<img width='" + wide + "' height='" + (/[`´]+/i.test(action) ? "25px" : "20px") + "' src='" + action + "' alt='Image for " + action.split("/")[3] + " " + action.split("/")[4] + "'/> " + this.ckeditorContent.substr(insertImage, lengthOfContent);
      this.contentToEditor();
    } else if (this.unicode5AndHigher && this.ckeditorContent.indexOf("/> <img") > -1 && parseInt(this.rowPos) > 0 && parseInt(this.colPos) > 0 && this.position != "∞") {
      let insertImage = this.ckeditorContent.split("/> <img", this.rowPos).join("/> <img").length + 3;
      let determineSpaces = this.ckeditorContent.substr(0, insertImage);
      let intermediateImagesCount = this.rowPos - determineSpaces.split("　").length + 2;
      insertImage = this.ckeditorContent.split("/> <img", intermediateImagesCount).join("/> <img").length + 3;
      let lengthOfContent = this.ckeditorContent.length;
      this.ckeditorContent.split("<br />")[this.colPos] = this.ckeditorContent.split("<br />")[this.colPos].substr(0, insertImage) + "<img width='" + wide + "' height='" + (/[`´]+/i.test(action) ? "25px" : "20px") + "' src='" + action + "' alt='Image for " + action.split("/")[3] + " " + action.split("/")[4] + "'/> " + this.ckeditorContent.split("<br />")[this.colPos].substr(insertImage, lengthOfContent);
      this.ckeditorContent = this.ckeditorContent.split("<br />").join("");
      this.contentToEditor();
    }*/ else if (action.indexOf("ZWJ") > -1) {
      this.sessionManager.setCharFromKeyboard("\u200D");
    }
  }

  contentToEditor() {
    this.sessionManager.setSessionSavingOfContent(this.ckeditorContent);
    setTimeout(() => {
      this.fullmodeCkEditor.instance.setData(this.sessionManager.getSessionSavedContent());
    }, this.FOCUS_TIMEOUT);
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

  /* TODO Positioning Cursor
    * Scenario 1 : Input with Mouse Click > Event Flow for both Soft Keyboard or Suggestions
      character action > change event > change (conditional)
    * Scenario 2 : Input with Keyboard Press > Event Flow
      key event > character action >  change event > change (conditional)
    * Scenario 3 : Modify Size or Style of Letter or Word in Editor
      change event > change (conditional)
    * Scenario 4 : Click on Editor
      contentdom/click event > change event > cursor position map update
    * Data Storage & While Events occur
      this.fullmodeCkEditor.instance.getData() / setData(data)
      this.sessionManager.getSessionSavedContent()
      this.ckeditorContent
      event.editor["_"]["data"]
  */

  positionCalculator(): any {
    /* Cursor position Row-Column Mapping    
      0,0 ~ clientX=15, clientY=20
      clientY + 17 : row+ <move top or bottom - br/>
      Should be based on Unicode character size : https://en.wikipedia.org/wiki/List_of_Unicode_characters
    */
    let spacePerChar = 7;
    if (this.sessionManager.getFromSessionURL() == "thaa")
      spacePerChar = 5;
    else if (this.sessionManager.getFromSessionURL() == "el" || this.sessionManager.getFromSessionURL() == "ru" || this.sessionManager.getFromSessionURL() == "uk")
      spacePerChar = 8;
    else if (this.swaraAbugidaType.indexOf(this.sessionManager.getFromSessionURL()) > -1) {
      spacePerChar = 10;
      if (this.sessionManager.getFromSessionURL() == "ta" || this.sessionManager.getFromSessionURL() == "ml" || this.sessionManager.getFromSessionURL() == "sylo")
        spacePerChar = 12;
      else if (this.sessionManager.getFromSessionURL() == "bali" || this.sessionManager.getFromSessionURL() == "jv")
        spacePerChar = 14;
    } else if (this.sessionManager.getFromSessionURL() == "zhcn" || this.sessionManager.getFromSessionURL() == "zhtw" || this.sessionManager.getFromSessionURL() == "ko" || this.sessionManager.getFromSessionURL() == "ja")
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
      if (this.ckeditorContent.split("<br />").length == 1)
        returnY = 0;
      return `${returnX},${returnY}`;
    } else {
      return "∞";   // End of Text 
    }
  }

  onEditorReady(event : any) {
    setTimeout(() => { 
      event.editor.focus();
      var range = event.editor.createRange();
      if (range && !this.isMobile && !this.isTablet) {
        range.moveToPosition( range.root, 2 );
        if (event.editor.getSelection())
          event.editor.getSelection().selectRanges( [ range ] );  
      }
    }, this.INITIAL_LOAD_TIMEOUT);
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
    else if (this.sessionManager.getFromSessionURL() == "runr")
        return "\u16EB\u200B";
    else if (this.sessionManager.getFromSessionURL() == "geez")
      return "፡";
    else if (this.noSeparator.indexOf(this.sessionManager.getFromSessionURL()) > -1 || this.unicode5AndHigher)
      return "　";
    else if (this.visualSeparator.indexOf(this.sessionManager.getFromSessionURL()) > -1)
      return "\u2009";
    else if (this.syllabicSeparator.indexOf(this.sessionManager.getFromSessionURL()) > -1)
      return " ";
    else if (this.zeroWidthSeparator.indexOf(this.sessionManager.getFromSessionURL()) > -1)
      return "\u202F";
    else
      return " ";
  }
}

