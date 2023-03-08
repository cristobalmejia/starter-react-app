import  path from "path";
import  express from "express";

const app = express();
const port = 3000;

import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, '../client/public')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Qué pede!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  //res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
  //call();
});

