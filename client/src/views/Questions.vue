<template>
    <div class="questionArea">
        <div class="text-muted mb-5">Envoie tes meilleures questions</div>
        <form>
            <div class="form-group">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Votre question"
                           v-model="questionToAdd" @keyup.enter="sendQuestion">
                    <div class="input-group-append">
                        <span class="input-group-text" id="questionInputAppend">?</span>
                    </div>
                </div>
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="placeholderCheck" v-model="addPlaceholder"/>
                <label class="custom-control-label text-muted" for="placeholderCheck">Ajouter un placeholder ?</label>
            </div>
            <div class="form-group col-md-8 placeholder" v-if="addPlaceholder">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Votre placeholder"
                           v-model="placeholder" @keyup.enter="sendQuestion"/>
                </div>
            </div>
            <button type="button" class="btn btn-block btn-primary mt-5" v-on:click="sendQuestion">Ajouter</button>

        </form>
        <!-- Ligne séparatrice -->
        <hr/>
        <form>
            <div class="form-group">
                <label class="form-control-label" for="searchByQuestionInput">Recherche par :</label>
                <div class="form-row form-row-search">
                    <div class="col-md-3 mb-3 ng-star-inserted">
                        <input type="text" placeholder="Question" v-model="searchByQuestion"
                               @keyup="filterByQuestion()" id="searchByQuestionInput"
                               class="form-control ng-dirty ng-valid ng-touched"/>
                    </div>
                    <div class="col-md-3 mb-3 ng-star-inserted">
                        <input type="text" placeholder="Auteur" v-model="searchByAuthor"
                               @keyup="filterByAuthor()" id="searchByAuthorInput"
                               class="form-control ng-dirty ng-valid ng-touched"/>
                    </div>
                </div>
            </div>
        </form>
        <!-- Afficher questions existantes -->
        <div class="questionList" v-if="questions">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="question in filteredList"
                 :key="question.idQuestion">
                <div class="card-body">
                    <button v-if="isAuthorOrAdmin(question.authorId)" @click="removeQuestion(question)" type="button"
                            class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="pb-4">
                        <div class="icon bg-dark text-white rounded-circle icon-shape shadow">
                            {{ question.authorInitials }}
                        </div>
                    </div>
                    <div class="pt-2 pb-3">
                        <h5>{{ question.authorFirstname }} {{ question.authorLastname }}</h5>
                        <p class="text-muted mb-0">
                            {{ question.content }}
                        </p>
                        <textarea class="form-control" v-model="question.content"
                                  v-if="questionIsBeingEdited(question.id)"></textarea>
                        <p class="text-muted mb-0" v-if="question.placeholder">
                            ({{ question.placeholder }})
                        </p>
                    </div>
                    <button type="button" class="btn btn-warning"
                            v-if="isAuthorOrAdmin(question.authorId) && !questionIsBeingEdited(question.id)"
                            v-on:click="editQuestion(question.id)">Éditer
                    </button>
                    <button type="button" class="btn btn-success" v-if="questionIsBeingEdited(question.id)"
                            v-on:click="sendQuestionModified(question)">Valider
                    </button>
                </div>
            </div>
        </div>
        <MessageState ref="MessageState"/>
    </div>
</template>

<style scoped>
@import "css/Questions.css";
</style>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import app from '@/feathers-client';
import {User} from '@/views/Users.vue';
import MessageState from '@/components/MessageState.vue';

export class Question {
    id: number;
    authorFirstname: string;
    authorLastname: string;
    authorId: number;
    authorInitials: string;
    content: string;
    placeholder?: string;

    constructor(id: number, authorFirstname: string, authorLastname: string, authorId: number, authorInitials: string, content: string, placeholder: string) {
        this.id = id;
        this.authorFirstname = authorFirstname;
        this.authorLastname = authorLastname;
        this.authorId = authorId;
        this.authorInitials = authorInitials;
        this.content = content;
        this.placeholder = placeholder;
    }
}

@Component({
    components: {
        MessageState
    }
})
export default class Questions extends Vue {

