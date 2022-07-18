const express = require("express");
const app = express();
const uiPng = require("./api/png");

app.use("/api/png/", uiPng);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
