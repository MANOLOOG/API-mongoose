const express = require("express");
const kodersRouter = require("./routes/koders.router");
const practiceRouter = require("./routes/practice.router");

const app = express();

app.use(express.json());

app.use("/koders", kodersRouter);
app.use("/practice", practiceRouter);

app.get("/", (request, response) => {
  response.json({
    message: "Koders API v1",
  });
});

module.exports = app;
