<template>
    <div class="questionArea">
        <!-- Afficher questions existantes -->
        <div class="questionList">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="question in questionsWithAnswers" :key="question.id">
                <div class="card-body">
                    <div class="pb-4">
                        <div class="icon bg-dark text-white rounded-circle icon-shape shadow">
                            <!--i data-feather="droplet"></i-->?
                        </div>
                    </div>
                    <div class="pt-2 pb-3">
                        <h5>{{ /*answer.question.author*/ }} ¿?¿ </h5>
                        <p class="text-muted mb-0">
                            {{ question.content }}
                        </p>
                    </div>

                    <form>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">¿</span>
                                </div>
                                <textarea type="text" class="form-control" :placeholder="question.placeholder"
                                v-model="question.answerContent"></textarea>
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import app from "@/feathers-client";
import {User} from "@/views/Users.vue";

export class QuestionWithAnswer {
    id?: number;
    content: string;
    authorId: number;
    placeholder: string;
    answerId: number;
    answerContent: string;

    constructor(id: number, content: string,  authorId: number, placeholder: string, answerId: number, answerContent: string) {
        this.id = id;
        this.content = content;
        this.authorId = authorId;
        this.placeholder = placeholder;
        this.answerId = answerId;
        this.answerContent = answerContent;
    }
}

@Component
export default class Answers extends Vue {

    @Prop() user?: User;

    questionsWithAnswers: QuestionWithAnswer[] = [];

    async sendQuestion() {
        try {
            await app.service('questions').find( { query: { answers: true, godsonId: this.user?.id } } ).then(
                (data: any) => {
                    // console.log(data);
                    for (const answer of data) {
                        this.questionsWithAnswers.push(new QuestionWithAnswer(answer.id, answer.content,
                            answer.authorId, answer.placeholder, answer.answerId, answer.answerContent))
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
