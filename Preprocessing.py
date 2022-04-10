import nltk
from nltk.stem.snowball import EnglishStemmer
import pandas as pd
import string

# lowercase all text
df = pd.read_csv("cleaned_data.csv")
df['Text'] = df['Text'].str.lower()
df.drop('Unnamed: 0', axis=1, inplace=True)

train=df.sample(frac=0.9)
train.reset_index(drop=True, inplace=True)
test=df.drop(train.index)
test.reset_index(drop=True, inplace=True)

# Text per person, tokenized and stemmed
stemmer = EnglishStemmer()
monica_text = []
chandler_text = []
joey_text = []
phoebe_text = []
rachel_text = []
ross_text = []

stemmer = EnglishStemmer()
monica_text = []
chandler_text = []
joey_text = []
phoebe_text = []
rachel_text = []
ross_text = []

for i in range(1, len(train)):
    text = train["Text"][i]
    tokenized_text = nltk.word_tokenize(text)  # tokenize text
    # clean tokenized text
    table = {ord(char): '' for char in string.punctuation}
    cleaned_messy_sentence = []
    for messy_word in tokenized_text:
        cleaned_word = messy_word.translate(table)  # the translate method allows us to remove all unwanted charachters
        cleaned_word_stemmed = stemmer.stem(cleaned_word)
        cleaned_messy_sentence.append(cleaned_word_stemmed)
    cleaned_sentence = [token for token in cleaned_messy_sentence if token != '']

    speaker = train["Speaker"][i]
    if speaker == "monica":
        monica_text.append(cleaned_sentence)
    elif speaker == "chandler":
        chandler_text.append(cleaned_sentence)
    elif speaker == "joey":
        joey_text.append(cleaned_sentence)
    elif speaker == "phoebe":
        phoebe_text.append(cleaned_sentence)
    elif speaker == "rachel":
        rachel_text.append(cleaned_sentence)
    elif speaker == "ross":
        ross_text.append(cleaned_sentence)
    else:
        print("Unknown speaker found")
        break
