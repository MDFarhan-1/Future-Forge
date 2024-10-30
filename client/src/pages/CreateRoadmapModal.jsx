import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./CreateRoadmapModal.css";

const CreateRoadmapModal = ({ closeModal, refreshRoadmaps }) => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [weeks, setWeeks] = useState("");
  const [dailyHours, setDailyHours] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const [success, setSuccess] = useState(false); 

  const { user } = useAuth();

  const handleSubmit = async () => {
    setError("");  
    setLoading(true); 
    setSuccess(false); 

    if (!name) {
      setError("Please enter a name for the roadmap.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/progress/generate-roadmap", {
        name,
        profession,
        skillLevel,
        weeks: parseInt(weeks),
        dailyHours: parseFloat(dailyHours),
        userId: user.id,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSuccess(true);
        refreshRoadmaps();
        setTimeout(() => {
          closeModal();
          setSuccess(false); 
        }, 1500);
      }
    } catch (error) {
      setError("An error occurred while creating the roadmap.");
      console.error("Failed to create roadmap:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Roadmap</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Roadmap generated and saved successfully!</p>}

        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Profession:</label>
        <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} />

        <label>Skill Level:</label>
        <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
          <option value="">Select Skill Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Weeks to Learn:</label>
        <input type="number" value={weeks} onChange={(e) => setWeeks(e.target.value)} />

        <label>Daily Hours:</label>
        <input type="number" step="0.5" value={dailyHours} onChange={(e) => setDailyHours(e.target.value)} />

        <button onClick={handleSubmit} className="btn generate-btn">
          {loading ? <span className="loading-spinner"></span> : "Generate with AI"}
        </button>
        <button onClick={closeModal} className="btn cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default CreateRoadmapModal;
