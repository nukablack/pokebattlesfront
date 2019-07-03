<template>
    <v-layout id="main" row wrap>
      <v-card id="pokemon-card" @click="alert('Hola')">
        <p class="pokeId"><strong>#</strong> </p>
        <v-card-title primary-title>
            <div id="stats"> 
                <p class="name"><strong>Nombre: </strong>#</p>
                <p class="height"><strong>Altura: </strong>#</p>
                <p class="weight"><strong>Peso: </strong>#</p>
                <p class="types"><strong>Tipo: </strong>#</p>
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
        }
    },
    methods: {
    }
}
</script>

<style>
    #main{
        font-family: "Mali"
    }

    #pokemon-card:hover{
        border: 5px solid black;
    }
    #pokemon-card {
        border: 3px solid red;
        border-radius: 30px;
        height: 320px;
        margin: 30px;
        padding-left: 20px;
        opacity: 0.9;
        width: 250px;
        cursor: pointer;
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

