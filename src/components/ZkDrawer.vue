<template>
  <v-navigation-drawer
          permanent
          clipped
          fixed
          app
          style="overflow-x: auto"
  >
    <loading :loading="loading"></loading>
    <v-treeview
            :active.sync="active"
            :open.sync="open"
            :load-children="loadChildren"
            item-key="path"
            :items="items"
            open-on-click
            @click="selectNode"
            activatable
            return-object
            active-class="primary--text"
    ></v-treeview>
  </v-navigation-drawer>
</template>

<script>
  import { Loading } from './public'
  import { mapState } from 'vuex'
  import { getChildren, getData } from '@/utils/zk'

  export default {
    components: {
      Loading
    },
    computed: {
      ...mapState(['connection'])
    },
    watch: {
      '$store.state.connection.handler': {
        handler: function(newer, older) {
          if(!older && newer) {
            this.refreshChildren('/')
          }
        }
      },
      active () {
        if(this.active.length < 1) return

        const selected = this.active[0]
        console.log(selected)
        this.$store.dispatch('selectNode', selected)
      }
    },
    data () {
      return {
        loading: false,
        items: [],
        active: [],
        open: []
      }
    },
    mounted () {
      if(this.connection.handler) {
        this.refreshChildren()
      }
    },
    methods: {
      async refreshChildren () {
        this.loading = true
        this.items = []
        this.items = await this._getChildren('/')
        this.loading = false
      },
      async loadChildren (item) {
        item['children'] = await this._getChildren(item.path)
      },
      async _getChildren (path) {
        console.log(path)
        const children = await getChildren(this.connection.handler, path)
        const items = []
        if(!children || children.length < 1) {
          return items;
        }

        for(let i = 0; i < children.length; i++) {
          let child = children[i]
          const childPath = path === '/' ? path+child : path+'/'+child
          const { data, stats } = await getData(this.connection.handler, childPath)
          const item = {
            path: childPath,
            name: child
          }
          if(stats.numChildren > 0) {
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

</style>
