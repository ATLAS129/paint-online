import express from "express";
import expressWs from "express-ws";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const WSServer = expressWs(app);

const aWss = WSServer.getWss();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    if (msg.method == "connection") {
      connectionHandler(ws, msg);
    } else if (msg.method === "draw") {
      broadcastConnection(ws, msg);
    }
  });
});

app.post("/image", (req, res) => {
  try {
    const data = req.body.img.replace("data:image/png;base64,", "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`),
      data,
      "base64"
    );
    return res.status(200).json({ body: "downloaded" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
app.get("/image", (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = "data:image/png;base64," + file.toString("base64");
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.listen(PORT, () => console.log("server started on port " + PORT));

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
