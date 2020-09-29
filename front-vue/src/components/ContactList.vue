<template>
  <div>
    <ul v-for="element in listToShow" :key="element.id">
      Prénom:
      {{
        element.name
      }}
      ======> Email:
      {{
        element.email
      }}
      ===> ID User affiliate:
      {{
        element.id_user_affiliate
      }}
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ContactList",
  data: function () {
    return {
      listOfContact: [],
    };
  },
  computed: {
    listToShow() {
      return this.$store.getters.LIST_TO_DISPLAY(this.listOfContact);
    },
  },
  mounted() {
    let self = this;
    axios
      .get(`http://localhost:3000/get-contacts`)
      .then(function (response) {
        self.listOfContact = response.data;
        console.log(self.listOfContact);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  updated() {
    let self = this;
    axios
      .get(`http://localhost:3000/get-contacts`)
      .then(function (response) {
        self.listOfContact = response.data;
        console.log(self.listOfContact);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
</style>