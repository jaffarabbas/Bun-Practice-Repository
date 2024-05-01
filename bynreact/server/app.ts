import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expense.ts";

const app = new Hono();

app.use('*',logger())

app.get("/test",c => {
    return c.json({message: "Hello, World!"});
})

app.route("api/expense",expenseRoute)

export default app;