const bcrypt = require("bcrypt");
const saltRounds = 10;


const appRouter = async function(app, connection) {
  // add an user ==> /sign-up
  app.post("/sign-up", function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let passTemp = req.body.password;
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

  // Check if an user is register ==> /sign-in
  app.post("/sign-in", function(req, res) {
    let email = req.body.email;
    let pass = req.body.password;
    let mailUser = "SELECT * FROM users WHERE email = ?";

    let hash = "";
    connection.query(mailUser, [email], function(err, results, fields) {
      if (err) throw err;
      console.log("mail ==>", results);
      // handle email error
      if (results.length < 1) {
        res.send("Sorry, email incorrect");
      } else {
        hash = results[0].pass;
        // handle password error
        bcrypt.compare(pass, hash, function(err, result) {
          if (result == true) {
            res.send("you are authenticated");
          } else {
            res.send("Sorry, password incorrect");
          }
        });
      }
    });
  });

  // get all database ==> /all
  app.get("/all", function(req, res) {
    let getAll = "SELECT * FROM authentification.users";
    connection.query(getAll, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  // get all emails ==> /emails
  app.get("/emails", function(req, res) {
    let getAllEmail = "SELECT email FROM authentification.users";
    connection.query(getAllEmail, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  // get all names ==> /names
  app.get("/names", function(req, res) {
    let getAllNames = "SELECT name FROM authentification.users";
    connection.query(getAllNames, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  // delete user with this email ==> /users/:email
  app.delete("/users/:email", function(req, res) {
    let email = req.params.email;
    let usersMailToDelete =
      "DELETE FROM authentification.users where email = ?";
    connection.query(usersMailToDelete, [email], function(err, results) {
      if (err) throw err;
      // handle unknown user
      if ((results.affectedRows > 0)) {
        console.log(results.affectedRows);
        res.send("Users removed");
      }else {
        res.send("Unknown users");
      }
    });
  });

  // create a database ==> /createDB
  app.post("/createDB", function(req, res) {
    let dbName = "'" + req.body.dbName +  "'";
    let createDatabase = "CREATE DATABASE ?";
    connection.query(createDatabase, [dbName], function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  // delete database ==> /db/:dbName
  app.delete("/db/:dbName", function(req, res) {
    let dbName = req.params.dbName;
    console.log(dbName);
    let dbToDelete = "DROP DATABASE ?";
    connection.query(dbToDelete, [dbName], function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
};

module.exports = appRouter;
