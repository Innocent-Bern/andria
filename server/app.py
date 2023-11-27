#!/usr/bin/python3
"""
Flask server module
"""

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello world"

if __name__ == '__main__':
    app.run(debug=True)