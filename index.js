const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000



// Middleware

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8iybe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("rutir_bundil");
      const userCollection = database.collection("users");
      // create a document to insert
      // const doc = {
      //   name: "Naeem",
      //   email: "admin@admin.com",
      // }

      // Load data from database

      app.get('/users', async(req,res) => {
        const testing = userCollection.find({})
        const users = await testing.toArray()

        res.send(users)
      })




      // Dynamically Load data 

      app.post('/users',async(req,res) => {
        // console.log(req.body);
        const newUser = req.body
        const result = await userCollection.insertOne(newUser);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.json(result)
      })


      // delete an item

      app.delete('/users', async(req,res) => {
        
      })


    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);





app.get('/',(req,res) => {
    res.send('Hi, we are ready to proceed')
})

app.listen(port,() => {
    console.log('listening at' , port)
})