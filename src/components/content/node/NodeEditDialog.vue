<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Node</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form
                  ref="form"
                  lazy-validation
          >
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                        label="Path"
                        required
                        disabled
                        :value="path"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                        rows="1"
                        label="Value"
                        auto-grow
                        v-model="form.data"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning darken-1" flat @click="closeDialog">Close</v-btn>
        <v-btn color="green darken-1" flat @click="editNode">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'
  import { setData } from '@/utils/zk'

  export default {
    name: "NodeEditDialog",
    props: {
      data: String
    },
    computed: {
      ...mapState(['connection', 'node']),
      path () {
        return this.node.path
      }
    },
    data() {
      return {
        dialog: false,
        form: {
          data: ''
        },
        rules: {}
      }
    },
    methods: {
      openDialog() {
        this.form.data = this.data
        this.dialog = true
      },
      async editNode() {
        await setData(this.connection.handler, this.path, this.form.data).then(() => {
          this.dialog = false
          this.$store.dispatch('sendMsg', { msg: `Edit Node Successful In ${this.node.path}` })
          this.$emit('edit-success')
        }).catch(e => {
          this.$store.dispatch('sendMsg', { msg: e.message, isError: true })
        })

      },
      closeDialog() {
        // this.$refs.form.reset()
        this.dialog = false
      }
    }
  }
</script>

<style scoped>

</style>
