<template>
  <div id="app">
    <div id="liens">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
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
#liens{
  font-size: 2em;
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  background: rgb(235, 232, 232);
}
</style>
