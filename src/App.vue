<template>
  <v-app id="inspire" :dark="setting.theme ==='dark'">
    <zk-drawer></zk-drawer>
    <zk-toolbar></zk-toolbar>
    <v-content>
      <zk-content></zk-content>
    </v-content>
    <cx-message></cx-message>
    <cx-check-modal></cx-check-modal>
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
    ...mapState(['setting'])
  },
  data: () => ({
    drawer: true,
    drawerRight: true,
    right: null,
    left: null
  })
}
</script>
