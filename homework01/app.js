const express = require('express');
const app = express();
const port = 3000;

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
const findPerson = (res, id) => {
  const person = people.find(person => person.loginID === id);
  if (person === undefined) {
    res.sendStatus(404);
  }
  return person;
}

// The list of people objects that presumably work for the company
// Since loginIDs are unique, we could use an Object and have O(1) access by id, but that seemed incorrect
const people = [
  {
    firstName: 'Mark',
    lastName: 'Wissink',
    loginID: 'mwissink',
    startDate: '1/1/1990',
  },
  {
    firstName: 'Steve',
    lastName: 'Gates',
    loginID: 'steve',
    startDate: '3/12/2000',
  },
];

app.get('/people', (req, res) => res.json(people));

app.get('/person/:id', (req, res) => {
  const person = findPerson(res, req.params.id);
  if (person !== undefined) {
    res.json(person);
  }
});

app.get('/person/:id/name', (req, res) => {
  const person = findPerson(res, req.params.id);
  if (person !== undefined) {
    res.json(`${person.firstName} ${person.lastName}`);
  }
});

app.get('/person/:id/year', (req, res) => {
  const person = findPerson(res, req.params.id);
  if (person !== undefined) {
    res.json(getYear(person.startDate));
  }
});

app.get('/', (req, res) => res.sendStatus(404));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
