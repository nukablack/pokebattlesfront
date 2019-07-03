<template>
    <v-container id="form">
        <h1>¡ REGÍSTRATE !</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="nickname" :counter="15" :rules="nickRules" label="Nickname" required/>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required/>
            <v-text-field v-model="password" type="password" :counter="15" :rules="passRules" label="Contraseña" required/>
            <v-container>
              <h4>¡SELECCIONA TU POKÉMON!</h4>
              <p>Seleccionado: {{selected}}</p>
                <v-container class="pokemonSelectors">
                  <img class="pokemons bulbasaur" :src="this.pokemons[0].sprites.front" @click="selectPokemon(pokemons[0])"/>
                  <img class="pokemons charmander" :src="this.pokemons[3].sprites.front" @click="selectPokemon(pokemons[3])"/>
                  <img class="pokemons squirtle" :src="this.pokemons[6].sprites.front" @click="selectPokemon(pokemons[6])"/>
                </v-container>
            </v-container>
            <v-btn :disabled="!valid" color="error" @click="submit()">Registrarse</v-btn>
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
      selected: '',
      selectedPokemon: [{
        hp: 0,
        attack: 0,
        defense: 0,
        pokemonId: ''
      }],
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
        let user ={
            email: this.email,
            nickname: this.nickname,
            password: this.password,
            poke_squad: {
              hp: this.selectedPokemon[0].hp, 
              attack: this.selectedPokemon[0].attack,
              defense: this.selectedPokemon[0].defense,
              pokemonId: this.selectedPokemon[0].pokeId
            },
            pokedex: this.selectedPokemon[0].pokeId
        }
        console.log(user);
        axios.post('https://pokebattles.herokuapp.com/api/v1/users', user)
        .then(res => {
            if(res.status === 201){
              alert('Usuario registrado');
              this.$router.push('/login');
            }
        }, err => {
            console.log(err.response);
        })
    },
    goToLogin(){
        this.$router.replace('/login');
    },
    selectPokemon(pokemon){
      this.selectedPokemon[0].hp = pokemon.hp;
      this.selectedPokemon[0].attack = pokemon.attack;
      this.selectedPokemon[0].defense = pokemon.defense;
      this.selectedPokemon[0].pokeId = pokemon._id;

      this.selected = pokemon.name;

      
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
  border: 4px solid #67D67F;
  box-shadow: inset 5px 5px 20px #67D67F;
}

.charSelected{
  border: 4px solid #FA5956;
  box-shadow: inset 5px 5px 20px #FA5956;
}

.squiSelected{
  border: 4px solid #0A8AA1;
  box-shadow: inset 5px 5px 20px #0A8AA1;
}

.pokemons:hover{
  box-shadow: inset 5px 5px 20px #C5C6C7;
}
</style>
