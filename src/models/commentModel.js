const { Schema, model } = require("mongoose"); // Importation des modules Schema et model depuis Mongoose

const commentSchema = new Schema({
  // Définition du schéma pour les commentaires
  content: String, // Champ content de type String pour le contenu du commentaire
  author: { type: Schema.Types.ObjectId, ref: "User" }, // Champ author de type ObjectId faisant référence au modèle User
  post: { type: Schema.Types.ObjectId, ref: "Post" }, // Champ post de type ObjectId faisant référence au modèle Post
});

module.exports = model("comment", commentSchema); // Exportation du modèle de commentaire créé à partir du schéma commentSchema
