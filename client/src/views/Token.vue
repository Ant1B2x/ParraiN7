<template>
    <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center">
            <div class="py-2 py-md-0">
                <div class="card shadow zindex-100 mb-0">
                    <div class="card-body px-md-5 py-5" :class="{ 'hasError': tokenForm.hasError }">
                        <div class="mb-5">
                            <h6 class="h3">Confirmation</h6>
                            <div class="text-muted mb-0">Entrez votre email et votre token pour valider votre compte</div>
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
                                    <input type="text" class="form-control" placeholder="prenom.nom"
                                           v-model="tokenForm.email" @keyup.enter="sendToken"/>
                                    <div class="input-group-append">
                                        <span class="input-group-text">{{ institutionalEmailEnd }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-0">
                                <div class="d-flex align-items-center justify-content-between">
                                    <label class="form-control-label">Token</label>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="ring"/></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Votre token" maxlength="6"
                                           v-model="tokenForm.token" @keyup.enter="sendToken" @blur="isLongEnough"
                                           @keydown="isNumber"/>
                                </div>
                            </div>
                            <div class="mt-5">
                                <button type="button" class="btn btn-primary" v-on:click="sendToken"
                                        :disabled="this.tokenForm.token.length !== tokenLength">
                                    Valider
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "css/Token.css";
</style>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {User} from "@/views/Users.vue";
import MessageState from "@/components/MessageState.vue";
import app from "@/feathers-client";
import {institutionalEmailEnd} from '@/config';

@Component
export default class Token extends Vue {

    private institutionalEmailEnd = institutionalEmailEnd;

    private tokenLength = 6;

    @Prop() user?: User | null;
    @Prop() messageState!: MessageState;

    private tokenForm = {
        email: '',
        token: '',
        hasError: false
    }

    async sendToken() {
        this.tokenForm.hasError = false;
        try {
            await app.service('tokens').remove(null, {
                query: {
                    email: this.tokenForm.email + institutionalEmailEnd,
                    token: this.tokenForm.token
                }
            });
            this.messageState.displaySuccess('Le token a bien été validé.');
            await this.$router.push('/login');
        } catch (error) {
            if (error.code === 403)
                this.messageState.displayError('Un utilisateur ne peut pas valider les tokens des autres.');
            else if (error.code === 404)
                this.messageState.displayError("Aucun utilisateur n'existe pour cette adresse email.");
            else if (error.code === 406)
                this.messageState.displayError('Le token saisi est invalide.');
            else
                this.messageState.displayError("Le token n'a pas pu être validé.");
            this.tokenForm.hasError = true;
        }
    }

    isLongEnough() {
        if (this.messageState.isNone() || this.messageState.isOnWarning())
            if (this.tokenForm.token.length !== 6)
                this.messageState.displayWarning("Le token n'a pas la bonne longueur.");
    }

    isNumber(evt: KeyboardEvent) {
        if (['delete', 'backspace', 'tab', 'escape', 'enter', 'decimal point', 'period'].includes(evt.key) ||
            // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
            ((evt.key === 'a' || evt.key === 'v' || evt.key === 'c') && (evt.ctrlKey === true || evt.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (evt.keyCode >= 35 && evt.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((evt.shiftKey || (evt.keyCode < 48 || evt.keyCode > 57)) && (evt.keyCode < 96 || evt.keyCode > 105)) {
            evt.preventDefault();
        }

    }

}

</script>
