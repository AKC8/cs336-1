var Person = require('./exercise2-1');

// Student
function Student(name, birthdate, friends, subject) {
  Person(this, name, birthdate, friends);
  this.subject = subject;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.greet = function() {
  return "I'm a student";
};

const student1 = new Student('Mark Wissink', '12/11/1997', [], 'Computer Science');
console.log(student1.getAge());
console.log(student1.greet());
console.log(student1.subject);
