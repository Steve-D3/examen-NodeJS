import  Snippet  from '../models/snippets.model';
import { Request, Response } from 'express';
import { SnippetType } from '../types';

const encodeSnippet = (code: string) => Buffer.from(code).toString("base64");
const decodeSnippet = (code: string) => Buffer.from(code, "base64").toString("utf-8");


export const createSnippet = async (req: Request, res: Response) => {
    try {
        const { title, code, language, tags, expiresIn } = req.body;
        if (!title || !code || !language) {
            return res.status(400).json({ error: "Title, code en language zijn verplicht!" });
        }

        const encodedCode = encodeSnippet(code);
        const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000) : null;


        const newSnippet = new Snippet({ title, code: encodedCode, language, tags, expiresIn, expiresAt });
        await newSnippet.save();

        res.status(201).json({status: "Success", data: newSnippet});
    }
    catch (error) {
        res.status(500).json({ error: "Fout bij opslaan van snippet" });
    }
};