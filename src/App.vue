<template>
  <v-app id="inspire" style="background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md3>
            <hello-world></hello-world>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar
            v-model="snackbar.status"
            top
            :color="snackbar.color"
    >
      {{ snackbar.msg }}
      <v-btn
              flat
              @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState(['snackbar'])
  },
  data () {
    return {
      //
    }
  }
}
</script>
