<template>
<v-navigation-drawer permanent>
      <v-toolbar dark>
        <v-list>
          <v-list-item>
            <v-list-item-title class="title">
              Overview
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-toolbar>
  
      <v-divider></v-divider>
  
      <v-list dense rounded>
          <v-list-item
            v-for="item in overview"
            :key="item.title"
            @click="routeTo(item.title, item.link)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      <v-toolbar dark>
        <v-list>
          <v-list-item>
            <v-list-item-title class="title">
              Documentation
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-toolbar>
  
      <v-divider></v-divider>
      <v-list dense rounded>
          <v-list-item
            v-for="item in documentation"
            :key="item.title"
            @click="routeTo(item.title,item.link)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
  
</template>

<script>
export default {
    name: 'sidebar',
  setup() {},
  data() {
    return {
      overview: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/" },
        { title: "Hospitals", icon: "mdi-hospital-marker", link: "/hospital" },
        // { title: 'Bed Capacity', icon: 'mdi-bed', link: '/bed' },
        // { title: 'Staff Information', icon: 'mdi-account-group-outline', link: '/employee' },
        {
          title: "Patients",
          icon: "mdi-clipboard-account-outline",
          link: "/patient",
        },
        {
          title: "Swab Results",
          icon: "mdi-test-tube",
          link: "/swabs",
        },
      ],
      documentation: [
        { title: "Tables", icon: "mdi-poll", link: "/tables" },
      ],
    };
  },
  methods: {
    routeTo(title, link) {
        // console.log(title)
        this.$store.commit('renamePage', title)
        this.$router.push(link);
    },
  },
};
</script>

<style scoped>

</style>