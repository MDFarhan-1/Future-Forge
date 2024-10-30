const axios = require('axios');

const getGuidance = async (req, res) => {
    const { interests, goal, fascination } = req.body;
    // console.log("Interests:", interests, "Goal:", goal, "Fascination:", fascination);

    const prompt = `
    Interests: ${interests}, Goal: ${goal}, Fascination: ${fascination}.
    Based on the above details, provide 5-10 career suggestions tailored to these interests in a sorted order (most relevant first) with each career in JSON format.

    Each entry should include:
    - "S.No": The serial number
    - "Name": Name of the job role
    - "Description": A brief description of the job role and responsibilities
    - "AverageSalary": The average salary in Indian Rupees (INR)
    - "FamousRecruiters": A list of notable companies in India that frequently recruit for this role
    - "SkillsRequired": A brief list of key skills typically required
    - "JobOutlook": Expected demand or growth prospects for this role in the next 5-10 years

    Please structure the response as JSON so that it can be parsed programmatically.
    `;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o', 
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 1000,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        let content = response.data.choices[0].message.content;

        content = content.replace(/^```json|```$/gm, '').trim();

        let suggestions;
        try {
            suggestions = JSON.parse(content);
        } catch (parseError) {
            // console.error("Partial or malformed JSON response. Parsing incomplete response.");
            const partialJson = content.substring(0, content.lastIndexOf('},') + 1) + ']';
            try {
                suggestions = JSON.parse(partialJson);
            } catch (secondParseError) {
                res.status(500).json({ message: 'Error parsing JSON response from OpenAI' });
                return;
            }
        }

        res.json(suggestions);
    } catch (error) {
        // console.error("Error while calling OpenAI API:", error.message);
        res.status(500).json({ message: 'Error while calling OpenAI API' });
    }
};

module.exports = { getGuidance };
