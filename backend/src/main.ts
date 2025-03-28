import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { sum } from './sum'

const PORT = process.env.PORT ?? 8080
// フロントエンドの URL を 'http://frontend.example.com' のように指定してください。
const CORS_ORIGIN = 'http://udemy-github-actions-s3-taketake.s3-website-ap-northeast-1.amazonaws.com'

const app = express()

app.use(morgan('combined'))

app.use(express.static('../frontend', { extensions: ['html'] }))

app.use(cors({ origin: CORS_ORIGIN }))

app.get('/api/health', async (req, res) => {
  res.json({
    status: 'OK',
    version: '3.0.0'
  })
})

app.get('/api/sum', async (req, res) => {
  const input1 = parseInt(req.query.input1 as string)
  const input2 = parseInt(req.query.input2 as string)

  if (isNaN(input1) || isNaN(input2)) {
    res.status(400).json({
      type: 'InvalidInput'
    })
    return
  }

  const result = sum(input1, input2)

  res.json({
    sum: result
  })
})

app.listen(PORT, () => {
  console.log(`Sample app listening on port ${PORT}`)
})
