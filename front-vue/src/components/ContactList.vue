<template>
  <div>
    <div id="myListC" v-for="element in this.$store.state.contact" :key="element.id">
      <li id="prenom"><span> Prénom: </span> {{ element.name }}</li>
      <li id="email"><span> Email: </span> {{ element.email }}</li>
    </div>
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

  mounted() {
    let that = this;
    axios
      .get(`http://localhost:3000/get-contacts/${this.$store.state.id}`)
      .then(function (response) {
        that.listOfContact = response.data;
        console.log("that", that.listOfContact);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  //   updated() {
  //   let that = this;
  //   axios
  //     .get(`http://localhost:3000/get-contacts/${this.$store.state.id}`)
  //     .then(function (response) {
  //       that.listOfContact = response.data;
  //       console.log("that",that.listOfContact);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // },
};
</script>

<style>
#myListC {
  text-align: left;
  margin: 2% 10% 2% 10%;
  border-radius: 10px 10px 10px 10px;
  -moz-border-radius: 10px 10px 10px 10px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border: 2px solid #000000;
}
#prenom, #email{
  display: inline;
  margin: 1% 1% 1% 1%;
}
span {
  font-weight: bold;
  font-size: 1.3em;
  color: rgb(2, 114, 129);
}
</style>