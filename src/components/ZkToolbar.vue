<template>
  <v-toolbar app fixed clipped-left>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-toolbar-title v-on="connectionList.length > 0 ? on:null" style="cursor: pointer" @click="showConnections">
          <span>{{ connection['status'] ? connection.name : 'None' }}</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>
      </template>

      <v-list>
        <v-list-tile
                v-for="item in connectionList"
                :key="item.name"
                @click="connect(item)"
        >
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <template v-if="connection.status">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="openDialog('nodeDialog')" small>
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <span>Creat Node</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="closeConnection" small>
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </template>
        <span>Close Connection</span>
      </v-tooltip>
    </template>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="openDialog('connectDialog')">
          <v-icon>settings_input_component</v-icon>
        </v-btn>
      </template>
      <span>Connection</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="openDialog('settingDialog')">
          <v-icon>settings</v-icon>
        </v-btn>
      </template>
      <span>Setting</span>
    </v-tooltip>

    <connect-dialog ref="connectDialog"></connect-dialog>
    <setting-dialog ref="settingDialog"></setting-dialog>
    <node-dialog ref="nodeDialog"></node-dialog>
  </v-toolbar>
</template>

<script>
  import * as ZK from '@/utils/zk'
  import { ConnectDialog, SettingDialog, NodeDialog } from './toolbar'
  import { cleanStore } from '@/utils/localStore'
  import { mapState } from 'vuex'

  export default {
    components: {
      ConnectDialog,
      SettingDialog,
      NodeDialog
    },
    computed: {
      ...mapState(['connection', 'connectionList'])
    },
    data() {
      return {}
    },
    methods: {
      openDialog(ref) {
        this.$refs[ref].openDialog()
      },
      connect(item) {
        ZK.connect(item.server).then((client) => {
          item.handler = client
          this.$store.dispatch('connect', item)

          client.on('disconnected', function () {
            this.$store.dispatch('closeConnection')
          })
        }).catch(() => {
          this.$store.dispatch('sendMsg', {msg: 'Connection failed', isError: true})
        })
      },
      cleanStore() {
        cleanStore()
      },
      showConnections() {
        if (this.connectionList.length > 0) {
          return true
        }

        this.openDialog('connectDialog')
      },
      closeConnection() {
        this.connection.handler.close()
        this.$store.dispatch('closeConnection')
      }
    }
  }
</script>

<style>

</style>
