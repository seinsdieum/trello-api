import { Request, Response } from 'express';
import { getCardStorage } from '../dao/cards.dao';

export async function getAllCards(req: Request, res: Response) {
  try {
    const storage = await getCardStorage();
    const data = await storage.readAll();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}

export async function getCard(req: Request, res: Response) {
  try {
    const storage = await getCardStorage();
    const data = await storage.read(Number(req.params.id));
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}

export async function addCard(req: Request, res: Response) {
  try {
    const storage = await getCardStorage();
    const result = await storage.write(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}
export async function updateCard(req: Request, res: Response) {
  try {
    const storage = await getCardStorage();
    const result = await storage.update(Number(req.params.id), req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}
export async function deleteCard(req: Request, res: Response) {
  try {
    const storage = await getCardStorage();
    const result = await storage.delete(Number(req.params.id));
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) res.status(400).json(err.message);
  }
}
