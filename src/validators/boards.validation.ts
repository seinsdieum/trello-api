import Joi from 'joi';
export type Board = {
  id: number;
  name: string;
  color: string;
  description?: string;
  createdBy: number;
  createdAt?: Date;
};

export const createBoardSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().min(2).required(),
  color: Joi.string().min(2).required(),
  description: Joi.string().optional(),
  createdBy: Joi.number().required(),
  createdAt: Joi.date().optional(),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  color: Joi.string().min(2).optional(),
  description: Joi.string().optional(),
  createdBy: Joi.number().optional(),
  createdAt: Joi.date().optional(),
});
