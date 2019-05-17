<template>
  <v-speed-dial
          v-model="fab"
          bottom
          right
          direction="top"
          transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn
              v-model="fab"
              color="blue darken-2"
              fab
              dark
      >
        <v-icon>mdi-menu</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
    </template>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
                v-on="on"
                fab
                dark
                small
                color="red"
                @click="deleteNode"
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
      <span>Delete Node</span>
    </v-tooltip>
    <!--<v-tooltip left>-->
      <!--<template v-slot:activator="{ on }">-->
        <!--<v-btn-->
                <!--v-on="on"-->
                <!--fab-->
                <!--dark-->
                <!--small-->
                <!--color="warning"-->
                <!--@click="changeAuth"-->
        <!--&gt;-->
          <!--<v-icon>mdi-key-plus</v-icon>-->
        <!--</v-btn>-->
      <!--</template>-->
      <!--<span>Add Auth</span>-->
    <!--</v-tooltip>-->
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
                v-on="on"
                fab
                dark
                small
                color="green"
                @click="editNode"
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <span>Edit Node</span>
    </v-tooltip>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
                v-on="on"
                fab
                dark
                small
                color="indigo"
                @click="refreshNode"
        >
          <v-icon>refresh</v-icon>
        </v-btn>
      </template>
      <span>Refresh Node</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
  import NodeEditDialog from './NodeEditDialog'

  export default {
    name: "OperatorMenu",
    components: {
      NodeEditDialog
    },
    data () {
      return {
        fab: false,
      }
    },
    methods: {
      deleteNode () {
        console.log('child')
        this.$emit('node-delete')
      },
      refreshNode () {
        this.$emit('node-refresh')
      },
      changeAuth () {
        this.$emit('node-auth')
      },
      editNode () {
        this.$emit('node-edit')
      }
    }
  }
</script>

<style scoped>

</style>
