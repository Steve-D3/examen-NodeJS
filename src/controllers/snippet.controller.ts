import Snippet from '../models/snippets.model';
import { Request, Response } from 'express';
import { SnippetType } from '../types';

const encodeSnippet = (code: string) => Buffer.from(code).toString("base64");
const decodeSnippet = (code: string) => Buffer.from(code, "base64").toString("utf-8");


export const createSnippet = async (req: Request, res: Response) => {
    try {
        const { title, code, language, tags } = req.body;
        if (!title || !code || !language) {
            res.status(400).json({ error: "Title, code en language zijn verplicht!" });
            return;
        }

        const encodedCode = encodeSnippet(code);

        const newSnippet = new Snippet({ title, code: encodedCode, language, tags});
        await newSnippet.save();

        res.status(201).json({ status: "Success", data: newSnippet });
    }
    catch (error) {
        res.status(500).json({ error: "Fout bij opslaan van snippet" });
    }
};

export const getSnippets = async (req: Request, res: Response) => {
    try {
      const { language, tags, page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;
      
      let query = {};
  
      if (language) query.language = new RegExp(`^${language}$`, "i");
      if (tags) query.tags = { $all: tags.split(",") };
  
      const snippets = await Snippet.find(query)
        .sort({ [sort]: order === "desc" ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const decodedSnippets = snippets.map((snippet) => ({
        ...snippet._doc,
        code: decodeSnippet(snippet.code),
      }));
  
      res.status(200).json(decodedSnippets);
    } catch (error) {
      res.status(500).json({ error: "Fout bij ophalen van snippets" });
    }
  };