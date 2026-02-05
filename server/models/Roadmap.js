const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['video', 'article', 'course', 'project'], default: 'article' },
    duration: String
});

const phaseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    resources: [resourceSchema],
    duration: String
});

const roadmapSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    careerPath: {
        type: String,
        required: true
    },
    phases: [phaseSchema],
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
