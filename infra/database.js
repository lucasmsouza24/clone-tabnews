import { Client } from "pg";

function getSSLValues() {
  return process.env.NODE_ENV === "production" ? true : false
}

async function createNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  })

  await client.connect();

  return client;
}

async function query(queryObject) {
  let client
  
  try {
    client = await createNewClient()
    const res = await client.query(queryObject)    
    return res
  } catch (error) {
    console.error(error)
  } finally {
    client.end()
  }
}

export default {
  query,
  createNewClient,
}
