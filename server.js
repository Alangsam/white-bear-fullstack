const express = require("express");
const app = express();

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards"));

const port = process.env.PORT || 3012;

app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
