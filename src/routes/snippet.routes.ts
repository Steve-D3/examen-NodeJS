import express from 'express';
import { 
    createSnippet, 
    getSnippets 
} from '../controllers/snippet.controller';

const router = express.Router();

router
.post('/', createSnippet)
.get('/', getSnippets);


export default router;