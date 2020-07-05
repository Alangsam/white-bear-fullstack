const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse, toHash } = require("../../utils/helpers");
const insertUser = require("../../queries/insertUser");

//@route        GET api/v1/users
//@desc         GET a valid user via email and password
//@access       Public
router.get("/", (req, res) => {
   db.query(selectUser("blah@email.com", "replace_me"))
      .then((dbRes) => {
         const users = toSafeParse(toJson(dbRes));
         //console.log(users);
         res.json(users);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

//@route        POST api/v1/users
//@desc         Create a new user
//@access       Public
router.post("/", async (req, res) => {
   const hashedPassword = await toHash(req.body.password);
   const user = {
      id: req.body.id,
      email: req.body.email,
      password: hashedPassword,
      created_at: req.body.createdAt,
   };
   console.log(user);
   db.query(insertUser, user)
      .then(() => {})
      .catch(() => {});
});

module.exports = router;
