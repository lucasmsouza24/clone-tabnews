function status(request, response) {
  response.status(200).json({"message": "endpoint /api/v1/status working!"})
}

export default status;