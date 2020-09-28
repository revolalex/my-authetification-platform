<template>
  <div id="liens">
    <a href="/dashboard">Dashboard</a>
    <p>{{ this.$store.state.name }}</p>

    <b-button type="submit" variant="danger" @click="deleteToken"
      >Sign Out</b-button
    >
  </div>
</template>

<script>
export default {
  name: "ConnectedHeader",
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
</style>