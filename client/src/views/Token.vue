<template>
<div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center">
        <div class="col-md-6 py-6 py-md-0">
            <div class="card-body px-md-5 py-5" v-bind:class="[validation.messageState]">
                <p class="text-muted mb-0 alertMessage" role="alert">{{validation.message}}</p>
            </div>
            <form>
                <div class="form-group">
                    <label class="form-control-label">Token</label>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Votre token"
                               v-model="token" @keyup.enter="sendToken">
                    </div>
                </div>
                <div class="mt-4">
                    <button type="button" class="btn btn-block btn-primary" v-on:click="sendToken" :disabled="this.token.length === 6">Ajouter</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<style scoped>
/*@import "public/assets/css/quick-website.css";*/
@import "css/Questions.css";
@import "css/MessageState.css";
</style>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import app from '@/feathers-client';
import {MessageState} from "@/views/enum";
import {User} from "@/views/Users.vue";

export class Question {
    idQuestion: number;
    author: User;
    content: string;
    placeholder?: string;

    constructor(idQuestion: number, author: User, content: string) {
        this.idQuestion = idQuestion;
        this.author = author;
        this.content = content;
    }
}

@Component
export default class Questions extends Vue {
    token = '';

    @Prop() user?: User | null;

    private validation = {
        messageState: MessageState.none,
        message: 'Ajoutez votre question',
    }

    async sendToken() {
        await this.user?.connect();
        const token = {
            content: this.token,
        }
        app.service('token').create(token).then(
            (data: any) => {
                console.log(data);
                this.tokenValidated();
            }
        ).catch((error: any) => {
            console.log(error);
            this.validation.messageState = MessageState.hasError;
            this.validation.message = 'La token n\'a pu être validé.';
        });
    }

    tokenValidated() {
        this.validation.messageState = MessageState.hasSucceed;
        this.validation.message = 'La question a bien été validé !';
        setTimeout(() => {
            this.validation.messageState = MessageState.none;
            this.validation.message = 'Entrez votre token';
        }, 3000);
    }

}
</script>
