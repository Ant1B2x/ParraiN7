<template>
    <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center">
            <div class="col-md-6 py-2 py-md-0">
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
                            <div class="mt-4">
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
        <MessageState ref="MessageState"/>
    </div>
</template>

<style scoped>
@import "css/LogIn.css";
</style>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator';
import app from '@/feathers-client';
import MessageState from '@/components/MessageState.vue';

@Component({
    components: {
        MessageState
    }
})
export default class LogIn extends Vue {

    @Ref('MessageState') messageState!: MessageState;

    private institutionalEmailEnd = '@etu.toulouse-inp.fr';

    private loginForm = {
        email: '',
        password: '',
        hasError: false,
    }

    public async logIn() {
        this.noError();
        try {
            await app.logout();
            await app.authenticate({
                strategy: 'local',
                email: this.loginForm.email + this.institutionalEmailEnd,
                password: this.loginForm.password
            });

            this.loginForm.email = '';
            this.loginForm.password = '';
            await this.$router.replace('/');
        } catch (err) {
            if (err.code === 401)
                this.messageState.displayError('Utilisateur ou mot de passe incorrect.');
            else
                this.messageState.displayError('Impossible de se connecter.');
            this.loginForm.hasError = true;
        }

    }

    noError() {
        this.loginForm.hasError = false;
    }

    private handleKeyUp(e: KeyboardEvent) {
        if (e.key === "Enter") {
            this.logIn();
        } else {
            this.noError();
        }
    }

}

</script>
