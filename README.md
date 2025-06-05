---

## 📦 Technologieën

| Onderdeel        | Technologie                                      |
| ---------------- | ------------------------------------------------ |
| Backend          | Node.js + Express                                |
| Database         | MySQL                                            |
| API-documentatie | Swagger (via swagger-ui-express + swagger-jsdoc) |
| Frontend         | HTML, CSS, Vanilla JavaScript                    |
| Tools            | Git, GitHub, Postman, VS Code                    |

---

## Getting Started

### Deployment

Start the html page:

```bash
start frontend/index.html
```

Start the database:

```bash
node backend/app.js
```

De database data kan je vinden op: `http://localhost:3333`

Endpoints:

- `http://localhost:3333`
- `http://localhost:3333/ducks`
- `http://localhost:3333/duck/:id`
- `http://localhost:3333/addDuck`
- `http://localhost:3333/updateDuck`
- `http://localhost:3333/removeDuck/:id`
