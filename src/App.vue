<template>
  <v-app id="background">
    <!-- Toolbar -->
    <v-toolbar color="red" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">PokeBattles</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn color="white" outline round @click="goToComponent('fight')" v-if="isAuthUser">¡Pelear!</v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list-tile class="mt-3" @click="goToComponent('login')" @click.stop="drawer = !drawer" v-if="!isAuthUser">
          <v-list-tile-action>
          <v-icon color="grey darken-1">face</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">LOGIN / REGISTRO</v-list-tile-title>
      </v-list-tile>
      <v-list-tile  @click="goToComponent('oakPokedex')" @click.stop="drawer = !drawer">
          <v-list-tile-action>
          <v-icon color="grey darken-1">donut_small</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">PROF. OAK POKÉDEX</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="" @click.stop="drawer = !drawer" >
          <v-list-tile-action>
          <v-icon color="grey darken-1">help</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">CÓMO JUGAR</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="" @click.stop="drawer = !drawer" >
          <v-list-tile-action>
          <v-icon color="grey darken-1">info</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">ABOUT</v-list-tile-title>
      </v-list-tile>
       <v-list-tile @click="logOut" @click.stop="drawer = !drawer" v-if="isAuthUser">
          <v-list-tile-action>
          <v-icon color="grey darken-1">logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">LOGOUT</v-list-tile-title>
      </v-list-tile>
    </v-navigation-drawer> 
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      drawer: false
    } 
  },
  methods: {
    goToComponent(component){
      this.$router.replace(`/${component}`);
    },
    logOut(){
      this.$store.commit("removeToken")
      this.$router.replace(`/`)
    }
  },
  computed: {
    isAuthUser: function() {
      return  this.$store.getters.isAuthUser
    }
  }
}

</script>

<style>
  #background{
    background-image: url('assets/bg.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>
