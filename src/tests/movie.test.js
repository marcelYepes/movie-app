const supertest = require("supertest")
const app = require("../app")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")
require("../models")

const BASE_URL = "/api/v1/movies"

let movieId

test("POST -> 'url' should return staus code 201 and res.body.name === body.name", async () => {
  const movie = {
    name: "Three Rooms in Manhattan",
    image:
      "https://pics.filmaffinity.com/trois_chambres_a_manhattan_three_rooms_in_manhattan-255632228-mmed.jpg",
    synopsis:
      "es una película francesa de drama del año de 1965, filmada en la Ciudad de Nueva York.",
    releaseYear: "1965",
  }

  const res = await supertest(app).post(BASE_URL).send(movie)
  movieId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.name).toBe(movie.name)
})

test("GET -> 'url' should return status code 200", async () => {
  const res = await supertest(app).get(BASE_URL)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("PUT -> 'url/:id' should return status code 200 and res.body.firstName = body.firstName", async () => {
  const movie = {
    name: "Three Rooms in Manhattan",
    image:
      "https://pics.filmaffinity.com/trois_chambres_a_manhattan_three_rooms_in_manhattan-255632228-mmed.jpg",
    synopsis:
      "es una película francesa de drama del año de 1965, filmada en la Ciudad de Nueva York.",
    releaseYear: "1965",
  }
  const res = await supertest(app).put(`${BASE_URL}/${movieId}`).send(movie)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe(movie.name)
})

test("POST -> `url/:id/actors` set actors, should return status code 200 and res.body.length =1", async () => {
  const body = {
    firstName: "Robert",
    lastName: "De Niro",
    nationality: "USA",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_UY209_CR9,0,140,209_AL_.jpg",
    birthday: "1943-10-17",
  }
  const actor = await Actor.create(body)

  const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id])
  console.log(res)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
  actor.destroy()
})

test("POST -> `url/:id/directors` set directors, should return status code 200 and res.body.length =1", async () => {
  const body = {
    firstName: "Marcel",
    lastName: "Carne",
    nationality: "France",
    image: "https://en.wikipedia.org/wiki/File:MarcelCarn%C3%A9.jpg",
    birthday: "1906-08-18",
  }
  const director = await Director.create(body)

  const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id])
  console.log(res)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
  director.destroy()
})

test("POST -> `url/:id/genres` set genres, should return status code 200 and res.body.length =1", async () => {
  const body = {
    name: "Comedia",
  }
  const genre = await Genre.create(body)

  const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genre.id])
  console.log(res)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
  genre.destroy()
})

test("DELETE -> 'url/:id' should return status code 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${movieId}`)
  expect(res.status).toBe(204)
})
