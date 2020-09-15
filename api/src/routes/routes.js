const appRouter = function(app, connection) {
  app.post("/sign-up", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
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
  
    let sql = "SELECT * FROM users WHERE email = ? AND pass = ?";
  
    connection.query(sql, [email, pass], function(err, results, fields) {
      if (err) throw err;
      var users = JSON.parse(JSON.stringify(results));
      if (users.length > 0) {
        console.log(users[0]);
        res.send("You are authenticated !! Hourray!!");
      } else {
        res.send("Sorry,  we don't  know  this user");
      }
    });
  });

};

module.exports = appRouter;
