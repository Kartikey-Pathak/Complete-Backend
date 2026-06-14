const { integer, pgTable, varchar ,uuid ,text }= require("drizzle-orm/pg-core");

const authorsTable=pgTable('authors',{
    id:uuid().primaryKey().defaultRandom(),
    firstName:varchar({length:55}).notNull(),
    lastName:varchar({length:55}),
    email:varchar({length:260}).notNull().unique(),
    
})
module.exports=authorsTable;
