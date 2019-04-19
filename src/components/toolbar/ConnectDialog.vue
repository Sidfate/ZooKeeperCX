<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Connection</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-layout row warp>
        <v-flex xs4>
          <v-list two-line subheader>
            <v-subheader>Select Connection</v-subheader>
            <template v-for="(item, index) in connections">
              <v-list-tile
                      :key="item.name"
                      avatar
                      ripple
                      @click="toggle(index)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.link }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                  <v-icon
                          v-if="selected.indexOf(index) < 0"
                          color="grey lighten-1"
                  >
                    star_border
                  </v-icon>

                  <v-icon
                          v-else
                          color="yellow darken-2"
                  >
                    star
                  </v-icon>
                </v-list-tile-action>

              </v-list-tile>
              <v-divider
                      v-if="index + 1 < connections.length"
                      :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-flex>
        <v-divider vertical dark></v-divider>
        <v-flex xs8>
          <v-list two-line subheader>
            <v-subheader>New Connection</v-subheader>
            <v-list-tile>
              <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
              >
                <v-text-field
                        v-model="name"
                        :counter="10"
                        :rules="nameRules"
                        label="Name"
                        required
                ></v-text-field>

                <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Server"
                        required
                ></v-text-field>

                <v-checkbox
                        v-model="checkbox"
                        :rules="[v => !!v || 'You must agree to continue!']"
                        label="Do you agree?"
                        required
                ></v-checkbox>

                <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="validate"
                >
                  Validate
                </v-btn>

                <v-btn
                        color="error"
                        @click="reset"
                >
                  Reset Form
                </v-btn>

                <v-btn
                        color="warning"
                        @click="resetValidation"
                >
                  Reset Validation
                </v-btn>
              </v-form>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "ConnectDialog",
    data () {
      return {
        dialog: false,
        selected: [2],
        connections: [
          {
            name: 'dev',
            link: 'http://1.com'
          },
          {
            name: 'test',
            link: 'http://2.com'
          },
          {
            name: 'stage',
            link: 'http://3.com'
          }
        ],
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        select: null,
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
        ],
        checkbox: false
      }
    },
    methods: {
      openDialog () {
        this.dialog = true
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      }
    }
  }
</script>

<style scoped>

</style>
