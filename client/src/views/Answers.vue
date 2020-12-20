<template>
    <div class="answerArea">
        <div class="text-muted mb-5">Envoie tes meilleures réponses</div>
        <!-- Afficher questions existantes -->
        <div class="questionList">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="(question, index) in questionsWithAnswers" :key="question.id">
                <div class="card-body">
                    <div class="pb-4">
                        <div class="icon bg-dark text-white rounded-circle icon-shape shadow">
                            {{ question.authorInitials }}
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import app from "@/feathers-client";
import {User} from "@/views/Users.vue";
import MessageState from "@/components/MessageState.vue";

export class QuestionWithAnswer {
    id?: number;
    content: string;
    authorId: number;
    authorInitials: string;
    placeholder: string;
    answerId: number;
    answerContent: string;

    constructor(id: number, content: string,  authorId: number, authorInitials: string, placeholder: string, answerId: number, answerContent: string) {
        this.id = id;
        this.content = content;
        this.authorId = authorId;
        this.authorInitials = authorInitials;
        this.placeholder = placeholder;
        this.answerId = answerId;
        this.answerContent = answerContent;
    }
}

@Component
export default class Answers extends Vue {

    @Prop() user?: User;
    @Prop() messageState!: MessageState;

    questionsWithAnswers: QuestionWithAnswer[] = [];
    // Forced to use such methods to render view properly on data change, because view.js needs it.
    answerIds: (number | undefined) [] = [];

    async mounted() {
        await this.getQuestions();
    }

    questionAnswerId(index: number): number | undefined {
        return this.answerIds[index];
    }

    async getQuestions() {
        try {
            const answers = await app.service('questions').find( { query: { answers: true, godsonId: this.user?.id } } );
            this.questionsWithAnswers = [];
            for (const answer of answers) {
                this.questionsWithAnswers.push(new QuestionWithAnswer(answer.id, answer.content,
                    answer.authorId, answer.authorInitials, answer.placeholder, answer.answerId, answer.answerContent))
                this.answerIds.push(answer.answerId);
            }
        } catch (e) {
            // pass
        }
    }

    async reloadQuestion(idQuestion: number) {
        let questionData = await app.service('questions').find( { query: { answers: true, godsonId: this.user?.id, id: idQuestion } } );
        questionData = questionData[0];
        const question = new QuestionWithAnswer(questionData.id, questionData.content, questionData.authorId,
            questionData.authorInitials, questionData.placeholder, questionData.answerId, questionData.answerContent);
        const index = this.questionsWithAnswers.findIndex(question => question.id === idQuestion);
        this.questionsWithAnswers[index] = question;
        this.answerIds[index] = question.answerId;
        this.$set(this.answerIds, index, question.answerId);
    }

    async sendAnswer(questionId: number, answerContent: string) {
        if (answerContent.trim().length > 0) {
            try {
                const answer = {userId: this.user?.id, questionId: questionId, content: answerContent};
                await app.service('answers').create(answer);
                this.messageState.displaySuccess('La réponse a bien été ajoutée.');
                // await this.getQuestions();
                await this.reloadQuestion(answer.questionId);
            } catch (error) {
                if (error.code === 403) {
                    this.messageState.displayError("Vous n'êtes pas un filleul, vous ne pouvez donner de réponses.");
                } else if (error.code === 405) {
                    this.messageState.displayError("Votre compte n'est pas encore validé.");
                } else if (error.code === 408) {
                    this.messageState.displayError("La date d'expiration a été atteinte, impossible de réaliser cette action.");
                } else {
                    this.messageState.displayError("La réponse n'a pas pu être ajoutée.");
                }
            }
        } else
            this.messageState.displayError("Vous ne pouvez envoyer de réponse vide ou uniquement constitué d'espaces.");
    }

    async editAnswer(questionId: number, answerId: number, answerContent: string) {
        try {
            if (answerContent.trim().length > 0) {
                const answer = {content: answerContent};
                await app.service('answers').patch(answerId, answer);
                this.messageState.displaySuccess('La réponse a bien été modifiée.');
            } else {
                await app.service('answers').remove(answerId);
                this.messageState.displaySuccess('La réponse a bien été supprimée.');
            }
            await this.reloadQuestion(questionId);
        } catch (error) {
            if (error.code === 403) {
                this.messageState.displayError("Vous n'êtes pas un filleul, vous ne pouvez modifier des réponses.");
            } else if (error.code === 405) {
                this.messageState.displayError("Votre compte n'est pas encore validé.");
            } else if (error.code === 408) {
                this.messageState.displayError("La date d'expiration a été atteinte, impossible de réaliser cette action.");
            } else {
                this.messageState.displayError("La réponse n'a pas pu être modifiée ou supprimée.");
            }
        }
    }
}
</script>
