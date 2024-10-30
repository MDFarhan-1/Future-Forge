const axios = require('axios');
const { encoding_for_model } = require('tiktoken'); 

const API_URL = "https://api.openai.com/v1/chat/completions";

const chatController = async (req, res) => {
    const { message } = req.body;
    // console.log("User message:", message);
    const prompt=message+ " answer briefly"

    const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt}
    ];

    const encoder = encoding_for_model("gpt-4o");

    const messageTokens = encoder.encode(message).length;
    const maxTokens = Math.min(1500, 15 * messageTokens); 

    try {
        const response = await axios.post(
            API_URL,
            {
                model: "gpt-4o",  
                messages: messages,
                max_tokens: 1500, 
                temperature: 0.7,
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply: reply });
    } catch (error) {
        // console.error("Error querying ChatGPT API:", error.message);
        res.status(500).json({ error: 'Failed to get response from ChatGPT API' });
    }
};

module.exports = {
    chatController
};
