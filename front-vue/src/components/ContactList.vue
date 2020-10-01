<template>
  <div>
    <b-container class="bv-example-row">
      <b-row
        id="myListC"
        v-for="element in this.$store.state.contact"
        :key="element.id"
      >
        <b-col><span> Prénom: </span> {{ element.name }}</b-col>
        <b-col><span> Email: </span> {{ element.email }}</b-col>
      </b-row>
    </b-container>
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
    //Headers of request
    let yourConfig = {
      headers: {
        Authorization: "Bearer " + this.$store.state.token,
      },
    };
    // for no problem of scope in the callback
    let that = this;
    axios
      .get(
        `http://localhost:3000/get-contacts/${this.$store.state.id}`,
        yourConfig
      )
      .then(function (response) {
        that.listOfContact = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
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
  padding: 1%;
}
#prenom,
#email {
  display: inline;
  margin: 1% 1% 1% 1%;
}
#deleteButton {
  margin: 2%;
}
span {
  font-weight: bold;
  font-size: 1.1em;
  color: rgb(2, 114, 129);
}
</style>