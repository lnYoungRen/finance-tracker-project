const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).json({ message: "Missing credentials" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const emptyMonths = {
      January: { expenses: [] },
      February: { expenses: [] },
      March: { expenses: [] },
      April: { expenses: [] },
      May: { expenses: [] },
      June: { expenses: [] },
      July: { expenses: [] },
      August: { expenses: [] },
      September: { expenses: [] },
      October: { expenses: [] },
      November: { expenses: [] },
      December: { expenses: [] },
    };
    user = new User({ name, email, months: emptyMonths });
    await user.save();
    res.status(201).json({ message: "Registered successfully!", user });
  } catch (error) {
    console.error("Error during registration:", error); 
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async(req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const user = await User.findOne({ name, email });
    if (user) {
      return res.status(200).json({ message: "logged in", user});
    } 
    else{
      res.status(404).json({message: "User not found"});
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


module.exports = router;
