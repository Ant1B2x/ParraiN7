<template>
    <div class="questionArea">
        <!-- Afficher questions existantes -->
        <div class="questionList">
            <div class="card hover-translate-y-n10 hover-shadow-lg" v-for="question in questions" :key="question">
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

                    <form>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">¿</span>
                                </div>
                                <textarea type="text" class="form-control" placeholder="Votre réponse"></textarea>
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
    border-top: 1px solid rgba(0,0,0,.1);
    margin-top: 50px;
    margin-bottom: 50px;
}

.questionArea .questionList {
    width: fit-content;
    min-width: 500px;
    margin: auto;
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

@Component
export default class Answers extends Vue {
    questions = [
        {author: 'Yvan', content: 'Comment tu t\'appelles ?'},
        {author: 'Antoine', content: 'Veux-tu niquer ta mère ?'},
        {author: 'Esteban', content: 'Quel âge as-tu ?'},
    ]
}
</script>