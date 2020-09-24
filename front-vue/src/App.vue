<template>
  <div id="app">
    <div>
      <router-link to="/">H</router-link>
      <router-link to="/dashboard">D</router-link>
    </div>
    <router-view></router-view>
    <!-- <MyJumbotron /> -->
  </div>
</template>

<script>
// import MyJumbotron from './components/MyJumbotron'

export default {
  name: "App",
  components: {
    // MyJumbotron
  },
};
</script>

<style>
</style>
