import tkinter as tk
from tkinter import *
from tkinter import Text
from tkinter import ttk
import final_prediction
from tkinter.messagebox import showinfo
import Bert as bert
import TFIDF as tf

def predict(query):
    bert_values = bert.prediction(query)
    tf_values = tf.prediction(query)
    average = final_prediction.combine(bert_values, tf_values)
    return average

def submit_clicked():
    """ callback when the login button clicked
    """
    input =str(query.get())
    msg = f'You entered: {query.get()}'
    showinfo(
        title='Result',
        message=msg + print(predict(input))
    )

root = tk.Tk()

canvas = tk.Canvas(root, height=200, width=200, bg="#263D42")
canvas.pack()

frame = tk.Frame(root, bg="white")
frame.place(relwidth=0.8,relheight=0.8, relx=0.1, rely=0.1)

query = tk.StringVar()
textbox = ttk.Entry(root, textvariable=query)

phrase_label = ttk.Label(root, text="Phrase:")
phrase_label.pack(fill='x', expand=True)

textbox = ttk.Entry(root, textvariable=query)
textbox.pack(fill='x', expand=True)
textbox.focus()

submit_button = ttk.Button(root, text="Submit", command=submit_clicked)
submit_button.pack(fill='x', expand=True, pady=10)

root.mainloop() 