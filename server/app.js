import express from "express";
import bodyParser from "body-parser";
import { migrateDb } from "./sqliteMigrations.js";
import { html } from "./html.js";
import { db } from "./db.js";

migrateDb(1);

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("client"));

const getTodos = db.prepare("select * from todos");

const Todo = (props) => html`
  <li>
    <p>${props.title} - ${props.done ? "Done" : "Not done"}</p>
  </li>
`;

app.get("/", (_req, res) => {
  const todos = getTodos.all();

  const body = html`
      <body>
        <main class="flex flex-col items-center w-full h-screen justify-center">
          <h1>Todos</h1>

          <form action=/todos method=POST class="flex p-5 flex-col gap-5 border rounded-md">
            <label class="flex flex-col items-center">
              Title
              <input name=title required placeholder="Do laundry" />
            </label>

            <button class="text-red-500">Add todo</button>
          </form>

          <ul>
            ${todos.map((todo) => html`<${Todo} ...${todo} />`)}
          </ul>
        </main>
      </body>
  `;

  const page = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todos</title>
        <meta name="description" content="description" />
        <meta name="author" content="author" />
        <meta name="keywords" content="keywords" />
        <link rel="stylesheet" href="./index.css" type="text/css" />
        <script src="/htmx.js"></script>
      </head>
      ${body}
    </html>
  `;

  return res.send(page);
});

const addTodo = db.prepare("insert into todos (title) values (@title)");

app.post("/todos", (req, res) => {
  console.log({ body: req.body });
  addTodo.run({ title: req.body.title });
  return res.redirect("/");
});
