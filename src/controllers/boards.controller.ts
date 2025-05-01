import { getBoardStorage } from '../dao/boards.dao';
import { Request, Response } from 'express';

export async function getAllBoards(req: Request, res: Response) {
  try {
    const storage = await getBoardStorage();
    const data = await storage.readAll();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}

export async function getBoard(req: Request, res: Response) {
  try {
    const storage = await getBoardStorage();
    const data = await storage.read(Number(req.params.id));
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}

export async function addBoard(req: Request, res: Response) {
  try {
    const storage = await getBoardStorage();
    const result = await storage.write(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}
export async function updateBoard(req: Request, res: Response) {
  try {
    const storage = await getBoardStorage();
    const result = await storage.update(Number(req.params.id), req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}
export async function deleteBoard(req: Request, res: Response) {
  try {
    const storage = await getBoardStorage();
    const result = await storage.delete(Number(req.params.id));
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}
