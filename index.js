import express from 'express'

const app = express()

app.use(express.static('client'))

const port = process.env.PORT || 4000

app.listen(port, () => {
 console.log(`server listening on http://localhost:${port}`)
})
