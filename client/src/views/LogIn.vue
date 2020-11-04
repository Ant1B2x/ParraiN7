<template>
    <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center">
            <div class="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
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
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="user"/></span>
                                    </div>
                                    <input v-model="loginForm.email" type="email" class="form-control" id="input-email"
                                           placeholder="prenom.nom@etu.toulouse-inp.fr"
                                           v-on:keyup="handleKeyUp"/>
                                </div>
                            </div>
                            <div class="form-group mb-0">
                                <div class="d-flex align-items-center justify-content-between">

                                    <label class="form-control-label">Mot de passe</label>

                                    <!--div class="mb-2">
                                        <a href="#" class="small text-muted text-underline--dashed border-primary" data-toggle="password-text" data-target="#input-password">Afficher le mot de passe</a>
                                    </div-->
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
                                <button type="button" class="btn btn-primary" v-on:click="logIn">
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

    private loginForm = {
        email: '',
        password: '',
        errorMessage: 'Connectez-vous à votre compte pour continuer',
        hasError: false,
    }

    public logIn = async () => {

        this.loginForm.errorMessage = 'Connectez-vous à votre compte pour continuer';
        this.loginForm.hasError = false;
        app.logout();
        const auth = await app.authenticate({
            strategy: 'local',
            email: this.loginForm.email,
            password: this.loginForm.password,
        }).then(
            (data: any) => {
                console.log(data);
                window.localStorage.setItem('token', data.accessToken);
                this.loginForm.email = '';
                this.loginForm.password = '';
                this.$router.push('questions');
            }
        ).catch( (error: any) => {
            if (error.code === 401) {
                // console.log("mauvais mdp");
                this.loginForm.errorMessage = 'Utilisateur ou mot de passe incorrect.';
                this.loginForm.hasError = true;
            }
        });

        return auth;

    }

    noError() {
        this.loginForm.hasError = false;
        this.loginForm.errorMessage = 'Connectez-vous à votre compte pour continuer'
    }

    handleKeyUp(e: any) {
        if (e.keyCode === 13) {
            this.logIn()
        } else {
            this.noError()
        }
    }

}

</script>
