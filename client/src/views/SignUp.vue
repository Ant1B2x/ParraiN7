<template>
    <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center">
            <div class="py-2 py-md-0">
                <div class="card shadow zindex-100 mb-0">
                    <div class="card-body px-md-5 py-5" :class="{ 'hasError': signUpValidation.hasError }">
                        <div class="mb-5">
                            <h6 class="h3">Inscription</h6>
                            <div class="text-muted mb-0">Entrez vos informations utilisateurs</div>
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
                                    <input v-model="signUpForm.email" type="text" class="form-control" id="input-email"
                                           placeholder="prenom.nom" @keyup="handleKeyUp" @blur="checkError">

                                    <div class="input-group-append">
                                        <span class="input-group-text">{{ institutionalEmailEnd }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="d-flex align-items-center justify-content-between">
                                    <label class="form-control-label">Mot de passe</label>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="key"/></span>
                                    </div>
                                    <input v-model="signUpForm.password" type="password" class="form-control"
                                           id="input-password"
                                           placeholder="Mot de passe" @blur="checkError">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="d-flex align-items-center justify-content-between">
                                    <label class="form-control-label">Confirmer mot de passe</label>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="key"/></span>
                                    </div>
                                    <input v-model="signUpValidation.passwordConfirm" type="password"
                                           class="form-control" id="input-password-confirmation"
                                           placeholder="Mot de passe" @blur="checkError">
                                </div>
                            </div>


                            <div class="form-group">
                                <div class="d-flex align-items-center justify-content-between">
                                    <label class="form-control-label">Prénom</label>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="id-card"/></span>
                                    </div>
                                    <input v-model="signUpForm.firstname" type="text" class="form-control"
                                           id="input-first-name" placeholder="John" @blur="checkNameValidity">
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
                                    <input v-model="signUpForm.lastname" type="text" class="form-control"
                                           id="input-last-name" placeholder="Doe"
                                           @blur="checkNameValidity" @keyup="handleKeyUp">
                                </div>
                            </div>

                            <div class="form-group isGodfatherRadio">
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input v-model="signUpForm.isGodfather" type="radio" id="godfatherRadio"
                                           name="godfatherRadio"
                                           class="custom-control-input" value=true>
                                    <label class="custom-control-label" for="godfatherRadio">Parrain</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input v-model="signUpForm.isGodfather" type="radio" id="godsonRadio"
                                           name="godfatherRadio"
                                           class="custom-control-input" value=false>
                                    <label class="custom-control-label" for="godsonRadio">Filleul</label>
                                </div>
                            </div>
                            <div class="mt-5">
                                <button type="button" class="btn btn-primary" v-on:click="signUp"
                                        :disabled="signUpValidation.hasError">
                                    S'inscrire
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer px-md-5"><small>Déjà enregistré ?</small>
                        <router-link to="/login" class="small font-weight-bold"> Connectez-vous.</router-link>
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import app from "@/feathers-client";
import MessageState from '@/components/MessageState.vue';
import {institutionalEmailEnd} from '@/config';

@Component
export default class LogIn extends Vue {

    private institutionalEmailEnd = institutionalEmailEnd;

    @Prop() messageState!: MessageState;

    private nameValidity =
        RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");

    private signUpValidation = {
        passwordConfirm: '',
        hasError: false
    }

    private signUpForm = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        isGodfather: false,
        isAdmin: false,
    }

    public async signUp() {

        this.signUpValidation.hasError = false;
        await app.logout();

        const signUpFormBis = JSON.parse(JSON.stringify(this.signUpForm));
        signUpFormBis.email = signUpFormBis.email + institutionalEmailEnd;
        try {
            await app.service('users').create(signUpFormBis);
            await this.$router.push('/token');
        } catch (error) {
            if (error.code === 400)
                this.messageState.displayError('Le nom et/ou le prénom ne respecte(nt) pas le format attendu.');
            else if (error.code === 406)
                this.messageState.displayError("L'email ne respecte pas le format attendu.");
            else if (error.code === 409)
                this.messageState.displayError('Un utilisateur existe déjà avec cet email.');
            else
                this.messageState.displayError("L'utilisateur n'a pas pu être crée.");
            this.signUpValidation.hasError = true;
        }
    }

    checkError() {
        if ((this.signUpForm.password && this.signUpValidation.passwordConfirm) && (this.signUpForm.password != this.signUpValidation.passwordConfirm)) {
            this.messageState.displayError('Les mots de passe ne correspondent pas.');
            this.signUpValidation.hasError = true;
        } else {
            this.signUpValidation.hasError = false;
        }
    }

    checkNameValidity() {
        if ((this.signUpForm.firstname && !this.nameValidity.test(this.signUpForm.firstname))
            || (this.signUpForm.lastname && !this.nameValidity.test(this.signUpForm.lastname))) {
            this.messageState.displayError('Le nom et/ou le prénom ne respecte(nt) pas le format attendu.');
            this.signUpValidation.hasError = true;
        }
    }

    handleKeyUp(e: KeyboardEvent) {
        if (e.key === "Enter")
            this.signUp();
        else
            this.signUpValidation.hasError = false;
    }

}

</script>
