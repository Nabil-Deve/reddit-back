const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
require("dotenv/config");

// Fonction qui permet de vérifier la validité du token de l'utilisateur qui est connecté à chaque fois que l'utilisateur
// fait une action côté fron-ent et envoie une requête, on doit inlure dans cette requête le token de ce dernier
// Cela permet de vérifier si l'utilisateur est connecté ou non afin de l'autoriser à faire une réservation ou autre.
exports.auth = async (req, res, next) => {
  // on récupère le token dans le header de la requête
  const tokenHeader = req.headers.authorization;

  // Verify if token exist
  if (!tokenHeader) {
    return res.status(401).send("Accès non autorisé");
  }
  const token = tokenHeader.split(" ")[1];

  // Verify token validity
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Store decrypted user's datas to req
    // on cherche l'utilisateur qui a fait la requête dans la base de données
    const user = await User.findById(decoded._id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send("User does not exist");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("Token invalide");
  }
};
