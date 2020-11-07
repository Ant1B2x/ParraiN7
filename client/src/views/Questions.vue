<template>
    <div class="questionArea">
        <div class="card-body px-md-5 py-5" v-bind:class="[validation.messageState]">
            <p class="text-muted mb-0 alertMessage" role="alert">{{validation.message}}</p>
        </div>
        <form>
            <div class="form-group">
                <label class="form-control-label">Question</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="questionInputPrepend">?</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Votre question"
                           v-model="questionToAdd" @keyup.enter="sendQuestion">
                    <div class="input-group-append">
                        <span class="input-group-text" id="questionInputAppend">¿</span>
                    </div>
                </div>
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="addPlaceholder">
                <label class="custom-control-label" for="customCheck1">Ajouter un placeholder ?</label>
            </div>
            <div class="form-group col-md-8 placeholder" v-if="addPlaceholder">
                <!--label class="form-control-label">Placeholder</label-->
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Votre placeholder"
                           v-model="placeholder" @keyup.enter="sendQuestion">
                </div>
            </div>
            <div class="mt-4">
                <button type="button" class="btn btn-block btn-primary" v-on:click="sendQuestion">Ajouter</button>
            </div>
        </form>

        <!-- Ligne séparatrice -->
        <hr class="separator"/>

        <form>
            <div class="form-group">
                <div class="form-row form-row-search">
                    <div class="col-md-3 mb-3 ng-star-inserted">
                        <label class="form-control-label" for="searchByQuestionInput">Recherche par question</label>
                        <input type="text" placeholder="Question" v-model="searchByQuestion"
                               @keyup="filterByQuestion()" id="searchByQuestionInput"
                               class="form-control ng-dirty ng-valid ng-touched"/>
                    </div>
                    <div class="col-md-3 mb-3 ng-star-inserted">
                        <label class="form-control-label" for="searchByAuthorInput">Recherche par auteur</label>
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
                    <div class="pb-4">
                        <div class="icon bg-dark text-white rounded-circle icon-shape shadow">
                            ?
                        </div>
                    </div>
                    <div class="pt-2 pb-3">
                        <h5>{{ question.author.firstname }} {{question.author.lastname}}</h5>
                        <p class="text-muted mb-0">
                            {{ question.content }}
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
@import "css/Questions.css";
@import "css/MessageState.css";
</style>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import app from '@/feathers-client';
import BACKEND_URL from "@/config";
import {User} from "@/views/Users.vue";
import {MessageState} from "@/views/enum";

export class Question {
    idQuestion: number;
    author: User;
    content: string;
    placeholder?: string;

    constructor(idQuestion: number, author: User, content: string) {
        this.idQuestion = idQuestion;
        this.author = author;
        this.content = content;
    }
}

@Component
export default class Questions extends Vue {

    questions: Question[] = [];
    filteredList: Question[] = [];
    addPlaceholder = true;
    questionToAdd = '';
    placeholder = '';

    @Prop() user!: User;

    private validation = {
        message: 'Ajoutez votre question',
        messageState: MessageState.none,
    }

    async loadQuestions() {
        this.questions = await app.service('questions').find();
        console.log(this.questions);
        this.filteredList = JSON.parse(JSON.stringify(this.questions));
        // console.log('ok',this.questions);
    }

    mounted() {
        this.loadQuestions();
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
            post.author.firstname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(this.searchByAuthor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            || post.author.lastname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(this.searchByAuthor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        )
    }

    async sendQuestion() {
        if (this.addPlaceholder && (this.placeholder === '' || !this.placeholder)) {
            this.validation.messageState = MessageState.hasWarning;
            this.validation.message = 'Attention, placeholder non précisé.';
        } else {
            await this.user.connect();
            const question = {
                content: this.questionToAdd,
                placeholder: this.addPlaceholder ? this.placeholder : null
            }
            app.service('questions').create(question).then(
                (data: any) => {
                    //Send check email or smth
                    console.log(data);
                    this.questionAdded();
                }
            ).catch((error: any) => {
                console.log(error);
                this.validation.message = 'La question n\'a pas pu être ajoutée.';
                this.validation.messageState = MessageState.hasError;
            });
        }
    }

    questionAdded() {
        this.validation.messageState = MessageState.hasSucceed;
        this.validation.message = 'La question a bien été ajoutée !';
        setTimeout(() => {
            this.validation.messageState = MessageState.none;
            this.validation.message = 'Ajoutez votre question';
        }, 3000);
    }

}
</script>
