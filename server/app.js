import express from 'express'
import { migrateDb } from './sqliteMigrations.js'
import { html } from './html.js'

export const app = express()

migrateDb(1)

app.use(express.static('client'))

app.get('/', (req, res) => {
    return res.send(html`
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Todos</title>
          <meta name="description" content="description"/>
          <meta name="author" content="author" />
          <meta name="keywords" content="keywords" />
          <link rel="stylesheet" href="./index.css" type="text/css" />
          <script src="/htmx.js"></script>
        </head>
        <body>
          <h1>Todos</h1>
        </body>
      </html>
    `)
})

  app.get('/test', (req, res) => res.send(html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Todos</title>
      <meta name="description" content="description"/>
      <meta name="author" content="author" />
      <meta name="keywords" content="keywords" />
      <link rel="stylesheet" href="./index.css" type="text/css" />
      <script src="/htmx.js"></script>
    </head>
    <body>
      <h1>Todos</h1>
    </body>
  </html>
`))

