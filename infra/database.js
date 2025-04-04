import { Client } from "pg";

async function getClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  })

  await client.connect()

  return client
}

async function query(queryObject) {
  const client = await getClient()

  try {
    const res = await client.query(queryObject)    
    return res
  } catch (error) {
    console.error(error)
  } finally {
    client.end()
  }
}

export default {
  query: query,
}
