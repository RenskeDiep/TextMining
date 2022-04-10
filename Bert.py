if __name__ == '__main__' or __name__ == 'Bert':

    import numpy as np
    import torch

    #BERT

    #load trained model
    # change path to where the model is stored
    model = torch.load('bert_model_big.pth', map_location=torch.device('cpu'))

    def softmax(probs):
        return np.exp(probs) / np.sum(np.exp(probs), axis=0)

    def prediction(query):
        # make the query lowercase
        query = query.lower()
        pred = []
        # make sure the query is not too long
        n = 256
        if len(query) >= n:
            chunks = [query[i:i + n] for i in
                      range(0, len(query), n)]  # split the string into strings that have smaller length
            query = chunks[0] # only use first 256 characters of string
        #predict the probabilities of the query
        predicted, probabilities = model.predict([query])
        probs = softmax(probabilities[0])
        #format output same as in TF-IDF
        speakers = ['monica', 'phoebe', 'rachel', 'chandler', 'joey', 'ross']
        for i in range(len(speakers)):
            pred.append((speakers[i], probs[i]))
        return pred
    # example: print(prediction('Acting'))

