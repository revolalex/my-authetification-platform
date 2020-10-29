<template>
  <div id="center">
    <b-jumbotron
      header="Connextion Interface"
      lead="Below the formulary for Sign-up or Sign-in in our magnificient application"
    >
      <hr class="my-4" />
      <FormHandler />
    </b-jumbotron>
    <div>
      <b-button v-b-toggle.sidebar-1 variant="info"
        >Information
        <b-icon
          icon="question-circle"
          variant="light"
          scale="1.1"
          animation="throb"
        ></b-icon
      ></b-button>
      <b-sidebar
        id="sidebar-1"
        title="Project Info"
        shadow
        bg-variant="info"
        text-variant="light"
      >
        <div class="px-3 py-2" id="mySlide">
          <p>
            This project is a secure Authentification platform.
            <br /><br />
            The password is protect, hash with "b-crypt"
            <br /><br />
            All users are been identified by checking and using token
            <br /><br />
            You can create an users (sign-up)
            <br /><br />
            You can login (sign-in)
            <br /><br />
            And when you are connected you can manage your contact list
            <br /><br />
          </p>
          <b-img
            src="https://user-images.githubusercontent.com/56839789/95012187-a6b7dc00-0636-11eb-9998-bb987ef6f6ae.png"
            fluid
            thumbnail
          ></b-img>
          <br /><br />

          <b-button v-b-toggle.sidebar-1 variant="warning"
            ><a href="https://github.com/revolalex/my-authetification-platform" target="_blank"
              >More detail </a>
            <b-icon
              icon="eye"
              variant="info"
              scale="1.1"
              animation="cylon"
            ></b-icon
          ></b-button>

        </div>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
import FormHandler from "./FormHandler";
export default {
  name: "MyJumbotron",
  components: {
    FormHandler,
  },
};
</script>

<style>
#mySlide {
  text-align: left;
}
#mySlide a {
  color: black;
}
#center {
  height: 100vh;
}
</style>