function Person(firstName) {
  //{}, this = {}, return this
  this.firstName = firstName;
  // console.log("this=", this);
}
Person.prototype.sayName = function () {
  console.log("Hello " + this.firstName);
};

function Student(firstName, lastName) {
  Person.call(this, firstName);
  this.lastName = lastName;
}

Object.setPrototypeOf(Student, Person);

Student.isStudent = function (ob) {
  return ob.constructor === Student;
};
console.log(Student.prototype.constructor);

Student.prototype.isStudent = true;

const p = new Person("Bill");
const s = new Student("John", "Lennon");

console.log(Student.isStudent(s));
