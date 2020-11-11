<template>
    <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center">
            <div class="col-md-6 py-6 py-md-0">
                <div class="card shadow zindex-100 mb-0">
                    <div class="card-body px-md-5 py-5" :class="{ 'hasError': loginForm.hasError }">
                        <div class="mb-5">
                            <h6 class="h3">Connexion</h6>
                            <p class="text-muted mb-0 errorMessage"
                               :class="{ 'alert alert-danger': loginForm.hasError }"  role="alert">{{loginForm.errorMessage}}</p>
                        </div>
                        <span class="clearfix"></span>
                        <form>
                            <div class="form-group">
                                <div class="d-flex align-items-center justify-content-between">
                                    <label class="form-control-label">Adresse email</label>
                                </div>
                                <div class="input-group input-group-email">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="user"/></span>
                                    </div>
                                    <input v-model="loginForm.email" type="text" class="form-control" id="input-email"
                                           placeholder="prenom.nom"
                                           @keyup="handleKeyUp" @blur="checkError"/>

                                    <div class="input-group-append">
                                        <span class="input-group-text">{{institutionalEmailEnd}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-0">
                                <div class="d-flex align-items-center justify-content-between">

                                    <label class="form-control-label">Mot de passe</label>

                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="key"/></span>
                                    </div>
                                    <input v-model="loginForm.password" type="password" class="form-control"
                                           id="input-password"
                                           placeholder="Mot de passe"
                                           v-on:keyup="handleKeyUp"/>
                                </div>
                            </div>
                            <div class="mt-4">
                                <button type="button" class="btn btn-primary" v-on:click="logIn" :disabled="loginForm.hasError">
                                    Se connecter
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer px-md-5"><small>Pas encore enregistré ? </small>
                        <router-link to="/signup" class="small font-weight-bold">Inscrivez-vous !</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "css/LogIn.css";
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import app from "@/feathers-client";

@Component
export default class LogIn extends Vue {

    private institutionalEmailEnd = '@etu.toulouse-inp.fr';

    private loginForm = {
        email: '',
        password: '',
        errorMessage: 'Connectez-vous à votre compte pour continuer',
        hasError: false,
    }

    public logIn = async () => {

        this.loginForm.errorMessage = 'Connectez-vous à votre compte pour continuer';
        this.loginForm.hasError = true;
        try {
            this.loginForm.errorMessage = 'Avant';

            // await app.logout();
            await app.authenticate({
                strategy: 'local',
                email: this.loginForm.email + this.institutionalEmailEnd,
                password: this.loginForm.password
            });
            this.loginForm.errorMessage = 'Après';

            this.loginForm.email = '';
            this.loginForm.password = '';
            await this.$router.push('/questions');
        } catch (err) {
            if (err.code === 401) {
                this.loginForm.errorMessage = 'Utilisateur ou mot de passe incorrect.';
                this.loginForm.hasError = true;
            }
        }

    }

    checkError() {
        /*
        if (!this.institutionalEmailRegexp.test(this.loginForm.email)) {
            this.loginForm.errorMessage = 'L\'email ne respecte pas le format attendu !';
            this.loginForm.hasError = true;
        }
        */
    }

    noError() {
        this.loginForm.errorMessage = 'Connectez-vous à votre compte pour continuer'
        this.loginForm.hasError = false;
    }

    private handleKeyUp(e: any) {
        if (e.keyCode === 13) {
            this.logIn();
        } else {
            this.noError();
        }
    }

}

</script>
