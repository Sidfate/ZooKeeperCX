<template>
  <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          style="padding: 0 16px;"
  >
    <v-text-field
            v-model="form.name"
            :counter="10"
            :rules="rules.name"
            label="Name"
            required
    ></v-text-field>

    <v-text-field
            v-model="form.server"
            :rules="rules.server"
            label="Server"
            required
    ></v-text-field>

    <v-layout >
      <v-btn
              color="cyan"
              class="white--text"
              depressed
              @click="testConnection"
              style="margin-left: 0"
      >
        Test Connection
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
              color="success"
              @click="saveConnection"
              depressed
              style="margin-right: 0"
      >
        Save
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
  import * as ZK from '@/utils/zk'

  export default {
    name: "ConnectionForm",
    data () {
      return {
        valid: true,
        form: {
          name: '',
          server: ''
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters'
          ],
          server: [
            v => !!v || 'Server is required'
          ]
        }
      }
    },
    methods: {
      saveConnection () {
        if (this.$refs.form.validate()) {

          this.loading = true
          const connection = Object.assign({}, this.form)
          this.$store.dispatch('createConnection', connection)
          this.$refs['form'].reset()
          this.loading = false
        }
      },
      async testConnection () {
        this.loading = true
        let msg = 'Test connection success'
        ZK.connect(this.form.server).catch(() => {
          msg = 'Test connection failed'
        }).finally(() => {
          this.$store.dispatch('sendMsg', { msg })
          this.loading = false
        })
      },
      resetForm () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>

</style>
