const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectID, ref: "User" },
});

module.exports = model("Post", postSchema); // Post nom de la collectio et postSchema : schema que va utiliser la collection pour initialiser (instancier) la table.
