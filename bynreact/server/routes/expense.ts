import { Hono } from "hono";
import { number, z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
    id : z.number().int().positive().min(1),
    title: z.string().min(5).max(255),
    amount: z.number().int().positive(),
})

type Expenses = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({id: true});

const  fakeExpenses: Expenses[] = [
    {id: 1, title: "Car Insurance", amount: 294.67},
    {id: 2, title: "Car Payment", amount: 294.67},
    {id: 3, title: "Mortgage", amount: 294.67},
];

export const expenseRoute = new Hono()
.get("/", async (c) => {
    return c.json({expences: fakeExpenses});
})
.post("/",zValidator("json",createPostSchema),async (c) => {
    const data = await c.req.valid("json");
    fakeExpenses.push({id: fakeExpenses.length + 1, ...data});
    c.status(201);
    return c.json(data);
})
.get("/total-spent", async (c) => {
    const total = fakeExpenses.reduce((acc, cur) => acc + cur.amount, 0);
    return c.json({totalSpent: total});
})
.get("/:id{[0-9]}+", async (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const check = fakeExpenses.find(e => e.id === id); 
    if(!check){
        return c.notFound();
    } 
    return c.json(check);
})
.delete("/:id{[0-9]}+", async (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const index = fakeExpenses.findIndex(e => e.id === id); 
    if(index === -1){
        return c.notFound();
    } 
    const deletedData = fakeExpenses.splice(index,1)[0];
    return c.json({expense: deletedData});
})