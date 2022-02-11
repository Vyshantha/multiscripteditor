#!/usr/bin/python
# NLP for adding a words from sentence for any of these supported languages

import sys
import stanza
from langdetect import detect
from langdetect.lang_detect_exception import LangDetectException
from gibberish_detector import detector

current_language = ''

supported_languages = ['af', 'grc', 'ar', 'hy', 'eu', 'be', 'bg', 'bxr', 'ca', 'zh', 'zh-hant', 'lzh', 'cop', 'hr', 'cs', 'da', 'nl', 'en', 'et', 'fi', 'fr', 'gl', 'de', 'got', 'el', 'he', 'hi', 'hu', 'id', 'ga', 'it', 'ja', 'kk', 'ko', 'kmr', 'la', 'lv', 'lt', 'olo', 'mt', 'mr', 'sme', 'no', 'nn', 'cu', 'fro', 'orv', 'fa', 'pl', 'pt', 'ro', 'ru', 'gd', 'sr', 'sk', 'sl', 'es', 'sv', 'swl', 'ta', 'te', 'tr', 'uk', 'hsb', 'ur', 'ug', 'vi', 'wo']

mapping_locales = {"zh-cn": "zh", "zhcn": "zh", "zh-tw": "zh-hant", "zhtw": "zh-hant", "copt": "cop", "ion": "grc", "goth": "got", "km": "kmr", "se": "sme", "cyrs": "cu"}

lang_detect_locales = ['af', 'ar', 'bg', 'bn', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en', 'es', 'et', 'fa', 'fi', 'fr', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'kn', 'ko', 'lt', 'lv', 'mk', 'ml', 'mr', 'ne', 'nl', 'no', 'pa', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'so', 'sq', 'sv', 'sw', 'ta', 'te', 'th', 'tl', 'tr', 'uk', 'ur', 'vi', 'zh-cn', 'zh-tw']

sentence_separator = [".", "·", "։", "՝","~", "՞", "。", "｡", "︒", "、", "?", "!", "‽", ";", ":", ",", "¿", "¡", "؟", "⹁", "⸴", "⸲", "ʻ", "︐", "،", "︑", "﹐", "﹑", "，", "､", "।", "॥", "෴", "⸼", "∘","۔", "።", "└", "▄", "჻", "߸", "፣", "᠂", "᠈", "꓾", "꘍", "꛵", "𑑍", "𝪇", "᭞", "᭟", "᭟᭜᭟", "꧈", "꧉", "꧊", "꧋", "꧋꧆꧋", "꧉꧆꧉", "\u2E4C", "\uD805\uDC5A", "\uD81B\uDE97"]

try:
    if len(sys.argv) == 5 and (str(sys.argv[1]) in supported_languages or (str(sys.argv[1]) in mapping_locales and mapping_locales[str(sys.argv[1])] in supported_languages)):
        if str(sys.argv[1]) in mapping_locales and mapping_locales[str(sys.argv[1])]:
            current_language = mapping_locales[str(sys.argv[1])]
        else:
            current_language = str(sys.argv[1])

        #stanza.download(current_language)       # This downloads the Language models for the neural pipeline
        #stanza.download(current_language, proxies=proxies)

        nlp = stanza.Pipeline(current_language) # This sets up a default neural pipeline in Language
        doc = nlp(str(sys.argv[3]))
        #doc.sentences[0].print_dependencies()

        for sentence in doc.sentences:
            #print(sentence.ents)
            #print(sentence.dependencies)
            for word in sentence.words:
                # Ignore Proper Nouns, Email Address & Numbers - PII Type data
                # A long sequence of random or repeating letters should be ignored - load the gibberish detection model
                Detector = detector.create_from_model('.\gibberish-detector.model')
                if word.pos != "PROPN" and word.pos != "NUM" and str(word.text) not in sentence_separator and Detector.is_gibberish(str(word.text)) == False:
                    try:
                        found_locale_of_word = detect(word.text)
                        if found_locale_of_word is str(sys.argv[1]) or found_locale_of_word in mapping_locales: # Words not belonging to a language should not be added to a Suggestion Word list
                            print(word.text + "⌘", end = '')
                    except LangDetectException:
                        found_locale_of_word = ''
    else:
        print(str(sys.argv[3]), end = '')

    # The lemmatisation and parsing of all the words takes up to 3-5 seconds per sentence
except KeyError:
    print(str(sys.argv[3]), end = '')
