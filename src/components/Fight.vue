<template>
    <v-content>
        <img :src="userPokemon.gifs.back"/>
        <img :src="opponentPokemon.gifs.front"/>
    </v-content>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            pokemons: [],
            userPokemon: {},
            opponentPokemon: {}
        }
    },
    async mounted(){
        let url = `https://pokebattles.herokuapp.com/api/v1/pokemons`;
        let response = await axios.get(url);

        let pokemonFound = response.data;
        console.log(pokemonFound)
        this.pokemons = pokemonFound;

        this.setFighter();
        this.setOpponent();

    },
    methods: {
        randomInt(min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        },
        changeStats(pokemon){
            let attack = this.randomInt((pokemon.attack - 10), pokemon.attack);
            let hp = this.randomInt((pokemon.hp - 10), pokemon.hp);
            let defense = this.randomInt((pokemon.defense - 10), pokemon.defense);

            pokemon.attack = attack;
            pokemon.hp = hp;
            pokemon.defense = defense;
        },
        setFighter(){
            let max = this.pokemons.length; 
            this.userPokemon = { ...this.pokemons[this.randomInt(0, max)] };
            this.changeStats(this.userPokemon);
        },
        setOpponent(){
            let max = this.pokemons.length; 
            this.opponentPokemon = { ...this.pokemons[this.randomInt(0, max)] };
            this.changeStats(this.opponentPokemon);
        }
    }
}

</script>

<style>
    #form{
        background: #eee;
        border-radius: 50px;
        font-family: "Mali";
        margin-top: 5%;
        max-width: 800px;
        opacity: 0.8;
        padding: 60px;
        text-align: center;
    }

    v-btn{
        margin: 50px 0 0;
    }
</style>
