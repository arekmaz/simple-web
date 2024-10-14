import { app } from './server/app.js'

const port = process.env.PORT || 4000

app.listen(port, () => {
 console.log(`server listening on http://localhost:${port}`)
})
