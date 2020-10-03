<template>
  <div>
    <!-- navbar -->
    <div id="myNav">
      <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">Dashboard</b-navbar-brand>
          <b-navbar-nav>
            <b-navbar-brand id="nameUser" href="#" disabled>
              <b-avatar variant="light"></b-avatar>
              {{ userName }}
            </b-navbar-brand>
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
              >Sign-Out <b-icon icon="x-circle" variant="light" scale="1"></b-icon></b-button
            >
          </b-navbar-nav>
        </b-navbar>
      </div>
    </div>
    <!-- jumbotron -->
    <b-jumbotron lead="Welcome to your connected user ! "
      ><h3 id="usName">{{ userName }} </h3></b-jumbotron
    >
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
  computed: {
    userName() {
      let temp = this.$store.state.name;
      return temp.charAt(0).toUpperCase() + temp.slice(1);
    },

  },

  methods: {
    deleteToken() {
      this.$store.dispatch("DELETE_TOKEN");
      this.$store.dispatch("DELETE_CONTACT");
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
#nameUser {
  font-weight: bolder;
  font-size: 1.2em;
  font-style: italic;
}
#usName {
  color: rgb(12, 144, 161);
}
</style>