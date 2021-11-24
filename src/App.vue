<template>
  <v-app id="app">
    <v-container fluid>
      <toolbar/>
      <v-row>
        <v-col cols="2">
          <sidebar/>
        </v-col>
        <v-col cols="10">
          <router-view/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import sidebar from './components/sidebar.vue'
import toolbar from './components/toolbar.vue'

export default {
  components:{
    sidebar,
    toolbar,
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  background: linear-gradient(180deg, #37a0a0 50%, #ffffff 50%);
}

</style>
