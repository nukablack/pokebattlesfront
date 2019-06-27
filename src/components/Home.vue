<template>
  <div class="row">
		<div id="home" class="col-sm-12 text-center">
			<div class="background">
				<h1>Bienvenid@ a</h1>
				<img id="pokebattles-logo" alt="PokeBattles Logo" src="../assets/logo.png"/>
      </div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'home',
  components: {
  }
}
</script>

<style>
#home {
		height: 800px;
		padding: 10%;
}

#pokebattles-logo{
  margin-bottom: 6%; 
  width: 20%;
}

h1 {
  font-family: "Mali";
  margin: 6%; 
  margin-bottom: 0;
}

.background{
  background: #eee;
  border-radius: 50px;
  margin: 0 auto;
  max-width: 60%;
  opacity: 0.8;
  padding: 20px 0; 
  text-align: center;
}
</style>