const express = require("express");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);

  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repIndex = repositories.findIndex((rep) => rep.id === id);

  if (repIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  if (repositories[repIndex].likes !== likes) {
    return response.status(400).json({ error: "Operation denied" });
  }

  const rep = {
    title,
    url,
    techs,
    likes,
  };

  repositories[repIndex] = rep;

  return response.json(rep);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repIndex = repositories.findIndex((rep) => rep.id === id);

  if (repIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  repositories.splice(repIndex, 1);

  return response.status(204).send();
});

app.put("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repIndex = repositories.findIndex((rep) => rep.id === id);

  if (repIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  const likes = repositories[repIndex].likes + 1;

  const rep = {
    ...repositories[repIndex],
    likes,
  };

  repositories[repIndex] = rep;

  return response.json(rep);
});

app.listen(3333, () => {
  console.log("❤ Started");
});
