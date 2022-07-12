import client from "../mongodb-user";
import { factory } from "../factory";



client;
const dbName = process.env.db_name;

export const mongodbUserQuery = {
  client,

  async registerUser(userName ,password) {
    try {
      const result = await client.db(dbName).collection("users").insertOne(
        {
          userName,
          password,
         
        },
        { $set: {} },
        { upsert: true, returnDocument: "after" }
      );
      return result.value;
    } catch (error) {
      throw error;
    }
  },

  async getByUser(userName) {
    try {
     
      const result = await client
        .db(dbName)
        .collection("users")
        .findOne({
          userName:userName
        });
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getUserDetailsByUserName(userName) {
    try {
      const result = await client
        .db(dbName)
        .collection("users")
        .findOne({ userName});
      return result;
    } catch (error) {
      throw error;
    }
  },
};
