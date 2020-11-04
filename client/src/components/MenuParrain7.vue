<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
            <!-- Brand -->
            <router-link class="navbar-brand" to="/">
                <img alt="Image placeholder" src="img/brand/godfather.svg" id="navbar-logo" style="min-height: 10.75rem;">
            </router-link>
            <!-- Toggler -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Collapse -->
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mt-4 mt-lg-0 ml-auto">
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/questions">Questions</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/answers">Réponses</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/rankings">Choix des poulains</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/users">Gestion utilisateurs</router-link>
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
                <router-link class="navbar-btn btn btn-sm btn-primary d-none d-lg-inline-block ml-3" to="/login">
                    Log in
                </router-link>
                <!-- Mobile button -->
                <div class="d-lg-none text-center">
                    <a href="https://webpixels.io/themes/quick-website-ui-kit" class="btn btn-block btn-sm btn-warning">See more details</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MenuParrain7 extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "css/MenuParrain7.css";
</style>
