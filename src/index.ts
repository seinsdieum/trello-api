import express, { json } from 'express'
import cors from 'cors'
import boardRoute from './routes/boards.route'
import cardRoute from './routes/cards.route'
import { logging } from './middlewares/logging.middleware'
import { helmetMiddleware } from './middlewares/helmetSecurity.middleware'
import { usersRoute } from './routes/users.route'
import { passport } from './modules/auth/passport'
import 'dotenv/config'

const app = express()
app.disable('x-powered-by')
app.use(passport.initialize())
if (process.env.NODE_ENV?.trimEnd() === 'production') app.use(helmetMiddleware)

app.use(cors())
app.use(json())
app.use(logging())
app.use('/boards', boardRoute)
app.use('/cards', cardRoute)
app.use('/users', usersRoute)

app.listen(3000)
