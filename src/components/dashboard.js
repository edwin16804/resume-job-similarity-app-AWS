import "./dashboard.css";
import image from "C:/Users/EDWIN/OneDrive/Desktop/JobAI/application/src/assets/user1.png";
import { useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";

const Dashboard = () => {
    const location = useLocation();
    const { user } = location.state;
    console.log(user.username);

    const job_descriptions = [
        "Looking for a data scientist proficient in machine learning, deep learning, and data analysis.",
        "Hiring a software engineer with experience in cloud technologies like AWS.",
        "Seeking a project manager with strong skills in Agile methodologies and team leadership.",
        "Seeking a Data Scientist/ML Engineer with expertise in AI, Python, Flask, MySQL, machine learning, and NLP for innovative projects.",
        "Lead engineering projects, optimize outcomes, and mentor teams. Requires strong project management skills, expertise in structural engineering, and a results-oriented mindset.",
    ];

    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("upload"); // Dynamic content section

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError(null); // Clear any previous error
    };

    // Handle file upload
    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setIsLoading(true);
        setError(null);
        setUploadStatus("");

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setUploadStatus(response.data.summary);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to upload file.");
        } finally {
            setIsLoading(false);
        }
    };

    // Sections for dynamic rendering
    const renderContent = () => {
        if (content === "upload") {
            return (
                <div className="resume-upload">
                    <h2>Upload Your Resume</h2>
                    <form onSubmit={handleFileUpload}>
                        <label htmlFor="resume">Choose a file:</label>
                        <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf"
                            required
                            onChange={handleFileChange}
                        />
                        <br />
                        <button type="submit" className="upload-btn" disabled={isLoading}>
                            {isLoading ? "Generating" : "Generate Summary"}
                        </button>
                    </form>
                    {uploadStatus && <div className="status-message success">{uploadStatus}</div>}
                    {error && <div className="error-message">{error}</div>}
                </div>
            );
        } else if (content === "jobs") {
            return (
                <div className="postings">
                    <h2>Explore jobs that match your skillset</h2>
                    <div className="postings-grid">
                        {job_descriptions.map((description, index) => (
                            <div className="job-data" key={index}>
                                <div className='description'>
                                    <p>{description}</p>
                                </div>
                                <div className='similarity'>
                                    <p>50%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (content === "applied") {
            return (
                <div className="postings">
                    <h2>Applications</h2>
                </div>
            );
        }
    };

    return (
        <div className="dashboard-main">
            <div className="dash-header">
                <h1>JobAI</h1>
                <h2>{user.username}</h2>
            </div>
            <div className="main-body">
                <div className="sidebar">
                    <ul className="sidebar-list">
                        <li>
                            <button
                                className="upload-btn"
                                onClick={() => setContent("upload")}
                            >
                                Upload Resume
                            </button>
                        </li>
                        <li>
                            <h3 onClick={() => setContent("jobs")}>Explore Jobs</h3>
                        </li>
                        <li>
                            <h3 onClick={() => setContent("applied")}>Applied Jobs</h3>
                        </li>
                    </ul>
                </div>
                <div className="content-area">{renderContent()}</div>
            </div>
        </div>
    );
};

export default Dashboard;
