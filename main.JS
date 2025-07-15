
import express from 'express';
import { main } from './controller/database.js';
import user from './Models/contactModel.js';
import routes from './Routs/contacts.routs.js';
const app = express();

// add middleware
app.set('view engine', 'ejs');

// routes use
app.use('/', routes);

// insert data

// const user1 = new user({
//     name : 'sandesh kumar',
//     gender : "Male",
//     age : 20
// });

// user1.save().then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// });


//database connection

main();



app.listen("3000", () => {
  console.log("server is start on port no. 3000");
});
