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
                <button type="button" class="btn btn-block btn-primary">Ajouter</button>
            </div>
        </form>

        <!-- Ligne séparatrice -->
        <hr class="separator"/>

        <form>
            <div class="form-group">
                <div class="form-row form-row-search">
                    <div class="col-md-3 mb-3 ng-star-inserted">
                        <label class="form-control-label" for="searchByQuestionInput">Recherche par question</label>
                        <input type="text" v-model="searchByQuestion" placeholder="Question"
                               v-bind="filterByQuestion()" id="searchByQuestionInput"
                               class="form-control ng-dirty ng-valid ng-touched"/>
                    </div>
                    <div class="col-md-3 mb-3 ng-star-inserted">
                        <label class="form-control-label" for="searchByAuthorInput">Recherche par auteur</label>
                        <input type="text" v-model="searchByAuthor" placeholder="Auteur"
                               v-bind="filterByAuthor()" id="searchByAuthorInput"
                               class="form-control ng-dirty ng-valid ng-touched"/>
                    </div>
                </div>
            </div>
        </form>
        <!-- Afficher questions existantes -->
        <div class="questionList">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="question in filteredList"
                 :key="question.content">
                <div class="card-body">
                    <div class="pb-4">
                        <div class="icon bg-dark text-white rounded-circle icon-shape shadow">
                            <!--i data-feather="droplet"></i-->?
                        </div>
                    </div>
                    <div class="pt-2 pb-3">
                        <h5>{{ question.author }}</h5>
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
    width: fit-content;
    min-width: 500px;
    margin: auto;
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
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

class Question {
    author: string;
    content: string;

    constructor(author: string, content: string) {
        this.author = author;
        this.content = content;
    }
}

@Component
export default class Questions extends Vue {
    questions = [
        new Question('Yvan', 'Comment tu t\'appelles ?'),
        new Question('Antoine', 'Veux-tu niquer ta mère ?'),
        new Question('Esteban', 'Quel âge as-tu ?'),
    ]

    filteredList: Question[] = [];

    searchByQuestion = '';
    searchByAuthor = '';

    filterByQuestion() {
        this.filteredList = this.questions.filter(post =>
            post.content.toLowerCase().includes(this.searchByQuestion.toLowerCase())
        )
    }

    filterByAuthor() {
        this.filteredList = this.questions.filter(post =>
            post.author.toLowerCase().includes(this.searchByAuthor.toLowerCase())
        )
    }

}
</script>
