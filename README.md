

---

# Job-Resume-Matcher

A web-based application designed to match job descriptions with resumes by computing similarity scores. The project utilizes natural language processing (NLP) models for text summarization and semantic similarity analysis, providing a tool to assess the compatibility of resumes with job listings.

## Features

- **Resume Text Extraction**: Extract text from PDF resumes.
- **Resume Summarization**: Summarizes lengthy resume content to focus on key skills and experiences.
- **Job Description Matching**: Matches resumes with relevant job descriptions based on semantic similarity.
- **Similarity Scoring**: Outputs a similarity score (in percentage) between the resume and job descriptions.
- **User-Friendly Interface**: Allows easy uploading of PDF resumes for quick analysis.

## Tech Stack

- **Frontend**:
  - React
  - Axios (for making HTTP requests)
  

- **Backend**:
  - Flask (Python web framework)
  - Hugging Face Transformers for text summarization (BART model)
  - Sentence-Transformers for computing semantic similarity (using pre-trained models)
  - PDFMiner for extracting text from resumes
  - Scikit-learn (for cosine similarity computation)
  
## Setup and Installation

### Prerequisites

Before running the project, make sure you have the following installed:

- Python 3.x
- Node.js (for frontend)

### Backend Setup (Flask)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-resume-matcher.git
   cd job-resume-matcher
   ```

2. Create a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Download the pre-trained models (BART, Sentence Transformers) as specified in the `app.py` or modify the paths accordingly.

5. Run the Flask backend server:
   ```bash
   python app.py
   ```
   The server will be running at `http://localhost:5000`.

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required Node packages:
   ```bash
   npm install  # or yarn install
   ```

3. Run the React development server:
   ```bash
   npm start  # or yarn start
   ```
   The app will be running at `http://localhost:3000`.

## Working 


https://github.com/user-attachments/assets/7164f2d8-1bc6-4229-9b52-9c78529bcfc5


## How It Works

1. **Upload a Resume**: The user uploads a PDF resume.
2. **Text Extraction**: The system extracts text from the resume using the `PDFMiner` library.
3. **Text Summarization**: The extracted text is summarized using a fine-tuned BART model.
4. **Similarity Calculation**: The summarized resume is compared with a list of predefined job descriptions using semantic similarity models (Sentence-Transformers).
5. **Display Results**: The app displays similarity scores for each job description in percentage format.

## API Endpoints

### `/ping`

- **Method**: GET
- **Description**: Health check endpoint to verify that the backend is running.

### `/upload/`

- **Method**: POST
- **Description**: Upload a PDF file containing the resume.
- **Request**: 
  - Form data: `file` (PDF file)
- **Response**: JSON with the following fields:
  - `status`: success or error message
  - `filename`: name of the uploaded file
  - `extracted_text`: cleaned text from the resume
  - `summary`: summarized resume content
  - `similarity`: List of similarity scores with predefined job descriptions





---

### Notes:
- **Model Files**: Make sure to add instructions about downloading or providing paths for the BART and Sentence-Transformer models used in the backend.
- **Customizations**: Modify the app's behavior based on your own deployment preferences or API usage if needed.

