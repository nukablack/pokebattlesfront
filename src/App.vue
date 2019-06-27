<template>
  <v-app id="background">
    <!-- Toolbar -->
    <v-toolbar color="red" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">PokeBattles</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list-tile class="mt-3">
          <v-list-tile-action>
          <v-icon color="grey darken-1">face</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">LOGIN / REGISTER</v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
          <v-list-tile-action>
          <v-icon color="grey darken-1">donut_small</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">PROF. OAK POKÉDEX</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="">
          <v-list-tile-action>
          <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">CÓMO JUGAR</v-list-tile-title>
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
  }
}

</script>

<style>
  #background{
    background-image: url('assets/bg.png')
  }
</style>
