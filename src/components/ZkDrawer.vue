<template>
  <v-navigation-drawer
          permanent
          clipped
          fixed
          app
          class="zk-drawer"
  >
    <cx-loading :loading="loading"></cx-loading>
    <v-treeview
            :active.sync="activeNodes"
            :open.sync="openNodes"
            loading-icon="cached"
            :load-children="loadChildren"
            item-key="path"
            :items="items"
            open-on-click
            activatable
            return-object
            active-class="primary--text"
    ></v-treeview>
  </v-navigation-drawer>
</template>

<script>
  import {mapState} from 'vuex'
  import {getChildren, getData} from '@/utils/zk'

  export default {
    computed: {
      ...mapState(['connection'])
    },
    watch: {
      '$store.state.connection.status': {
        handler: function (newer, older) {
          console.log('connection changed')
          if (!newer && older) {
            this.items = []
          }
        },
      },
      '$store.state.connection.loading': {
        handler: function (newer, older) {
          console.log('reloading connection')
          if (!older && newer) {
            this.refreshChildren('/')
          }
        }
      },
      activeNodes () {
        if (this.activeNodes.length < 1) return
        this.selectedNode = Object.assign({}, this.activeNodes[0])
      },
      openNodes (newer, older) {
        console.log('open changed')
        console.log(newer)
        console.log(older)
        if(newer.length < older.length) {
          this.selectedNode = Object.assign({}, older[older.length - 1])
        }else {
          this.selectedNode = Object.assign({}, newer[newer.length - 1])
        }
      },
      selectedNode (newer, older) {
        if(older === null || newer.path !== older.path) {
          const selected = Object.assign({}, newer)
          this.$store.dispatch('selectNode', selected)
        }
      }
    },
    data() {
      return {
        loading: false,
        items: [],
        activeNodes: [],
        openNodes: [],
        selectedNode: null
      }
    },
    mounted() {
      if (this.connection.status) {
        this.refreshChildren()
      }
    },
    methods: {
      async refreshChildren() {
        this.loading = true
        this.items = []
        this.items = await this._getChildren('/')
        this.openNodes = []
        this.$store.dispatch('stopLoadingConnection')
        this.loading = false
      },
      async loadChildren(item) {
        console.log('click tree node')
        item['children'] = await this._getChildren(item.path)
        this.openNodes.push(item)
      },
      async _getChildren(path) {
        console.log(path)
        const children = await getChildren(this.connection.handler, path)
        const items = []
        if (!children || children.length < 1) {
          return items;
        }

        for (let i = 0; i < children.length; i++) {
          let child = children[i]
          const childPath = path === '/' ? path + child : path + '/' + child
          const {data, stats} = await getData(this.connection.handler, childPath)
          const item = {
            path: childPath,
            name: child
          }
          if (stats.numChildren > 0) {
            item['children'] = []
          }
          items.push(item)
        }

        return items
      }
    }
  }
</script>

<style>
  .v-navigation-drawer__border {
    display: none;
  }
  .zk-drawer {
    overflow-x: auto;
  }
  .zk-drawer::-webkit-scrollbar{
    width: 4px;
    height: 4px;
  }
  .zk-drawer::-webkit-scrollbar-thumb{
    border-radius: 1em;
    background-color: rgba(50,50,50,.3);
  }
  .zk-drawer::-webkit-scrollbar-track{
    border-radius: 1em;
    background-color: rgba(50,50,50,.1);
  }
</style>
