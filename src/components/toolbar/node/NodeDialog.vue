<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">Create Node</span>
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
                        v-model="form.path"
                        :rules="rules.path"
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
              <v-flex xs12 sm6>
                <v-select
                        :items="createModels"
                        label="CreateModel"
                        required
                        v-model="form.createModel"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning darken-1" flat @click="closeDialog">Close</v-btn>
        <v-btn color="green darken-1" flat @click="createNode">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'
  import { createNode, zkClient, checkPath } from '@/utils/zk'

  export default {
    name: "NodeDialog",
    computed: {
      ...mapState(['connection'])
    },
    data() {
      return {
        dialog: false,
        form: {
          path: '',
          data: '',
          acl: '',
          createModel: 'PERSISTENT',
        },
        rules: {
          path: [
            v => !!v || 'Path is required',
            v => checkPath(v) || 'Path is invalid, valid example: /node1/node2'
          ],
          server: [
            v => !!v || 'Server is required'
          ]
        },
        createModels: Object.keys(zkClient.CreateMode)
      }
    },
    methods: {
      openDialog() {
        this.dialog = true
      },
      async createNode() {
        await createNode(this.connection.handler, this.form).then((path) => {
          this.dialog = false
          this.$store.dispatch('sendMsg', { msg: `Create Node Successful In ${path}` })
          this.$store.dispatch('connect', this.connection)
        }).catch(e => {
          this.$store.dispatch('sendMsg', { msg: e.message, isError: true })
        })

      },
      closeDialog() {
        this.dialog = false
        this.$refs.form.reset()
        this.createModel = 'PERSISTENT'
      }
    }
  }
</script>

<style scoped>

</style>
