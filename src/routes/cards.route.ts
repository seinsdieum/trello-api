import { Router } from 'express'
import { validateBody } from '../middlewares/validateBody.middleware'
import { isIdRequired } from '../middlewares/idRequired.middleware'
import { bodyRequired } from '../middlewares/bodyRequired.middleware'
import {
  addCard,
  deleteCard,
  getAllCards,
  getCard,
  updateCard
} from '../controllers/cards.controller'
import {
  createCardSchema,
  updateCardSchema
} from '../validators/cards.validation'

const router = Router()
router.get('/', getAllCards)
router.post('/', bodyRequired(), validateBody(createCardSchema), addCard)
router.get('/:id', isIdRequired(), getCard)
router.put(
  '/:id',
  isIdRequired(),
  bodyRequired(),
  validateBody(updateCardSchema),
  updateCard
)
router.delete('/:id', isIdRequired(), deleteCard)

export default router
