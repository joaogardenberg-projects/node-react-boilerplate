async function index(req, res) {
  res.send({ index: true })
}

async function show(req, res) {
  res.send({ show: true })
}

async function create(req, res) {
  console.log(req.body)
  res.send({ create: true })
}

async function update(req, res) {
  res.send({ update: true })
}

async function destroy(req, res) {
  res.send({ destroy: true })
}

module.exports = { index, show, create, update, destroy }
