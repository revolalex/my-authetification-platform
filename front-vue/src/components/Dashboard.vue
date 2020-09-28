<template>
  <div id="center">
    <b-jumbotron
      header="This is Dashboard page"
      lead="welcome to your connected users"
    >
      <hr class="my-4" />
    </b-jumbotron>
    <ConnectedHeader />
  </div>
</template>

<script>
import ConnectedHeader from "./ConnectedHeader";
export default {
  name: "Dashboard",
  components: {
    ConnectedHeader,
  },
};
</script>

<style>
#center {
  text-align: center;
}
</style>