<template>
    <div class="rankingArea">

        <div class="text-muted mb-5">Note selon tes préférences</div>

        <form>
            <div class="row justify-content-center">
                <div class="col col-md-1 align-self-center mb-1 order-1 order-md-0">
                    <font-awesome-icon icon="arrow-left" :style="{ color: '#171347' }" size="2x" v-on:click="previousGodson()"/>
                </div>
                <div class="col-md-auto order-0 order-md-1">
                    <label>
                        <select class="custom-select" v-model="currentIndex" @change="checkBooleans">
                            <option selected disabled>Choisissez un filleul</option>
                            <option v-for="godson in godsons" :value="godsons.indexOf(godson)" :key="godson.id">Filleul #{{godsons.indexOf(godson)+1}}</option>
                        </select>
                    </label>
                </div>
                <div class="col col-md-1 align-self-center mb-1 order-2 order-md-2">
                    <font-awesome-icon icon="arrow-right" :style="{ color: '#171347' }" size="2x" v-on:click="nextGodson()"/>
                </div>
            </div>
        </form>

        <div v-if="godsons[this.currentIndex]">
            <h2 style="color: #152c5b;">Filleul #{{this.currentIndex+1}}</h2>
            <Rating :grade="godsons[this.currentIndex].rank" :maxStars="5" :hasCounter="true" @updatedStars="changeRanking"/>
        </div>

        <div class="buttons">
            <button type="button" class="btn btn-danger" v-on:click="removeVote" :disabled="!this.isRankRemovable">Supprimer</button>
            <button type="button" class="btn btn-primary" v-on:click="sendVote" :disabled="!this.isRankDifferent">Valider</button>
        </div>

        <!-- Afficher questions existantes -->
        <div class="questionList" v-if="godsons[this.currentIndex]">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="question in godsons[this.currentIndex].questions"
                 :key="question.idQuestion">
                <div class="card-body">
                    <div class="pb-4">
                        <div class="icon bg-dark text-white rounded-circle icon-shape shadow">?</div>
                    </div>
                    <div class="pt-2 pb-3">
                        <h5 class="mb-0">{{ question.questionContent }}</h5>
                        <p class="text-muted">
                            {{ question.answerContent }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <MessageState ref="MessageState"/>

    </div>
</template>

<style scoped>
@import "css/Rankings.css";
</style>

<script lang="ts">
import {Component, Vue, Prop, Ref} from 'vue-property-decorator';
import Rating from "@/components/Rating.vue"
import MessageState from "@/components/MessageState.vue";
import app from "@/feathers-client";
import {User} from "@/views/Users.vue";

class Question {
    constructor(public questionId: number, public questionContent: string, public answerId: number, public answerContent: string) {

    }
}


export class Godson {

    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    isGodfather: boolean;
    isAdmin: boolean;
    token: string;
    questions: Question[];
    rank: number;
    rankId: number;

    constructor(id: number, email: string, password: string, firstname: string, lastname: string, isGodfather: boolean,
                isAdmin: boolean, token: string, questions: Question[], rank: number, rankId: number) {
        this.rank = rank;
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isGodfather = isGodfather;
        this.isAdmin = isAdmin;
        this.token = token;
        this.questions = questions;
        this.rank = rank;
        this.rankId = rankId;
    }
}

@Component({
    components: {
        Rating,
        MessageState,
    }
})
export default class Rankings extends Vue {

    @Prop() user?: User | null;
    @Ref('MessageState') messageState!: MessageState;

    godsons: Godson[] = [];
    godsonsOriginal: Godson[] = [];

    currentIndex = 0;
    isRankDifferent = false;
    isRankRemovable = false;

    async mounted() {
        await this.loadUsers();
    }

    async loadUsers() {
        this.godsons = await app.service('users').find({ query: { answers: true }, $sort: {
                id: 1
            } } );

        for (const godson of this.godsons) {
            godson.rank = godson.rank ? godson.rank : 0;
        }
        this.godsonsOriginal = JSON.parse(JSON.stringify(this.godsons)) as Godson[];
        this.checkBooleans();
    }

    nextGodson() {
        this.currentIndex = (this.currentIndex + 1) % this.godsons.length;
        this.checkBooleans();
    }

    previousGodson() {
        this.currentIndex = this.mod((this.currentIndex - 1), this.godsons.length);
        this.checkBooleans();
    }

    mod(n: number, m: number) {
        return ((n % m) + m) % m;
    }

    changeRanking(rank: number) {
        this.godsons[this.currentIndex].rank = rank;
        this.checkBooleans();
    }

    async sendVote() {
        if (this.godsons[this.currentIndex]) {
            const vote = {
                godsonId: this.godsons[this.currentIndex].id,
                rank: this.godsons[this.currentIndex].rank,
            }
            try {
                await app.service('rankings').patch(0, vote);
                //Send check email or smth
                // console.log(data);
                this.messageState.displaySuccess('Le vote a bien été pris en compte.');
                await this.loadUsers();
            } catch(error) {
                if (error.code === 408) {
                    this.messageState.displayError("La date d'expiration a été atteinte, impossible de réaliser cette action.");
                } else {
                    this.messageState.displayError("Le vote n'a pas pu être pris en compte.");
                }
            }
        }
    }

    async removeVote() {
        try {
            await app.service('rankings').remove(this.godsons[this.currentIndex].rankId);
            this.messageState.displaySuccess('Le vote a bien été supprimé.');
            await this.loadUsers();
        } catch (error) {
            if (error.code === 408) {
                this.messageState.displayError("La date d'expiration a été atteinte, impossible de réaliser cette action.");
            } else {
                this.messageState.displayError("Le vote n'a pas pu être supprimé.");
            }
        }
    }

    checkBooleans() {
        // Forced to do dirty things, because vue.js needs parameters and not function return.
        this.isRankDifferent = this.godsons[this.currentIndex].rank > 0
            && this.godsons[this.currentIndex].rank !== this.godsonsOriginal[this.currentIndex].rank;
        this.isRankRemovable = !!this.godsons[this.currentIndex].rankId && this.godsons[this.currentIndex].rank > 0;
    }
}
</script>
