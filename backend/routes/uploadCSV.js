const express = require("express");
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');
const User = require("../models/user");

router.post("/upload-csv", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const csvFile = req.files.file;
    const users = [];

    csvFile.pipe(csv())
      .on('data', (data) => {
        users.push(data);
      })
      .on('end', async () => {
        for (let user of users) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            password: user.password,
          });
          await newUser.save();
        }
        res.json({ message: 'Users registered successfully from CSV.' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
