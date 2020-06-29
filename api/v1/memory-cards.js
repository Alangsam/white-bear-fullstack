const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");
const { toJson, toSafeParse } = require("../../utils/helpers");

//@route        GET api/v1/users
//@desc         GET all memory cards for a user by search term and order
//@access       Public
router.get("/", (req, res) => {
   console.log(req.query);
   const { userId, searchTerm, order } = req.query;
   db.query(selectAllCards(userId, searchTerm, order))
      .then((dbRes) => {
         //console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
