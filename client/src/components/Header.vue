<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
            <!-- Brand -->
            <router-link class="navbar-brand" to="/">
                <img alt="Image placeholder" src="img/brand/logo-text.svg" id="navbar-logo">
            </router-link>
            <!-- Toggler -->
            <button class="navbar-toggler" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"
            v-on:click="toggleMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Collapse -->
            <div class="navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mt-4 mt-lg-0 ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Accueil</router-link>
                    </li>
                    <li class="nav-item" v-if="this.isGodfather()">
                        <router-link class="nav-link" to="/questions">Questions</router-link>
                    </li>
                    <li class="nav-item" v-if="this.isGodSon()">
                        <router-link class="nav-link" to="/answers">Réponses</router-link>
                    </li>
                    <li class="nav-item" v-if="this.isGodfather()">
                        <router-link class="nav-link" to="/rankings">Choix des filleuls</router-link>
                    </li>
                    <li class="nav-item" v-if="this.isAdmin()">
                        <router-link class="nav-link" to="/users">Gestion utilisateurs</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">À propos</router-link>
                    </li>
                </ul>
                <router-link class="btn btn-sm btn-primary d-lg-inline-block" id="login-button" to="/login" v-if="!this.user">
                    Connexion
                </router-link>
                <button type="button" class="btn btn-sm btn-danger d-lg-inline-block" id="logout-button" v-if="this.user" @click="signalLogOut">
                    Déconnexion
                </button>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {User} from "@/views/Users.vue";

@Component
export default class Header extends Vue {

    @Prop() user?: User | null;

    isAdmin(): boolean {
        return !!this.user && this.user.isAdmin;
    }

    isGodfather(): boolean {
        return (!!this.user && this.user.isGodfather) || this.isAdmin();
    }

    isGodSon(): boolean {
        return (!!this.user && !this.user.isGodfather) || this.isAdmin();
    }

    signalLogOut() {
        this.$emit('signalLogOut');
    }

    toggleMenu() {
        const elem = 'navbarCollapse';
        document.getElementById(elem)?.classList.toggle('show');
    }
}
</script>

<style scoped>
@import "css/Header.css";
</style>
