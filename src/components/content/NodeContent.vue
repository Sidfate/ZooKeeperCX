<template>
  <v-layout text-xs-center fill-height>
    <v-scroll-y-transition mode="out-in">
      <v-card
              :key="node.path"
              class="mx-auto"
              flat
              min-width="100%"
              min-height="100%"
      >
        <v-card-text>
          <h3 class="headline mb-2">
            {{ node.name }}
          </h3>
        </v-card-text>
        <v-divider></v-divider>
        <v-container
                grid-list-md
                tag="v-card-text"
                text-xs-left
                wrap
        >
          <template v-for="(item, key) in content" >
            <v-layout row wrap :key="key">
              <v-flex tag="strong" xs4 class="node-content-text">{{ key+':' }}</v-flex>
              <v-flex xs8 class="node-content-text">{{ item }}</v-flex>
            </v-layout>
          </template>
        </v-container>
      </v-card>
    </v-scroll-y-transition>
    <v-bottom-nav
            :active.sync="bottomNav"
            :color="color"
            :value="true"
            absolute
    >
      <v-btn flat @click="showData">
        <span>Data</span>
        <v-icon>storage</v-icon>
      </v-btn>

      <v-btn flat @click="showAcl">
        <span>Stats</span>
        <v-icon>message</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn flat>
        <span>Edit</span>
        <v-icon>edit</v-icon>
      </v-btn>

      <v-btn flat>
        <span>Delete</span>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-layout>
</template>

<script>
  import { mapState } from 'vuex'
  import { getData } from '@/utils/zk'
  import { dateFormat } from '@/utils/date'

  export default {
    name: "NodeContent",
    computed: {
      ...mapState(['connection', 'node']),
      color () {
        switch (this.bottomNav) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
        }
      }
    },
    data() {
      return {
        nodeData: {},
        stats: {},
        content: {},
        bottomNav: 0
      }
    },
    watch: {
      '$store.state.node.path': {
        handler: function (newer, older) {
          if (older !== newer) {
            this.fetchData()
          }
        }
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        console.log('getData')
        console.log(this.node.path)
        let { data, stats } = await getData(this.connection.handler, this.node.path)

        this.content = {}
        if(data) {
          data = data.toString('utf8')
          this.nodeData = Object.assign({}, JSON.parse(data))
        }
        if(stats) {
          console.log(stats)
          stats = this._formatStats(stats)
          this.stats = Object.assign({}, stats)
        }

        this.showData()
      },
      showData () {
        this.content = Object.assign({}, this.nodeData)
      },
      showAcl () {
        this.content = Object.assign({}, this.stats)
      },
      _formatStats (stats) {
        let stats$1 = {}

        this.$tool.forIn(stats.specification, (value) => {
          let one = stats[value.name]
          if(one instanceof Buffer) {
            if(value.type === 'long') {
              one = one.toString('hex')
              one = '0x' + parseInt(one, 16).toString(16)
            }else {
              one = one.toString('utf8')
              one = parseInt(one)
            }
          }

          stats$1[value.name] = one
        })

        stats$1.ctime = this._formatTime(stats$1.ctime)
        stats$1.mtime = this._formatTime(stats$1.mtime)
        return stats$1
      },
      _formatTime (time) {
        return dateFormat(parseInt(time), 'yyyy-MM-dd h:m:s');
      }
    }
  }
</script>

<style scoped>
  .node-content-text {
    word-wrap:break-word;
  }
</style>
