<template>
    <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center">
            <div class="py-2 py-md-0">
                <div class="card shadow zindex-100 mb-0">
                    <div class="card-body px-md-5 py-5" :class="{ 'hasError': loginForm.hasError }">
                        <div class="mb-5">
                            <h6 class="h3">Connexion</h6>
                            <div class="text-muted mb-0">Connectez-vous à votre compte pour continuer</div>
                        </div>
                        <span class="clearfix"/>
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
                                           @keyup="handleKeyUp"/>
                                    <div class="input-group-append">
                                        <span class="input-group-text">{{ institutionalEmailEnd }}</span>
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
                            <div class="mt-5">
                                <button type="button" class="btn btn-primary" v-on:click="logIn"
                                        :disabled="loginForm.hasError">
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import app from '@/feathers-client';
import {institutionalEmailEnd} from '@/config';
import MessageState from "@/components/MessageState.vue";

@Component
export default class LogIn extends Vue {

    private institutionalEmailEnd = institutionalEmailEnd;

    @Prop() messageState!: MessageState;

    private loginForm = {
        email: '',
        password: '',
        hasError: false,
    }

    public async logIn() {
        this.loginForm.hasError = false;
        try {
            await app.logout();
            await app.authenticate({
                strategy: 'local',
                email: this.loginForm.email + institutionalEmailEnd,
                password: this.loginForm.password
            });

            this.loginForm.email = '';
            this.loginForm.password = '';
            await this.$router.push('/');
        } catch (error) {
            if (error.code === 401)
                this.messageState.displayError('Utilisateur ou mot de passe incorrect.');
            else
                this.messageState.displayError('Impossible de se connecter.');
            this.loginForm.hasError = true;
        }

    }

    private handleKeyUp(e: KeyboardEvent) {
        if (e.key === "Enter") {
            this.logIn();
        } else {
            this.loginForm.hasError = false;
        }
    }

}

</script>
