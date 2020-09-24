<template>
  <div id="center">
    <b-jumbotron
      header="This is Dashboard page"
      lead="welcome to your connected users"
    >
      <b-button type="submit" variant="danger" @click="deleteToken"
        >Sign Out</b-button
      >
      <hr class="my-4" />
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    deleteToken(){
      this.$store.dispatch("DELETE_TOKEN");
      this.$router.push("/");
    }
  },
};
</script>

<style>
#center {
  text-align: center;
}
</style>