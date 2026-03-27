const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Note: I fixed the typo from "SceintificName" to "scientificName"
    scientificName: {
        type: String,
        required: true
    },
    family: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    // NEW FIELDS FOR THE ACCORDION
    howToUse: {
        type: String,
        default: "Information coming soon."
    },
    benefits: {
        type: String,
        default: "Information coming soon."
    },
    precautions: {
        type: String,
        default: "Consult a specialist before use."
    },
    imageUrl: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum: ['Culinary', 'Medicinal', 'Aromatic']
    }
}, {
    timestamps: true
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;