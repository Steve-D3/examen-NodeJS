import mongoose = require('mongoose');
import { SnippetType } from '../types'; 

const snippetSchema = new mongoose.Schema<SnippetType>({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    expiresIn: {
        type: Number,
        default: null
    }
},
    { timestamps: true }
);

// snippetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });   

export default mongoose.model('Snippet', snippetSchema);