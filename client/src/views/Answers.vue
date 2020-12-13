<template>
    <div class="questionArea">
        <MessageStateComponent :standard-message="standardMessage" ref="MessageStateComponent"/>
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
                        <p class="text-muted mb-0">
                            {{ question.content }}
                        </p>
                    </div>

                    <form>
                        <div class="form-group">
                            <div class="input-group">
                                <textarea type="text" class="form-control" :placeholder="question.placeholder"
                                v-model="question.answerContent"></textarea>
                            </div>
                        </div>
                        <div class="mt-4">
                            <button type="button" class="btn btn-block btn-primary" v-if="!question.answerId" v-on:click="sendAnswer(question.id, question.answerContent)">Valider</button>
                            <button type="button" class="btn btn-block btn-warning" v-if="question.answerId" v-on:click="editAnswer(question.answerId, question.answerContent)">Editer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "css/Answers.css";
</style>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import app from "@/feathers-client";
import {User} from "@/views/Users.vue";
import MessageStateComponent from "@/components/MessageStateComponent.vue";

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

@Component({
    components: {
        MessageStateComponent
    }
})
export default class Answers extends Vue {

    @Prop() user?: User;
    @Ref('MessageStateComponent') messageStateComponent!: MessageStateComponent;

    standardMessage = 'Veuillez répondre aux questions.';

    questionsWithAnswers: QuestionWithAnswer[] = [];

    async mounted() {
        await this.getQuestions();
    }

    async getQuestions() {
        try {
            await app.service('questions').find( { query: { answers: true, godsonId: this.user?.id } } ).then(
                (data: any) => {
                    // console.log(data);
                    this.questionsWithAnswers = [];
                    for (const answer of data) {
                        this.questionsWithAnswers.push(new QuestionWithAnswer(answer.id, answer.content,
                            answer.authorId, answer.placeholder, answer.answerId, answer.answerContent))
                    }
                    console.log(this.questionsWithAnswers);
                }
            );
        } catch (e) {
            console.log(e);
        }
    }

    async sendAnswer(questionId: number, answerContent: string) {
        const answer = { userId: this.user?.id, questionId: questionId, content: answerContent };
        console.log(answer);
        try {
            await app.service('answers').create(answer);
            this.messageStateComponent.displaySuccess('La réponse a bien été prise en compte !');
            await this.getQuestions();
        } catch (error) {
            if (error.code === 403) {
                this.messageStateComponent.displayError("Vous n'êtes pas un filleul, vous ne pouvez donner de réponses.");
            } else {
                this.messageStateComponent.displayError('Une erreur est survenue.' );
            }
        }
    }

    async editAnswer(questionId: number, answerContent: string) {
        try {
            const answer = { content: answerContent };
            await app.service('answers').patch(questionId, answer);
            this.messageStateComponent.displaySuccess('La réponse a bien été modifiée.');
            await this.getQuestions();
        } catch (error) {
            console.log(error);
            this.messageStateComponent.displayError('Une erreur est survenue.')
        }
    }
}
</script>
