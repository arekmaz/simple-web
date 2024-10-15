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
  <li class="flex gap-3 items-center justify-between">
    <form action="/edit-todos/${props.id}" method="POST" class="flex gap-2">
      <label class="flex gap-2 items-center">
        Title
        <input name="title" value="${props.title}" class="border" />
      </label>

      <label>
        <input name="done" type="checkbox" checked=${props.done === 1} />
      </label>

      <button type="submit" class="bg-green-300 border p-1 rounded-md">
        Save
      </button>
    </form>

    <form action="/delete-todos/${props.id}" method="POST">
      <button type="submit" class="bg-red-300 border p-1 rounded-md">
        Delete
      </button>
    </form>
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
              <input autofocus name=title required placeholder="Do laundry" />
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
  if (!req.body.title) {
    return res.status(400).send("title required");
  }

  addTodo.run({ title: req.body.title });
  return res.redirect("/");
});

const deleteTodo = db.prepare("delete from todos where id=@id");

app.post("/delete-todos/:id", (req, res) => {
  const { id } = req.params;

  deleteTodo.run({ id });
  return res.redirect("/");
});

const updateTodo = db.prepare(
  "update todos set title=@title, done=@done where id=@id",
);

app.post("/edit-todos/:id", (req, res) => {
  const { id } = req.params;

  if (!req.body.title) {
    return res.status(400).send("title required");
  }

  updateTodo.run({ id, title: req.body.title, done: req.body.done ? 1 : 0 });
  return res.redirect("/");
});
