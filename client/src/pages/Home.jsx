import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
    return (
        <ErrorBoundary>
            <div className="home-container">
                <div className="logo-section">
                    <h2 className="project-name">Welcome to <span className="brand-name">FutureForge</span></h2>
                </div>
                <h1 className="home-title">Your Career Guidance Portal</h1>
                <p className="home-description">
                    FutureForge is your one-stop platform for personalized career guidance, skill development roadmaps, and tracking your learning progress.
                </p>
                
                <div className="home-links">
                    <Link to="/career-guidance" className="home-link">
                        Career Guidance
                    </Link>
                    <Link to="/progress" className="home-link">
                        My Progress
                    </Link>
                </div>

                <div className="chat-button-container">
                    <Link to="/chatbot" className="chat-button">
                        Ask a Doubt
                    </Link>
                </div>
            </div>
            <Footer />
        </ErrorBoundary>
    );
};

export default Home;
