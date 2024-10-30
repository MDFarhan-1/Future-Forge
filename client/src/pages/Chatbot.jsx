import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; 

const ChatPage = () => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]); 
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => setUserInput(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return; 

        const newMessage = { role: "user", content: userInput };
        setChatHistory([...chatHistory, newMessage]); 

        setLoading(true);
        setUserInput(""); 

        try {
            const res = await axios.post('http://localhost:5000/api/chat', { message: userInput });
            const aiReply = { role: "assistant", content: res.data.reply };
            setChatHistory((prevHistory) => [...prevHistory, aiReply]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { role: "assistant", content: "An error occurred while fetching the response." }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                <div className="chat-history">
                    {chatHistory.map((message, index) => (
                        <div key={index} className={`chat-bubble ${message.role}`}>
                            <p>{message.content}</p>
                        </div>
                    ))}
                    {loading && <div className="chat-bubble assistant loading">Generating...</div>}
                </div>
                <form onSubmit={handleSubmit} className="chat-input-form">
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                        className="chat-input"
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
