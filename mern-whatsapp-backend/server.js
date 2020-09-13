import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1072284",
  key: "e5f2ec6decf14306ba9d",
  secret: "7b07914f7578c85a07e5",
  cluster: "eu",
  encrypted: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});

//Middleware

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//API Routes
app.get("/", (req, res) => res.status(200).send("Hello, world"));

app.get("/messages/sync", (req, res) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.status(200).send(data);
  }
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//DB Config
const connection_url =
  "mongodb+srv://admin:Wh3Ak5QnAad251qU@cluster0.bu8os.mongodb.net/WhatsappDB?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
});

const msgCollection = db.collection("messagecontents");
const changeStream = msgCollection.watch();

changeStream.on("change", (change) => {
  console.log(change);
  if (change.operationType === "insert") {
    const messageDetails = change.fullDocument;
    pusher.trigger("messages", "inserted", {
      name: messageDetails.name,
      message: messageDetails.message,
    });
  } else {
    console.log("Error triggerring pusher");
  }
});

//listen

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
