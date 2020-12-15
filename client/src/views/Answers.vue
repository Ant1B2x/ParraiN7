<template>
    <div class="questionArea">
        <MessageStateComponent :standard-message="standardMessage" ref="MessageStateComponent"/>
        <!-- Afficher questions existantes -->
        <div class="questionList">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="(question, index) in questionsWithAnswers" :key="question.id">
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
                            <button type="button" class="btn btn-block btn-primary" v-if="!questionAnswerId(index)"
                                    v-on:click="sendAnswer(question.id, question.answerContent)">Valider</button>
                            <button type="button" class="btn btn-block btn-warning" v-if="questionAnswerId(index)"
                                    v-on:click="editAnswer(question.id, question.answerId, question.answerContent)">Editer</button>
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
    // Forced to use such methods to render view properly on data change, because view.js needs it.
    answerIds: any[] = [];

    async mounted() {
        await this.getQuestions();
    }

    questionAnswerId(index: number): number {
        return this.answerIds[index];
    }

    async getQuestions() {
        try {
            console.log(this.user);
            console.log(this.user?.id);
            const answers = await app.service('questions').find( { query: { answers: true, godsonId: this.user?.id } } );
            // console.log(data);
            this.questionsWithAnswers = [];
            for (const answer of answers) {
                this.questionsWithAnswers.push(new QuestionWithAnswer(answer.id, answer.content,
                    answer.authorId, answer.placeholder, answer.answerId, answer.answerContent))
                this.answerIds.push(answer.answerId);
            }
            console.log(this.questionsWithAnswers);
        } catch (e) {
            console.log(e);
        }
    }

    async reloadQuestion(idQuestion: number) {
        let questionData = await app.service('questions').find( { query: { answers: true, godsonId: this.user?.id, id: idQuestion } } );
        questionData = questionData[0];
        const question = new QuestionWithAnswer(questionData.id, questionData.content, questionData.authorId, questionData.placeholder, questionData.answerId, questionData.answerContent);
        const index = this.questionsWithAnswers.findIndex(question => question.id === idQuestion);
        console.log(idQuestion);
        console.log(index);
        console.log(questionData);
        console.log(question);
        this.questionsWithAnswers[index] = question;
        this.answerIds[index] = question.answerId;
        this.$set(this.answerIds, index, question.answerId)
        console.log(this.questionsWithAnswers);
        console.log(this.answerIds);
    }

    async sendAnswer(questionId: number, answerContent: string) {
        const answer = { userId: this.user?.id, questionId: questionId, content: answerContent };
        console.log(answer);
        try {
            await app.service('answers').create(answer);
            this.messageStateComponent.displaySuccess('La réponse a bien été prise en compte !');
            // await this.getQuestions();
            await this.reloadQuestion(answer.questionId);
        } catch (error) {
            console.log(error);
            if (error.code === 403) {
                this.messageStateComponent.displayError("Vous n'êtes pas un filleul, vous ne pouvez donner de réponses.");
            } else {
                this.messageStateComponent.displayError('Une erreur est survenue.' );
            }
        }
    }

    async editAnswer(questionId: number, answerId: number, answerContent: string) {
        try {
            if (answerContent.length > 0) {
                const answer = {content: answerContent};
                await app.service('answers').patch(answerId, answer);
                this.messageStateComponent.displaySuccess('La réponse a bien été modifiée.');
            } else {
                await app.service('answers').remove(answerId);
                this.messageStateComponent.displaySuccess('La réponse a bien été supprimée.');
            }
            // await this.getQuestions();
            await this.reloadQuestion(questionId);
        } catch (error) {
            console.log(error);
            this.messageStateComponent.displayError('Une erreur est survenue.')
        }
    }
}
</script>
