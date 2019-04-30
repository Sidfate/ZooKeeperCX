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
        <cx-loading :loading="loading"></cx-loading>
        <v-container
                grid-list-md
                tag="v-card-text"
                text-xs-left
                wrap
        >
          <div v-if="!loading">
            <template v-if="JSON.stringify(content) !== '{}'">
              <template v-for="(item, key) in content" >
                <v-layout row wrap :key="key">
                  <v-flex tag="strong" xs4 class="node-content-text">{{ key+':' }}</v-flex>
                  <v-flex xs8 class="node-content-text">{{ item }}</v-flex>
                </v-layout>
              </template>
            </template>
            <template v-else>
              <cx-empty-tip message="No data."></cx-empty-tip>
            </template>
          </div>
        </v-container>
      </v-card>
    </v-scroll-y-transition>
    <v-bottom-nav
            :active.sync="bottomNav"
            :color="color"
            :value="true"
            dark
            absolute
    >
      <v-btn flat @click="showData">
        <span>Data</span>
        <v-icon>storage</v-icon>
      </v-btn>

      <v-btn flat @click="showStats">
        <span>Stats</span>
        <v-icon>message</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn flat @click="refreshData">
        <span>Refresh</span>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn flat>
        <span>Edit</span>
        <v-icon>edit</v-icon>
      </v-btn>

      <v-btn flat @click="deleteNode">
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
        loading: false,
        nodeData: {},
        stats: {},
        content: {},
        bottomNav: 0,
        contentType: 'data'
      }
    },
    watch: {
      '$store.state.node.path': {
        handler: function (newer, older) {
          if (older !== newer) {
            this.contentType = 'data'
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
        this.loading = true
        console.log('getData')
        console.log(this.node.path)
        let { data, stats } = await getData(this.connection.handler, this.node.path)

        this.content = {}
        if(data) {
          data = data.toString('utf8')
          this.nodeData = Object.assign({}, JSON.parse(data))
        }
        if(stats) {
          stats = this._formatStats(stats)
          this.stats = Object.assign({}, stats)
        }

        if(this.contentType === 'stats') {
          this.showStats()
        }else {
          this.showData()
        }
        this.loading = false
      },
      showData () {
        this.contentType = 'data'
        this.content = Object.assign({}, this.nodeData)
      },
      showStats () {
        this.contentType = 'stats'
        this.content = Object.assign({}, this.stats)
      },
      async refreshData () {
        await this.fetchData()
      },
      deleteNode () {
        this.$store.dispatch('showModal', {
          description: `Are you sure to do delete the node?`,
          sureBtn: 'Sure',
          next: () => {
            console.log('deleted')
          }
        })
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
