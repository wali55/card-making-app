const { Router } = require("express");
const { Admin, Card } = require("../db/db");
const { createAdmin, createCard } = require("../types/types");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../secret");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const adminValidation = createAdmin.safeParse(req.body);
  if (!adminValidation.success) {
    return res.status(400).json({ msg: "wrong input" });
  }

  try {
    const admin = await Admin.create({
      username,
      password,
    });
    res.status(201).json({ msg: "admin created", admin });
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username: "admin" });
    if (admin?.username !== username || admin?.password !== password) {
      return res.status(400).json({ msg: "admin not found" });
    }

    const token = jwt.sign({ username }, jwt_secret);
    return res.status(200).json({ token: `Bearer ${token}` });
  } catch (error) {
    console.log("error", error);
  }
});

// create card
router.post("/card", adminMiddleware, async (req, res) => {
  const { name, description, linkedin, twitter, interests } = req.body;
  const createCardValidation = createCard.safeParse(req.body);
  if (!createCardValidation.success) {
    return res.status(400).json({ msg: "cannot create card" });
  }

  try {
    const card = await Card.create({
      name,
      description,
      linkedin,
      twitter,
      interests,
    });
    res.status(201).json({ card });
  } catch (error) {
    console.log("error", error);
  }
});

// get all the cards
router.get("/cards", adminMiddleware, async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json({ cards });
  } catch (error) {
    console.log("error", error);
  }
});

// delete a card
router.delete("/deleteCard", adminMiddleware, async (req, res) => {
  const { id } = req.body;
  try {
    await Card.deleteOne({ _id: id });
    res.status(200).json({ msg: "deleted successfully" });
  } catch (error) {
    console.log("error", error);
  }
});

// edit a card
router.put("/editCard", adminMiddleware, async (req, res) => {
  const { id, name, description, linkedin, twitter, interests } = req.body;
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        linkedin,
        twitter,
        interests,
      },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ msg: "card not found" });
    }
    res.status(200).json({ msg: "successfully updated", updatedCard });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
