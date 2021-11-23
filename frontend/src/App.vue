<template>
  <v-app id="app">
    <div id="banner">
      <v-container fluid>
        <toolbar />
        <v-row>
          <v-col cols="2">
            <sidebar />
          </v-col>
          <v-col cols="10">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import sidebar from "./components/sidebar.vue";
import toolbar from "./components/toolbar.vue";

export default {
  components: {
    sidebar,
    toolbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}

#banner {
  background: rgb(153, 244, 222);
  background: linear-gradient(
    45deg,
    rgba(153, 244, 222, 1) 0%,
    rgba(58, 236, 188, 1) 40%,
    rgba(10, 218, 148, 1) 100%
  );
  height: 30%;
}
</style>
