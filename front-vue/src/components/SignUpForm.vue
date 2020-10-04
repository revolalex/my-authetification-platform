<template>
  <div>
    <b-alert v-model="showSuccesLogin" variant="success" dismissible>
      <b-icon icon="emoji-smile" variant="success" scale="1.3"></b-icon> You have been register, go Sign-in now !
    </b-alert>

    <b-alert v-model="showEmailAlert" variant="danger" dismissible>
      <b-icon icon="emoji-angry" variant="danger" scale="1.3"></b-icon>  this "email" already exist
    </b-alert>
    <h4 id="myHelp">Please fill this form to create an account</h4>
    <br>

    <b-form @submit="onSubmit" v-if="show">
      <!-- name -->
      <b-form-group
        id="input-group-2"
        label="Your Name:"
        label-for="input-2"
        invalid-feedback="Name is required, and minimun 3 characters"
      >
        <b-form-input
          :state="validateState('name')"
          id="input-2"
          v-model="$v.form.name.$model"
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

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
          id="input-2"
          v-model="$v.form.password.$model"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <!-- button -->
      <b-button type="submit" variant="success"> Sign Up <b-icon icon="plus-circle" variant="light" scale="1"></b-icon></b-button>
    </b-form>

    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  name: "SignUpForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      show: true,

      // will allow the ok sentence to be visible
      showNameAlert: false,
      showSuccesLogin: false,
    };
  },
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

  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async onSubmit(evt) {
      evt.preventDefault();
      let that = this;
      await axios
        .post(`http://localhost:3000/sign-up`, this.form)
        .then(function (response) {
          console.log("response", response);
          if (response.status == 201) {
            // will allow the succes alert to be visible
            that.showSuccesLogin = true;
          }
          if (response.status == 200) {
            that.showEmailAlert = true;
          }
          // reset the input
          that.form.name = "";
          that.form.email = "";
          that.form.password = "";
          // reset vuelidate error (red)
          that.$v.$reset();

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

</style>