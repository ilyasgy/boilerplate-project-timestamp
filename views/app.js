const express = require('express');
const app = express();

// Allow serving static files (optional but can keep it)
app.use(express.static('public'));

// Root endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else if (!isNaN(dateString)) {
    // If dateString is a Unix timestamp in milliseconds (as string)
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
