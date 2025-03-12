import express from 'express';
import { 
    createSnippet, 
    getSnippets,
    getSnippetById,
    updateSnippet,
    deleteSnippet 
} from '../controllers/snippet.controller';

const router = express.Router();

router
.post('/', createSnippet)
.get('/', getSnippets)
.get('/:id', getSnippetById)
.put('/:id', updateSnippet)
.delete('/:id', deleteSnippet);


export default router;