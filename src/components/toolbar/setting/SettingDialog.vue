<template>
  <v-dialog v-model="dialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Setting</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list
              subheader
              two-line
      >
        <v-subheader>About</v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>ZookeeperCX</v-list-tile-title>
            <v-list-tile-sub-title>{{ 'Version: ' + version }} </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-btn color="primary" @click="goForDownload">
            Check for update
          </v-btn>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list
              subheader
              two-line
      >
        <v-subheader>General</v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Theme</v-list-tile-title>
            <v-list-tile-sub-title>Set the app theme.</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-radio-group v-model="theme" row @change="changeTheme" style="flex: 0 0 auto;">
            <v-radio label="Dark" value="dark"></v-radio>
            <v-radio label="Light" value="light"></v-radio>
          </v-radio-group>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Cache</v-list-tile-title>
            <v-list-tile-sub-title>Remove the whole cache.</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-btn color="error" @click="clearCache">
            Clear cache
          </v-btn>
        </v-list-tile>
      </v-list>

      <!--<v-divider></v-divider>-->

      <!--<v-list-->
              <!--subheader-->
              <!--three-line-->
      <!--&gt;-->
        <!--<v-subheader>Storage</v-subheader>-->
        <!--<v-list-tile @click="">-->
          <!--<v-list-tile-action>-->
            <!--<v-checkbox-->
                    <!--v-model="connections"-->
            <!--&gt;</v-checkbox>-->
          <!--</v-list-tile-action>-->

          <!--<v-list-tile-content @click.prevent="connections = !connections">-->
            <!--<v-list-tile-title>Connections</v-list-tile-title>-->
            <!--<v-list-tile-sub-title>Remove all your connections.</v-list-tile-sub-title>-->
          <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->
        <!--<v-btn color="info" :disabled="cacheSwitch">-->
          <!--Clear cache-->
        <!--</v-btn>-->
      <!--</v-list>-->
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'
  import { shell, remote } from 'electron'

  export default {
    name: "SettingDialog",
    computed: {
      ...mapState(['setting']),
      cacheSwitch () {
        return !this.connections
      },
      version () {
        return remote.getGlobal('version')
      },
      downloadLink () {
        return 'https://github.com/Sidfate/ZooKeeperCX/releases'
      }
    },
    data () {
      return {
        dialog: false,
        connections: false,
        theme: ''
      }
    },
    mounted () {
      this.theme = this.setting.theme
    },
    methods: {
      openDialog () {
        this.dialog = true
      },
      changeTheme () {
        this.$store.dispatch('changeTheme', this.theme)
      },
      clearCache () {
        this.$store.dispatch('showModal', {
          title: 'Warning',
          description: 'Are you sure to clear all cache include connections?',
          sureBtn: 'Sure',
          next: () => {
            this.$store.dispatch('clearConnections')
          }
        })
      },
      goForDownload () {
        shell.openExternal(this.downloadLink)
      }
    }
  }
</script>

<style scoped>

</style>
