<template>
  <v-toolbar app fixed clipped-left>
    <!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
    <!--<v-toolbar-title>ZKCX</v-toolbar-title>-->

    <v-menu :nudge-width="100">
      <template v-slot:activator="{ on }">
        <v-toolbar-title v-on="on" style="cursor: pointer">
          <span>{{ connectionName }}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
      </template>

      <v-list>
        <v-list-tile
                v-for="item in connections"
                :key="item.name"
                @click="connect(item)"
        >
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="openConnectDialog">
          <v-icon>settings_input_component</v-icon>
        </v-btn>
      </template>
      <span>New Connection</span>
    </v-tooltip>

    <v-btn icon>
      <v-icon>settings</v-icon>
    </v-btn>

    <!--<v-btn icon>-->
      <!--<v-icon>more_vert</v-icon>-->
    <!--</v-btn>-->

    <connect-dialog ref="connectDialog"></connect-dialog>
  </v-toolbar>
</template>

<script>
  import { ConnectDialog } from './toolbar'

  export default {
    components: {
      ConnectDialog
    },
    data() {
      return {
        connections: [
          {
            name: 'dev',
            link: 'http://1.com'
          },
          {
            name: 'test',
            link: 'http://2.com'
          },
          {
            name: 'stage',
            link: 'http://3.com'
          }
        ],
        connectionName: 'None'
      }
    },
    methods: {
      openConnectDialog () {
        this.$refs['connectDialog'].openDialog()
      },
      async connect (item) {
        this.$store.commit('toggleConnectLoading')
        this.connectionName = item.name

        // const client = this.$zk.createAsyncClient('test.cdh.ecarx.local:2181')
        // await client.connectAsync()
      }
    }
  }
</script>

<style>

</style>
