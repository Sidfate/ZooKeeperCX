<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
     <intro-view></intro-view>
    </v-layout>
  </v-container>
</template>

<script>
  import { IntroView } from './content'

  export default {
    components: {
      IntroView
    }
  }
</script>

<style>

</style>
