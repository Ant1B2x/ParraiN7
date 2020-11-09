<template>
    <div class="questionArea">
        <form>
            <div class="row justify-content-center">
                <div class="col col-md-1 align-self-center mb-1 order-1 order-md-0">
                    <font-awesome-icon icon="arrow-left" :style="{ color: '#171347' }" size="2x" v-on:click="previousPoulain()"/>
                </div>
                <div class="col-md-auto order-0 order-md-1">
                    <label>
                        <select class="custom-select" v-model="godsons[this.currentIndex]">
                            <option selected disabled>Choisissez un poulain</option>
                            <option v-for="godson in godsons" :value="godson" :key="godson.id">{{godson.firstname}} {{godson.lastname}}</option>
                        </select>
                    </label>
                </div>
                <div class="col col-md-1 align-self-center mb-1 order-2 order-md-2">
                    <font-awesome-icon icon="arrow-right" :style="{ color: '#171347' }" size="2x" v-on:click="nextPoulain()"/>
                </div>
            </div>
        </form>

        <MessageStateComponent :standard-message="standardMessage" ref="MessageStateComponent"/>

        <div class="mt-4">
            <button class="btn btn-primary" v-on:click="sendVote">Modifier</button>
        </div>

        <div v-if="godsons[this.currentIndex]">
            <h2 style="color: #152c5b;">{{godsons[this.currentIndex].firstname}} {{godsons[this.currentIndex].lastname}}</h2>
            <Rating :grade="godsons[this.currentIndex].rank" :maxStars="5" :hasCounter="true" @updatedStars="changeRating"/>
        </div>

        <!-- Afficher questions existantes -->
        <div class="questionList" v-if="godsons[this.currentIndex]">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="question in godsons[this.currentIndex].questions"
                 :key="question.idQuestion">
                <div class="card-body">
                    <div class="pb-4">
                        <div class="icon bg-dark text-white rounded-circle icon-shape shadow">
                            <!--i data-feather="droplet"></i-->?
                        </div>
                    </div>
                    <div class="pt-2 pb-3">
                        <h5 class="mb-0">{{ question.questionContent }}</h5>
                        <p class="text-muted">
                            {{ question.answerContent }}
                        </p>
                        <p class="text-muted mb-0" v-if="question.placeholder">
                            ({{ question.placeholder }})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*@import "public/assets/css/quick-website.css";*/
@import "css/Rankings.css";
</style>

<script lang="ts">
import {Component, Vue, Prop, Ref} from 'vue-property-decorator';
import Rating from "@/components/Rating.vue"
import {MessageState} from "@/views/enum";
import MessageStateComponent from "@/components/MessageStateComponent.vue";
import app from "@/feathers-client";
import {User} from "@/views/Users.vue";

class Question {
    constructor(public questionId: number, public questionContent: string,
                public answerId: number, public answerContent: string)
    { }

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

    constructor(id: number, email: string, password: string, firstname: string, lastname: string,
                isGodfather: boolean, isAdmin: boolean, token: string, questions: Question[], rank: number) {
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
    }
}

@Component({
    components: {
        Rating,
        MessageStateComponent,
    }
})
export default class Rankings extends Vue {

    @Prop() user?: User | null;
    @Ref('MessageStateComponent') messageStateComponent!: MessageStateComponent;

    standardMessage = 'Vous pouvez noter les filleuls';

    godsons: Godson[] = [];

    currentIndex = 0;

    async mounted() {
        await this.user?.connect();
        await this.loadUsers();
    }

    async loadUsers() {
        // console.log(await app.service('users').find({ query: { answers: true } } ));
        this.godsons = await app.service('users').find({ query: { answers: true }, $sort: {
                id: 1
            } } );
        // console.log(this.godsons);
        for (const godson of this.godsons) {
            godson.rank = godson.rank ? godson.rank : 1;
        }
    }

    nextPoulain() {
        this.currentIndex = (this.currentIndex + 1) % this.godsons.length;
    }

    previousPoulain() {
        this.currentIndex = this.mod((this.currentIndex - 1), this.godsons.length);
    }

    mod(n: number, m: number) {
        return ((n % m) + m) % m;
    }

    changeRating(rank: number) {
        this.godsons[this.currentIndex].rank = rank;
    }

    async sendVote() {
        if (this.godsons[this.currentIndex]) {
            await this.user?.connect();
            const rang = {
                godsonId: this.godsons[this.currentIndex].id,
                rank: this.godsons[this.currentIndex].rank,
            }
            app.service('rankings').patch(0, rang).then(
                async (data: any) => {
                    //Send check email or smth
                    // console.log(data);
                    this.messageStateComponent.displaySuccess('Le vote a bien été enregistré.');
                    await this.loadUsers();
                }
            ).catch((error: any) => {
                console.log(error);
                this.messageStateComponent.displayError('Le vote n\'a pas pu être pris en compte.');
            });
        }
    }
}
</script>
