//import { mongodbUser } from "./mongodb-user";
import { mongodbUserQuery } from "./query/user-query";
import { mongodbFileUploadQuery } from "./query/fileUpload";

export const factory = {
  getMongobdUser: () => {
    return mongodbUserQuery;
  },

 
  getMongobdFileUpload: () => {
    return mongodbFileUploadQuery;
  },


};
