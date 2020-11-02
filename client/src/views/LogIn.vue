<template>
    <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center">
            <div class="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
                <div class="card shadow zindex-100 mb-0">
                    <div class="card-body px-md-5 py-5">
                        <div class="mb-5">
                            <h6 class="h3">Login</h6>
                            <p class="text-muted mb-0">Connectez-vous à votre compte pour continuer</p>
                        </div>
                        <span class="clearfix"></span>
                        <form>
                            <div class="form-group">
                                <div class="d-flex align-items-center justify-content-between">
                                <label class="form-control-label">Adresse email</label>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="user" /></span>
                                    </div>
                                    <input type="email" class="form-control" id="input-email" placeholder="name@etu.toulouse-inp.fr">
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
                                        <span class="input-group-text"><font-awesome-icon icon="key" /></span>
                                    </div>
                                    <input type="password" class="form-control" id="input-password" placeholder="Mot de passe">
                                </div>
                            </div>
                            <div class="mt-4">
                                <button type="button" class="btn btn-block btn-primary" v-on:click="logIn">Se connecter</button></div>
                        </form>
                    </div>
                    <div class="card-footer px-md-5"><small>Pas encore enregistré?</small>
                        <a href="#" class="small font-weight-bold"> Tant pis</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "src/views/css/LogIn.css";
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import app from '@/feathers-client';

@Component
export default class LogIn extends Vue {
    logIn = async () => {
        console.log("...")
    }
}

</script>
