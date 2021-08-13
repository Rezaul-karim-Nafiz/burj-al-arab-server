const express = require('express')
const app = express()
const port = 5000;
const password = 'rFsFs2TqQB6u5GfL'
const cors = require('cors');
app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})


const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const uri = "mongodb+srv://newPractice:rFsFs2TqQB6u5GfL@cluster0.0mhgi.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookingsCollection = client.db("burjAlArab").collection("bookings");
  app.post('/addBooking', (req, res) => {
    const newBooking = req.body;
    bookingsCollection.insertOne(newBooking)
      .then(result => {
        res.send(result.insertedId > 0)
      })
  })

  app.get('/booking', (req, res) => {
    console.log(req.query.email)
    bookingsCollection.find({email: req.query.email})
    .toArray((err, document) => {
      res.send(document)
    })
  })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})