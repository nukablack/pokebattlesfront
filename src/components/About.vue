<template>
  <div class="row">
		<div id="about" class="col-sm-12 text-center">
        <div class='background'>
				  <h1>Información sobre mí</h1>
            <hr>
            <p>Desarrollador: Ana Sánchez Jiménez</p>
            <p>Curso: Diseño y Desarrollo de Aplicaciones Web</p>
            <p>Institución: EOI — Escuela de Organización Industrial</p>
            <p>Tutor: Fernando López-Canti</p>
            <p>Año: 2019</p>
            <ul>Redes:
              <li><a href="https://www.linkedin.com/in/asanchezjmnz/" target="_blank">LinkedIn</a></li>
              <li><a href="https://github.com/nukablack" target="_blank">GitHub</a></li>
            </ul>
        </div>
    </div>
	</div>
</template>

<script>

export default {
  name: 'about',
  components: {
  }
}
</script>

<style>
#about {
		height: 800px;
		padding: 10%;
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