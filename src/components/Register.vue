<template>
    <v-container id="form">
        <h1>¡ REGÍSTRATE !</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="nickname" :counter="15" :rules="nickRules" label="Nickname" required/>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required/>
            <v-text-field v-model="password" type="password" :counter="15" :rules="passRules" label="Password" required/>
            <v-btn :disabled="!valid" color="error" @click="validate">Registrarse</v-btn>
             <v-btn outline round block color="warning" @click="goToLogin()">Si ya tienes cuenta, ¡entra!</v-btn>
        </v-form>
    </v-container>
</template>

<script>

export default {
  name: 'register',
  components: {
  },
  data: () => ({
      valid: false,
      nameRules: [
        v => !!v || 'El nick es obligatorio',
        v => v.length >= 5 || 'El nick debe tener al menos 5 caracteres.'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail es obligatorio',
        v => /.+@.+/.test(v) || 'E-mail debe ser válido.'
      ],
      passRules: [
        v => !!v || 'La contraseña no puede estar vacía.',
        v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres.'
      ]
    }),
  methods:{
    submit() {
      
    },
    goToLogin(){
        this.$router.replace('/login');
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
