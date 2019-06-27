<template>
  <div class="row">
		<div id="home" class="col-sm-12 text-center">
			<div class="background">
				<h1>Welcome to</h1>
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
body{
  background-image: url('../assets/bg.png');
}

#home {
		height: 800px;
		padding: 10%;
}

#pokebattles-logo{
  margin-bottom: 6%; 
  width: 20%;
}

h1, h2 {
  font-family: "Mali";
  margin: 6%; 
  margin-bottom: 0;
}

.background{
  background: #eee;
  border-radius: 50px;
  opacity: 0.8;
  max-width: 60%;
  margin: 0 auto;
  padding: 20px 0; 
  text-align: center;
}
</style>