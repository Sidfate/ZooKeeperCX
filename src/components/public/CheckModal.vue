<template>
  <v-dialog v-model="modal.status" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">{{ modal.title }}</v-card-title>
      <v-card-text>{{ modal.description }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning darken-1" flat @click="modal.status = false">{{ modal.cancelBtn }}</v-btn>
        <v-btn color="green darken-1" flat @click="doNext">{{ modal.sureBtn }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "CheckModal",
    computed: {
      ...mapState(['modal'])
    },
    methods: {
      doNext () {
        if(this.modal.next) {
          this.modal.next()
        }

        this.modal.status = false
      }
    }
  }
</script>

<style scoped>

</style>
