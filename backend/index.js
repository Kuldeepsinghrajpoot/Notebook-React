const connectToMongo = require("./db");
const express = require('express')
const mongoose = require("mongoose");
var cors = require('cors');
const app = express();
app.use(cors());
const port = 5000

mongoose.set('strictQuery', true);


connectToMongo();
mongoose.set('strictQuery', false);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})