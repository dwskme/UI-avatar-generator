const express = require("express");
const router = express.Router();
const { createCanvas } = require("canvas");

const generateAvatar = (text, background = "black", color = "white") => {
  const foregroundColor = color;
  const backgroundColor = background;
  const width = 200;
  const height = 200;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Draw background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);

  // Draw text
  context.font = "bold 100px Arial";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // saving image
  const buffer = canvas.toBuffer("image/png");
  // fs.writeFileSync("./ui-png/image.png", buffer);
  return buffer;
};

router.get("/", async (req, res) => {
  try {
    var fullName = req.query["name"];
    var background = req.query["background"];
    var color = req.query["color"];
    var firstName = fullName.split(" ").slice(0, -1).join(" ");
    var lastName = fullName.split(" ").slice(-1).join(" ");
    var initials =
      firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    const image = generateAvatar(initials, background, color);
    res.end(image);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
module.exports = router;
