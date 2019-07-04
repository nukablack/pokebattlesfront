<template>
    <div id="app" class="bg">
        <div class="battle-scene" v-if="loaded">
            <div class="box-top-left">
                <h2 class="pokemon">{{opponentPokemon.name}}</h2>
                <div class="hp-bar-top">
                    <div v-bind:style="opponentHpBar" class="hp-bar-fill"></div>
                </div>
                <h4 class="level">Nv1</h4>
                <h4 class="hp">{{opponentPokemon.hp}}/{{opponentStartHp}}</h4>
            </div>
            <div class="shadow-right">
                <img :src="opponentPokemon.gifs.front" class="pokemon-top" />
            </div>
                <div class="shadow-left">
                <img :src="userPokemon.pokemonInfo.gif" class="pokemon-bottom" />
            </div>
            <div class="box-bottom-right">
                <h2 class="pokemon"> {{userPokemon.pokemonInfo.name}}</h2>
                <div class="hp-bar-bottom">
                    <div v-bind:style="userHpBar" class="hp-bar-fill"></div>
                </div>
                <h4 class="level">Nv1</h4>
                <h4 class="hp">{{userPokemon.poke_squad.hp}}/{{userStartHp}}</h4>
            </div>
            <div class="bottom-menu">
                <div class="battle-text text-box-left">
                    ¿Qué hará {{userPokemon.pokemonInfo.name}}?
                </div>
                <div class="text-box-right">
                    <div id="battleOptions">
                        <button class="btn-hit" @click="attack()">HIT</button>
                        <button class="btn-run" @click="openModal('No puedes huir, cobarde...', ':(', 'black')">RUN</button>
                    </div>
                </div>
            </div>
        </div>

        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-text>{{ text }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="color" flat @click="closeModal">{{ buttonText }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            loaded: false,
            pokemons: [],
            userPokemon: {},
            userAlive: true,
            opponentPokemon: {},
            userStartHp: 0,
            opponentStartHp: 0,
            userHpBar: {
                width: "100%"
            },
            opponentHpBar: {
                width: "100%"
            },
            text: '',
            buttonText: '',
            dialog: false,
            color: '',
            paused: false
        }
    },
    async mounted(){
        let currentUser = this.$store.getters.getCurrentUser
        let urlPokemons = 'https://pokebattles.herokuapp.com/api/v1/pokemons';
        let urlUser = `https://pokebattles.herokuapp.com/api/v1/users/${currentUser}`;

        axios.all([
            axios.get(urlPokemons),
            axios.get(urlUser)
        ])
        .then(axios.spread( (pokemonResponse, userResponse) =>{

            let pokemonFound = pokemonResponse.data;
            let userFound = userResponse.data;
            this.pokemons = pokemonFound;

            this.userPokemon = userFound;
            this.userStartHp = this.userPokemon.poke_squad.hp;
            this.setOpponent();

            this.loaded=true
        }));
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
        setOpponent(){
            let max = this.pokemons.length; 
            this.opponentPokemon = { ...this.pokemons[this.randomInt(0, max)] };
            this.changeStats(this.opponentPokemon);
            this.opponentStartHp = this.opponentPokemon.hp;
            this.opponentHpBar.width = "100%";
        },
        attack(){
            //Primero ataca el usuario
            let userAttack = this.userPokemon.poke_squad.attack;
            let hitDmg = parseInt(this.randomInt((userAttack/2), userAttack).toFixed(0));
            this.makeDamage(hitDmg, this.opponentPokemon);
            this.checkHealth(this.opponentPokemon);

            //Luego ataca la IA.
            let opponentAttack = this.opponentPokemon.attack;
            hitDmg = parseInt(this.randomInt((opponentAttack/2), opponentAttack).toFixed(0));
            this.makeDamage(hitDmg, this.userPokemon.poke_squad);
            this.checkHealth(this.userPokemon.poke_squad);
        },
        makeDamage(dmg, target){
            let defense = target.defense;
            let defPoints = parseInt(this.randomInt(0, defense).toFixed(0));
            let received = dmg - defPoints;

            if(received > 0){
                target.hp -= received;
            }
        },
        checkHealth(pokemon){
            let quantity = 0;
            let life = 0;
            switch(pokemon){
                case this.opponentPokemon:
                    quantity = pokemon.hp;
                    life = (quantity / this.opponentStartHp) * 100;
                    if(life < 0) { life = 0 }
                    this.opponentHpBar.width = `${life}%`;
                    break;
                case this.userPokemon.poke_squad:
                    quantity = pokemon.hp;
                    life = (quantity / this.userStartHp) * 100;
                    if(life < 0) { life = 0 }
                    this.userHpBar.width = `${life}%`;
                    break;
            }

            if(this.opponentPokemon.hp <= 0){
                this.opponentPokemon.hp = 0;
                this.openModal('Has ganado esta pelea', 'Continuar peleando', 'success');
                this.setOpponent();
            } else if (this.userPokemon.poke_squad.hp <= 0){
                this.userPokemon.poke_squad.hp = 0;
                this.userAlive = false
                this.openModal('Has perdido...', 'Salir', 'error');
                
            }
        },
        openModal(text, buttonText, color){
            this.text = text
            this.buttonText = buttonText
            this.color = color
            this.dialog = true
        },
        closeModal(){
            this.dialog = false;
            if(!this.userAlive){
                this.$router.replace("/dashboard");
            }
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

.battle-scene{
    position: relative;
    margin: auto;
    display: block;
    margin-top: 3%;
    width: 800px;
    height: 500px;
    background: #F8F8F8;
    opacity: 0.9;
    border-radius: 30px;
    z-index: 1;
}

.box-top-left{
  position: absolute;
  width: 300px;
  height: 100px;
  border-radius: 0px 50px;
  top: 8%;
  left: 8%;
  background: #F7F9FA;
  border: 3px solid #6A7175;
  box-shadow: inset 5px 5px 20px #6A7175;
}

.hp-bar-top{
  position: absolute;
  bottom: 32%;
  height: 20%;
  width: 70%;
  left: 10%;
  border-radius: 20px;
  background: grey;
  opacity: 0.5;
}

.hp-bar-bottom{
  position: absolute;
  bottom: 32%;
  height: 20%;
  width: 70%;
  left: 10%;
  border-radius: 20px;
  background: grey;
  opacity: 0.5;
}

.hp-bar-fill{
  position: absolute;
  height: 100%;
  border-radius: 20px;
  background: #67D67F;
}

.shadow-right{
  position: absolute;
  width: 30%;
  height: 20%;
  border-radius: 50%;
  top: 25%;
  right: 8%;
  background: #E0E0E0;
  box-shadow: inset 0 5px 5px #6A7175;
}

.pokemon-top{
  height: 100px;
  width: 100px;
  position: absolute;
  top: -50%;
  left: 30%;
}

.pokemon-bottom{
  height: 100px;
  width: 100px;
  position: absolute;
  top: -50%;
  left: 25%;
}

.shadow-left{
 position: absolute;
  width: 30%;
  height: 20%;
  border-radius: 50%;
  bottom: 15%;
  left: 8%;
  background: #E0E0E0;
  box-shadow: inset 0 5px 5px #6A7175;
}

.box-bottom-right{
  position: absolute;
  width: 300px;
  height: 100px;
  border-radius: 50px 0px;
  bottom:20%;
  right: 8%;
  background: #F7F9FA;
  border: 3px solid #6A7175;
  z-index: 2;
  box-shadow: inset 5px 5px 20px #797A7A;
}

.pokemon{
  text-align: left;
  margin-left: 10%;
  margin-top: 5%;
  opacity: 0.7;
  font-size: 18px;
  font-family: "Mali";
}

.level{
  position: absolute;
  right: 10%;
  top: 18%;
  opacity: 0.7;
  font-size: 16px;
  font-family: "Mali";
}

.hp{
  position: absolute;
  right: 20%;
  bottom: 10%;
  opacity: 0.7;
  font-size: 14px;
  font-family: "Mali";
}

.bottom-menu{
  position: absolute;
  width: 100%;
  bottom: 0%;
  height: 19%;
  background: #FA887E;
  z-index: 1;
  border: solid 3px #6A7175;
  border-radius: 30px;
  box-shadow: inset 0 5px 5px #FA5956;
}

.text-box-left{
  position: absolute;
  width: 50%;
  left: 0%;
  height: 95%;
}

.text-box-right{
  position: absolute;
  width: 40%;
  right: 0%;
  height: 100%;
  background: #C5C6C7;
  border-radius: 25px;
  border: solid 3px #6A7175;
  box-shadow: inset 5px 5px 20px #6A7175;
}

.battle-text{
  margin-top: 3%;
  margin-left: 5%;
  opacity: 0.95;
  font-size: 18px;
  color: white;
  text-align: left;
  font-family: "Mali";
}

button{
    padding: 10px 35px;
    border-radius: 50px;
    color: white;
    box-shadow: inset 5px 5px 20px #C5C6C7;
    font-weight: bold;
}

.btn-hit{
    background: #FA5956;
    margin: 20px 40px;
}

.btn-hit:hover{
    background: #BD4240
}

.btn-run{
    background: #0A8AA1;
}

.btn-run:hover{
    background: #087082;
}


</style>
