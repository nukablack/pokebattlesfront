<template>
    <v-layout id="main">
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="pokemon-card" v-for="pokemon in pokemons" :key="pokemon.pokeId">
          <v-img
          :src="pokemon.sprites.front" 
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0"> {{pokemon.name}} #{{pokemon.pokeId}} </h3>
            <div> 
               <p class="height"><strong>Height:</strong>{{pokemon.height}}</p>
               <p class="weight"><strong>Weight:</strong>{{pokemon.weight}}</p>
            </div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from 'axios';

export default {
    data(){
        return{
            pokemons: []
        }
    },
    async mounted(){
        let url = `https://pokebattles.herokuapp.com/api/v1/pokemons`;
        let response = await axios.get(url);

        let pokemonFound = response.data;
        console.log(pokemonFound)
        this.pokemons= pokemonFound
    }
}
</script>
