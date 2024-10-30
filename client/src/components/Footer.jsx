import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Career Guidance Portal</p>
                
                <nav className="footer-links">
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                </nav>
                
                <div className="footer-social">
                    <a href="https://github.com/MDFarhan-1" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://instagram.com/far_han.11" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ marginLeft: '1rem' }}>
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://linkedin.com/in/md-farhan-2a49692a8" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ marginLeft: '1rem' }}>
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
