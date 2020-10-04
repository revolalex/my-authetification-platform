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
* [App](#app)
* [Screenshots](#screenshots)
* [General info](#general-info)
* [API](#api)
* [Front](#front)
* [Vuelidate](#vuelidate)
* [Persisted-state](#Persisted-state)
* [Token in front](#token-in-front)
* [Vuex](#vuex)
* [VueRouter](#vuerouter)
* [Technologies](#technologies)
* [Pratice](#pratice)
* [Difficulty](#Difficulty)
* [Contact](#contact)

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

## Screenshots
<br>
<img width="800" alt="Capture d’écran 2020-09-24 à 17 10 31" src="https://user-images.githubusercontent.com/56839789/95002540-89065a80-05d5-11eb-811c-ab713d762eaf.gif">
<br>

## General info
>Aim of the project, create a system of authentification using token, SQL databe, MAMP. 👩‍🎓 👨‍🎓 
---
In the assets folder you can find a pdf with all the requierements ask.

## API
```js
node index.js
```

### Structure
<img  alt="Capture d’écran 2020-09-24 à 17 10 31" src="https://user-images.githubusercontent.com/56839789/94991324-b2e26180-0582-11eb-8f45-d2a5369ad0f3.png">


### /sign-up 
This route is use to create an user.

- crypt password:
```js
// hash the password
let pass = bcrypt.hashSync(passwordNotHash, saltRounds);
```

### /sing-in   
This route is use to log in.

- handle email error:
```js
if (!Array.isArray(results) || !results.length) {
          console.log("email error");
          // res.status(401).send("Sorry, email incorrect");
          res.send("Sorry, email incorrect");
}
```

- token:
```js
let token = jwt.sign(
  { email: email, name: name, id: id },
  config.secret,
  {
    expiresIn: 86400,
  }
);
```

- handle password error, mail error, check for token , finally send token and authorization:

<br>
<p float="left">
 Email:
  <img width="400" alt="Capture d’écran 2020-10-04 à 21 13 57" src="https://user-images.githubusercontent.com/56839789/95024961-87e13600-0686-11eb-9e20-63a6977ac676.png">
 Password: <img width="400" alt="Capture d’écran 2020-10-04 à 21 15 49" src="https://user-images.githubusercontent.com/56839789/95024990-c971e100-0686-11eb-8bf2-0fbb780bb1e8.png">

</p>

```js
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
<br>
<img width="600" alt="Capture d’écran 2020-10-04 à 21 11 29" src="https://user-images.githubusercontent.com/56839789/95024899-3a64c900-0686-11eb-879e-84c37e519f8a.png">
<br>

- mysql inner join.

```js
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
```js
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

- then to import :
```js
const auth = require("../middleware/auth");
```

- then to use: 
put "auth" just after your end point adress in your request.
```js
await app.post("/add-new-contact", auth, function(req, res) {}
```

### other routes
- post    /add-new-contact  ==> to add a new contact
- delete  /users/:email     ==> to delete an user with this email
- put     /users/:email     ==> update email of the contact

<hr>
<br>

## Front
> Vue.js Front-End.

### Structure
<img  alt="Capture d’écran 2020-09-24 à 17 10 31" src="https://user-images.githubusercontent.com/56839789/94993427-32772d00-0591-11eb-8f31-1e8b31cdd85c.png">


### Vuelidate

<img width="600" alt="Capture d’écran 2020-10-04 à 21 20 51" src="https://user-images.githubusercontent.com/56839789/95025076-7ea49900-0687-11eb-81f6-0ecddd898c41.png">

- import vuelidate in the component "SignUpForm.vue".
```js
//vuelidate
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
```

- in export default{}
```js
mixins: [validationMixin],
```
- and:
```js
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
```js
validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
},
```

- Example for email:
```js
<b-form-group
  id="input-group-1"
  label="Email address:"
  label-for="input-1"
  invalid-feedback="Valid email is required">
```

- then

```js
<b-form-input
  :state="validateState('email')"
  id="input-1"
  v-model="$v.form.email.$model"
  type="email"
  placeholder="Enter email">
</b-form-input>
```
- tips: to reset vuelidate
```js
this.$v.$reset()
```
### Persisted State

- In the store import persistedstate

```js
import createPersistedState from "vuex-persistedstate";
````

- And pass it in vuex store

```js
let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  plugins: [createPersistedState()],
});
```

### Token in Front

- During the axios post request in components "SignInForm.vue" stock the token in state (thank vuex)

```js
if (response.data.auth == true) {
   //to store in state the name, id and token 
   that.$store.dispatch("ADD_NAME", response.data.name);
   that.$store.dispatch("ADD_ID", response.data.id);
   that.$store.dispatch("ADD_TOKEN", response.data.token);
   //change the route
   that.$router.push("/Dashboard");
}
```

### Vuex

Example of actions and mutation to store the token in state:

- Actions:
```js
ADD_TOKEN: (context, token) => {
    context.commit("ADDED_TOKEN", token);
},
```
- Mutations
```js
ADDED_TOKEN: (state, token) => {
    state.token = token;
},
```

- State
```js
let state = {
  token: false,
  name: "",
  id: "",
  contact: [],
};
```

### VueRouter

- import the needed components:

```js
import Dashboard from "../components/Dashboard";
import MyJumbotron from "../components/MyJumbotron";
import AuthStore from "../components/AuthStore";
```

- the routes:
```js
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
```js
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
* mysql
* SQL database
* bcrypt
* jsonwebtoken
* express
* middleware
* vue.js
* vuex
* vueRouter
* vuelidate
* vue-axios
* vuex-persistedstate
* bootstrap-vue
* ...




 
 ## Pratice
<ul>
 <li>Node.js and many module</li>
 <li>Build an API</li>
 <li>work with express</li>
 <li>Database in mysql</li> 
 <li>bcrypt (hash, salt)</li>
 <li>JWT (jsonwebtoken)</li>
 <li>How to make middleware and use them</li>
 <li>Vue.js and vue CLI to create the prject</li>
 <li>Vue-axios and how to connect back and front</li>
 <li>Vue-router and how to handle the acces of route</li>
 <li>Vuex and is fabulous store</li>
 <li>vuex-persistedstate</li>
 <li>Vuelidate so efficient</li>
 <li>Bootstrap.vue make life easier</li>
 <li>Postman for test the api</li>
 <li>...</li>
</ul>

 ## Difficulty
<ul>
<li>How to make the project structure</li>
<li>Sql syntax</li>
<li>Create header for token</li>
<li>Create midlleware for token</li>
<li>Token in general (but finally it's ok)</li>
<li>Vuelidate setting</li>
<li>Handle the acces of routes in vueRouter ==> router.beforeEach()</li>
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










