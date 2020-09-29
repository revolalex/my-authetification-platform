<template>
  <div id="addContact">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success">Add</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        id_user_affiliate: "",
      },

      show: true,
    };
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.form.id_user_affiliate = this.$store.state.id;
      axios
        .post(`http://localhost:3000/add-new-contact`, this.form)
        .then(function (response) {
          console.log("response", response);
          if (response.status == 200) {
            console.log("add",response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      evt.target.reset();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
    },
  },

  // updated() {
  //   let self = this;
  //   axios
  //     .get(`http://localhost:3000/get-contacts/${this.id_user_affiliate}`)
  //     .then(function (response) {
  //       self.$store.state.contact = response.data;
  //       console.log(self.$store.state.contact);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // },
};
</script>
<style>
#addContact {
  margin-right: 10vw;
  margin-left: 10vw;
}
</style>