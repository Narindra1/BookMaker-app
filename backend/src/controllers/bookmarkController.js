const present = require("../presentations/Response");
const Bookmark = require("../models/Bookmark");

// GET all bookmarks
exports.getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(present.successResponse(bookmarks));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des bookmarks" });
  }
};

// POST create a new bookmark
exports.createBookmark = async (req, res) => {
  try {
    const { title, url, category, isFavourite, visitCount } = req.body;

    const bookmark = new Bookmark({
      title,
      url,
      category,
      isFavourite,
      visitCount,
    });
    await bookmark.save();
    res
      .status(201)
      .json(present.successResponse({ message: "Bookmark créé avec succès" }));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la création du bookmark",
      error: error.message,
    });
  }
};

// PUT update a bookmark
exports.updateBookmark = async (req, res) => {
  try {
    const { id } = req.params; //on recupère l'id dans l'url
    const { title, url, category, isFavourite, visitCount } = req.body;

    const bookmark = await Bookmark.findByIdAndUpdate(
      id,
      { title, url, category, isFavourite, visitCount },
      { new: true }, // pour retourner le bookmark mis à jour
    );

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark non trouvé" });
    }

    res.json(present.successResponse(bookmark));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du bookmark" });
  }
};

//DELETE a bookmark
exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const bookmark = await Bookmark.findByIdAndDelete(id);

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark non trouvé" });
    }

    res.json(
      present.successResponse({ message: "Bookmark supprimé avec succès" }),
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du bookmark" });
  }
};
