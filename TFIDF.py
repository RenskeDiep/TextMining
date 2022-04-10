import Preprocessing as pre
import nltk
from nltk.stem.snowball import EnglishStemmer
import string
from collections import namedtuple, defaultdict, Counter
from math import log10, sqrt

stemmer = EnglishStemmer()
all_text_classified = []

# For each group, the term frequency.
# [0] = monica, [1]=chandler, etc.
all_tokens_tf = []
# Add all classes into one list
all_text_classified.append(pre.monica_text)
all_text_classified.append(pre.chandler_text)
all_text_classified.append(pre.joey_text)
all_text_classified.append(pre.phoebe_text)
all_text_classified.append(pre.rachel_text)
all_text_classified.append(pre.ross_text)

class_names = ['monica', 'chandler', 'joey', 'phoebe', 'rachel', 'ross']
number_of_speakers = len(class_names)
inverted_index = defaultdict(list)
tf_matrix = defaultdict(Counter)

for index in range(len(all_text_classified)):
    group = all_text_classified[index]  # Group = all sentences of a speaker; monica, chandler, etc.
    all_tokens = []
    for sentence in group:
        for token in sentence:
            all_tokens.append(token)

    # Document Frequency
    term_set = set(all_tokens)
    for term in term_set:
        inverted_index[term].append(class_names[index])

    # Term Frequency
    tf_matrix[class_names[index]] = Counter(all_tokens)


def tf(term, character):
    return float(tf_matrix[character][term])


def df(term):
    return float(len(inverted_index[term]))


# IDF and TFIDF, with add-one smoothening (taking into account null-values)
# NOTE: idf-score = 0 (and thus tfidf when all speakers say the term
def idf(term):
    return log10((number_of_speakers + 1) / (df(term) + 1))

def tfidf(term, speaker):
    return tf(term, speaker)*idf(term)


def score(query_terms, speaker):  # ntn.nnn
    score = 0
    for term in query_terms:
        score = score + tfidf(term,speaker)
    return score


def retrieve_speakers(query):
    speakers = []

    for term in query:
        all_instances = inverted_index[term]
        for character in all_instances:
            if character not in speakers:
                speakers.append(character)
    return speakers


def scoring_query(query):
    speakers_and_score = []
    tokenized_query = nltk.word_tokenize(query)

    # Turn into lowercase
    lower_query = []
    for token in tokenized_query:
        lower_query.append(token.lower())

    # clean query
    table = {ord(char): '' for char in string.punctuation}
    cleaned_messy_query = []
    for messy_word in tokenized_query:
        cleaned_word = messy_word.translate(table)  # the translate method allows us to remove all unwanted charachters
        cleaned_word_stemmed = stemmer.stem(cleaned_word)
        cleaned_messy_query.append(cleaned_word_stemmed)
    cleaned_query = [token for token in cleaned_messy_query if token != '']

    speaker_list = retrieve_speakers(cleaned_query)

    for speaker in speaker_list:
        tfidf_score = score(cleaned_query, speaker)
        speakers_and_score.append((speaker, tfidf_score))

    ranked = sorted(speakers_and_score, key=lambda x: x[1], reverse=True)
    return ranked


def normalize(list):
    if sum(list) == 0:
        return [1/6 for p in list]
    else:
        prob_factor = 1 / sum(list)
        return [prob_factor * p for p in list]


def prediction(query):
    scores = scoring_query(query)
    score_list = []
    pred= []
    for score in scores:
        score_list.append(score[1])
    score_list = normalize((score_list))
    for i in range(len(scores)):
        pred.append((scores[i][0], score_list[i]))  #(speaker, probability)
    return pred

#Call prediction('hi bold') for example

