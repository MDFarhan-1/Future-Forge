import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CareerGuidance from './pages/CareerGuidance';
import Progress from './pages/Progress';
import RoadmapCategory from './pages/RoadmapCategory';
import ChatbotPage from "./pages/Chatbot";
import ErrorBoundary from './components/ErrorBoundary'; // Custom error boundary
import ContactPage from './pages/ContactPage';
import './App.css';


const ProtectedRoute = ({ element, ...props }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/login" />;
};

const RedirectIfAuthenticated = ({ element }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/" /> : element;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<RedirectIfAuthenticated element={<Login />} />} />
                        <Route path="/register" element={<RedirectIfAuthenticated element={<Register />} />} />
                        <Route
                            path="/career-guidance"
                            element={<ErrorBoundary><CareerGuidance /></ErrorBoundary>}
                        />
                        <Route
                            path="/progress"
                            element={<ProtectedRoute element={<ErrorBoundary><Progress /></ErrorBoundary>} />}
                        />
                        <Route
                            path="/progress/:category"
                            element={<ProtectedRoute element={<ErrorBoundary><RoadmapCategory /></ErrorBoundary>} />}
                        />
                        <Route
                            path="/chatbot"
                            element={<ErrorBoundary><ChatbotPage /></ErrorBoundary>}
                        />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
