const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  profession: String,
  skillLevel: String,
  weeks: Number,
  dailyHours: Number,
  roadmapData: Array, 
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Progress", progressSchema);
