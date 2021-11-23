<template>
  <v-toolbar class="elevation-12">
    <v-icon color="red">mdi-hospital</v-icon>
    <v-toolbar-title> Covid-19 Hospital Management <v-icon>mdi-chevron-right</v-icon> {{displayTitle}} </v-toolbar-title>
    <v-spacer></v-spacer>
    
    <v-text-field
          hide-details
          single-line
          class="shrink"
        ></v-text-field>
    <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          @click="goTo(item.func)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  setup() {},
  computed:{
      displayTitle(){
          return this.$store.state.page
      }
  },
  data() {
    return {
      menu: [{ title: "Logout", func: "logout" }],
    };
  },
  methods: {
    goTo(link) {
      if (link == "logout") {
        console.log("logout");
      }
    },
  },
};
</script>

<style scoped>

</style>