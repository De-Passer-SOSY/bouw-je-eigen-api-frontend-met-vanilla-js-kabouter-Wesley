const express = require("express");
const cors = require("cors");
const db = require("./services/db");
const { findUserByName, verifyPassword, addUser } = require("./auth");

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
    const { id, naam, categorie, kleur, materiaal, beschrijving } = req.body;

    await db("rubber_ducks")
      .where({ id })
      .update({ naam, categorie, kleur, materiaal, beschrijving });

    res.json({ message: "Duck Updated Succesfully!" });
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

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await addUser(username, password);
    res.status(201).json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByName(username);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isValid = await verifyPassword(
    password,
    user.passwordHash,
    user.passwordSalt
  );
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" });
  res.status(200).json({ message: "Login successful" });
});

app.listen(3333, () => {
  console.log("Server is running on port 3333! http://localhost:3333/ducks");
});
