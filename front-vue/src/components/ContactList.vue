<template>
  <div>
    <div id="contact">
      <p>
        Name: {{ this.$store.state.name }} =====> Id: {{ this.$store.state.id }}
      </p>
    </div>
    <li></li>
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
  beforeCreate() {
    let self = this
    axios
      .get(`http://localhost:3000/test`)
      .then(function (response) {
        console.log(response.data[0]);
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
#contact {
  padding-top: 10px;
  margin-right: 20vw;
  margin-left: 20vw;
  border-radius: 20px 20px 20px 20px;
  -moz-border-radius: 20px 20px 20px 20px;
  -webkit-border-radius: 20px 20px 20px 20px;
  border: 2px solid #000000;
}
</style>