<template>
    <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center">
            <div class="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
                <div class="card shadow zindex-100 mb-0">
                    <div class="card-body px-md-5 py-5">
                        <div class="mb-5">
                            <h6 class="h3">Inscription</h6>
                            <p class="text-muted mb-0">Veuillez vous inscrire</p>
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
                                    <input type="email" class="form-control" id="input-email"
                                           placeholder="name@etu.toulouse-inp.fr">
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
                                    <input type="password" class="form-control" id="input-password"
                                           placeholder="Mot de passe">
                                </div>
                            </div>

                            <div class="form-group mb-0">
                                <div class="d-flex align-items-center justify-content-between">

                                    <label class="form-control-label">Confirmer mot de passe</label>

                                    <!--div class="mb-2">
                                        <a href="#" class="small text-muted text-underline--dashed border-primary" data-toggle="password-text" data-target="#input-password">Afficher le mot de passe</a>
                                    </div-->
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="key"/></span>
                                    </div>
                                    <input type="password" class="form-control" id="input-password-confirmation"
                                           placeholder="Mot de passe">
                                </div>
                            </div>


                            <hr class="separator"/>


                            <div class="form-group">
                                <div class="d-flex align-items-center justify-content-between">
                                    <label class="form-control-label">Prénom</label>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="id-card"/></span>
                                    </div>
                                    <input type="text" class="form-control" id="input-first-name" placeholder="John">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="d-flex align-items-center justify-content-between">
                                    <label class="form-control-label">Nom</label>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="id-card"/></span>
                                    </div>
                                    <input type="text" class="form-control" id="input-last-name" placeholder="Doe">
                                </div>
                            </div>

                            <hr class="separator"/>

                            <div class="form-group isGodFatherRadio">
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="godfatherRadio" name="godfatherRadio"
                                           class="custom-control-input">
                                    <label class="custom-control-label" for="godfatherRadio">Godfather</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="godsonRadio" name="godfatherRadio"
                                           class="custom-control-input">
                                    <label class="custom-control-label" for="godsonRadio">Godson</label>
                                </div>
                            </div>
                            <div class="mt-4">
                                <button type="button" class="btn btn-block btn-primary" v-on:click="logIn">S'inscrire
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer px-md-5"><small>Déjà enregistré ?</small>
                        <router-link to="/login" class="small font-weight-bold"> Connectez-vous</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "css/SignUp.css";
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class LogIn extends Vue {
    logIn = async () => {
        console.log("...")
    }
}

</script>
