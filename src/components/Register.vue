<template>
    <v-container id="form">
        <h1>¡ REGÍSTRATE !</h1>
        <v-form ref="form" v-model="this.valid" lazy-validation>
            <v-text-field v-model="this.nickname" :counter="15" :rules="this.nickRules" label="Nickname" required/>
            <v-text-field v-model="this.email" :rules="this.emailRules" label="E-mail" required/>
            <v-text-field v-model="this.password" type="password" :counter="15" :rules="this.passRules" label="Contraseña" required/>
            <v-container>
              <h4>¡SELECCIONA TU POKÉMON!</h4>
                <v-container class="pokemonSelectors">
                  <img class="pokemons bulbasaur" :src="this.pokemons[0].sprites.front" @click="selectPokemon('001')"/>
                  <img class="pokemons charmander" :src="this.pokemons[3].sprites.front" @click="selectPokemon('004')"/>
                  <img class="pokemons squirtle" :src="this.pokemons[6].sprites.front" @click="selectPokemon('007')"/>
                </v-container>
            </v-container>
            <v-btn :disabled="!valid" color="error" @click="validate">Registrarse</v-btn>
            <v-btn outline round block color="warning" @click="goToLogin()">Si ya tienes cuenta, ¡entra!</v-btn>
        </v-form>
    </v-container>
</template>

<script>

import axios from 'axios';

export default {
  name: 'register',
  components: {
  },
  async mounted(){
      let url = `https://pokebattles.herokuapp.com/api/v1/pokemons`;
      let response = await axios.get(url);

      let pokemonFound = response.data.splice(0,7);
      this.pokemons = pokemonFound;
  },
  data(){
    return{
      pokemons: [],
      valid: false,
      nickRules: [
        v => !!v || 'El nick es obligatorio',
        v => v.length >= 5 || 'El nick debe tener al menos 5 caracteres.'
      ],
      email: '',
      nickname: '',
      password: '',
      pokemonSelected: '',
      emailRules: [
        v => !!v || 'E-mail es obligatorio',
        v => /.+@.+/.test(v) || 'E-mail debe ser válido.'
      ],
      passRules: [
        v => !!v || 'La contraseña no puede estar vacía.',
        v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres.'
      ]
    }
  },
  methods:{
    submit() {
      
    },
    goToLogin(){
        this.$router.replace('/login');
    },
    selectPokemon(id){
      this.pokemonSelected = id;
    }
  }
}
</script>

<style>
/* 
Colours
Base: #F7F9FA
DarkGray: #6A7175
Gray: #797A7A
LightGray:#C5C6C7
DarkRed: #BD4240
Red: #FA5956
LightRed: #FA887E
DarkBlue: #087082
Blue: #0A8AA1
Green: #67D67F
*/
#form{
  background: #eee;
  border-radius: 50px;
  font-family: "Mali";
  margin-top: 5%;
  max-width: 800px;
  opacity: 0.9;
  padding: 60px;
  text-align: center;
}

v-btn{
  margin: 50px 0 0;
}

.pokemons{
  display: inline;
  cursor: pointer;
  background: #F7F9FA;
  margin: 40px;
  border-radius: 30px;
}

.bulbasaur {
  border: 2px solid #67D67F;
}
.charmander {
  border: 2px solid #FA5956;
}

.squirtle{
  border: 2px solid #0A8AA1;
}
.selected{
  box-shadow: inset 5px 5px 20px #6A7175;
}

.pokemons:hover{
  box-shadow: inset 5px 5px 20px #C5C6C7;
}
</style>
