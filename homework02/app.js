const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

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

// A helper function for finding a person and sending not found status
const findPerson = (req, id) => {
  const person = people.find(person => person.loginID === id);
  if (person === undefined) {
    res.sendStatus(404);
  }
  return person;
}

// The list of people objects that presumably work for the company
const people = [
  {
    firstName: 'Mark',
    lastName: 'Wissink',
    loginId: 'mwissink',
    startDate: '1/1/1990',
  },
  {
    firstName: 'Steve',
    lastName: 'Gates',
    loginId: 'steve',
    startDate: '3/12/2000',
  },
];

app.get('/people', (req, res) => res.json(people))
    .post('/people', (req, res) => {
	// Make sure the loginId is unique
	for (let person of people) {
	    if (person.loginId === req.body.loginId) {
		res.sendStatus(400);
		return;
	    }
	}
	// Very unsafe but whatever
	people.push(req.body);
	res.sendStatus(200);
    });

app.get('/person/:id', (req, res) => {
  const person = findPerson(req, req.params.id);
  if (person !== undefined) {
    res.json(person);
  }
});

app.get('/person/:id/name', (req, res) => {
  const person = findPerson(req, req.params.id);
  if (person !== undefined) {
    res.json(`${person.firstName} ${person.lastName}`);
  }
});

app.get('/person/:id/year', (req, res) => {
  const person = findPerson(req, req.params.id);
  if (person !== undefined) {
    res.json(getYear(person.startDate));
  }
});

app.get('/', (req, res) => res.sendStatus(404));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
