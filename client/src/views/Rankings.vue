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
            <div class="mt-4">
                <button type="button" class="btn btn-block btn-primary" v-on:click="nextPoulain()">Next</button>
            </div>
            <div class="mt-4">
                <button type="button" class="btn btn-block btn-primary" v-on:click="previousPoulain()">Précédent</button>
            </div>
        </form>

        <!-- Ligne séparatrice -->
        <hr class="separator"/>

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
.questionArea {
    margin: auto;
    width: 80%;
    max-width: 1024px;
    display: flex;
    flex-flow: column;
}

.questionArea form {
    margin: auto;
    width: 80%;
}

.questionArea form button {
    float: right;
    max-width: 150px;
}

.questionArea .separator {
    width: 100%;
    background-color: lightgrey;
    border-top: 1px solid rgba(0, 0, 0, .1);
    margin-top: 50px;
    margin-bottom: 50px;
}

.questionArea .questionList {
    min-width: 500px;
    margin: auto;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}

.questionArea .questionList .card {
    width: 49%;
}

.questionArea .form-row-search {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

}

.questionArea .card .pb-4 {
    padding-bottom: unset !important;
}

.questionArea .card .pt-2 h5 {
    padding-bottom: 1.5rem !important
}

@media (max-width: 600px) {
    .questionArea .questionList {
        min-width: unset;
    }
    .questionArea .questionList .card {
        width: 100%;
        max-width: 500px;
    }
}
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Answer} from "@/views/Answers.vue";
import {Question} from "@/views/Questions.vue";

export class Poulain {
    idUser: number;
    name: string;
    answers: Answer[];

    constructor(idQuestion: number, name: string, answers: Answer[]) {
        this.idUser = idQuestion;
        this.name = name;
        this.answers = answers;
    }
}

@Component
export default class Rankins extends Vue {
    poulains = [
        new Poulain(1,
            'Moi',
            [
                new Answer('Moi', new Question(1, 'Yvan', 'Comment tu t\'appelles ?'), 'Je suis moi, et toi ?'),
                new Answer('Moi', new Question(2, 'Antoine', 'Veux-tu niquer ta mère ?'), 'Lui veux bien, mais il n\'est pas là.'),
                new Answer('Moi', new Question(3, 'Esteban', 'Quel âge as-tu ?'), 'Devinnes combien de mois j\'ai.'),
            ]
        ),
        new Poulain(2,
            'Toi',
            [
                new Answer('Toi', new Question(1, 'Yvan', 'Comment tu t\'appelles ?'), 'Eh bien je suis toi ! Commennt ça va ?'),
                new Answer('Toi', new Question(2, 'Antoine', 'Veux-tu niquer ta mère ?'), 'Ne demande pas, ça ...'),
                new Answer('Toi', new Question(3, 'Esteban', 'Quel âge as-tu ?'), 'Autant que jour que de tuiles sur mon toit.'),
            ]
        ),
        new Poulain(3,
            'Ça',
            [
                new Answer('Ça', new Question(1, 'Yvan', 'Comment tu t\'appelles ?'), 'Eh bien, je vais bien, merci de demander.'),
                new Answer('Ça', new Question(2, 'Antoine', 'Veux-tu niquer ta mère ?'), 'Toi, tu veux ?'),
                new Answer('Ça', new Question(3, 'Esteban', 'Quel âge as-tu ?'), 'Auntant que toi moins moi.'),
            ]
        ),
    ]

    selectedPoulain: Poulain = this.poulains[0];

    nextPoulain() {
        console.log(this.poulains.indexOf(this.selectedPoulain));
        this.selectedPoulain = this.poulains[(this.poulains.indexOf(this.selectedPoulain) + 1) % this.poulains.length];
        console.log(this.poulains.indexOf(this.selectedPoulain));
    }

    previousPoulain() {
        console.log(this.poulains.indexOf(this.selectedPoulain));
        this.selectedPoulain = this.poulains[(this.poulains.indexOf(this.selectedPoulain) - 1) % this.poulains.length];
        console.log(this.poulains.indexOf(this.selectedPoulain));
    }
}
</script>
