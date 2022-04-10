#if __name__ == '__main__':
import Bert as bert
import TFIDF as tf

def average2(value1, value2):
    return (value1 + value2)/2

def combine (list1, list2):
    average = []
    for i in range(len(list1)):
        for j in range(len(list2)):
            if list1[i][0] == list2[j][0]:
                value = average2(list1[i][1], list2[j][1])
                average.append((list1[i][0], round(value, 3)))
    return average

def predict(query):   #input string or something that can be turned into string
    query = str(query)
    bert_values = bert.prediction(query)
    tf_values = tf.prediction(query)
    average = combine(bert_values, tf_values)
    best = sorted(average, key=lambda x: x[1], reverse=True)[0]
    return best[0], average
# example:
if __name__ == '__main__' or __name__ == 'final_prediction':
    print(predict('acting'))