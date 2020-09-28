<template>
    <div id="contact">
      <p>Name: {{ this.$store.state.name }} =====> Id: {{ this.$store.state.id }}</p>
    </div>
  
</template>

<script>
export default {
    name: "ContactList"

}
</script>

<style>
#contact {
  padding-top: 10px;
  margin-right: 10vw;
  margin-left: 10vw;
  border-radius: 20px 20px 20px 20px;
  -moz-border-radius: 20px 20px 20px 20px;
  -webkit-border-radius: 20px 20px 20px 20px;
  border: 2px solid #000000;
}

</style>