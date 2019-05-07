<template>
  <div>
    <v-flex xs12>
      <v-img
              :src="require('@/assets/logo.png')"
              class="my-3"
              contain
              height="200"
      ></v-img>
    </v-flex>

    <v-flex mb-4>
      <h3 class="display-1 font-weight-bold mb-3">
        Welcome to ZooKeeperCX
      </h3>
      <p class="subheading font-weight-regular">
        A Cross-platform | Succinct | Smart GUI ZooKeeper Client Just For You.
      </p>
    </v-flex>
    <v-flex
            xs12
            mb-5
    >
      <h2 class="headline font-weight-bold mb-3">Links</h2>

      <v-layout justify-center>
        <v-chip  v-for="item in links"
                 @click="openExternal(item.link)"
                 :key="item.name"
                 style="cursor: pointer"
        >
          <v-avatar>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-avatar>
          {{ item.name }}
        </v-chip>
      </v-layout>
    </v-flex>
  </div>
</template>

<script>
  import { shell } from 'electron'

  export default {
    name: "IntroView",
    data() {
      return {
        links: [
          {
            name: 'Website',
            icon: 'mdi-web',
            link: 'https://sidfate.github.io/ZooKeeperCX/'
          },
          {
            name: 'Github',
            icon: 'mdi-github-circle',
            link: 'https://github.com/Sidfate/ZooKeeperCX'
          },
          {
            name: 'Issue',
            icon: 'mdi-alert-circle-outline',
            link: 'https://github.com/Sidfate/ZooKeeperCX/issues'
          },
          {
            name: 'Author',
            icon: 'mdi-account-circle-outline',
            link: 'https://sidfate.com/'
          }
        ]
      }
    },
    methods: {
      openExternal (link) {
        shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>

</style>
