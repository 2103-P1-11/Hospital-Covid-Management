<template>
  <div id="nav">
    <router-link to="/">Task Tracker</router-link> |
    <router-link to="/hospital">Hospital</router-link> |  
    <router-link to="/employee">Employee</router-link> |
    <router-link to="/bed">Bed</router-link> |
    <router-link to="/patient">Patient</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
