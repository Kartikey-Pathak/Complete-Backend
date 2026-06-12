const {defineConfig }=require("drizzle-kit");
require("dotenv/config");

const config= defineConfig({
  out: './drizzle',
  schema: './drizzle/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

module.exports=config;