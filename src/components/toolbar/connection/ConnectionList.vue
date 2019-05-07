<template>
  <v-list two-line subheader>
    <v-subheader>Select Connection</v-subheader>
    <template v-if="connectionList.length === 0" >
      <v-list-tile
              avatar
              ripple
      >
        <v-list-tile-content>
          <v-list-tile-sub-title>
            <cx-empty-tip message="No connection."></cx-empty-tip>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
    <template v-else v-for="(item, index) in connectionList">
      <v-list-tile
              :key="item.name"
              avatar
              ripple
      >
        <v-list-tile-avatar>
          <vue-letter-avatar :name="item.name" size="40" :rounded=true />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.server }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-menu>
            <template #activator="{ on: menu }">
              <v-tooltip bottom>
                <template #activator="{ on: tooltip }">
                  <v-btn
                          icon
                          v-on="{ ...tooltip, ...menu }"
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>
                <span>menu</span>
              </v-tooltip>
            </template>
            <v-list>
              <!--<v-list-tile @click="doConnect">-->
                <!--<v-list-tile-title>Connect</v-list-tile-title>-->
              <!--</v-list-tile>-->
              <!--<v-list-tile @click="editConnection">-->
                <!--<v-list-tile-title>Edit Connection</v-list-tile-title>-->
              <!--</v-list-tile>-->
              <v-list-tile @click="deleteConnection(item.name)">
                <v-list-tile-title>Delete Connection</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile-action>

      </v-list-tile>
      <v-divider
              v-if="index + 1 < connectionList.length"
              :key="index"
      ></v-divider>
    </template>
  </v-list>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "ConnectionList",
    computed: {
      ...mapState(['connectionList'])
    },
    methods: {
      deleteConnection (name) {
        this.$store.dispatch('deleteConnection', name)
      },
      editConnection () {

      },
      doConnect () {

      }
    }
  }
</script>

<style scoped>

</style>
