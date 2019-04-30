<template>
  <div>
    <v-alert
            :value="true"
            color="warning"
            icon="sentiment_dissatisfied"
            :outline="outline"
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      message: String
    },
    computed: {
      ...mapState(['setting']),
      outline () {
        return this.setting['theme'] === 'light'
      }
    },
    name: "EmptyTip"
  }
</script>

<style scoped>

</style>
