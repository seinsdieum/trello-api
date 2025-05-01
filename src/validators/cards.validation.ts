import Joi from 'joi';

export enum CardStatus {
  complete,
  pending,
  failed,
}

export type Card = {
  id: number;
  name: string;
  description?: string;
  estimated: Date;
  dueDate: Date;
  status: CardStatus;
  labels: string[];
  createdBy: number;
  createdAt?: Date;
};

export const createCardSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().min(2).required(),
  description: Joi.string().optional(),
  estimated: Joi.date().required(),
  dueDate: Joi.date().required(),
  status: Joi.string().required(),
  labels: Joi.array<string>().required(),
  createdBy: Joi.number().required(),
  createdAt: Joi.date().optional(),
});

export const updateCardSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  description: Joi.string().optional(),
  estimated: Joi.date().optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().optional(),
  labels: Joi.array<string>().optional(),
  createdBy: Joi.number().optional(),
  createdAt: Joi.date().optional(),
});
