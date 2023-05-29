const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
    //   not sure if these are the correct versions 
      unique: true,
      required: true,
      trimmed: true,
    },
    
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = userSchema;