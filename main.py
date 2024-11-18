from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pdfminer.high_level import extract_text  # type: ignore
import nltk  # type: ignore
from transformers import BartForConditionalGeneration, BartTokenizer
import re
import string
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import math


# Initialize Flask app
app = Flask(__name__)

# Load your fine-tuned BART model and tokenizer
model = BartForConditionalGeneration.from_pretrained(r"C:\Users\EDWIN\OneDrive\Desktop\Study materials\SEM-5\DL project\fine_tuned_resume_summarizer")
tokenizer = BartTokenizer.from_pretrained(r"C:\Users\EDWIN\OneDrive\Desktop\Study materials\SEM-5\DL project\fine_tuned_resume_summarizer")


similarity_model = SentenceTransformer(r"C:\Users\EDWIN\OneDrive\Desktop\Study materials\SEM-5\DL project\fine_tuned_similarity_model")

def similarity(summary):

    job_descriptions = [
        "Looking for a data scientist proficient in machine learning, deep learning, and data analysis.",
        "Hiring a software engineer with experience in cloud technologies like AWS.",
        "Seeking a project manager with strong skills in Agile methodologies and team leadership.",
        "Seeking a Data Scientist/ML Engineer with expertise in AI, Python, Flask, MySQL, machine learning, and NLP for innovative projects.",
        "Lead engineering projects, optimize outcomes, and mentor teams. Requires strong project management skills, expertise in structural engineering, and a results-oriented mindset."
    ]

    resume_embedding = similarity_model.encode(summary)
    job_embeddings = similarity_model.encode(job_descriptions)

    resume_embedding = np.reshape(resume_embedding, (1, -1))
    job_embedding = np.reshape(job_embeddings, (1, -1))

    # Compute cosine similarities for each job description
    similarity_scores = cosine_similarity(resume_embedding, job_embeddings)
    return similarity_scores.tolist()


def clean_text(text):
    resume_text_cleaned = text

    # Remove URLs (links) that start with http, https, or www
    resume_text_cleaned = re.sub(r'(https?://\S+|www\.\S+)', '', resume_text_cleaned)
    resume_text_cleaned = re.sub(r'\S+@\S+', '', resume_text_cleaned)  # Remove emails
    resume_text_cleaned = re.sub(r'\t+', ' ', resume_text_cleaned).strip()  # Replace multiple tabs with a space

    return resume_text_cleaned


# Define the summarizer function
def summarizer(text, max_length=150, min_length=30, length_penalty=2.0, num_beams=4, early_stopping=True):
    inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs, max_length=max_length, min_length=min_length, length_penalty=length_penalty,
                                 num_beams=num_beams, early_stopping=early_stopping)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary


# Function to extract text from a PDF
def extract_text_from_pdf(pdf_path):
    text = extract_text(pdf_path)
    return clean_text(text)  # Ensure cleaned text is returned


# Configure CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.route('/ping', methods=['GET'])
def ping():
    """Health check endpoint"""
    return jsonify({"message": "Backend is running"}), 200

@app.route('/upload/', methods=['POST'])
def upload_file():
    try:
        # Check if a file is provided in the request
        if 'file' not in request.files:
            return jsonify({"detail": "No file provided"}), 400
        
        file = request.files['file']

        # Check if it's a PDF file
        if not file.filename.endswith('.pdf'):
            return jsonify({"detail": "Only PDF files are allowed"}), 400

        # Save the file temporarily
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        file.save(file_path)

        # Extract text from the uploaded PDF file
        resume_text_cleaned = extract_text_from_pdf(file_path)

        # Summarize the cleaned text (optional)
        summary = summarizer(resume_text_cleaned, max_length=150, min_length=30, length_penalty=2.0, num_beams=4, early_stopping=True)

        scores=similarity(summary)
        print(scores[0])

        os.remove(file_path)

        return jsonify({
            "status": "success",
            "filename": file.filename,
            "message": f"File {file.filename} uploaded and text extracted successfully",
            "extracted_text": resume_text_cleaned,
            "summary": summary, 
            "similarity": scores[0]
        }), 200

    except Exception as e:
        return jsonify({"detail": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
