import React, { useState } from 'react';
import axios from 'axios';
import './CareerGuidance.css'; 

const CareerGuidance = () => {
    const [interests, setInterests] = useState('');
    const [goal, setGoal] = useState('');
    const [fascination, setFascination] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        setResults([]); 
        setLoading(true); 

        try {
            const response = await axios.post('http://localhost:5000/api/career/guidance', { interests, goal, fascination });
            setLoading(false); 

            if (Array.isArray(response.data)) {
                setResults(response.data);
            } else {
                setError("Unexpected response format. Please try again.");
            }
        } catch (err) {
            setLoading(false); 
            console.error(err);
            setError("An error occurred while fetching career suggestions. Please try again.");
        }
    };

    return (
        <div className="career-guidance-container">
            <h2>Career Guidance</h2>
            <form onSubmit={handleSubmit} className="career-guidance-form">
                <input
                    type="text"
                    placeholder="Interests"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    required
                    className="career-input"
                />
                <input
                    type="text"
                    placeholder="Goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    required
                    className="career-input"
                />
                <input
                    type="text"
                    placeholder="Fascination"
                    value={fascination}
                    onChange={(e) => setFascination(e.target.value)}
                    required
                    className="career-input"
                />
                <button type="submit" className="career-button">Get Suggestions</button>
            </form>

            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            <div className="results-container">
                {results.length > 0 ? (
                    <div>
                        <h3>Career Suggestions:</h3>
                        <ul className="results-list">
                            {results.map((item) => (
                                <li key={item['S.No']} className="result-item">
                                    <h4>{item.Name}</h4>
                                    <p><strong>Description:</strong> {item.Description}</p>
                                    <p><strong>Average Salary:</strong> {item.AverageSalary}</p>
                                    <p><strong>Famous Recruiters:</strong> {item.FamousRecruiters.join(', ')}</p>
                                    <p><strong>Skills Required:</strong> {item.SkillsRequired.join(', ')}</p>
                                    <p><strong>Job Outlook:</strong> {item.JobOutlook}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    !error && <p>No suggestions available. Please submit your details above.</p>
                )}
            </div>
        </div>
    );
};

export default CareerGuidance;
