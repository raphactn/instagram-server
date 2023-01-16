const express = require("express");
const ListResultsServices = require("./bot");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: [
      "https://instagram-downloader-kappa.vercel.app/",
      "https://instagram-downloader-kappa.vercel.app",
      "https://instagramserverapi.herokuapp.com/instagramData",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


app.post("/instagramData", async (req, res) => {
  const { body } = req.body;
  if (body) {
    const result = await ListResultsServices({ data: body });
    return res.send(result);
  }
  return res.status(400).send("Informe a url da imagem");
});

app.listen(PORT, (err) => {
  if (err) throw err;
});
