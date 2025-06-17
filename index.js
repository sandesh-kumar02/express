// constructor function in javascript;

function person(name, age, city) {
  this.userName = name;
  this.userAge = age;
  this.userCity = city;
}

person.prototype.talk = function () {
  console.log(
    `hello my name is : ${this.userName}, age is : ${this.userAge} and userCity is: ${this.userCity}`
  );
};





class person {
    constructor(name, age, city) {
        this.username = name;
        this.userAge  = age;
        this.userCity = city;
    }
    talk() {
        console.log(`userName is : ${this.username}, user Age is : ${this.userAge} and userCity is ${this.userCity}`);
    }
};



let p1 = new person("sandesh kumar", 20, "Gopalganj");
let p2 = new person("Golden kumar", 7, "Gopalganj");


class square extends Box() {

}