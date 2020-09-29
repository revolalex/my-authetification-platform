<template>
  <div>
    <ul v-for="element in listOfContact" :key="element.id">
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
  computed:{
    listToShow(){
      return this.listOfContact
    }
  },

  mounted() {
    let that = this;
    axios
      .get(`http://localhost:3000/get-contacts/${this.$store.state.id}`)
      .then(function (response) {
        that.listOfContact = response.data;
        console.log("that",that.listOfContact);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
    updated() {
    let that = this;
    axios
      .get(`http://localhost:3000/get-contacts/${this.$store.state.id}`)
      .then(function (response) {
        that.listOfContact = response.data;
        console.log("that",that.listOfContact);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
</style>