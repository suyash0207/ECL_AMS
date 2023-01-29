const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  // Add data to database here
  const collection = client.db("mydatabase").collection("mycollection");
collection.insertOne({ name, description }, (err, result) => {
  // Data has been added to the database
  res.redirect('back');
});


});
