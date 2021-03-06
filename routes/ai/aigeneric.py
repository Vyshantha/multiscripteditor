import numpy as np
import heapq
from nltk.tokenize import RegexpTokenizer
from keras.models import Sequential, load_model
from keras.layers.core import Dense, Activation
from keras.layers import LSTM
import pickle
from tensorflow.keras.optimizers import RMSprop

# This TensorFlow binary is optimized with oneAPI Deep Neural Network Library (oneDNN) to use the following CPU instructions in performance-critical operations:  AVX2 FMA. To enable them in other operations, rebuild TensorFlow with the appropriate compiler flags.
# export TF_ENABLE_ONEDNN_OPTS=1 : Intel chip - https://www.intel.com/content/www/us/en/developer/articles/guide/optimization-for-tensorflow-installation-guide.html

WORD_LENGTH = 7
SUPPORTED_LANGUAGE = ['de','ar','fa','ur','ps','sd','ug','he','yi','cs','af','sq','az','eu','ca','bs','ceb','hr','da','en','nl','eo','et','fi','fr','fy','gl','ha','haw','hu','is','ig','id','ga','it','rw','ku','lv','lt','lb','mg','ms','mt','no','pl','pt','ro','gd','sn','sk','sl','so','es','su','sw','sv','tg','tr','tk','uz','vi','cy','xh','yo','zu','be','bg','mk','ru','uk','tt','kk','sr','ky','mn','el','hy','ka','ko','mr','ne','hi','kn','te','ta','ml','pa','gu','or','bn','am','th','lo','km','my','jv','zh','zh-TW','ja','si','la','co','ht','hmn','ny','sm','st','tl','sa','sank']

# Reading the Data-Sets & Use Tokeniser
tokenizer = RegexpTokenizer(r'\w+|$[0-9]+|\S+')                                  # " " is a type of Word Delimiter or Punctuation like , : ;
words = tokenizer.tokenize(open('data_' + SUPPORTED_LANGUAGE[0] + '.txt').read().lower())       # create data_##.txt for supported languages

# Determine Unique Words
unique_words = np.unique(words)
unique_word_index = dict((c, i) for i, c in enumerate(unique_words))
'''
# Feature Engineering
next_words = []
prev_words = []
for j in range(len(words) - WORD_LENGTH):
    prev_words.append(words[j:j + WORD_LENGTH])
    next_words.append(words[j + WORD_LENGTH])

# Storing features and labels
X = np.zeros((len(prev_words), WORD_LENGTH, len(unique_words)), dtype=bool)
Y = np.zeros((len(next_words), len(unique_words)), dtype=bool)
for i, each_words in enumerate(prev_words):
    for j, each_word in enumerate(each_words):
        X[i, j, unique_word_index[each_word]] = 1
    Y[i, unique_word_index[next_words[i]]] = 1

# Building the Model
model = Sequential()
model.add(LSTM(128, input_shape=(WORD_LENGTH, len(unique_words))))
model.add(Dense(len(unique_words)))
model.add(Activation('softmax'))

# Model Training
optimizer = RMSprop(learning_rate=0.01)
model.compile(loss='categorical_crossentropy', optimizer=optimizer, metrics=['accuracy'])
history = model.fit(X, Y, validation_split=0.05, batch_size=128, epochs=30, shuffle=True).history

# Saving the Model
model.save('next_word_model_' + SUPPORTED_LANGUAGE[0] + '.h5')                           # save next_word_model_##.h5 per supported language
pickle.dump(history, open("history_" + SUPPORTED_LANGUAGE[0] + ".p", "wb"))              # save history_##.p per supported language
'''
# Loading the Model
model = load_model('next_word_model_' + SUPPORTED_LANGUAGE[0] + '.h5')           # load the model next_word_model_##.h5 as per NodeJS call
history = pickle.load(open("history_" + SUPPORTED_LANGUAGE[0] + ".p", "rb"))     # load the history_##.p as per NodeJS call

# Testing next word
def prepare_input(text):
    x = np.zeros((1, WORD_LENGTH, len(unique_words)))
    word = ""
    for t, char in enumerate(text + " "):                           # " " is a type of Word Delimiter 
        # Build 'word' until Word Delimiter
        word = (word + char) if " " not in char else word
        if (word != "" and char == " "):
            try:
                print("Value ", t, char, word)
                x[0, t, unique_word_index[word]] = 1.
            except KeyError:
                print("Key ", t, char, word)
            except IndexError:
                print("Index ", t, char, word)
            word = ""
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
sentence = "das Wehrmacht war"                                             # Sentence provided by NodeJS
UI_SIZE = 10
print("Unique Words ", unique_words)                                    # unique_words should be exported to a file while using with NodeJS
print("Unique Word Indices ", unique_word_index)                        # unique_word_index should be exported to a file while using with NodeJS

tokens = RegexpTokenizer(r'\w+|$[0-9]+|\S+')                            # " " is a type of Word Delimiter or Punctuation like , : ; 
sequenceTokens = " ".join(tokens.tokenize(sentence.lower())[0:len(sentence)])

print("Sequence: ", sequenceTokens)                                     # Depending on Display UI Size the value should be different
print("next possible words: ", predict_completions(sequenceTokens, UI_SIZE))  
