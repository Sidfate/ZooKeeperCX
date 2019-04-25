<template>
  <v-container>
    <v-layout
            text-xs-center
            wrap
    >
      <intro-view v-if="!node.status"></intro-view>
      <node-content v-else></node-content>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapState} from 'vuex'
  import {IntroView, NodeContent} from './content'

  export default {
    computed: {
      ...mapState(['node'])
    },
    components: {
      IntroView,
      NodeContent
    }
  }
</script>

<style>

</style>
