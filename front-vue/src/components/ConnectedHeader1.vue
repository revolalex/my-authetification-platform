<template>
  <div>
    <div id="liens">
      <a href="/dashboard">Dashboard</a>
      <p>{{ this.$store.state.name }}</p>
      

      <b-button
        type="submit"
        variant="danger"
        @click="deleteToken"
        v-b-popover.hover.bottom="'Delete the token !'"
        title="Sign-Out"
        >Sign Out</b-button
      >
    </div>

    <div id="myTab">
      <b-tabs content-class="mt-3">
        <b-tab title="List-Contact" active>
          <ContactList />
        </b-tab>
        <b-tab title="Add-Contact"> 
          <AddContactForm/>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import ContactList from "./ContactList";
import AddContactForm from "./AddContactForm";
export default {
  name: "ConnectedHeader",
  components: {
    ContactList,
    AddContactForm
  },
  methods: {
    deleteToken() {
      this.$store.dispatch("DELETE_TOKEN");
      this.$router.push("/");
    },
  },
};
</script>

<style>
#liens {
  display: flex;
  align-items: center;
  background: darkgreen;
}
#myTab{
  margin-left: 20vw;
  margin-right: 20vw;
}
</style>