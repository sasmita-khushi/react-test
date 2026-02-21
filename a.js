import { Hono } from "hono";

const app = new Hono();

const users = [
  { id: 1, name: "Sasmita", age: 19 },
  { id: 2, name: "Rahul", age: 22 },
  { id: 3, name: "Priya", age: 21 },
];

app.get("/users", (c) => {
  return c.json(users.name);
});

app.get("/users/:id", (c) => {
  const id = Number(c.req.param("id"));
  const user = users.find((u) => u.id === id);
  return c.json(user || { message: "Not found" });
});

export default app;
