<template>
  <div>
    <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
      <v-list>
        <v-list-tile v-for="(item, i) in menuItems" :key="`navdrawer${i}`">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <router-link to="/" tag="span" style="cursor:pointer;">
        <v-toolbar-title v-text="'Password base'"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item, i) in menuItems" flat :key="`menuitem${i}`" :to="item.route">
          <v-icon left v-html="item.icon"></v-icon>
          {{item.title}}
        </v-btn>
         <v-btn flat @click.prevent="signout" v-if="isUserAuthenticated">
          <v-icon left>exit_to_app</v-icon>
          logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false
      }
    },
    computed: {
      isUserAuthenticated() {
        return this.$store.getters.isUserAuthenticated;
      },
      menuItems() {
        return this.isUserAuthenticated ?
          [
            { icon: 'visibility',     title: 'Accesses',   route: '/accesses' },
            { icon: 'account_circle', title: 'Profile', route: '/profile' }
          ] :
          [
            { icon: 'input',          title: 'Sign in', route: '/signin' },
            { icon: 'lock_open',      title: 'Sing up', route: '/signup' }
          ]
      }
    },
    methods: {
      signout() {
        this.$confirm('Do you really want to exit?').then(res => {
          if (res) {
            this.$store.dispatch('SIGNOUT');
          }
        })
      }
    }
  }
</script>

<style scoped>
  
</style>