const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Invalid authentication credentials!'
        });
      });
  });
}

exports.userLogin =  (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      fetchedUser = user;
      return bcrypt.compareSync(req.body.password, fetchedUser.password);
    })
    .then(result => {
      if (!result) {
        console.log(!result);
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        {expiresIn: "1h"}
      );
      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}
