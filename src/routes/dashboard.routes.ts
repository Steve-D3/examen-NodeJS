import express from 'express';
const router = express.Router();
import Snippet from '../models/snippets.model';


router.get("/", async (req, res) => {
    try {
        const { language, tags } = req.query;
        let query: any = { expiresAt: { $gte: new Date() } };

        if (language) query.language = new RegExp(`^${language}$`, "i");
        if (tags) query.tags = { $all: (tags as string).split(",") };

        const snippets = await Snippet.find(query);
        const decodedSnippets = snippets.map((snippet) => ({
            code: Buffer.from(snippet.code, "base64").toString("utf-8"),
        }));

        res.render("dashboard", { snippets: decodedSnippets });
    } catch (error) {
        res.status(500).send("Fout bij ophalen van snippets");
    }
});

export default router;