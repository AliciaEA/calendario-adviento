import {Hono} from "hono"
import {cors} from 'hono/cors'
import {getCalendar, createGift, openGift} from "./db/queries"

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

// Open Calendar
app.patch("/api/open/:id",(c)=>{
  const id = Number(c.req.param("id"))
openGift(id)
return c.json({message: "Happy Christmas little hackclubber, git opened!"})
})

// Fill

app.get("/api/setup",(c) =>{
  createGift("🎄 Day 1: Christmas song")
  createGift("🎁 Day 2: Discount on Github Shop")
  createGift("🎁 Day 3: A 3d Printer")

  return c.json({message: "Advent Calendar Initialized with 3 gifts"})
})

const port = Number(process.env.PORT) || 3000
console.log(`Servidor corriendo en el puerto ${port}`)

export default {
  port,
  fetch: app.fetch,}