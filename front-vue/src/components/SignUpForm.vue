<template>
  <div>
    <h2 v-if="reponseStatut == true">You have been register, go Sign-in now !</h2>
    <br />
    <b-form @submit="onSubmit" v-if="show">
      <!-- name -->
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
      </b-form-group>

      <!-- email -->
      <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <!-- password -->
      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" required placeholder="Enter password"></b-form-input>
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
export default {
  name: "SignUpForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      show: true,
      reponseStatut: false,
    };
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(this.form.name);
      let that = this;
      axios
        .post(`http://localhost:3000/sign-up`, this.form)
        .then(function (response) {
          if (response.status == 200) {
            that.reponseStatut = true;
          }
          that.form.name = "";
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
h2 {
  text-align: left;
  color: rgb(32, 212, 32);
}
</style>