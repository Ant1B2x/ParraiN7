<template>
    <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center">
            <div class="py-2 py-md-0">
                <div class="card shadow zindex-100 mb-0">
                    <div class="card-body px-md-5 py-5">
                        <div class="mb-5">
                            <h6 class="h3">Confirmation</h6>
                            <div class="text-muted mb-0">Entrez votre email et votre token pour valider votre compte</div>
                        </div>
                        <span class="clearfix"/>
                        <form>
                            <div class="form-group text-left">
                                <label class="form-control-label">Email</label>
                                <div class="input-group input-group-email">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="user"/></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="prenom.nom"
                                           v-model="email" @keyup.enter="sendToken">
                                    <div class="input-group-append">
                                        <span class="input-group-text">{{ institutionalEmailEnd }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group text-left">
                                <label class="form-control-label">Token</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><font-awesome-icon icon="ring"/></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Votre token" maxlength="6"
                                           v-model="token" @keyup.enter="sendToken" @blur="isLongEnough"
                                           @keydown="isNumber" @keyup="analyzeToken">
                                </div>
                            </div>
                            <div class="mt-5">
                                <button type="button" class="btn btn-primary" v-on:click="sendToken"
                                        :disabled="this.token.length !== tokenLength">Valider
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <MessageState ref="MessageState"/>
    </div>
</template>

<style scoped>
@import "css/Token.css";
</style>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import {User} from "@/views/Users.vue";
import MessageState from "@/components/MessageState.vue";
import app from "@/feathers-client";
import {institutionalEmailEnd} from '@/config';

@Component({
    components: {
        MessageState
    }
})
export default class Token extends Vue {

    public data() {
        return {
            institutionalEmailEnd: institutionalEmailEnd
        };
    }

    token = '';
    email = '';
    tokenLength = 6;

    @Prop() user?: User | null;
    @Ref('MessageState') messageState!: MessageState;

    async sendToken() {

        try {
            app.service('tokens').remove(null, {
                query: {
                    email: this.email + institutionalEmailEnd,
                    token: this.token
                }
            });
        } catch (error) {
            console.log("VV",error);
        }



        /*if (this.token === '000000') {
            this.messageState.displaySuccess('Le token a bien été validé !');
        } else if (this.token === '111111') {
            this.messageState.displayWarning('Attention, compte déjà validé.');
        } else {
            this.messageState.displayError("Le token n'a pas pu être validé.");
        }*/



        /*
        const token = {
            email: this.email,
            content: this.token,
        }
        try {
            await // Handle token validation with backend
            // console.log(data);
            this.messageState.displaySuccess('Le token a bien été valide !');
        } catch (error) {
            console.log(error);
            this.messageState.displayError('La token n\'a pu être validé.');
        }
        */
    }

    isLongEnough() {
        // console.log(this.token);
        // console.log(this.messageState.getCurrentState());
        if (this.messageState.isNone() || this.messageState.isOnWarning())
            if (this.token.length !== 6)
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

    analyzeToken() {
        this.token = this.token.replace(/[^0-9]/g, '');
        console.log(this.token);
    }

}
</script>
