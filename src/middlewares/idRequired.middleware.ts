import { Request, Response, NextFunction } from 'express'

export function isIdRequired() {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    if (!id) {
      res.status(400).json({ error: 'wrong id' })
      return
    }
    if (isNaN(Number(id))) {
      console.log(Number(id))
      res.status(400).json({ error: 'id should be type of number' })
      return
    }

    next()
  }
}
