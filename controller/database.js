import mongoose from 'mongoose';


// create mongoose connection
main()
  .then((result) => {
    console.log("mongodb are connect");
  })
  .catch((err) => {
    console.log(err);
  });

export async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/college");
}