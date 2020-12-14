<template>
    <div class="container mb-6">
        <section>
            <h1>
                ParraiN7
                <img src="img/brand/logo.svg" id="app-logo"/>
            </h1>
            <h1><small>L'appli de parrainage des élèves de l'ENSEEIHT</small></h1>
        </section>
        <hr>
        <section>
            <h3 class="mb-6">Comment ça marche ?</h3>
            <div class="row mb-3">
                <div class="col-md-6 text-center text-lg-right pr-lg-5" id="first-year-column">
                    <h4 class="mb-lg-5">1ère année</h4>
                    <h5>Création de compte</h5>
                    <p>
                        Vous pouvez créer votre compte en utilisant l'adresse mail de l'N7.
                        <br/>
                        N'oubliez pas de sélectionner "Filleul" avant de confirmer l'inscription.
                    </p>
                    <h5>Réponses aux questions</h5>
                    <p>
                        Répondez aux questions qui vous sont posées. Les réponses seront affichées aux 2A de manière anonyme.
                        Vous serez avertis si de nouvelles questions ont été proposées par les deuxièmes années.
                    </p>
                    <h5>Obtention d'un.e parrain/marraine</h5>
                    <p>
                        Grâce à un algorithme d'association approximatif, vous obtiendrez un.e parrain/marraine qui
                        vous aura sélectionné en fonction de vos réponses aux questions. Alors soyez drôles et inventifs !
                    </p>
                </div>
                <div class="col-md-6 text-center text-lg-left pl-lg-5" id="second-year-column">
                    <h4 class="mb-lg-5">2ème année</h4>
                    <h5>Création de compte</h5>
                    <p>
                        Vous pouvez créer votre compte en utilisant l'adresse mail de l'N7.
                        <br/>
                        N'oubliez pas de sélectionner "Parrain" avant de confirmer l'inscription.
                    </p>
                    <h5>Création des questions</h5>
                    <p>
                        Vous créez vous-mêmes les questions qui seront posées aux premières années.
                        <br/>
                        Ne mettez rien qui pourrait vexer qui que ce soit !
                    </p>
                    <h5>Choix des filleuls</h5>
                    <p>Dans l'onglet "Réponses", vous pouvez consulter les réponses anonymisées des premières années.
                        Attribuez une note (1 à 5 étoiles) à chaque questionnaire en fonction de vos affinités.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h4>Résultats du parrainage</h4>
                    <p class="text-center">À la fin de la session, un.e première année se voit attribuer un.e parrain/marraine. Vous pouvez désormais vous embrasser.</p>
                </div>
            </div>
        </section>
        <section v-if="!this.user">
            <hr/>
            <h3 class="mb-4">Nouveau sur le site ?</h3>
            <router-link class="btn btn-primary" to="/signup">S'inscrire</router-link>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {User} from "@/views/Users.vue";

@Component
export default class Home extends Vue {
    @Prop() user?: User | null;
}
</script>

<style scoped>
@import "css/Home.css";
</style>