    questions: Question[] = [];
    filteredList: Question[] = [];
    addPlaceholder = false;
    questionToAdd = '';
    placeholder = '';
    inEdition = false;
    idEditedQuestion: number | undefined;

    @Prop() user?: User | null;
    @Ref('MessageState') messageState!: MessageState;

    async mounted() {
        await this.loadQuestions();
    }

    async loadQuestions() {
        this.questions = await app.service('questions').find({
            query: {
                $sort: {
                    id: 1
                }
            }
        });
        this.filteredList = JSON.parse(JSON.stringify(this.questions)) as Question[];
    }

    searchByQuestion = '';
    searchByAuthor = '';

    filterByQuestion() {
        this.filteredList = this.questions;
        this.filteredList = this.questions.filter(post =>
            post.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(this.searchByQuestion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        )
    }

    filterByAuthor() {
        this.filteredList = this.questions;
        this.filteredList = this.questions.filter(post =>
            post.authorFirstname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(this.searchByAuthor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            || post.authorLastname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(this.searchByAuthor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        )
    }

    async sendQuestion() {
        if (this.questionToAdd.trim().length < 5) {
            this.messageState.displayWarning('Votre question est trop courte.');
        } else if (this.questionToAdd.length > 255) {
            this.messageState.displayWarning('Votre question est trop longue.');
        } else if (this.addPlaceholder && (this.placeholder === '' || !this.placeholder)) {
            this.messageState.displayWarning('Attention, placeholder non précisé.');
        } else {
            const question = {
                content: this.questionToAdd,
                placeholder: this.addPlaceholder ? this.placeholder : null
            };
            try {
                await app.service('questions').create(question);
                this.messageState.displaySuccess('La question a bien été ajoutée.');
                await this.loadQuestions();
            } catch (error) {
                if (error.code === 408) {
                    this.messageState.displayError("La date d'expiration a été atteinte, impossible de réaliser cette action.");
                } else if (error.code === 405) {
                    this.messageState.displayError("Votre compte n'est pas encore validé.");
                } else {
                    this.messageState.displayError("La question n'a pas pu être ajoutée.");
                }
            }
        }
    }

    async sendQuestionModified(question: Question) {
        if (this.questionToAdd.length > 255) {
            this.messageState.displayWarning('Votre question est trop longue.');
            return;
        }

        if (question.content.trim().length > 0) {
            try {
                const questionToModify = {
                    content: question.content,
                    placeholder: question.placeholder
                }
                await app.service('questions').patch(question.id, questionToModify);
                this.messageState.displaySuccess('La question a bien été modifiée.');
                this.inEdition = false;
                this.idEditedQuestion = undefined;
                await this.loadQuestions();
            } catch (error) {
                if (error.code === 408) {
                    this.messageState.displayError("La date d'expiration a été atteinte, impossible de réaliser cette action.");
                } else if (error.code === 405) {
                    this.messageState.displayError("Votre compte n'est pas encore validé.");
                } else {
                    this.messageState.displayError("La question n'a pas pu être modifiée.");
                }
            }
        } else {
            await this.removeQuestion(question);
        }
    }

    async removeQuestion(question: Question) {
        try {
            await app.service('questions').remove(question.id);
            this.messageState.displaySuccess('La question a bien été supprimée.');
            this.inEdition = false;
            this.idEditedQuestion = undefined;
            await this.loadQuestions();
        } catch (error) {
            if (error.code === 408) {
                this.messageState.displayError("La date d'expiration a été atteinte, impossible de réaliser cette action.");
            } else if (error.code === 405) {
                this.messageState.displayError("Votre compte n'est pas encore validé.");
            } else {
                this.messageState.displayError("La question n'a pas pu être supprimée.");
            }
        }
    }

    isAuthorOrAdmin(idAuthor: number) {
        return this.user?.id === idAuthor || this.user?.isAdmin;
    }

    editQuestion(idQuestion: number) {
        this.inEdition = true;
        this.idEditedQuestion = idQuestion;
    }

    questionIsBeingEdited(idQuestion: number) {
        return this.inEdition && this.idEditedQuestion === idQuestion;
    }

}
</script>
