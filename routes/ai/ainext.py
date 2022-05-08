import numpy as np
import heapq
from nltk.tokenize import RegexpTokenizer
from keras.models import load_model
import pickle

WORD_LENGTH = 5
SUPPORTED_LANGUAGE = ["de"]

# Loading the Model
model = load_model('next_word_model_' + SUPPORTED_LANGUAGE[0] + '.h5')           # load the model next_word_model_##.h5 as per NodeJS call
history = pickle.load(open("history_" + SUPPORTED_LANGUAGE[0] + ".p", "rb"))     # load the history_##.p as per NodeJS call

# load unique_words & unique_word_index
unique_words = np.load('unique_words_' + SUPPORTED_LANGUAGE[0])
unique_word_index = np.load('unique_word_index_' + SUPPORTED_LANGUAGE[0])

# Testing next word
def prepare_input(text):
    x = np.zeros((1, WORD_LENGTH, len(unique_words)))
    for t, char in enumerate(text):
        try:
            x[0, t, unique_word_index[char]] = 1.
        except KeyError:
            print("Continue ", t, char)
    return x

def sample(preds, top_n):
    preds = np.asarray(preds).astype('float64')
    preds = np.log(preds)
    exp_preds = np.exp(preds)
    preds = exp_preds / np.sum(exp_preds)
    return heapq.nlargest(top_n, range(len(preds)), preds.take)

# Prediction from Training Data
def predict_completions(text, n):
    x = prepare_input(text)
    preds = model.predict(x, verbose=0)[0]
    next_indices = sample(preds, n)
    return [unique_words[idx] for idx in next_indices]

# Test Trained Data
sentence = "es bei"                                                     # Sentence provided by NodeJS
UI_SIZE = 4
print("Unique Words ", unique_words)                                    # unique_words should be exported to a file while using with NodeJS
print("Unique Word Indices ", unique_word_index)                        # unique_word_index should be exported to a file while using with NodeJS

tokens = RegexpTokenizer(r'\w+|$[0-9]+|\S+')                            # " " is a type of Word Delimiter
sequenceTokens = " ".join(tokens.tokenize(sentence.lower())[0:len(sentence)])

print("Sequence: ", sequenceTokens)                                     # Depending on Display UI Size the value should be different
print("next possible words: ", predict_completions(sequenceTokens, UI_SIZE))  

# Current Implementation - https://www.ris-ai.com/predict-next-word-with-python
# Data Gathering - https://www.gutenberg.org/browse/languages/ang
                # https://www.bible.com/languages
                # https://wordproject.org/bibles/parallel/index.htm
# https://github.com/sandeepbhutani304/markov-predict-next-word/blob/master/markov_nextwordpred.py
