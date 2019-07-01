<template>
    <v-container id="form">
        <h1>¡ HOLA DE NUEVO !</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="nickname" label="Nickname" required/>
            <v-text-field v-model="password" type="password" label="Contraseña" required/>
            <v-btn :disabled="!valid" color="error" @click="validate">Entrar</v-btn>
            <br>
            <v-btn outline round block color="warning" @click="goToRegister()">¿Aún no tienes cuenta? ¡Regístrate!</v-btn>
        </v-form>
    </v-container>
</template>

<script>

export default {
  name: 'login',
  components: {
  },
  data: () => ({
      valid: false
    }),
  methods:{
    submit() { 
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
