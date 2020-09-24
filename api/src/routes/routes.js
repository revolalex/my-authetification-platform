const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const e = require("express");
const jwt = require("jsonwebtoken");
const config = require("./config")

const saltRounds = 10;

const appRouter = async function(app, connection) {
  /*********************** add an user ==> /sign-up *************************/
  app.post("/sign-up", function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let passTemp = req.body.password;
    // hash the password
    let pass = bcrypt.hashSync(passTemp, saltRounds);
    const userObject = {
      name: name,
      email: email,
      pass: pass,
    };
    console.log(userObject);
    connection.query("INSERT INTO users SET ?", userObject, function(
      err,
      result
    ) {
      if (err) throw err;
      console.log("1 record inserted");
      /******* TOKEN *******/
      let token = jwt.sign({ email: email }, config.secret, {expiresIn: 86400});
      console.log("token:",token);
      res.status(201).send({auth: true, token: token, user: userObject});
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
      console.log("mail ==>", results);

      /******* TOKEN *******/
      let token = jwt.sign({ email: email }, config.secret, {expiresIn: 86400});

      // handle email error
      if (results.length < 1) {
        res.status(401).send("Sorry, email incorrect");
      } else {
        hash = results[0].pass;
        // handle password error
        bcrypt.compare(pass, hash, function(err, result) {
          if (result == true) {
            res.status(200).send({auth: true, token: token, email: email});
          } else {
            res.status(401).send("Sorry, password incorrect");
          }
        });
      }
    });
  });







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

  /****************** create Table and columns ==> /createTable **********************/
  // POST /createTable {nameOfTable: String, columns: ArrayOfObjects}
  app.post("/createTable", function(req, res) {
    let nameOfTable = req.body.nameOfTable;
    let columns = req.body.columns;
    let columns2 = req.body.columns2;
    let createTableCol =
      "CREATE TABLE " +
      nameOfTable +
      " (" +
      columns +
      " VARCHAR(255)," +
      columns2 +
      " VARCHAR(255))";
    connection.query(createTableCol, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  // PUT /updateTable {columns: ArrayOfObjects}
  // app.put("/updateTable", function(req, res) {
  //   let columns = req.body.columns;
  //   let columns2 = req.body.columns2;
  //   let update = "UPDATE authentification.users SET";

  //   //     UPDATE employees
  //   //      SET
  //   //     lastname = 'Hill',
  //   //     email = 'mary.hill@classicmodelcars.com'
  //   //      WHERE
  //   //     employeeNumber = 1056;
  //   connection.query(update, function(err, res) {
  //     if (err) throw err;
  //     res.send(results);
  //   });
  // });
};

module.exports = appRouter;
