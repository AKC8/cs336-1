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

// Return a greeting for a person
Person.prototype.greet = function() {
  return "I'm a student";
};

Person.prototype.addFriend = function(friend) {
  this.friends.push(friend);
  return this.friends;
};

const person1 = new Person('Mark Wissink', '12/11/1997', []);
console.log(person1.getAge());
console.log(person1.greet());

const person2 = new Person('Clark Wissink', '11/01/1996', [person1]);
console.log(person2.getAge());
console.log(person2.greet());
console.log(person2.friends);

const person3 = new Person('Stark Wissink', '03/15/1990', [person1]);
console.log(person3.addFriend(person2));

module.exports = Person;
