const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");

//@route        POST api/v1/users
//@desc         Create a new user
//@access       Public
router.post("/", async (req, res) => {
   const user = {
      id: req.body.id,
      email: req.body.email,
      password: await toHash(req.body.password),
      created_at: req.body.createdAt,
   };
   db.query(insertUser, user)
      .then((result) => {
         console.log(result);
      })
      .catch((err) => {
         console.log(err);
      });
});

module.exports = router;
