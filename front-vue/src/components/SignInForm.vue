<template>
  <div>
    <b-alert v-model="showPassAlert" variant="info" dismissible>
      Paswword incorrect !
    </b-alert>
    <b-alert v-model="showEmailAlert" variant="warning" dismissible>
      Email incorrect !
    </b-alert>
    <h4 id="myHelp">Please enter your email and password</h4>
    <br />

    <b-form @submit="onSubmit" v-if="show">
      <!-- email -->
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        invalid-feedback="Valid email is required"
      >
        <b-form-input
          :state="validateState('email')"
          id="input-1"
          v-model="$v.form.email.$model"
          type="email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <!-- password -->
      <b-form-group
        id="input-group-2"
        label="Your Password:"
        label-for="input-2"
        invalid-feedback="Password is required, minimun 8 characters"
      >
        <b-form-input
          :state="validateState('password')"
          v-model="$v.form.password.$model"
          id="input-2"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <!-- button -->
      <b-button type="submit" variant="success">
        Sign In <b-icon icon="key" variant="light" scale="1"></b-icon
      ></b-button>
    </b-form>

  </div>
</template>

<script>
import axios from "axios";
//vuelidate
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "SignInForm",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
      showPassAlert: false,
      showEmailAlert: false,
    };
  },

  // vuelidate
  validations: {
    form: {
      email: {
        required,
        email: email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  methods: {
    //vuelidate
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    async onSubmit(evt) {
      let that = this;
      evt.preventDefault();
      await axios
        .post(`http://localhost:3000/sign-in/`, this.form)
        .then(function (response) {
          console.log("response", response.data);
          if (response.data == "password error") {
            that.showPassAlert = true;
            that.$v.$reset();
          }
          if (response.data == "Sorry, email incorrect") {
            that.showEmailAlert = true;
            that.$v.$reset();
          }
          if (response.data.auth == true) {
            console.log("sign-in", response);
            console.log("sign-in -> token", response.data.token);
            //stock to store state the name, id and token
            that.$store.dispatch("ADD_NAME", response.data.name);
            that.$store.dispatch("ADD_ID", response.data.id);
            that.$store.dispatch("ADD_TOKEN", response.data.token);
            //change the route
            that.$router.push("/Dashboard");

            //Headers of request with token
            let yourConfig = {
              headers: {
                Authorization: "Bearer " + response.data.token,
              },
            };

            // Load contact of the user
            let contact;
            axios
              .get(
                `http://localhost:3000/get-contacts/${that.$store.state.id}`,
                yourConfig
              )
              .then(function (response) {
                contact = response.data;
                that.$store.dispatch("GET_CONTACT", contact);
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            alert("Error password or email incorrect");
          }
          // Reset imput
          that.form.email = "";
          that.form.password = "";
          that.show = false;
          that.$nextTick(() => {
            that.show = true;
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style>
#myHelp{
  color: rgb(12, 144, 161);
}
</style>