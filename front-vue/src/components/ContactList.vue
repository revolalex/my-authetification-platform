<template>
  <div class="mt-3">
    <b-card-group columns>
      <b-card
        v-for="element in this.$store.state.contact"
        :key="element.id"
        border-variant="info"
        header=""
        align="center"
      >
        <b-card-header header-bg-variant="info" header-text-variant="white" id="spanName">
          <span >
            {{ element.name }}
          </span>
        </b-card-header>
        <br>
        <b-card-text> 
          <b-icon icon="envelope" variant="warning" scale="1.3"></b-icon> 
          <span id="spanEmail"> 
            {{ element.email }}
          </span>
        </b-card-text>
        <b-form-input v-model="newEmail[element.email]" placeholder="new email">
        </b-form-input>
        <br />
        <b-button
          id="myBtn"
          pill
          variant="warning"
          size="sm"
          v-b-popover.hover.bottom="
            'Are you sure you want to change the email contact'
          "
          title="Change Email"
          @click="setEmail(element.email)"
          >Change Email
        </b-button>
        <hr />
        <b-button
          id="myBtn"
          pill
          variant="danger"
          size="sm"
          @click="deleteContact(element.email)"
          v-b-popover.hover.right="
            'Are you sure you want to delete the contact'
          "
          title="Carrefull !"
          >  Delete <b-icon icon="trash" variant="info" scale="1"></b-icon>
        </b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ContactList",
  data: function () {
    return {
      listOfContact: [],
      mailToDelete: "",
      newEmail: {},
      // header for token (back end use middleware)
      yourConfig: {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      },
    };
  },

  methods: {
    async setEmail(oldEmail) {
      let specify = { specify: this.newEmail[oldEmail] };
      await axios
        .put(`http://localhost:3000/users/${oldEmail}`, specify)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      // for no problem of scope in the callback
      let that = this;
      await axios
        .get(
          `http://localhost:3000/get-contacts/${this.$store.state.id}`,
          that.yourConfig
        )
        .then(function (response) {
          that.$store.state.contact = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async deleteContact(mailToDelete) {
      await axios
        .delete(`http://localhost:3000/users/${mailToDelete}`, this.yourConfig)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      //Headers of request

      // for no problem of scope in the callback
      let that = this;
      await axios
        .get(
          `http://localhost:3000/get-contacts/${this.$store.state.id}`,
          that.yourConfig
        )
        .then(function (response) {
          that.$store.state.contact = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted() {
    // for no problem of scope in the callback
    let that = this;
    axios
      .get(
        `http://localhost:3000/get-contacts/${this.$store.state.id}`,
        that.yourConfig
      )
      .then(function (response) {
        that.listOfContact = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

</script>

<style>
#spanEmail {
  font-size: 1.3em;
}
#spanName {
  font-size: 1.3em;
  font-weight: 600;
}
</style>