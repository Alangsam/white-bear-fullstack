const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");
const { toJson, toSafeParse } = require("../../utils/helpers");

//@route        GET api/v1/users
//@desc         GET all memory cards for a user by search term and order
//@access       Public
router.get("/", (req, res) => {
   db.query(
      selectAllCards(
         "42160c3e-7a5b-4fb9-b361-ac9598aca4e2",
         "ash",
         "memory_cards.created_at DESC"
      )
   )
      .then((dbRes) => {
         console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
