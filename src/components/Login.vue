<template>
    <v-container id="form">
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
      nickname: '',
      password: ''
    }),
  methods:{
    submit() { 
        let user = {
            nickname: this.nickname,
            password: this.password
        }

        axios.post('http://localhost:3000/api/v1/login', user)
        .then(res => {
            if(res.status === 200){
                this.$store.commit('setToken', res.data.token)
                alert(`Bienvenido ${user.nickname}`)
                this.$router.replace('/');
            }
        }, err => {
            alert('Error en el login. Datos erróneos.');
            this.error = err.response.data.error
        })
    },
    goToRegister(){
        this.$router.replace('/register');
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
