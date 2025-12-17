import {db} from "./index"
import {days} from "./schema"
import {eq} from "drizzle-orm"

// See all days

export function getCalendar(){
    return db.select().from(days).all()
}

// new gift
export function createGift(content: string){
    return db.insert(days).values({
        content: content, 
        isOpen:0
    }).run()
}

// Open gift
export function openGift(id:number){
    return db.update(days).set({isOpen:1}).where(eq(days.id, id)).run()
}