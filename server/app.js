import express from 'express'
import { migrateDb } from './sqliteMigrations.js'
import { html } from './html.js'

export const app = express()

migrateDb(1)

app.use(express.static('client'))

app.get('/test', (req, res) => res.send(html`
this is a test ${'<script>alert("1")</script>'}
`))

