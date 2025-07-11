const { createServer } = require("https");
const { parse } = require("url");
const fs = require("fs");
const next = require("next");

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log("🚀 HTTPS server running on https://localhost:3000");
  });
});
