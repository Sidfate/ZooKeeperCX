<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">Create Node</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 >
              <v-text-field label="Path" required v-model="form.path"></v-text-field>
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="green darken-1" flat @click="createNode">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

  export default {
    name: "NodeDialog",
    data () {
      return {
        dialog: false,
        form: {
          path: '',
          data: '',
          acl: '',
          createModel: 'Persistent',
        },
        createModels: [
          'Persistent',
          'Persistent Sequential',
          'Ephemeral',
          'Ephemeral Sequential'
        ]
      }
    },
    methods: {
      openDialog () {
        this.dialog = true
      },
      createNode () {

      }
    }
  }
</script>

<style scoped>

</style>
