import express from 'express';
import { 
    createSnippet, 
    getSnippets,
    getSnippetById,
    updateSnippet,
    deleteSnippet,
} from '../controllers/snippet.controller';
import { get } from 'http';

const router = express.Router();

router
.post('/snippets', createSnippet)
.get('/snippets', getSnippets)
.get('/snippets/:id', getSnippetById)
.put('/snippets/:id', updateSnippet)
.delete('/snippets/:id', deleteSnippet);


export default router;