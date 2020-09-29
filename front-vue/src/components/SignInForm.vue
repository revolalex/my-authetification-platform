<template>
  <div>
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
      <b-button type="submit" variant="success" @click="addContact"
        >Sign In
      </b-button>
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
    addContact() {
      // let contact;
      // axios
      //   .get(`http://localhost:3000/get-contacts/${this.$store.state.id}`)
      //   .then(function (response) {
      //     contact = response.data;
      //     console.log("contact", contact);
      //     that.$store.dispatch("GET_CONTACT", contact);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },

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
          if (response.data.auth == true) {
            console.log("success", response);
            that.$store.dispatch("ADD_NAME", response.data.name);
            that.$store.dispatch("ADD_ID", response.data.id);
            that.$store.dispatch("ADD_TOKEN", response.data.token);
            that.$router.push("/Dashboard");
            // charge les contactt de l'user
            let contact;
            axios
              .get(`http://localhost:3000/get-contacts/${that.$store.state.id}`)
              .then(function (response) {
                contact = response.data;
                console.log("contact", contact);
                that.$store.dispatch("GET_CONTACT", contact);
              })
              .catch(function (error) {
                console.log(error);
              });
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