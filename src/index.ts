import {Hono} from "hono"
import {cors} from 'hono/cors'
import {getCalendar, createGift, openGift, deleteGift} from "./db/queries"

const app = new Hono()

app.use('/*', cors())
app.get("/", (c) => {
  return c.text("Welcome, go to /api/calendar")
})
// See Calendar
app.get("/api/calendar", (c)=>{
  const allDays = getCalendar()
  return c.json(allDays)
})

//add
app.post("/api/calendar", async (c) => {
  try {
    const body = await c.req.json()
    // Basic validation
    if (!body || typeof body.item !== "string" || !body.item.trim()) {
      return c.json({ error: "Invalid body: expected { item: string }" }, 400)
    }

    const result = createGift(body.item.trim())
    return c.json({ message: "Gift created", result }, 201)
  } catch (err) {
    console.error("POST /api/calendar error:", err)
    return c.json({ error: String(err) }, 500)
  }
})
// Open Calendar
app.patch("/api/open/:id/open",(c)=>{
  const id = Number(c.req.param("id"))
openGift(id)
return c.json({ok:true})
})

//delete
app.patch("/api/calendar/:id",(c)=>{
  const id = Number(c.req.param("id"))
  deleteGift(id)
  return c.json({ok:true})
})

const port = Number(process.env.PORT) || 3000
console.log(`Servidor corriendo en el puerto ${port}`)

export default {
  port,
  fetch: app.fetch,}