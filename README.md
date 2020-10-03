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
* [Screenshots](#screenshots)
* [General info](#general-info)
* [API](#api)
* [Front](#front)
* [Vuelidate](#vuelidate)
* [Persisted-state](#Persisted-state)
* [Token-in-front](#token in front)
* [Vuex](#vuex)
* [VueRouter](#vuerouter)
* [Technologies](#technologies)
* [App](#app)
* [Pratice](#pratice)
* [Contact](#contact)

## Screenshots
<br>
<img width="800" alt="Capture d’écran 2020-09-24 à 17 10 31" src="https://user-images.githubusercontent.com/56839789/94991845-0904d400-0586-11eb-9b09-658d2c0fd6ed.gif">
<br>

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

- token:
```
let token = jwt.sign(
  { email: email, name: name, id: id },
  config.secret,
  {
    expiresIn: 86400,
  }
);
```

- handle password error, check for token , and send token and authorization:
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



## Front
> Vue.js Front-End

## Vuelidate

- import vuelidate in the component "SignUpForm.vue"
```
//vuelidate
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
```

- in export default{}
```
mixins: [validationMixin],
```
- and:
```
 // vuelidate
  validations: {
    form: {
      email: {
        required,
        email: email,
      },
      name: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
```
- finnaly in methods{}
```
validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
},
```

- Example for email:
```
<b-form-group
  id="input-group-1"
  label="Email address:"
  label-for="input-1"
  invalid-feedback="Valid email is required">
```

- then

```
<b-form-input
  :state="validateState('email')"
  id="input-1"
  v-model="$v.form.email.$model"
  type="email"
  placeholder="Enter email">
</b-form-input>
```
- tips: to reset vuelidate
```
this.$v.$reset()
```
## Persisted State

- In the store import persistedstate

```
import createPersistedState from "vuex-persistedstate";
````

- And pass it in vuex store

```
let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  plugins: [createPersistedState()],
});
```

## Token in Front

- During the axios post request in components "SignInForm.vue" stock the token in state (thank vuex)

```
if (response.data.auth == true) {
   //to store in state the name, id and token 
   that.$store.dispatch("ADD_NAME", response.data.name);
   that.$store.dispatch("ADD_ID", response.data.id);
   that.$store.dispatch("ADD_TOKEN", response.data.token);
   //change the route
   that.$router.push("/Dashboard");
}
```

## Vuex

Example of actions and mutation to store the token in state:

- Actions:
```
ADD_TOKEN: (context, token) => {
    context.commit("ADDED_TOKEN", token);
},
```
- Mutations
```
ADDED_TOKEN: (state, token) => {
    state.token = token;
},
```

- State
```
let state = {
  token: false,
  name: "",
  id: "",
  contact: [],
};
```

## VueRouter

- import the needed components:

```
import Dashboard from "../components/Dashboard";
import MyJumbotron from "../components/MyJumbotron";
import AuthStore from "../components/AuthStore";
```

- the routes:
```
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  { path: "/", name: "MyJumbotron", component: MyJumbotron },
];
```

- handle acces to the routes:
```
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth == true && AuthStore.state.token) {
    next();
  } else if (requiresAuth == true && AuthStore.state.token == false) {
    next({ name: "MyJumbotron" });
  } else {
    next();
  }
});
```




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










