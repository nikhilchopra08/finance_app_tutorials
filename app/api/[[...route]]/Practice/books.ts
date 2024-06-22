import { Hono } from "hono";
import { defaultConfig } from "next/dist/server/config-shared";

const app = new Hono();

app.get("/" , (c) => c.json("List books"))
app.post("/" , (c) => c.json("add book"))
app.get("/:id" , (c) => c.json(`book with id : ${c.req.param('id')}`))

export default app;