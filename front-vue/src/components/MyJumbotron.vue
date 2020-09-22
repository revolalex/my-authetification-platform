<template>
  <div id="center">
    <b-jumbotron
      header="Connextion Interface"
      lead="Below the formulary for Sign-up or Sign-in in our magnificient application"
    >
    <hr class="my-4" />
    <FormHandler/>
    </b-jumbotron>
  </div>
</template>

<script>
import FormHandler from './FormHandler'
export default {
  name: "MyJumbotron",
  components: {
    FormHandler
  }
};
</script>

<style>
#center {
  text-align: center;
}
</style>