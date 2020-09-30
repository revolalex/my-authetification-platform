<template>
  <div>
    <h2 id="registerOk" v-if="reponseStatut == true">
      You have been register, go Sign-in now !
    </h2>
      <h2 id="nameAlreadyUse" v-if="nameAlreadyUse == true">
      this USER NAME already exist
    </h2>
    <br />
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
      <b-button type="submit" variant="success">Sign Up</b-button>
    </b-form>

    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
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
      nameAlreadyUse: false,
      
      // will allow the ok sentence to be visible
      reponseStatut: false,
    };
  },
  validations: {
    form: {
      email: {
        required,
        email: email
      },
      name: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        minLength: minLength(8)
      }
    },
  },

  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit(evt) {
      evt.preventDefault();
      let that = this;
      axios
        .post(`http://localhost:3000/sign-up`, this.form)
        .then(function (response) {
          console.log("response", response);
          if (response.status == 201) {
            // will allow the ok sentence to be visible
            that.reponseStatut = true;
          }
          if(response.status == 200){
            that.nameAlreadyUse = true;
          }
          // reset the input
          that.form.name = "";
          that.form.email = "";
          that.form.password = "";
           // reset vuelidate error (red)
          that.$v.$reset()

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
#registerOk {
  text-align: left;
  color: rgb(32, 212, 32);
}
#nameAlreadyUse{
  color: rgb(199, 22, 22);
}
</style>