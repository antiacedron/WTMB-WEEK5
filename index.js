const express = require('express')
const bodyParser = require('body-parser') 

const app = express() 

require ("./mongo-connection") 

// const Person= require ("./models/person") 
// const Book= require ("./models/book") 
// const City= require ("./models/city") 
const Personservice= require ("./services/person-service") 
const Bookservice= require ("./services/book-service") 
const Cityservice= require ("./services/city-service") 

app.set('view engine', 'pug') 
app.use(bodyParser.json()) 

app.get('/', async(req, res, next) => {
    res.render("index") 
    //res.sendFile(__dirname + "/index.html") 
    //res.send(await Personservice.findAll()) 
  }) 

  // PERSON ENDPOINTS 
  
  app.get('/person/all', async (req, res, next) => {
    const people = await Personservice.findAll()
    res.render('person', { people: people }) 
  }) 
  
  app.get('/person/:id', async (req, res) => {
    const user = await Personservice.findByID(req.params.id)
    res.send(user)  
  }) 

  app.get("/person/name/:name", async (req, res) => {
    const user = await Personservice.findByName(req.params.name)
    res.render('data', { data: user })
  }) 
  
  app.post('/person', async (req, res, next) => {
    const person = await Personservice.add(req.body) 
    res.send(person) 
  }) 

  app.delete('/person/:personId', async (req, res) => {
    await Personservice.del(req.params.personId)
    res.send("ok") 
  }) 
 

//BOOKS ENDPOINTS 

app.get('/book/all', async (req, res, next) => {
  const books = await Bookservice.findAll()
  res.render('book', { books: books }) 
}) 

app.get('/book/:id', async (req, res) => {
  const book = await Bookservice.findByID(req.params.id)
  res.send(book)  
}) 

app.get("/book/title/:title", async (req, res) => {
  const book = await Bookservice.findByTitle(req.params.title)
  res.send(book)  
}) 

app.post('/book', async (req, res, next) => {
  const booktitle = await Bookservice.add(req.body) 
  res.send(booktitle) 
}) 

app.post('/book/add-reader', async (req, res, next) => {
  const bookreader = await Bookservice.addReader(req.body.bookId, req.body.personId) 
  res.send(bookreader) 
}) 

app.delete('/book/:bookId', async (req, res) => {
  await Bookservice.del(req.params.bookId) 
  res.send("ok") 
}) 

app.listen(5000, () => {
  console.log('Server listening') 
}) 


 
 

 


 