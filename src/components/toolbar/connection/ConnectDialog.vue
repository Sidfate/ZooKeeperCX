<template>
  <v-dialog v-model="dialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card class="connection-card">
      <v-toolbar>
        <v-toolbar-title>Connection</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-layout row warp class="connection-card-content">
        <v-flex xs5>
          <connection-list></connection-list>
        </v-flex>
        <v-divider vertical></v-divider>
        <v-flex xs6>
          <v-subheader>New Connection</v-subheader>
          <connection-form ref="connectionForm"></connection-form>
        </v-flex>
        <cx-loading :loading="loading"></cx-loading>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  import ConnectionList from './ConnectionList'
  import ConnectionForm from './ConnectionForm'

  export default {
    name: "ConnectDialog",
    components: {
      ConnectionList,
      ConnectionForm
    },
    data () {
      return {
        loading: false,
        dialog: false
      }
    },
    methods: {
      openDialog () {
        this.dialog = true
      },
      closeDialog () {
        this.$refs['connectionForm'].resetForm()
        this.dialog = false
      }
    }
  }
</script>

<style scoped>
  .connection-card {
    display: flex;
    flex-direction: column;
  }
  .connection-card-content {
    flex: 1 1 auto;
  }

</style>
