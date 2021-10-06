const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    title: { type: String, required: true },
    orderId: { type: Number, required: true },
    datePosted: { type: String, required: true },
    directedBy: { type: String, required: true },
    summary: { type: String, required: false },
    relatability: { type: String, required: false },
    relatabilityScore: { type: String, required: false },
    execution: { type: String, required: false },
    executionScore: { type: String, required: false },
    context: { type: String, required: false },
    contextScore: { type: String, required: false },
    subtext: { type: String, required: false },
    subtextScore: { type: String, required: false },
    emotion: { type: String, required: false },
    emotionScore: { type: String, required: false },
    overallScore: { type: String, required: false },
    song: { type: String, required: false },
    image: { type: String, required: false },
  });

const Films = mongoose.model("Films", filmSchema);

module.exports = Films;