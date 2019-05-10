<template>
  <v-snackbar
          v-model="snackbar.status"
          top
          :color="snackbar.color"
  >
    {{ snackbar.msg }}
    <v-btn
            flat
            @click.stop="closeSnackbar"
    >
      <v-icon v-if="snackbar.isError">mdi-close</v-icon>
      <v-icon v-else>mdi-check</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "Message",
    computed: {
      ...mapState(['snackbar'])
    },
    methods: {
      closeSnackbar () {
        this.$store.dispatch('closeMsg')
      }
    }
  }
</script>

<style scoped>

</style>
