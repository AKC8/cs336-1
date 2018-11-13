const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect(`mongodb://cs336:${process.env.MONGO_PASSWORD}@ds151463.mlab.com:51463/cs336`, function (err, client) {
  if (err) throw err

  db = client;
  app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/addPerson.html'));

// Gets the number of years a person has been with the company for
const getYear = (startDate) => {
  const today = new Date();
  const birthDate = new Date(startDate);
  let year = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    year--;
  }
  return year;
}

app.get('/people', (req, res) => {
  db.collection('people').find().toArray(function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(data);
  });
})
.post('/people', (req, res) => {
  db.collection('people').insertOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    loginId: req.body.loginId,
    startDate: req.body.startDate,
  }, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.sendStatus(200);
  });
});

app.get('/person/:id', (req, res) => {
  db.collection('people').findOne({
    "loginId": req.params.id,
  }, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (data === null) {
      res.sendStatus(404);
    } else {
      res.json(data);
    }
  })
});

app.get('/person/:id/name', (req, res) => {
  db.collection('people').findOne({
    "loginId": req.params.id
  }, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (data === null) {
      res.sendStatus(404);
    } else {
      res.json(`${person.firstName} ${person.lastName}`);
    }
  });
});

app.get('/person/:id/year', (req, res) => {
  db.collection('people').findOne({
    "loginId": req.params.id
  }, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (data === null) {
      res.sendStatus(404);
    } else {
      res.json(getYear(person.startDate));
    }
  });
});

app.get('/', (req, res) => res.sendStatus(404));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
