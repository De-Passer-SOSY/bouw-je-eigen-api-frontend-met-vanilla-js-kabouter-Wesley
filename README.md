[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Fh7nJqBW)
# 🛠️ **Projectopdracht – Bouw je eigen API + frontend met Vanilla JS**

## 👨‍🏫 Doel van dit project

Je bouwt een eigen **RESTful API** met **Node.js**, **Express** en **MySQL**, en voorziet een volledige documentatie via **Swagger**. Daarna verbind je deze API met een **frontend gebouwd in Vanilla JavaScript** die toelaat om data te lezen, toe te voegen, te bewerken en te verwijderen.

------

## 🧠 Onderwerp: jij kiest!

Je kiest een onderwerp dat jou interesseert. Denk aan iets dat je zelf nuttig of leuk vindt om te bouwen. Enkele voorbeelden:

- 🎮 Gameslijst
- 🍔 Receptenboek
- 🛍️ Producten in een winkelmandje
- 📘 Boekenverzameling
- 🐶 Dierenprofielen
- 💬 Quotes-verzamelaar
- 🎵 Muzieklijst
- 🎬 Films en reviews
- ✅ To-do lijst

Je gebruikt minstens **één MySQL-tabel**. Relaties zijn **niet verplicht**, maar mogen toegevoegd worden als uitbreiding.

------

## 📦 Technologieën



| Onderdeel        | Technologie                                      |
| ---------------- | ------------------------------------------------ |
| Backend          | Node.js + Express                                |
| Database         | MySQL                                            |
| API-documentatie | Swagger (via swagger-ui-express + swagger-jsdoc) |
| Frontend         | HTML, CSS, Vanilla JavaScript                    |
| Tools            | Git, GitHub, Postman, VS Code                    |

------

## 🏗 Structuur van je project

```
/mijn-project
├── backend/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── swagger.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

------

## ✅ Technische vereisten

### 🛠️ Backend

-  Minstens **1 MySQL-tabel** met 3 à 5 velden (zoals `id`, `titel`, `beschrijving`, `datum`, ...).
-  Volledige CRUD-operaties via RESTful API:
  - `GET /items`
  - `GET /items/:id`
  - `POST /items`
  - `PUT /items/:id`
  - `DELETE /items/:id`
-  Correcte foutafhandeling (`try/catch`) en HTTP-statuscodes (`200`, `201`, `400`, `404`, `500`).
-  Swagger-documentatie beschikbaar op `/api-docs`.
-  API moet testbaar zijn via Postman.

### 💻 Frontend

-  Ophalen en tonen van gegevens (GET).
-  Toevoegen via formulier (POST).
-  Bewerken via formulier of bewerk-knop (PUT).
-  Verwijderen via knop (DELETE).
-  Dynamische HTML-opbouw (DOM-manipulatie).
-  UI moet logisch, duidelijk en aangenaam zijn (HTML + CSS, geen frameworks).

------

## 📘 Swagger voorbeeld

```
"/items": {
  "get": {
    "summary": "Geeft alle items terug",
    "responses": {
      "200": {
        "description": "Succesvol",
        "content": {
          "application/json": {
            "schema": {
              "type": "array",
              "items": { "$ref": "#/components/schemas/Item" }
            }
          }
        }
      }
    }
  }
}
```

------

## 📤 Inlevering

- Upload je project naar **GitHub**.
- Voeg een duidelijke `README.md` toe waarin staat:
  - Hoe je de backend opstart (inclusief `npm install`)
  - Wat het onderwerp is
  - Welke endpoints je hebt
  - Hoe je frontend werkt
  - Waar Swagger-documentatie te vinden is

------

## 📅 Deadline

🗓️ **Vrijdag 6 juni 2025**
 📍 **Inlevering via GitHub**

------

## 🧪 Evaluatie (Totaal: 100 punten)



| Onderdeel                                       | Punten  |
| ----------------------------------------------- | ------- |
| API werkt correct met MySQL (CRUD)              | 30      |
| Swagger-documentatie is aanwezig en correct     | 10      |
| Frontend leest en toont gegevens correct        | 20      |
| Frontend kan toevoegen, bewerken en verwijderen | 20      |
| Gebruiksvriendelijke interface (HTML/CSS)       | 10      |
| Codekwaliteit (structuur, leesbaarheid)         | 5       |
| GitHub: nette structuur + duidelijke commits    | 5       |
| **TOTAAL**                                      | **100** |

------

## 💡 Tips

- Gebruik `.env` om je databasewachtwoord niet hardcoded te bewaren.
- Test elke route afzonderlijk in Postman.
- Bouw eerst je backend, dan pas je frontend.
- Gebruik `async/await` met `try/catch` in je controllers.
- Maak gebruik van `swagger-jsdoc` voor automatische documentatie.
