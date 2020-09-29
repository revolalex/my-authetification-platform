/*********************** Module *************************/
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const e = require("express");
const jwt = require("jsonwebtoken");
const config = require("./config");

const saltRounds = 10;

const appRouter = async function(app, connection) {
  /*********************** add an user ==> /sign-up *************************/
  app.post("/sign-up", function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let passTemp = req.body.password;
    // hash the password
    let pass = bcrypt.hashSync(passTemp, saltRounds);
    /********* The Users *************/
    const userObject = {
      name: name,
      email: email,
      pass: pass,
    };
    /****** create the user in DB ******/
    connection.query("INSERT INTO users SET ?", userObject, function(
      err,
      result
    ) {
      if (err) throw err;
      console.log("1 record inserted");
      /******* TOKEN *******/
      let token = jwt.sign({ email: email }, config.secret, {
        expiresIn: 86400,
      });
      console.log("token:", token);
      res.status(201).send({ auth: true, token: token, user: userObject });
    });
  });

  /****************** Check if an user is register ==> /sign-in **********************/
  app.post("/sign-in", function(req, res) {
    let email = req.body.email;
    let pass = req.body.password;

    let mailUser = "SELECT * FROM users WHERE email = ?";
    let hash = "";
    connection.query(mailUser, [email], function(err, results, fields) {
      if (err) throw err;
      console.log("result sign-in ==>", results);
      let name = results[0].name;
      let id = results[0].id;
      /******* TOKEN *******/
      let token = jwt.sign(
        { email: email, name: name, id: id },
        config.secret,
        {
          expiresIn: 86400,
        }
      );
      // handle email error
      if (results.length < 1) {
        res.status(401).send("Sorry, email incorrect");
      } else {
        hash = results[0].pass;
        // handle password error
        bcrypt.compare(pass, hash, function(err, result) {
          if (result == true) {
            // get the decoded payload ignoring signature, no secretOrPrivateKey needed
            var decoded = jwt.decode(token);

            // get the decoded payload and header
            var decoded = jwt.decode(token, { complete: true });
            console.log("header", decoded.header);
            console.log("payload", decoded.payload);

            res.status(200).send({
              auth: true,
              token: token,
              email: email,
              name: name,
              id: id,
            });
          } else {
            res.status(401).send("Sorry, password incorrect");
          }
        });
      }
    });
  });

  /****************** create Table and columns ==> /createTable **********************/
  app.post("/createTable", function(req, res) {
    let createTableCol =
      "CREATE TABLE IF NOT EXISTS contacts ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(200) NOT NULL, id_user_affiliate VARCHAR(50))";
    connection.query(createTableCol, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  // add a new contact
  app.post("/add-new-contact", function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let id_user_affiliate = req.body.id_user_affiliate;

    let sql = `insert into contacts (name, email, id_user_affiliate) VALUES ('${name}', '${email}', '${id_user_affiliate}')`;

    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.status(200).send(results);
    });
  });

  app.get("/get-contacts/:id", function(req, res) {
    let x = req.params.id
    let getAll =
      `SELECT contacts.name,contacts.email,contacts.id_user_affiliate from users inner join contacts on users.id = contacts.id_user_affiliate where users.id = ${connection.escape(x)}`
    connection.query(getAll, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  
  // app.get("/get-contacts", function(req, res) {
  //   let getAll =

  //     "SELECT * FROM users INNER JOIN contacts ON users.id = contacts.id_user_affiliate"
  //     // `SELECT contacts.name,contacts.email,contacts.id_user_affiliate from users inner join contacts on users.id = contacts.id_user_affiliate where users.id = $(connection.escape(x)`)
  //   connection.query(getAll, function(err, results) {
  //     if (err) throw err;
  //     res.send(results);
  //   });
  // });

  /*********************** BONUS PART *************************/
  /****************** get all database ==> /all **********************/
  app.get("/all", function(req, res) {
    let getAll = "SELECT * FROM authentification.users";
    connection.query(getAll, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  /****************** get all emails ==> /emails **********************/
  app.get("/emails", function(req, res) {
    let getAllEmail = "SELECT email FROM authentification.users";
    connection.query(getAllEmail, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  /****************** get all names ==> /names **********************/
  app.get("/names", function(req, res) {
    let getAllNames = "SELECT name FROM authentification.users";
    connection.query(getAllNames, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  /************ delete user with this email ==> /users/:email **************/
  app.delete("/users/:email", function(req, res) {
    let email = req.params.email;
    let usersMailToDelete =
      "DELETE FROM authentification.users where email = ?";
    connection.query(usersMailToDelete, [email], function(err, results) {
      if (err) throw err;
      // handle unknown user
      if (results.affectedRows > 0) {
        console.log(results.affectedRows);
        res.send("Users removed");
      } else {
        res.send("Unknown users");
      }
    });
  });

  /****************** create a database ==> /createDB **********************/
  app.post("/createDB", function(req, res) {
    let dbName = req.body.dbName;
    let createDatabase = "CREATE DATABASE " + dbName;
    connection.query(createDatabase, function(err, results) {
      if (err) throw err;
      res.send("Sucess database  '" + dbName + "' created");
    });
  });

  /****************** delete database ==> /db/:dbName **********************/
  app.delete("/db/:dbName", function(req, res) {
    let dbName = req.params.dbName;
    console.log(dbName);
    let dbToDelete = "DROP DATABASE " + dbName;
    connection.query(dbToDelete, function(err, results) {
      if (err) throw err;
      res.send("Success Database deleted: " + dbName);
    });
  });

  /****************** update email ==> /users/:email **********************/
  app.put("/users/:email", function(req, res) {
    let email = JSON.stringify(req.params.email);
    let specify = JSON.stringify(req.body.specify);

    let updateEmail =
      "UPDATE authentification.users SET email = " +
      specify +
      "WHERE email =" +
      email +
      ";";
    connection.query(updateEmail, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
};

module.exports = appRouter;
