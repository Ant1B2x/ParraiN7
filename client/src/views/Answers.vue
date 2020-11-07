<template>
    <div class="questionArea">
        <!-- Afficher questions existantes -->
        <div class="questionList">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="answer in answers" :key="answer.question.idQuestion">
                <div class="card-body">
                    <div class="pb-4">
                        <div class="icon bg-dark text-white rounded-circle icon-shape shadow">
                            <!--i data-feather="droplet"></i-->?
                        </div>
                    </div>
                    <div class="pt-2 pb-3">
                        <h5>{{ /*answer.question.author*/ }} ¿?¿ </h5>
                        <p class="text-muted mb-0">
                            {{ answer.question.content }}
                        </p>
                    </div>

                    <form>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">¿</span>
                                </div>
                                <textarea type="text" class="form-control" :placeholder="answer.question.placeholder"
                                v-model="answer.content"></textarea>
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2">?</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <button type="button" class="btn btn-block btn-primary">Valider</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*@import "public/assets/css/quick-website.css";*/
@import "css/Answers.css";
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Question} from "@/views/Questions.vue";
import app from "@/feathers-client";
import BACKEND_URL from "@/config";
import {User} from "@/views/Users.vue";

export class Answer {
    idAnswer?: number;
    firstname: string;
    lastname: string;
    question: Question;
    content: string;

    constructor(firstname: string, lastname: string,  question: Question, content: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.question = question;
        this.content = content;
    }
}

@Component
export default class Answers extends Vue {
    answers: Answer[] = [];

    async sendQuestion() {
        try {
            await app.service('answers').find( { query: { userId: 10 } } ).then(
                (data: any) => {
                    console.log(data);
                    for (const answer of data) {
                        const authorQuestion = new User(answer.question.author.id, answer.question.author.email,
                            answer.question.author.firstname, answer.question.author.lastname,
                            answer.question.author.isGodfather, answer.question.author.isAdmin);
                        this.answers.push(new Answer(answer.firstname, answer.lastname,
                            new Question(answer.question.id, authorQuestion, answer.question.content),
                            answer.content))
                    }
                }
            );
        } catch (e) {
            console.log(e);
        }
    }

    mounted() {
        this.sendQuestion();
    }
}
</script>
