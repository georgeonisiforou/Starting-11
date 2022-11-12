const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://georgeonis:290790George@cluster0.5ia286k.mongodb.net/lfcdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const position = req.body.position;

  const player = new Player({ name: name, age: age, position: position });

  await player.save();
  res.send("inserted");
});

app.get("/display", async (req, res) => {
  Player.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/clear", async (req, res) => {
  await Player.deleteMany();
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

const Player = mongoose.model("Player", {
  name: String,
  age: Number,
  position: String,
});

module.exports = Player;
