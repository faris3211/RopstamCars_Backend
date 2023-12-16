const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

console.log('in db file');

const connectDB = async () => {
  mongoose.set('strictQuery', false);

  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`Mongo DB is connected : ${conn.connection.host}`);
};

module.exports = connectDB;
