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
          <h3 class="headline mb-2" style="word-wrap:break-word;">
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
                v-if="!loading"
        >
          <div v-if="!loading">
            <template v-if="typeof content === 'object' && JSON.stringify(content) !== '{}'">
              <template v-for="(item, key, index) in content">
                <v-layout row wrap>
                  <v-flex :key="`key-${key}`" tag="strong" xs4 class="node-content-text">{{ key }}</v-flex>
                  <v-flex :key="`value-${key}`" xs8 class="node-content-text">{{ item }}</v-flex>
                </v-layout>
                <v-divider v-if="index !== Object.keys(content).length - 1" :key="key"></v-divider>
              </template>
            </template>
            <template v-else-if="typeof content === 'string' && content">
              <span>{{ content }}</span>
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
            :value="true"
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

      <v-btn flat @click="showAcl">
        <span>Acl</span>
        <v-icon>mdi-key</v-icon>
      </v-btn>
    </v-bottom-nav>
    <operator-menu
            @node-delete="deleteNode"
            @node-refresh="fetchData"
            @node-auth="addAuth"
            @node-edit="openEditDialog"
    ></operator-menu>

    <node-edit-dialog ref="nodeEditDialog" :data="nodeData" @edit-success="fetchData"></node-edit-dialog>
  </v-layout>
</template>

<script>
  import {mapState} from 'vuex'
  import {getData, getAcl, zkClient, removeNode} from '@/utils/zk'
  import {dateFormat} from '@/utils/date'
  import {OperatorMenu, NodeEditDialog} from './node'

  export default {
    name: "NodeContent",
    components: {
      OperatorMenu,
      NodeEditDialog
    },
    computed: {
      ...mapState(['connection', 'node'])
    },
    data() {
      return {
        fab: false,
        loading: false,
        nodeData: '',
        stats: {},
        content: {},
        acls: {},
        bottomNav: 0,
        rawData: '',
        contentType: 'data'
      }
    },
    watch: {
      '$store.state.node.path': {
        handler: function (newer, older) {
          console.log('node changed')
          console.log(this.node)
          if (older !== newer) {
            this.contentType = 'data'
            this.bottomNav = 0
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
        let {data, stats} = await getData(this.connection.handler, this.node.path)

        this.content = {}
        if (data) {
          this.nodeData = this._formData(data)
        }
        if (stats) {
          stats = this._formatStats(stats)
          this.stats = Object.assign({}, stats)
        }

        if (this.contentType === 'acls') {
          this.showAcl()
        } else if (this.contentType === 'stats') {
          this.showStats()
        } else {
          this.showData()
        }
        this.loading = false
      },
      showData() {
        this.contentType = 'data'
        this.content = this.isJson(this.nodeData) ? Object.assign({}, JSON.parse(this.nodeData)) : this.nodeData
        console.log(this.content)
      },
      showStats() {
        this.contentType = 'stats'
        this.content = Object.assign({}, this.stats)
      },
      async showAcl() {
        let acls = await getAcl(this.connection.handler, this.node.path)
        let acl = acls && acls.length > 0 ? acls[0] : null
        if (acl) {
          acl.permission = this.$tool.findKey(zkClient.Permission, function (o) {
            return o === acl.permission
          })
          acl.id = acl.id.scheme + ", " + acl.id.id
        }

        this.contentType = 'acls'
        this.content = Object.assign({}, acl ? acl : {})
      },
      openEditDialog () {
        this.$refs['nodeEditDialog'].openDialog()
      },
      deleteNode() {
        console.log(1111)
        this.$store.dispatch('showModal', {
          description: 'Are you sure to do delete the node(include its children nodes)?',
          sureBtn: 'Sure',
          title: 'Warning',
          next: () => {
            removeNode(this.connection.handler, this.node.path).then(() => {
              this.$store.dispatch('connect', this.connection)
            })
          }
        })
      },
      addAuth() {

      },
      _formatStats(stats) {
        let stats$1 = {}

        this.$tool.forIn(stats.specification, (value) => {
          let one = stats[value.name]
          if (one instanceof Buffer) {
            if (value.type === 'long') {
              one = one.toString('hex')
              one = '0x' + parseInt(one, 16).toString(16)
            } else {
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
      _formatTime(time) {
        return dateFormat(parseInt(time), 'yyyy-MM-dd h:m:s');
      },
      _formData(data) {
        return data.toString('utf8')
      },
      isJson(str) {
        if (typeof str == 'string') {
          try {
            const obj = JSON.parse(str)
            if (typeof obj == 'object' && obj) {
              return true
            } else {
              return false
            }
          } catch (e) {
            return false
          }
        }
      }
    }
  }
</script>

<style scoped>
  .node-content-text {
    word-wrap: break-word;
  }

  .v-speed-dial {
    position: absolute;
    bottom: 66px;
    right: 10px;
  }

  .v-btn--floating {
    position: relative;
  }
</style>
