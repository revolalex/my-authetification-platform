<template>
  <div id="addContact">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
        invalid-feedback="Valid email is required"
      >
        <b-form-input
          :state="validateState('email')"
          id="input-1"
          v-model="$v.form.email.$model"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          :state="validateState('name')"
          id="input-2"
          v-model="$v.form.name.$model"
          required
          placeholder="Enter name"
          invalid-feedback="Name is required, minimun 3 characters"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success">Add</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: "",
        name: "",
        id_user_affiliate: "",
      },
      contact: [],
      show: true,
      yourConfig: {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      },
    };
  },
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
    },
  },

  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async onSubmit(evt) {
      evt.preventDefault();
      this.form.id_user_affiliate = this.$store.state.id;
      //Headers of request with token

      // Add new contact in DB
      await axios
        .post(
          `http://localhost:3000/add-new-contact`,
          this.form,
          this.yourConfig
        )
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
          that.yourConfig
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
          // reset vuelidate error (red)
          this.$v.$reset();
    },
  },

  async mounted() {
    // for dont have scope problem in the callback
    let that = this;
    // Load the contact in staore
    await axios
      .get(
        `http://localhost:3000/get-contacts/${this.$store.state.id}`,
        that.yourConfig
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