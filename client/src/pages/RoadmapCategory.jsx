import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./RoadmapCategory.css";

const RoadmapCategory = () => {
  const { category } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/progress/roadmaps/${category}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setRoadmap(response.data);
      } catch (error) {
        setError("Failed to load roadmap. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRoadmap();
    }
  }, [category, user]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!roadmap || !Array.isArray(roadmap.roadmapData) || roadmap.roadmapData.length === 0) {
    return <div className="error">No roadmap data found.</div>;
  }

  const renderDays = () => {
    return roadmap.roadmapData.map((day, index) => (
      <div key={index} className="day-task fade-in">
        <h3>Day {day.Day}</h3>
        <p><strong>Task:</strong> {day.Task}</p>
        <p><strong>Description:</strong> {day.Description}</p>
        <p><strong>Estimated Time:</strong> {day.EstimatedTime} hours</p>
        <ul>{renderResources(day.Resources)}</ul>
      </div>
    ));
  };

  const renderResources = (resources) => {
    return resources && resources.length > 0 ? (
      resources.map((resource, i) => (
        <li key={i}>
          <a href={resource} target="_blank" rel="noopener noreferrer">
            {resource}
          </a>
        </li>
      ))
    ) : (
      <li>No resources available.</li>
    );
  };

  return (
    <div className="container">
      <h1>{roadmap.name} Roadmap</h1>
      <p>Profession: {roadmap.profession}</p>
      <p>Skill Level: {roadmap.skillLevel}</p>
      <p>Duration: {roadmap.weeks} weeks</p>
      <p>Daily Hours: {roadmap.dailyHours}</p>

      <div className="roadmap-content">{renderDays()}</div>
    </div>
  );
};

export default RoadmapCategory;
