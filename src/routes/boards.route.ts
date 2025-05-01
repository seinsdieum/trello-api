import { Router } from 'express'
import {
  createBoardSchema,
  updateBoardSchema
} from '../validators/boards.validation'
import { validateBody } from '../middlewares/validateBody.middleware'
import {
  addBoard,
  deleteBoard,
  getAllBoards,
  getBoard,
  updateBoard
} from '../controllers/boards.controller'
import { isIdRequired } from '../middlewares/idRequired.middleware'
import { bodyRequired } from '../middlewares/bodyRequired.middleware'
import { authenticateJwt, authorizeRoles } from '../middlewares/auth.middleware'

const router = Router()
router.get('/', getAllBoards)
router.post(
  '/',
  authenticateJwt,
  authorizeRoles('admin'),
  bodyRequired(),
  validateBody(createBoardSchema),
  addBoard
)
router.get('/:id', isIdRequired(), getBoard)
router.put(
  '/:id',
  authenticateJwt,
  authorizeRoles('admin'),
  isIdRequired(),
  bodyRequired(),
  validateBody(updateBoardSchema),
  updateBoard
)
router.delete(
  '/:id',
  authenticateJwt,
  authorizeRoles('admin'),
  isIdRequired(),
  deleteBoard
)

export default router
