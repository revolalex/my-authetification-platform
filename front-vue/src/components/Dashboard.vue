<template>
  <div id="center">
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