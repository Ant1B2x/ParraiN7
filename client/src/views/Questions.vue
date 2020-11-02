<template>
    <div class="questionArea">
        <form>
            <div class="form-group">
                <label class="form-control-label">Question</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">?</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Votre question">
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">¿</span>
                    </div>
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
                            <!--i data-feather="droplet"></i-->?
                        </div>
                    </div>
                    <div class="pt-2 pb-3">
                        <h5>{{ question.firstname }} {{question.lastname}}</h5>
                        <p class="text-muted mb-0">
                            {{ question.content }}
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
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import app from '@/feathers-client';
import BACKEND_URL from "@/config";

export class Question {
    idQuestion: number;
    firstname: string;
    lastname: string;
    content: string;

    constructor(idQuestion: number, firstname: string, lastname: string, content: string) {
        this.idQuestion = idQuestion;
        this.firstname = firstname;
        this.lastname = lastname;
        this.content = content;
    }
}

@Component
export default class Questions extends Vue {
    
    questions: Question[] = [];
    filteredList: Question[] = [];

    async sendQuestion() {
        console.log(app.service('questions').find());
        await fetch('http://' + BACKEND_URL + '/questions-with-authors')
            .then(response => response.json())
            .then(result => {
                this.questions = result;
                this.filteredList = this.questions;
            });
    }    
    
    mounted() {
        this.sendQuestion();
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
            post.firstname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(this.searchByAuthor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            || post.lastname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(this.searchByAuthor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        )
    }

}
</script>
