import dotenv from "dotenv";
import mongo, { ObjectId } from "mongodb";
dotenv.config();

import { MongoClient } from "mongodb";

const url = process.env.db_url;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {});

// Database Name
const dbName = process.env.db_name;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  return "done.";
}

main().then(console.log).catch(console.error);

const database = client.db(dbName);
export default client;
