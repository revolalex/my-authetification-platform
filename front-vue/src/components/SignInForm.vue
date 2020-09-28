<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
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
      <b-button type="submit" variant="success">Sign In</b-button>
    </b-form>

    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignInForm",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
    };
  },
  // mounted: function (){console.log(this.$store.state.token)},
  methods: {
    onSubmit(evt) {
      let that = this;
      evt.preventDefault();
      axios
        .post(`http://localhost:3000/sign-in/`, this.form)
        .then(function (response) {
          console.log(response);
          if (response.data.auth == true) {
            console.log("success");
            that.$store.dispatch("ADD_TOKEN", response.data.token);
            that.$router.push("/Dashboard");
            
          } else {
            alert("Error password or email incorrect");
          }
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