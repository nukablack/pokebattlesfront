<template>
    <v-layout id="main" row wrap>
        <v-card class="card">
            <img src="../assets/trainer.png" id="profile-icon">
            <v-card-title primary-title>
                <p class="target">PERFIL</p>
            </v-card-title>
        </v-card>
        <v-card class="card" @click="goToComponent('fight')">
            <img src="../assets/fight.png" id="fight-icon">
            <v-card-title primary-title>
                <p class="target">PELEAR</p>
            </v-card-title>
        </v-card>
        <v-card class="card">
            <img src="../assets/gym.png" id="gym-icon">
            <v-card-title primary-title>
                <p class="target">GIMNASIOS</p>
            </v-card-title>
        </v-card>
  </v-layout>
</template>


<script>

export default {
    data(){
        return{
        }
    },
    methods: {
        goToComponent(component){
        this.$router.replace(`/${component}`);
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

    #main{
        font-family: "Mali";
        text-align: center;
        padding-top: 10%;
        padding-left: 20%;
    }

    .card {
        float: left;
        background: #F7F9FA;
        border-radius: 30px;
        height: 280px;
        margin: 60px;
        padding: 50px;
        opacity: 0.9;
        width: 250px;
        cursor: pointer;
        box-shadow: inset 5px 5px 20px #6A7175;
    }

     .card:hover{
        border: 3px solid black;
    }

    .target{
        font-size: 14px;
        font-weight: bold;
        margin-left: 30px;
    }

    img{
        max-width: 150px;
    }
</style>

