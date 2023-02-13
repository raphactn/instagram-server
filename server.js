const express = require("express");
const ListResultsServices = require("./bot");
const bodyParser = require("body-parser");
const cors = require("cors");
const timeout = require("connect-timeout");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: "50mb",
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());

app.post("/instagramData", cors(), async (req, res) => {
  const { url } = req.body;
  if (url) {
    const result = await ListResultsServices({ data: url });
    return res.send(result);
  }
  return res.status(400).send("Informe a url da imagem");
});

app.listen(PORT, (err) => {
  if (err) throw err;
});
