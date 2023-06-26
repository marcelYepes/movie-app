const supertest = require("supertest")
const app = require("../app")
require("../models")

const BASE_URL = "/api/v1/genres"

let genreId

test("POST -> 'url' should return staus code 201 and res.body.name === body.name", async () => {
  const genre = {
    name: "Comedia",
  }

  const res = await supertest(app).post(BASE_URL).send(genre)
  genreId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.name).toBe(genre.name)
})

test("GET -> 'url' should return status code 200", async () => {
  const res = await supertest(app).get(BASE_URL)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("PUT -> 'url/:id' should return status code 200 and res.body.firstName = body.firstName", async () => {
  const genre = {
    name: "Comedia",
  }
  const res = await supertest(app).put(`${BASE_URL}/${genreId}`).send(genre)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe(genre.name)
})

test("DELETE -> 'url/:id' should return status code 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${genreId}`)
  expect(res.status).toBe(204)
})
