import database from "infra/database.js"

async function status(request, response) {
  const updatedAt = new Date().toISOString()

  const postgresVersionResult = await database.query("SHOW server_version;")
  const postgresVersionValue = postgresVersionResult.rows[0].server_version

  const maxConnectionsResult = await database.query("SHOW max_connections;")
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections

  const databaseName = process.env.POSTGRES_DB
  const openedConnectionsResult = await database.query({
    text: "SELECT count(*) as opened_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  })

  const openedConnectionsValue = parseInt(openedConnectionsResult.rows[0].opened_connections)

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: parseInt(openedConnectionsValue)
      }
    }
  })
}

export default status;
