<template>
  <v-layout align-center justify-center row fill-height v-if="loading"
            style="width: 100%;position: absolute;background: rgba(0,0,0,.38);"
  >
    <v-progress-circular
            indeterminate
            color="primary"
    ></v-progress-circular>
  </v-layout>
</template>

<script>
  export default {
    name: "Loading",
    props: {
      loading: Boolean
    }
  }
</script>

<style scoped>

</style>
