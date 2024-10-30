import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateRoadmapModal from "./CreateRoadmapModal";
import { useAuth } from "../context/AuthContext";
import "./Roadmaps.css"; 
import { FaTrash } from "react-icons/fa"; 

const Roadmap = () => {
  const [roadmapCategories, setRoadmapCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchRoadmaps = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/progress/roadmaps", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setRoadmapCategories(response.data);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    if (user?.token) {
      fetchRoadmaps();
    }
  }, [user, fetchRoadmaps]);

  const handleAddRoadmap = () => setShowModal(true);

  const handleRoadmapClick = (roadmapId) => {
    navigate(`/progress/${roadmapId}`);
  };

  const handleDeleteRoadmap = async (roadmapId) => {
    try {
      await axios.delete(`http://localhost:5000/api/progress/roadmaps/${roadmapId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchRoadmaps(); 
    } catch (error) {
      console.error("Error deleting roadmap:", error);
    }
  };

  return (
    <div className="container">
      <h1>Progress</h1>
      <button onClick={handleAddRoadmap} className="btn btn-primary">
        Add New Roadmap
      </button>

      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="roadmap-category-list">
          {roadmapCategories.map((roadmap) => (
            <div key={roadmap._id} className="roadmap-card">
              <h3 onClick={() => handleRoadmapClick(roadmap._id)}>{roadmap.name}</h3>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDeleteRoadmap(roadmap._id);
                }}
              >
                <FaTrash /> 
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CreateRoadmapModal
          closeModal={() => setShowModal(false)}
          refreshRoadmaps={fetchRoadmaps}
        />
      )}
    </div>
  );
};

export default Roadmap;
