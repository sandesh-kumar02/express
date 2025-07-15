<<<<<<< HEAD
const express = require('express');
const app = express();
// const router = express.Router();


// creating middleware
// app.use(function(req, res, next){
//     console.log('hello');
//     next();
// });

// named middleware
// const logged = (req, res, next)=>{
//     console.log('logged');
//     next();
// };
// logged middleware use karna hota hai kyunki ye named middleware hota hai
//2. usecase ye hai ki ye ek specific route par bhi kaam kar sakta hai


// use router middleware
// router.use((req, res, next)=>{
//     console.log('hello router method');
//     next();
// })


// creating basic router
app.get('/', (req, res)=>{
    res.send('<h1>this is home page</h1>');
});

app.get('/about', (req, res)=>{
    res.send('<h1>this is about page</h1>');
});
// named middleware ko hame routes ke sabse niche use karna hota hai
// app.use(logged);

// use route method in express
// app.use('/sandesh',router); // iska use kisi router se pahale name dene ke liye use hota hai jisase ye nested router ban jate hai.


// error middleware
// error 404 page not found message show if not found any exists routs.
app.use((req, res)=>{
    res.send('<h1>Error : 404 Page not found</h1>');
});

// router me galat hai to ye error dega middleware
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(505).send('something broke!');
    next();
})

app.listen('3000', ()=>{
    console.log('server is eunning on port no. 3000');
})
=======
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
>>>>>>> 116da0787da6e137c002fd4c692d8261e8badd34
