<template>
    <div class="questionArea">
        <form>
            <div class="form-group">
                <label>
                    <select class="custom-select" v-model="selectedUser" :disabled="userChanged"
                    :title="userChanged ? 'Vous devez valider les changements' : ''">
                        <option selected disabled>Sélectionnez un utilisateur</option>
                        <option v-for="user in users" :value="user" :key="user.idUser">{{user.name}}</option>
                    </select>
                </label>
            </div>
        </form>

        <!-- Ligne séparatrice -->
        <hr class="separator"/>

        <!-- Afficher users existantes -->
        <div class="questionList" v-if="selectedUser">
            <form>
                <div class="form-group row">
                    <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputEmail" v-model="selectedUser.email">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputFirstname" class="col-sm-2 col-form-label">Prénom</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputFirstname" v-model="selectedUser.firstname">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputLastname" class="col-sm-2 col-form-label">Nom</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputLastname" v-model="selectedUser.lastname">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-2">Checkbox</div>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="isGodfatherCheck" v-model="selectedUser.isGodfather">
                            <label class="form-check-label" for="isGodfatherCheck">
                                Est parrain
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-2">Checkbox</div>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="isAdminCheck" v-model="selectedUser.isAdmin">
                            <label class="form-check-label" for="isAdminCheck">
                                Est admin
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary" :disabled="userChanged" v-on:click="resetUser">Reset</button>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary" :disabled="!userChanged" v-on:click="sendUserModifications">Valider</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
/*@import "public/assets/css/quick-website.css";*/
@import "css/Rankings.css";
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import app from "@/feathers-client";

export class User {
    idUser: number;
    email: string;
    firstname: string;
    lastname: string;
    isGodfather: boolean;
    isAdmin: boolean;

    constructor(idUser: number, email: string, firstname: string, lastname: string, isGodFather: boolean, isAdmin: boolean) {
        this.idUser = idUser;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isGodfather = isGodFather;
        this.isAdmin = isAdmin;
    }
}

@Component
export default class Rankins extends Vue {
    users: User[] = []
    usersOriginal: User[] = [];

    selectedUser: User | null = null;

    async loadUsers() {
        console.log(window.localStorage);
        console.log(window.localStorage.getItem('jwt'));
        console.log(window.localStorage.getItem('FeathersJS'));
        await app.reAuthenticate();
        console.log(app.service('users').populateHeader().find({headers: { 'X-Requested-With': 'FeathersJS' }}));
        this.users = await app.service('users').find();
        this.usersOriginal = JSON.parse(JSON.stringify(this.users));
    }

    mounted() {
        this.loadUsers();
    }

    userChanged() {
        return JSON.parse(JSON.stringify(this.selectedUser)) !==
            JSON.parse(JSON.stringify(this.usersOriginal.find(user => user.idUser === this.selectedUser!.idUser)));
    }

    resetUser() {
        this.selectedUser = JSON.parse(JSON.stringify(this.usersOriginal.find(user => user.idUser === this.selectedUser!.idUser)));
    }

    async sendUserModifications() {
        await app.service('users').post(this.selectedUser).then(
            (data: any) => {
                this.usersOriginal[this.usersOriginal.findIndex(user => user.idUser === this.selectedUser!.idUser)] = this.selectedUser!;
            }
        );
    }
}
</script>
