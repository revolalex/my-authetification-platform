![](https://img.shields.io/badge/made%20with-node.js-success?logo=node.js).
![](https://img.shields.io/badge/made%20with-vue.js-green?logo=vue.js).
![](https://img.shields.io/badge/made%20with-Bootstrap_vue-blueviolet?logo=Bootstrap).
![](https://img.shields.io/badge/made%20with-mysql-blue?logo=mysql).
![](https://img.shields.io/badge/made%20with-jsonwebtokens-orange?logo=jsonwebtokens).



<img src="https://img.shields.io/badge/vue.router-green.svg" alt="vue-router">.
<img src="https://img.shields.io/badge/vuex-green.svg" alt="vuex">.
<img src="https://img.shields.io/badge/axios-succes.svg" alt="axios">.
<img src="https://img.shields.io/badge/Express-succes.svg" alt="Express">. 
<br>


# Project Name : my-authetification-platform
> My first system of authentification

## Table of contents
* [General info](#general-info)
* [API](#api)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [App](#app)
* [Pratice](#pratice)
* [Contact](#contact)

## General info
>Aim of the project, create a system of authentification using token, SQL databe, MAMP. 👩‍🎓 👨‍🎓 
---
In the assets folder you can find a pdf with all the requierements ask.

## API
```
node index.js
```

### Structure
<img  alt="Capture d’écran 2020-09-24 à 17 10 31" src="https://user-images.githubusercontent.com/56839789/94991324-b2e26180-0582-11eb-8f45-d2a5369ad0f3.png">


### /sign-up 
This route is use to create an user

- crypt password:
```
// hash the password
let pass = bcrypt.hashSync(passwordNotHash, saltRounds);
```

### /sing-in   
This route is use to log in.

- handle email error:
```
if (!Array.isArray(results) || !results.length) {
          console.log("email error");
          // res.status(401).send("Sorry, email incorrect");
          res.send("Sorry, email incorrect");
}
```
- handle password error and check for token:
```
 bcrypt.compare(pass, hash, function(err, result) {
       if (result == true) {
          // get the decoded payload ignoring signature, no secretOrPrivateKey needed
          var decoded = jwt.decode(token);
          // get the decoded payload and header
          var decoded = jwt.decode(token, { complete: true });
          console.log("Header", decoded.header);
          console.log("Payload", decoded.payload);
          res.status(200).send({
             auth: true,
             token: token,
             email: email,
             name: name,
             id: id,
             });
         } else {
           console.log("pass error");
           res.send("password error")
         }
 });
```

### /get-contacts/:id
This route use sql request  for  return only  the contacts  who  belongs  to the connected  user.

- mysql inner join.

```
  /*********************** get contact whith the users ID same as id_user_affiliat ***************/
  await app.get("/get-contacts/:id", auth, function(req, res) {
    let userId = req.params.id;
    let getAll = `SELECT contacts.name,contacts.email,contacts.id_user_affiliate 
    from users inner join contacts on users.id = 
    contacts.id_user_affiliate where users.id = ${connection.escape(userId)}`;
    connection.query(getAll, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
```
  
### midlleware to check token (very basic one)
```
const jwt = require('jsonwebtoken');
const config = require("../modules/config");

module.exports  = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret);
    console.log(decodedToken);

    if (token>0) {
      console.log(token);
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
```

#### Then to import :
```
const auth = require("../middleware/auth");
```

#### Then to use: 
put "auth" just aftre your end point adress in your request 
```
await app.post("/add-new-contact", auth, function(req, res) {}
```
### other routes
- post    /add-new-contact  ==> to add a new contact
- delete  /users/:email     ==> to delete an user with this email
- put     /users/:email     ==> update email of the contact






## Screenshots
<br>
<img width="800" alt="Capture d’écran 2020-09-24 à 17 10 31" src="https://user-images.githubusercontent.com/56839789/94950244-9db5f600-04e2-11eb-8206-4bd215827593.gif">
<br>


## Technologies
* node.js
* vue.js
* SQL database
* bcrypt
* express
* mysql
* jwt
* ...



## App

This authentification app crypt password and use token
 - You can create a user
 - You can authentifiate a register user
 - A register user can add, delete a contact and update the contact email 

The password is hash with bcrypt.
<br>
When an user sign-in with the token (jwt) we give him acces to "dashboard", where he can manage his contact
<br>
Finally the user can logout (no acces to dashboard).
<br>
And the api end point are secure, check for token
 
 ## Pratice
<ul>
 <li>Node.js
 <li>Vue.js
 <li>Vue-axios
 <li>Vue-router
 <li>Vuex
 <li>vuex-persistedstate
 <li>Vuelidate
 <li>Bootstrap.vue
 <li>API
 <li>Express
 <li>MySQL database 
 <li>bcrypt (hash, salt)
 <li>JWT (jsonwebtoken)
 <li>Middleware
 <li>Postman
 <li>...
</ul>
 
 
## Status
Project is:  _In progress_


## Contact	
- [![LinkedIn][linkedin-shield]][linkedin-url] 	
- revolalex@gmail.com






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/alexandre-rodrigueza/










