const express = require('express');
const router = express.Router();
const { generateLearningPlan, getAllRoadmaps, getRoadmapById, deleteRoadmapById } = require('../controllers/progress');

router.post('/generate-roadmap', generateLearningPlan);
router.get('/roadmaps', getAllRoadmaps);
router.get('/roadmaps/:id', getRoadmapById); 
router.delete('/roadmaps/:id', deleteRoadmapById);

module.exports = router;
