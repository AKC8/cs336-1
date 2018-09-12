var Person = require('./exercise2-1');

// Student
function Student(name, birthdate, friends, subject) {
  Person.call(this, name, birthdate, friends);
  this.subject = subject;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.greet = function() {
  return "I'm a student";
};

const student1 = new Student('Mark Wissink', '12/11/1997', [], 'Computer Science');
console.assert(student1.greet() === "I'm a student");
console.assert(student1.subject === 'Computer Science');

const person1 = new Person('Clark Wissink', '1/1/1990', []);
console.assert(student1.getAge() < person1.getAge());
console.assert(student1 instanceof Person === true);
console.assert(student1 instanceof Student === true);
console.assert(person1 instanceof Person === true);
console.assert(person1 instanceof Student === false);
