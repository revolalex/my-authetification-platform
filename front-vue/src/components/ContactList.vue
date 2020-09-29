<template>
  <div>
    <div id="myListC" v-for="element in listOfContact" :key="element.id">
      <p><span> Prénom: </span> {{ element.name }}</p>
      <p><span> Email: </span> {{ element.email }}</p>
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
  computed: {
    listToShow() {
      return this.listOfContact;
    },
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
  margin: 2% 20% 2% 20%;
  border-radius: 25px 25px 25px 25px;
  -moz-border-radius: 25px 25px 25px 25px;
  -webkit-border-radius: 25px 25px 25px 25px;
  border: 2px solid #000000;
}
p {
  margin: 10%;
  display: inline;
  
}
span {
  
  font-weight: bold;
  font-size: 1.3em;
  color: rgb(2, 129, 45);
}
</style>