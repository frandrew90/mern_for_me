const { Router } = require("express");
const User = require("../models/User");
const router = Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration values",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: `The User with email: ${email} already exists` });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "New user was created" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post("/login", async (req, res) => {});

module.exports = router;
