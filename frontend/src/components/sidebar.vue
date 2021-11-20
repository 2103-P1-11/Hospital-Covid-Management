<template>
    <v-card
    class="pa-12"
    color="indigo darken-2"
    flat
  >
    <v-card
      elevation="12"
      width="256"
    >
      <v-navigation-drawer
        floating
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        height="100%"
        permanent
      >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            COVID-19 Hopsital Capacity
          </v-list-item-title>
          <v-list-item-subtitle>
            Database Manager
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
        <v-list
          dense
          rounded
        >
        
          <v-list-item
            v-for="item in items"
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
    setup() {
        
    },
    data() {
        return {
 items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/' },
          { title: 'Hospitals', icon: 'mdi-hospital-marker', link: '/hospital' },
          // { title: 'Bed Capacity', icon: 'mdi-bed', link: '/bed' },
          // { title: 'Staff Information', icon: 'mdi-account-group-outline', link: '/employee' },
          { title: 'Patients', icon: 'mdi-clipboard-account-outline', link: '/patient' },
        ],
        }
    },
    methods: {
        routeTo(link){
            this.$router.push(link);
        }
    },
}
</script>

<style scoped>

</style>