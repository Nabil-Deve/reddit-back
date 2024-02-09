const Subreddit = require("../models/subredditModel");

const createSubreddit = async (req, res) => {
  // Définition de la fonction asynchrone createSubreddit pour créer un nouveau subreddit.
  try {
    const { name, description } = req.body; // Extraction du nom et de la description du subreddit à partir de la requête.
    const subreddit = new Subreddit({
      // Création d'une nouvelle instance de Subreddit avec les données fournies.
      name,
      description,
      creator: [req.user._id], // Attribution de l'ID de l'utilisateur comme créateur du subreddit.
    });

    await subreddit.save(); // Sauvegarde du subreddit dans la base de données.

    res.status(201).json(subreddit); // Envoi d'une réponse avec le statut 201 et les données du subreddit créé au format JSON.
  } catch (error) {
    // Gestion des erreurs potentielles.
    res.status(500).send(error.message); //
  }
};

const deleteSubreddit = async (req, res) => {
  try {
    const subredditId = req.params.subredditId;
    await Subreddit.deleteOne({ _id: subredditId }); // Pas besoin de le stocker dans une variable car on ne l'envoie pas au front.

    res.status(200).send("Subreddit has been deleted.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSubreddit = async (req, res) => {
  try {
    const subredditId = req.params.subredditId;
    const subreddit = await Subreddit.findById({ _id: subredditId }); // on met const pour récupérer le subreddit et le stocker dans une variable et l'envoyer au front
    res.json(subreddit);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateSubreddit = async (req, res) => {
  try {
    const subredditId = req.params.subredditId;
    await Subreddit.updateOne({ _id: subredditId }, req.body);
    res.status(200).send("Subreddit has been updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createSubreddit,
  deleteSubreddit,
  getSubreddit,
  updateSubreddit,
};
