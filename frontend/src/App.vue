<template>
  <div id="app">
    <v-container fluid>
      <v-row>
        <v-col cols="2">
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
  text-align: center;
  color: #2c3e50;
}

</style>
