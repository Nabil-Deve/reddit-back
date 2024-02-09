const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
  try {
    const postId = req.params.postId; // on récupère l'id du post envoyé dans les paramètres de la reqête car logiquement on ajoute un commentaire à un post

    // maintenant on cherche le post avec son id (dans la bdd)
    const post = await Post.findById(postId);

    if (post) {
      const comment = new Comment(req.body);
      comment.author = req.user._id;
      comment.post = post._id;
      await comment.save();
      res.json(comment);
    } else {
      res
        .status(401)
        .send(
          "Post does not exist. You cannot add a comment to an unexsting post."
        );
    }

    res.json(comment);
  } catch (error) {}
};
