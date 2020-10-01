<template>
  <div>
    <!-- navbar -->
    <div id="myNav">
      <div>
        <b-navbar toggleable="lg" type="dark" variant="info" >
          <b-navbar-brand href="#">Dashboard</b-navbar-brand>
          <b-navbar-nav>
            <b-nav-item href="#" disabled>{{this.$store.state.name}}</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
              variant="danger"
              @click="deleteToken"
              v-b-popover.hover.bottom="'Delete the token !'"
              title="Sign-Out"
              >Sign-Out</b-button
            >
          </b-navbar-nav>
        </b-navbar>
      </div>
    </div>
    <!-- jumbotron -->
    <b-jumbotron lead="welcome to your connected user !"> </b-jumbotron>
    <!-- tab -->
    <div>
      <div id="myTab">
        <b-tabs content-class="mt-3">
          <b-tab title="List-Contact">
            <ContactList />
          </b-tab>
          <b-tab title="Add-Contact" active>
            <AddContactForm />
          </b-tab>
        </b-tabs>
      </div>
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
    AddContactForm,
  },
  methods: {
    deleteToken() {
      this.$store.dispatch("DELETE_TOKEN");
      this.$store.dispatch("DELETE_CONTACT")
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
#myTab {
  margin-left: 20vw;
  margin-right: 20vw;
}
</style>