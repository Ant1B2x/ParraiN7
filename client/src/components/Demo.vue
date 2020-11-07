<template>
	<div class="container mb-6">
		<section class="welcome">
			<h1>
				ParraiN7<br>
				<small>L'appli de parrainage des élèves de l'ENSEEIHT</small>
			</h1>
		</section>
		<hr>
		<section>
			<h3 class="mb-6">Comment ça marche ?</h3>
			<div class="row mb-3">
				<div class="col-md-6 text-right border-right pr-5">
					<h4 class="mb-5">1ère année</h4>
					<h5>Création de compte</h5>
					<p>Vous pouvez créer votre compte en utilisant l'adresse mail de l'N7.</p>
					<h5>Réponses aux questions</h5>
					<p>Répondez aux questions qui vous sont posées. Les réponses sont envoyées de manière anonyme.<br>
						Vous serez avertis si de nouvelles questions ont été proposées par les deuxièmes années.</p>
				</div>
				<div class="col-md-6 text-left text-justify pl-5">
					<h4>2ème année</h4>
					<h5>Création de compte</h5>
					<p>Vous pouvez créer votre compte en utilisant l'adresse mail de l'N7.<br>N'oubliez pas de sélectionner "Parrain" avant de confirmer l'inscription.</p>
					<h5>Création des questions</h5>
					<p>Vous créez vous-mêmes les questions qui seront posées aux premières années.</p>
					<h5>Choix des filleuls</h5>
					<p>Dans l'onglet "Réponses", vous pouvez consulter les réponses anonymisées des premières années.
						Attribuez une note (1 à 5 étoiles) à chaque questionnaire en fonction de vos affinités.</p>
				</div>
			</div>
			<h4>Résultats du parrainage</h4>
			<p>À la fin de la session, un.e première année se voit attribuer un.e parrain/marraine. Vous pouvez désormais vous embrasser.</p>
		</section>
		<hr v-if="!this.user">
		<section v-if="!this.user">
			<h3>C'est parti !</h3>
			<router-link class="btn btn-primary" to="/signup">S'inscrire</router-link>
		</section>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import app from "@/feathers-client";
import {User} from "@/views/Users.vue";

@Component
export default class Demo extends Vue {
	@Prop() user!: User;

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "css/demo.css";
</style>
