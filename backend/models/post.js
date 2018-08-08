//imports mongoose
const mongoose = require('mongoose');

//creates a schema
const postSchema = mongoose.Schema({
  //Angular TS -> string,  NodeJS -> String
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  imagePath: {
    type: String,
    require: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

//once schema defined, mongoose needs a model to work with it.
//schema is a blueprint. To create models/objects, we need to turn
//definition into a model.
module.exports = mongoose.model('Post', postSchema);
//Posts will be the auto name of Documents

