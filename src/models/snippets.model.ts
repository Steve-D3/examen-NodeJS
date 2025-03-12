import mongoose from 'mongoose';
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
    createdAt: {
        type: Date,
        default: null
    },
    updatedAt: {
        type: Date,
        default: null
    }
},
    { timestamps: true }
);
  

export default mongoose.model('Snippet', snippetSchema);