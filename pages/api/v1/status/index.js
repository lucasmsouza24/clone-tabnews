import database from "../../../../infra/database.js"

async function status(request, response) {
  const res = await database.query('SELECT 1 + 1 as sum;')
  console.log(res.rows[0])

  response.status(200).json({"message": "endpoint /api/v1/status working!"})
}

export default status;
