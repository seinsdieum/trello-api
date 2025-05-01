import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { User, UserRole } from '../validators/user.validation'

export const authenticateJwt = passport.authenticate('jwt', { session: false })

export function authorizeRoles(role: UserRole) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User
    if (role !== user.role) {
      res.status(403).json({ message: 'Forbidden' })
      return
    }
    next()
  }
}
