<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
            <!-- Brand -->
            <router-link class="navbar-brand" to="/">
                <img alt="Image placeholder" src="img/brand/godfather.svg" id="navbar-logo" style="min-height: 10.75rem;">
            </router-link>
            <!-- Toggler -->
            <button class="navbar-toggler" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"
            v-on:click="toggleMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Collapse -->
            <div class="navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mt-4 mt-lg-0 ml-auto">
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/">Accueil</router-link>
                    </li>
                    <li class="nav-item " v-if="this.isGodfather()">
                        <router-link class="nav-link" to="/questions">Questions</router-link>
                    </li>
                    <li class="nav-item " v-if="this.isGodSon()">
                        <router-link class="nav-link" to="/answers">Réponses</router-link>
                    </li>
                    <li class="nav-item " v-if="this.isGodfather()">
                        <router-link class="nav-link" to="/rankings">Choix des poulains</router-link>
                    </li>
                    <li class="nav-item " v-if="this.isAdmin()">
                        <router-link class="nav-link" to="/users">Gestion utilisateurs</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/about">A propos</router-link>
                    </li>
                    <!-- <li class="nav-item dropdown dropdown-animate" data-toggle="hover">
                        <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                        <div class="dropdown-menu dropdown-menu-single">
                            <a href="index.html" class="dropdown-item">Homepage</a>
                            <a href="about.html" class="dropdown-item">About us</a>
                            <a href="contact.html" class="dropdown-item">Contact</a>
                            <div class="dropdown-divider"></div>
                            <a href="login.html" class="dropdown-item">Login</a>
                        </div>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href="docs/index.html">Docs</a>
                    </li> -->
                </ul>
                <!-- Button -->
                <!--a class="navbar-btn btn btn-sm btn-primary d-none d-lg-inline-block ml-3" href="https://github.com/webpixels/quick-website-ui-kit-demo/archive/master.zip">
                    Download Free
                </a-->
                <router-link class=" btn btn-sm btn-primary d-lg-inline-block" to="/login" v-if="!this.user">
                    Connexion
                </router-link>
                <button class="btn btn-sm btn-danger d-lg-inline-block" v-if="this.user" @click="signalLogOut">
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
export default class MenuParrain7 extends Vue {

    @Prop() user?: User | null;

    mounted() {
        // console.log(this.user);
    }

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
        // console.log("Deco moi pls");
        this.$emit('signalLogOut');
    }

    toggleMenu() {
        const elem = 'navbarCollapse';
        document.getElementById(elem)?.classList.toggle('show');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "css/MenuParrain7.css";
</style>
