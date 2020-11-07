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

        <div class="card-body px-md-5 py-5" v-bind:class="[validation.messageState]">
            <p class="text-muted mb-0 alertMessage" role="alert">{{validation.message}}</p>
        </div>

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
import {Component, Vue, Prop} from 'vue-property-decorator';
import {Answer} from "@/views/Answers.vue";
import {Question} from "@/views/Questions.vue";
import Rating from "@/components/Rating.vue"
import {MessageState} from "@/views/enum";
import app from "@/feathers-client";
import {User} from "@/views/Users.vue";

export class Poulain {
    idUser: number;
    name: string;
    rank: number;
    answers: Answer[];

    constructor(idUser: number, name: string, rank: number, answers: Answer[]) {
        this.idUser = idUser;
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

    @Prop() user!: User;

    private user1 = new User(1, 'yvan.leduc@etu.toulouse-inp.fr', 'Yvan', 'Le Duc', true, true);
    private user2 = new User(1, 'antoine.bedex@etu.toulouse-inp.fr', 'Antoine', 'Bédex', true, true);
    private user3 = new User(1, 'esteban.baichoo@etu.toulouse-inp.fr', 'Esteban', 'Baichoo', true, true);

    private question1 = new Question(1, this.user1, 'Comment tu t\'appelles ?');
    private question2 = new Question(2, this.user2, 'Veux-tu niquer ta mère ?');
    private question3 = new Question(3, this.user3, 'Quel âge as-tu ?');

    poulains: Poulain[] = [
        new Poulain(1,
            'Moi',
            1,
            [
                new Answer('Moi', '', this.question1, 'Je suis moi, et toi ?'),
                new Answer('Moi', '', this.question2, 'Lui veux bien, mais il n\'est pas là.'),
                new Answer('Moi', '', this.question3, 'Devinnes combien de mois j\'ai.'),
            ]
        ),
        new Poulain(2,
            'Toi',
            2,
            [
                new Answer('Toi', '', this.question1, 'Eh bien je suis toi ! Comment ça va ?'),
                new Answer('Toi', '', this.question2, 'Ne demande pas, ça ...'),
                new Answer('Toi', '', this.question3, 'Autant que jour que de tuiles sur mon toit.'),
            ]
        ),
        new Poulain(3,
            'Ça',
            3,
            [
                new Answer('Ça', '', this.question1, 'Eh bien, je vais bien, merci de demander.'),
                new Answer('Ça', '', this.question2, 'Toi, tu veux ?'),
                new Answer('Ça', '', this.question3, 'Auntant que toi moins moi.'),
            ]
        ),
    ]

    private validation = {
        message: 'Vote du poulain',
        messageState: MessageState.none,
    }

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

    changeRating(rank: number) {
        this.selectedPoulain.rank = rank;
    }

    async sendVote() {
        await this.user.connect();
        const rang = {
            godsonId: this.selectedPoulain.idUser,
            rank: this.selectedPoulain.rank,
        }
        app.service('rank').patch(rang).then(
            (data: any) => {
                //Send check email or smth
                console.log(data);
                this.rateChanged();
            }
        ).catch((error: any) => {
            console.log(error);
            this.validation.message = 'La question n\'a pas pu être ajoutée.';
            this.validation.messageState = MessageState.hasError;
        });
    }

    rateChanged() {
        this.validation.messageState = MessageState.hasSucceed;
        this.validation.message = 'Le vote a bien été modifié !';
        setTimeout(() => {
            this.validation.messageState = MessageState.none;
            this.validation.message = 'Votez pour chaque filleul.';
        }, 3000);
    }
}
</script>
