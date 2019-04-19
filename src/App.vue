<template>
  <v-app id="inspire" dark>
    <zk-drawer></zk-drawer>
    <zk-toolbar></zk-toolbar>
    <v-content>
      <zk-content></zk-content>
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
import { ZkContent, ZkDrawer, ZkToolbar } from './components'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    ZkContent, ZkDrawer, ZkToolbar
  },
  computed: {
    ...mapState(['snackbar'])
  },
  data: () => ({
    drawer: true,
    drawerRight: true,
    right: null,
    left: null
  })
}
</script>
