const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ducks", async (req, res) => {
  try {
    const rubberDucks = await db("rubber_ducks");
    res.status(200).json(rubberDucks);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/duck/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const rubberDucks = await db("rubber_ducks").where("id", id);
    if (rubberDucks) {
      res.status(200).json(rubberDucks);
    } else {
      res.status(404).json({ message: "Absence not found" });
    }
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3333, () => {
  console.log("Server is running on port 3333! http://localhost:3333/ducks");
});
