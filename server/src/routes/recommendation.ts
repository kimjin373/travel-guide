import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { AppError } from '../middleware/errorHandler';
import { getRecommendations } from '../services/recommendationService';

const router = Router();

const recommendationSchema = Joi.object({
  budget: Joi.number().required().min(0),
  startDate: Joi.date().required(),
  endDate: Joi.date().required().min(Joi.ref('startDate')),
  people: Joi.number().required().min(1).max(10),
  accommodationTier: Joi.number().required().min(1).max(5),
  themes: Joi.array().items(Joi.string()).default([])
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { error, value } = recommendationSchema.validate(req.body);
    if (error) {
      throw new AppError(400, error.details[0].message);
    }

    const recommendations = await getRecommendations(value);
    res.json(recommendations);
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(500, 'Failed to get recommendations');
  }
});

export const recommendationRouter = router; 