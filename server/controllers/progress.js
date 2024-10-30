const jwt = require('jsonwebtoken');
const Progress = require('../models/Progress');
const axios =require("axios");

const generateLearningPlan = async (req, res) => {
    const { name, profession, skillLevel, weeks, dailyHours, userId } = req.body;

    const totalDays = weeks * 7;
    const daysPerRequest = 7; 
    let currentDay = 1;
    const allTasks = [];
    const maxRetries = 5; 

    const generateTasks = async (attempt = 1) => {
        const prompt = `
        Profession: ${profession}
        Target Skill Level: ${skillLevel} (Beginner, Intermediate, Advanced)
        Time to Learn: ${weeks} weeks
        Daily Commitment: ${dailyHours} hours

        Based on the above details, provide a structured daily learning plan in JSON format for achieving the specified skill level in ${profession}. 
        The plan should include tasks for days ${currentDay} to ${Math.min(currentDay + daysPerRequest - 1, totalDays)} and should include:

        For each day:
        - "Day": Day number
        - "Task": Specific tasks to be done for that day
        - "Description": A brief explanation of what to do for that task
        - "Resources": Only links to resources for learning (no titles or additional text)
        - "Estimated Time": Approximate time required for each task in hours (fitting within the daily commitment)

        Ensure that there are no gaps in the weekly learning plan.
        Please ensure the response is structured as JSON for programmatic parsing.
        `;

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 2000,
                    temperature: 0.5,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            let data = response.data.choices[0].message.content;

            data = data.replace(/^```json|```$/gm, '').trim();

            try {
                const parsedData = JSON.parse(data);
                if (Array.isArray(parsedData)) {
                    allTasks.push(...parsedData);
                    return true; 
                } else {
                    throw new Error('Response is not an array');
                }
            } catch (jsonError) {
                // console.error("JSON parse error:", jsonError);
                if (attempt < maxRetries) {
                    // console.log(`Retrying API call... Attempt ${attempt + 1}`);
                    return generateTasks(attempt + 1);
                } else {
                    // console.error("Max retry limit reached. Could not parse response as JSON.");
                    return false; 
                }
            }

        } catch (apiError) {
            return false; 
        }
    };

    while (currentDay <= totalDays) {
        const success = await generateTasks();
        if (!success) {
            return res.status(500).json({ error: 'Failed to generate learning plan' });
        }
        currentDay += daysPerRequest; 
    }

    if (allTasks.length < totalDays) {
        console.warn(`Warning: Only ${allTasks.length} tasks generated for ${totalDays} days.`);
    }

    try {
        const roadmap = new Progress({
            name,
            profession,
            skillLevel,
            weeks,
            dailyHours,
            roadmapData: allTasks,
            user_id: userId,
        });
        await roadmap.save();

        res.json(roadmap); 
    } catch (dbError) {
        res.status(500).json({ error: 'Failed to save roadmap to database' });
    }
};


const getAllRoadmaps = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const roadmaps = await Progress.find({ user_id: userId });
        res.json(roadmaps);
    } catch (error) {
        // console.error("Error retrieving roadmaps:", error);
        res.status(500).json({ error: 'Failed to retrieve roadmaps' });
    }
};
const getRoadmapById = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        const roadmap = await Progress.findById(id);

        if (!roadmap) {
            return res.status(404).json({ error: 'Roadmap not found' });
        }

        res.json(roadmap);
    } catch (error) {
        // console.error("Error retrieving roadmap:", error);
        res.status(500).json({ error: 'Failed to retrieve roadmap' });
    }
};

const deleteRoadmapById = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedRoadmap = await Progress.findByIdAndDelete(id);

        if (!deletedRoadmap) {
            return res.status(404).json({ error: 'Roadmap not found' });
        }

        res.json({ message: 'Roadmap deleted successfully', deletedRoadmap });
    } catch (error) {
        // console.error("Error deleting roadmap:", error);
        res.status(500).json({ error: 'Failed to delete roadmap' });
    }
};

module.exports = {
    generateLearningPlan,
    getAllRoadmaps,
    getRoadmapById,
    deleteRoadmapById, 
};