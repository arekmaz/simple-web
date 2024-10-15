import { app } from "./server/app.js";

const port = process.env.PORT || 4000;
const host = process.env.NODE_ENV === "development" ? "localhost" : "0.0.0.0";

app.listen(port, host, () => {
  console.log(`server listening on http://localhost:${port}`);
});
