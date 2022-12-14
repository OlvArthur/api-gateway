import express from 'express'
import router from '@shared/infra/express/router'

const app = express()

const PORT = 5000

app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
