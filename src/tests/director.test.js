const supertest = require("supertest")
const app = require("../app")
require("../models")

const BASE_URL = "/api/v1/directors"

let directorId

test("POST -> 'url' should return staus code 201 and res.body.name === body.name", async () => {
  const director = {
    firstName: "Marcel",
    lastName: "Carne",
    nationality: "France",
    image: "https://en.wikipedia.org/wiki/File:MarcelCarn%C3%A9.jpg",
    birthday: "1906-08-18",
  }

  const res = await supertest(app).post(BASE_URL).send(director)
  directorId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(director.firstName)
})

test("GET -> 'url' should return status code 200", async () => {
  const res = await supertest(app).get(BASE_URL)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("PUT -> 'url/:id' should return status code 200 and res.body.firstName = body.firstName", async () => {
  const director = {
    firstName: "Marcel",
    lastName: "Carne",
    nationality: "France",
    image: "https://en.wikipedia.org/wiki/File:MarcelCarn%C3%A9.jpg",
    birthday: "1906-08-18",
  }
  const res = await supertest(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(director)
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(director.firstName)
})

test("DELETE -> 'url/:id' should return status code 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${directorId}`)
  expect(res.status).toBe(204)
})
