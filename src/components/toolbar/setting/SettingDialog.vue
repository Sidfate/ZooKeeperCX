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
        <v-subheader>General</v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Theme</v-list-tile-title>
            <v-radio-group v-model="theme" row @change="changeTheme">
              <v-radio label="Dark" value="dark"></v-radio>
              <v-radio label="Light" value="light"></v-radio>
            </v-radio-group>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list
              subheader
              three-line
      >
        <v-subheader>General</v-subheader>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-checkbox
                    v-model="notifications"
            ></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content @click.prevent="notifications = !notifications">
            <v-list-tile-title>Notifications</v-list-tile-title>
            <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "SettingDialog",
    computed: {
      ...mapState(['setting'])
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
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
      }
    }
  }
</script>

<style scoped>

</style>
