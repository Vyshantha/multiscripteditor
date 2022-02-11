#!/usr/bin/python
# This on Publishing Server for ~70 languages
import sys
import stanza

supported_languages = ['af', 'grc', 'ar', 'hy', 'eu', 'be', 'bg', 'bxr', 'ca', 'zh', 'zh-hant', 'lzh', 'cop', 'hr', 'cs', 'da', 'nl', 'en', 'et', 'fi', 'fr', 'gl', 'de', 'got', 'el', 'he', 'hi', 'hu', 'id', 'ga', 'it', 'ja', 'kk', 'ko', 'kmr', 'la', 'lv', 'lt', 'olo', 'mt', 'mr', 'sme', 'no', 'nn', 'cu', 'fro', 'orv', 'fa', 'pl', 'pt', 'ro', 'ru', 'gd', 'sr', 'sk', 'sl', 'es', 'sv', 'swl', 'ta', 'te', 'tr', 'uk', 'hsb', 'ur', 'ug', 'vi', 'wo']

# This downloads the Language models for the neural pipeline
for lang in supported_languages:
    stanza.download(lang)
