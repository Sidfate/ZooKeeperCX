<template>
  <v-app id="inspire" :dark="setting.theme ==='dark'">
    <zk-drawer></zk-drawer>
    <zk-toolbar></zk-toolbar>
    <v-content>
      <zk-content></zk-content>
    </v-content>
    <message></message>
  </v-app>
</template>

<script>
import { ZkContent, ZkDrawer, ZkToolbar } from './components'
import { Message } from './components/public'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    ZkContent, ZkDrawer, ZkToolbar, Message
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
