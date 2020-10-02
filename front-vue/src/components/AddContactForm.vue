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
      contact: [],
      show: true,
    };
  },

  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      this.form.id_user_affiliate = this.$store.state.id;
      //Headers of request with token
      let yourConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      };
      // Add new contact in DB
      await axios
        .post(`http://localhost:3000/add-new-contact`, this.form, yourConfig)
        .then(function (response) {
          console.log("response", response);
          console.log("response headers", response.headers);
          if (response.status == 200) {
            console.log("add", response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      // Actualize contact in store
      let that = this;
      await axios
        .get(
          `http://localhost:3000/get-contacts/${this.$store.state.id}`,
          yourConfig
        )
        .then(function (response) {
          let contact = response.data;
          that.contact = response.data;
          that.$store.state.contact = contact;
          that.$store.dispatch("GET_CONTACT", contact);
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

  async mounted() {
    //Headers of request with token
    let yourConfig = {
      headers: {
        Authorization: "Bearer " + this.$store.state.token,
      },
    };
    // for dont have scope problem in the callback
    let that = this;
    // Load the contact in staore
    await axios
      .get(
        `http://localhost:3000/get-contacts/${this.$store.state.id}`,
        yourConfig
      )
      .then(function (response) {
        that.$store.state.contact = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
<style>
#addContact {
  margin-right: 10vw;
  margin-left: 10vw;
}
</style>