import client from "../mongodb-user";
import mongo, { ObjectId } from "mongodb";
import { factory } from "../factory";

client;
const dbName = process.env.db_name;
//console.log(Client);

export const mongodbFileUploadQuery = {
  client,

  async fileUpload( userName,userId, fileUrl , code ) {
    try {
      const result = await client
        .db(dbName)
        .collection("files")
        .insertOne(
          {userName,userId, fileUrl , code },
          { upsert: true, returnDocument: "after" }
        );
      return result.value;
    } catch (error) {
      throw error;
    }
  },

  async getFiles(userId) {
    try {
      const result = await client
        .db(dbName)
        .collection("files")
        .find({userId:userId }).toArray();
      return result;
    } catch (error) {
      throw error;
    }
  },

    async fileDelete(fileUrl) {
      try {
        const result = await client
          .db(dbName)
          .collection("files")
          .deleteOne({
            fileUrl: fileUrl,
          })
        return result;
      } catch (error) {
        throw error;
      }
    },

    async getFile(userId, code) {
      try {
        const result = await client
          .db(dbName)
          .collection("files")
          .findOne({ userId: userId, code: code }, { fileUrl: 1 });
        return result;
      } catch (error) {
        throw error;
      }
    },
};
