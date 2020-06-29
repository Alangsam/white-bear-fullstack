require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bears_app",
});

connection.connect();

connection.query(
   selectUser("blah@email.com", "replace_me"),
   (err, res, fields) => {
      if (err) {
         console.log(err);
      } else {
         console.log(res);
      }
   }
);

connection.end();
