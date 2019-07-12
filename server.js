var http = require('http')
var express = require('express')
var MongoClient = require('mongodb').MongoClient
var app = express()
app.get('/', function(request, response) {
  response.sendfile('index.html')
})

var server = http.createServer(app)
server.listen(8000)

MongoClient.connect('mongodb://localhost:27017/workbooks', function(
  err,
  client
) {
  if (err) throw err

  var db = client.db('workbooks')

  db.collection('tests').insert({ name: 'The First Test' })
  db.collection('timesheets')
    .find()
    .toArray(function(err, result) {
      if (err) throw err

      console.log(result)
    })
})
