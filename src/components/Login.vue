<template>
    <v-container id="form">
        <v-snackbar v-model="snackbar" bottom right :timeout="timeout" :color="color">
            {{ text }}
            <v-btn color="white" flat @click="snackbar = false">
                OK!
            </v-btn>
        </v-snackbar>
        <h1>¡ HOLA DE NUEVO !</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="nickname" label="Nickname" required/>
            <v-text-field v-model="password" type="password" label="Contraseña" required/>
            <v-btn :disabled="!valid" color="error" @click="submit()">Entrar</v-btn>
            <br>
            <v-btn outline round block color="warning" @click="goToRegister()">¿Aún no tienes cuenta? ¡Regístrate!</v-btn>
        </v-form>
    </v-container>
    
</template>

<script>

import axios from 'axios';

export default {
  name: 'login',
  components: {
  },
  data: () => ({
    valid: false,
    delay: 5000,
    nickname: '',
    password: '',
    //snackbar
    snackbar: false,
    text: '',
    color: '',
    timeout: 6000
      //end-snackbar
    }),
  methods:{
    submit() { 
        let user = {
            nickname: this.nickname,
            password: this.password
        }

        axios.post('https://pokebattles.herokuapp.com/api/v1/login', user)
        .then(res => {
            if(res.status === 200){
                this.$store.commit('setToken', res.data.token)
                this.showSnackbar('Te has logueado correctamente.', 'success');
                this.redirect()
            }
        }, err => {
            this.showSnackbar('Error en el login. Datos erróneos', 'error');
            this.error = err.response.data.error
        })
    },
    goToRegister(){
        this.$router.replace('/register');
    },
    showSnackbar(text, type){
        this.text = text
        this.color = type
        this.snackbar = true
    },
    redirect(){
        setTimeout(() => this.$router.push('/'), 2000);
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
