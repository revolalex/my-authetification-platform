const bcrypt = require("bcrypt");
const saltRounds = 10;

const appRouter = async function(app, connection) {
  app.post("/sign-up", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var passTemp = req.body.password;

    // hash the password
    let pass = bcrypt.hashSync(passTemp, saltRounds);

    const userObject = {
      name,
      email,
      pass,
    };
    connection.query("INSERT INTO users SET ?", userObject, function(
      err,
      result
    ) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send(name);
  });

  app.post("/sign-in", function(req, res) {
    let email = req.body.email;
    let pass = req.body.password;
    let mailUser = "SELECT * FROM users WHERE email = ?";

    let hash = "";
    connection.query(mailUser, [email], function(err, results, fields) {
      if (err) throw err;
      console.log("mail ==>", results);
      hash = results[0].pass;

      bcrypt.compare(pass, hash, function(err, result) {
        if (result == true) {
          res.send("you are authenticated");
        } else {
          res.send("Sorry, password incorrect");
        }
      });
    });
  });
};

module.exports = appRouter;
