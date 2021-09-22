import express from "express";
import registerRoutes from "./routes.js";
import { setEnvironment } from "./config/env.js";
import { connectToDB } from "./config/db.js";

const app = express();
const port = 3000;

setEnvironment(app);
connectToDB();
registerRoutes(app);

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile("index.html", { root: __dirname + "/../dist/" });
  } else {
    res.send("runing on development mod!");
  }
});

app.listen(port, () => {
  console.log(
    `MEVN app listening at http://localhost:${port} in ${process.env.NODE_ENV} mode!`
  );
});
