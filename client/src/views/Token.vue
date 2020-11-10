<template>
<div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center">
        <div class="col-md-6 py-6 py-md-0">
            <MessageStateComponent :standard-message="standardMessage" ref="MessageStateComponent"/>
            <form>
                <div class="form-group">
                    <label class="form-control-label">Email</label>
                    <div class="input-group input-group-email">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><font-awesome-icon icon="user"/></span>
                        </div>
                        <input type="text" class="form-control" placeholder="prenom.nom"
                               v-model="email" @keyup.enter="sendToken">
                        <div class="input-group-append">
                            <span class="input-group-text">@etu.toulouse-inp.fr</span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-control-label">Token</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><font-awesome-icon icon="ring"/></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Votre token"
                               v-model="token" @keyup.enter="sendToken" @blur="isLongEnough" @keydown="isNumber" @keyup="analyzeToken">
                    </div>
                </div>
                <div class="mt-4">
                    <button class="btn btn-primary" v-on:click="sendToken" :disabled="this.token.length !== tokenLength">Valider</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<style scoped>
/*@import "public/assets/css/quick-website.css";*/
@import "css/Token.css";
</style>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import {User} from "@/views/Users.vue";
import MessageStateComponent from "@/components/MessageStateComponent.vue";
import {MessageState} from "@/views/enum";

@Component({
    components: {
        MessageStateComponent
    }
})
export default class Token extends Vue {
    token = '';
    email = '';
    standardMessage = 'Entrez votre mail et votre token, pour valider votre compte.';
    tokenLength = 6;

    @Prop() user?: User | null;
    @Ref('MessageStateComponent') messageStateComponent!: MessageStateComponent;


    async sendToken() {
        if(this.token === '000000') {
            this.messageStateComponent.displaySuccess('Le token a bien été validé !')
        } else if (this.token === '111111') {
            this.messageStateComponent.displayWarning('Attention, compte déjà validé.')
        } else {
            this.messageStateComponent.displayError('La token n\'a pu être validé.');
        }
        /*
        const token = {
            email: this.email,
            content: this.token,
        }
        try {
            await // Handle token validation with backend
            // console.log(data);
            this.messageStateComponent.displaySuccess('Le token a bien été valide !');
        } catch (error) {
            console.log(error);
            this.messageStateComponent.displayError('La token n\'a pu être validé.');
        }
        */
    }

    isLongEnough() {
        // console.log(this.token);
        // console.log(this.messageStateComponent.getCurrentState());
        if (this.messageStateComponent.getCurrentState() === MessageState.none ||
            this.messageStateComponent.isOnWarning()) {
            if (this.token.length !== 6) {
                this.messageStateComponent.displayWarning('Le token n\'a pas la bonne longueur.');
            } else {
                this.messageStateComponent.displayNormalMessage();
            }
        }
    }

    isNumber(evt: any) {
        evt = (evt) ? evt : window.event;
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        // Allow: backspace, delete, tab, escape, enter and .
        if ([46, 8, 9, 27, 13, 110, 190].includes(evt.keyCode) ||
            // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
            ((evt.keyCode == 65 || evt.keyCode == 86 || evt.keyCode == 67) && (evt.ctrlKey === true || evt.metaKey === true)) ||
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

    analyzeToken(evt: any){
        evt.target.value = evt.target.value.replace(/[^0-9]/g, '');
        console.log(evt.target.value);
    }

}
</script>
