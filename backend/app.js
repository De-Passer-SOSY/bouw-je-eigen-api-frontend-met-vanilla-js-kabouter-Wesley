const express = require("express");
const cors = require("cors");
const db = require("./services/db");

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

app.post("/addDuck", async (req, res) => {
  const { naam, categorie, kleur, materiaal, beschrijving } = req.body;

  if (!naam || !categorie || !kleur || !materiaal || !beschrijving) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const [id] = await db("rubber_ducks").insert({
      naam,
      categorie,
      kleur,
      materiaal,
      beschrijving,
    });

    res.status(201).json({ id });
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/updateDuck", async (req, res) => {
  try {
    const { naam, categorie, kleur, materiaal, beschrijving } = req.body;
    const allDucks = await db("rubber_ducks");
    allDucks.forEach(async (duck) => {
      if (duck.naam === naam) {
        const id = duck.id;
        console.log(id);

        await db("rubber_ducks")
          .where({ id })
          .update({ naam, categorie, kleur, materiaal, beschrijving });

        res.json({ message: "Duck Updated Succesfully!" });
      } else {
        res.json({ message: "Duck Updated Failed" });
      }
    });
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/removeDuck/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await db("rubber_ducks").where({ id }).del();
    if (deleted) res.json({ message: "Verwijderd" });
    else res.status(404).json({ error: "Niet gevonden" });
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3333, () => {
  console.log("Server is running on port 3333! http://localhost:3333/ducks");
});
