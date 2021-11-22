<template>
  <v-card class="pa-12" color="indigo darken-2" flat height="100%">
    <v-card elevation="12" width="100%" height="100%">
      <v-navigation-drawer floating dark width="100%" permanent>
        <!-- src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" -->

        <v-list-item>
          <v-list-item-content>
              <v-list-item-title>
                  <div style="text-align:center; padding:24px;">
              <b>COVID-19 <br/> Hospital Capacity <br/> Management</b>
              </div>
            </v-list-item-title>
            <v-list-item>
            <v-img  :aspect-ratio="17/19" src="@/assets/medicine.png" />
            </v-list-item>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item>
          <b>Overview</b>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense rounded>
          <v-list-item
            v-for="item in overview"
            :key="item.title"
            @click="routeTo(item.link)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list-item>
          <b>Documentation</b>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense rounded>
          <v-list-item
            v-for="item in documentation"
            :key="item.title"
            @click="routeTo(item.link)"
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
    </v-card>
  </v-card>
</template>

<script>
export default {
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
      ],
      documentation: [
        { title: "Datasets", icon: "mdi-poll", link: "#" },
      ],
    };
  },
  methods: {
    routeTo(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style scoped>

</style>