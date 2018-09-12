// Person
function Person(name, birthdate, friends) {
  this.name = name;
  this.birthdate = birthdate;
  this.friends = friends;
}

// http://jsfiddle.net/codeandcloud/n33RJ/
// Return the age of the person based on a birthdate
Person.prototype.getAge = function() {
  const today = new Date();
  const birthDate = new Date(this.birthdate);
  var age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Mutator for the
Person.prototype.setName = function(name) {
  this.name = name;
}

// Return a greeting for a person
Person.prototype.greet = function() {
  return "I'm a person";
};

Person.prototype.addFriend = function(friend) {
  this.friends.push(friend);
  return this.friends;
};

function arrayAssert(array1, array2) {
  console.assert(array1.length === array2.length);
  for (var i = 0; i < array1.length; i++) {
    console.assert(array1[i], array2[i]);
  }
}

const person1 = new Person('Markus Wissink', '12/11/1997', []);
console.assert(person1.greet() === "I'm a person");
console.assert(person1.name === 'Markus Wissink');
person1.setName('Mark Wissink');
console.assert(person1.name === 'Mark Wissink');

const person2 = new Person('Clark Wissink', '11/01/1995', [person1]);
console.assert(person2.getAge() > person1.getAge());
console.assert(person2.greet() === "I'm a person");
arrayAssert(person2.friends, [person1]);

const person3 = new Person('Stark Wissink', '03/15/1993', [person1]);
console.assert(person3.getAge() > person2.getAge());
arrayAssert(person3.friends, [person1]);
person3.addFriend(person2);
arrayAssert(person3.friends, [person1, person2]);

module.exports = Person;
