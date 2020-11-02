<template>
    <div class="questionArea">
        <form>
            <div class="form-group">
                <label>
                    <select class="custom-select" v-model="selectedPoulain">
                        <option selected disabled>Choisissez un poulain</option>
                        <option v-for="poulain in poulains" :value="poulain" :key="poulain.idUser">{{poulain.name}}</option>
                    </select>
                </label>
            </div>
            <div class="mt-4 arrows">
                <font-awesome-icon icon="arrow-alt-circle-left" :style="{ color: '#008aff' }" size="4x" v-on:click="nextPoulain()"/>

                <font-awesome-icon icon="arrow-alt-circle-right" :style="{ color: '#008aff' }" size="4x" v-on:click="nextPoulain()"/>
            </div>
        </form>

        <!-- Ligne séparatrice -->
        <hr class="separator"/>

        <div v-if="selectedPoulain">
            <h2 style="color: #152c5b;">{{selectedPoulain.name}}</h2>
            <Rating :grade="selectedPoulain.rank" :maxStars="5" :hasCounter="true" @updatedStars="changeRating"/>
        </div>

        <!-- Afficher questions existantes -->
        <div class="questionList" v-if="selectedPoulain">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="answer in selectedPoulain.answers"
                 :key="answer.question.idQuestion">
                <div class="card-body">
                    <div class="pb-4">
                        <div class="icon bg-dark text-white rounded-circle icon-shape shadow">
                            <!--i data-feather="droplet"></i-->?
                        </div>
                    </div>
                    <div class="pt-2 pb-3">
                        <h5>{{ answer.question.content }}</h5>
                        <p class="text-muted mb-0">
                            {{ answer.content }}
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
import {Component, Vue} from 'vue-property-decorator';
import {Answer} from "@/views/Answers.vue";
import {Question} from "@/views/Questions.vue";
import Rating from "@/components/Rating.vue"

export class Poulain {
    idUser: number;
    name: string;
    rank: number;
    answers: Answer[];

    constructor(idQuestion: number, name: string, rank: number, answers: Answer[]) {
        this.idUser = idQuestion;
        this.name = name;
        this.rank = rank;
        this.answers = answers;
    }
}

@Component({
    components: {
        Rating
    }
})
export default class Rankins extends Vue {
    poulains: Poulain[] = []

    selectedPoulain: Poulain = this.poulains[0];

    nextPoulain() {
        this.selectedPoulain = this.poulains[(this.poulains.indexOf(this.selectedPoulain) + 1) % this.poulains.length];
    }

    previousPoulain() {
        this.selectedPoulain = this.poulains[this.mod(this.poulains.indexOf(this.selectedPoulain) - 1, this.poulains.length)];
    }

    mod(n: number, m: number) {
        return ((n % m) + m) % m;
    }

    changeRating(e: number) {
        this.selectedPoulain.rank = e;
    }
}
</script>
