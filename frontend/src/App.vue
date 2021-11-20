<template>
  <div id="app">
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <sidebar/>
        </v-col>
        <v-col cols="9">
          <router-view/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import sidebar from './components/sidebar.vue'

export default {
  components:{
    sidebar
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
