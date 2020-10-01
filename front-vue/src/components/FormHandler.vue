<template>
  <div id="myDiv">
    <b-tabs content-class="mt-3">
      <b-tab title="Sign-Up" active>
        <SignUpForm />
      </b-tab>

      <b-tab title="Sign-In">
        <SignInForm />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
export default {
  name: "FormHandler",
  components: {
    SignInForm,
    SignUpForm,
  },
};
</script>
<style>
#myDiv {
  padding-left: 15vw;
  padding-right: 15vw;
}
</style>