<template>
    <v-app id="inspire" dark>
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
        <v-list-tile>
            <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1">CÓMO JUGAR</v-list-tile-title>
        </v-list-tile>
    </v-navigation-drawer>
    <v-toolbar color="red" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">PokeBattles</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    })
  }
</script>
