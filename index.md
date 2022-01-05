# Multi Script Editor

## World Scripts Explorer - SaaS Offering
This website offers every writer all the tools necessary to ensure they are able to construct their piece of work with ease.
1. One could use the Keyboard Layouts which are seggregated over multiple **Script** or **Writing-System** types encompassing over 600 types from all over world including ancient, old, classical and constructed types):
 - [Abjad](https://www.omniglot.com/writing/abjads.htm)
 - [Alphabet](https://www.omniglot.com/writing/alphabets.htm)
 - [Abugida](https://www.omniglot.com/writing/abugidas.htm) 
 - [Syllabery](https://www.omniglot.com/writing/syllabaries.htm) 
 - [Ideogram Logogram Pictogram](https://www.omniglot.com/writing/semanto-phonetic.php) 
 - [Braille](https://en.wikipedia.org/wiki/Braille) 
 - [Sign](https://en.wikipedia.org/wiki/Sign_language) 
 - [Code-Shorthand-Emoji](https://en.wikipedia.org/wiki/Shorthand) 
 - [Unclassified](https://www.omniglot.com/writing/undeciphered.htm)
2. Types of Keyboard Layout : `Language Learning (Default)` available for 600 Scripts & Languages | `Typewriter (QWERTY)` available for 280 Languages & Scripts | `Transliterate (Phonetic)` available for 15 language 
3. Keyboard selection could be done using the search feature present in each script type, or filtering capabilities using historical timeline or even through the world map
4. Providing Suggestion while Typing for 150 Scripts & Languages
5. The suggestions are regularly updated based on Natural Language Process - Standford Stanza NLP (build `Python 3.7`) after sentence completion for each language or script
6. Mapping of Laptop/Device Keyboard for easy of typing
7. Adjustable - size of keys & fonts of Character (or Images) in Keyboard
8. Keysboards Layouts could be **Rotated** as well as for **Vertical Typing**, **Mirrored** (for **Bousphorden Typing**) and update the **Text Orientation** for **left-to-right** or **right-to-left** or **top-to-bottom** or **bottom-to-top** typing
9. Interface is scaled for Laptop, Tablet and Mobile screens
10. There is selection available between - `Dark` | `Light` | `High Contrast` Themes
11. It has a fully functional Rich-Text Editor (`CKEditor4`)
12. Interface is available in 110 Support Languages (including **Sanskrit** and **Sankethi** languages additional to Google Translate)
13. URL redirection capabilities to switch keyboards and override browser default language or locale 
14. Keyboard Layouts can be bookmarked and layouts could be customised 
15. The offering in available in `Online` | `Offline` for the different services
16. The Transliteration Content Generation is established using the APIs provided by Aksharamukha : https://aksharamukha.appspot.com/explore from [@github/virtualvinodh](https://github.com/virtualvinodh/aksharamukha)
17. Webpage that are integrated through iFrames : 
  - Translation (https://tatoeba.org) 
  - Dictionary (https://glosbe.com/all-languages | https://bab.la/)
  - Thesaurus (https://synonyms.reverso.net/synonym/ | https://www.shabdkosh.com | https://www.khandbahale.com)
  - Script Information (https://www.endangeredalphabets.net | https://www.scriptsource.org/cms/scripts/page.php)
  - Linguistic Information (https://omniglot.com)
  - Wikipedia (https://wikipedia.org/wiki/)
18. Session Management - The content and data typed by user is saved in the browser Local Storage for future use 
19. Collect the World Scripts Explorer data by using REST API - see [Full Guide](https://worldscriptsexplorer.herokuapp.com)

## Server-side `NodeJS 12.x` based on Express server
  Hosted on Salesforce Cloud - **Heroku : https://worldscriptsexplorer.herokuapp.com**
 
## Webserver based on `AngularJS 11.x`
  Hosted on Firebase **Google : https://worldscriptsexplorer.page**
