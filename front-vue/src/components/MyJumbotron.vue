<template>
  <div id="center">
    <b-jumbotron
      header="Connextion Interface"
      lead="Below the formulary for Sign-up or Sign-in in our magnificient application"
    >
    <hr class="my-4" />
    <FormHandler/>
      <!-- <div>
        <b-tabs content-class="mt-3">
          <b-tab title="Sign-Up" active>
            <p>I'm the first tab</p>
          </b-tab>
          <b-tab title="Si">
            <p>I'm the second tab</p>
          </b-tab>
        </b-tabs>
      </div> -->
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