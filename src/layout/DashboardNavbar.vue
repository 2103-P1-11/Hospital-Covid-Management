<template>
  <base-nav
    class="navbar-top navbar-dark mt-4"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
  </base-nav>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
