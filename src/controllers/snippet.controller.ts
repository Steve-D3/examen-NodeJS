import Snippet from '../models/snippets.model';
import { Request, Response } from 'express';
import { SnippetType } from '../types';

const encodeSnippet = (code: string): string => Buffer.from(code, "utf-8").toString("base64");
const decodeSnippet = (code: string): string => Buffer.from(code, "base64").toString("utf-8");


export const createSnippet = async (req: Request, res: Response) => {
  try {
    const { title, code, language, tags } = req.body;
    if (!title || !code || !language) {
      res.status(400).json({ error: "Title, code en language zijn verplicht!" });
      return;
    }

    const encodedCode = encodeSnippet(code);

    const newSnippet = new Snippet({ title, code: encodedCode, language, tags });
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
    
    let query: any = {};

    if (language) query.language = new RegExp(`^${language}$`, "i");
    if (tags) query.tags = { $all: (tags as string).split(",") };

    const snippets = await Snippet.find(query)
      .sort({ [sort as string]: order === "desc" ? -1 : 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const decodedSnippets = snippets.map((snippet) => ({
      ...snippet.toObject(),
      code: decodeSnippet(snippet.code),
    }));
    console.log(decodedSnippets);
    res.status(200).json(decodedSnippets);
  } catch (error) {
    res.status(500).json({ error: "Fout bij ophalen van snippets" });
  }
};

export const getSnippetById = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      res.status(404).json({ error: "Snippet niet gevonden" });
      return;
    }
    console.log(snippet);
    res.status(200).json({ ...snippet.toObject(), code: decodeSnippet(snippet.code) });
  } catch (error) {
    res.status(500).json({ error: "Fout bij ophalen van snippet" });
  }
};

export const updateSnippet = async (req: Request, res: Response) => {
  try {
    const { title, code, language, tags } = req.body;

    const updatedData: any = {};
    if (title) updatedData.title = title;
    if (code) updatedData.code = encodeSnippet(code);
    if (language) updatedData.language = language;
    if (tags) updatedData.tags = tags;

    const snippet = await Snippet.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!snippet) {
      res.status(404).json({ error: "Snippet niet gevonden" });
      return;
    }

    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ error: "Fout bij updaten van snippet" });
  }
};


export const deleteSnippet = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);

    if (!snippet) {
      res.status(404).json({ error: "Snippet niet gevonden" });
      return;
    }

    res.status(200).json({ message: "Snippet verwijderd" });
  } catch (error) {
    res.status(500).json({ error: "Fout bij verwijderen van snippet" });
  }
};