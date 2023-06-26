const supertest = require("supertest")
const app = require("../app")
require("../models")

const BASE_URL = "/api/v1/actors"

let actorId

test("POST -> 'url' should return staus code 201 and res.body.name === body.name", async () => {
  const actor = {
    firstName: "Robert",
    lastName: "De Niro",
    nationality: "USA",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_UY209_CR9,0,140,209_AL_.jpg",
    birthday: "1943-10-17",
  }

  const res = await supertest(app).post(BASE_URL).send(actor)
  actorId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(actor.firstName)
})

test("GET -> 'url' should return status code 200", async () => {
  const res = await supertest(app).get(BASE_URL)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("PUT -> 'url/:id' should return status code 200 and res.body.firstName = body.firstName", async () => {
  const actor = {
    firstName: "Robert",
    lastName: "De Niro",
    nationality: "USA",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_UY209_CR9,0,140,209_AL_.jpg",
    birthday: "1943-10-17",
  }
  const res = await supertest(app).put(`${BASE_URL}/${actorId}`).send(actor)
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(actor.firstName)
})

test("DELETE -> 'url/:id' should return status code 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${actorId}`)
  expect(res.status).toBe(204)
})
