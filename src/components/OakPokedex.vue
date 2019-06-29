<template>
    <v-layout id="main" row wrap>
      <v-card id="pokemon-card" v-for="pokemon in pokemons" :key="pokemon.pokeId">
        <p class="pokeId"><strong>#{{pokemon.pokeId}}</strong> </p>
        <v-img :src="pokemon.sprites.front" id="poke-sprite"></v-img>
        <v-card-title primary-title>
            <div id="stats"> 
                <p class="name"><strong>Nombre: </strong>{{pokemon.name}}</p>
                <p class="height"><strong>Altura: </strong>{{pokemon.height}}m</p>
                <p class="weight"><strong>Peso: </strong>{{pokemon.weight}}kg</p>
                <p class="types"><strong>Tipo: </strong>{{getTypes(pokemon)}}</p>
            </div>
        </v-card-title>
      </v-card>
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
        this.pokemons= pokemonFound
    },
    methods: {
        getTypes(pokemon){
            let types = [];

            for (var i = 0; i < pokemon.types.length; i++) {
                types.push(pokemon.types[i].name);
            }

            return types.join(' / ')
        },
    }
}
</script>

<style>
    #main{
        font-family: "Mali"
    }

    #pokemon-card {
        border: 3px solid red;
        border-radius: 30px;
        height: 320px;
        margin: 30px;
        padding-left: 20px;
        opacity: 0.9;
        width: 250px;
    }

    #pokemon-card p{
        margin: 0 auto;
    }

    #stats p{
        margin: 0 auto;
    }

    .pokeId{
        font-size: 20px;
        margin: 0 auto;
    }
    #poke-sprite{
        max-width: 150px;
        margin: 0 auto;
    }
</style>

