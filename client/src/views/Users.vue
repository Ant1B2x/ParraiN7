<template>
    <div class="questionArea">
        <form>
            <div class="form-group">
                <label>
                    <select class="custom-select" v-model="selectedUser" :disabled="this.selectedUser && userChanged"
                    :title="userChanged ? 'Vous devez valider les changements' : ''">
                        <option selected disabled>Sélectionnez un utilisateur</option>
                        <option v-for="user in users" :value="user" :key="user.idUser">{{user.firstname}} {{user.lastname}}</option>
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
                        <input type="email" class="form-control" id="inputEmail" v-model="selectedUser.email" @keyup="hasUserChanged">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputFirstname" class="col-sm-2 col-form-label">Prénom</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputFirstname" v-model="selectedUser.firstname" @keyup="hasUserChanged">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputLastname" class="col-sm-2 col-form-label">Nom</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputLastname" v-model="selectedUser.lastname" @keyup="hasUserChanged">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-2">Checkbox</div>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="isGodfatherCheck" v-model="selectedUser.isGodfather" v-on:change="hasUserChanged">
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
                            <input class="form-check-input" type="checkbox" id="isAdminCheck" v-model="selectedUser.isAdmin" v-on:change="hasUserChanged">
                            <label class="form-check-label" for="isAdminCheck">
                                Est admin
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button class="btn btn-warning" :disabled="!userChanged" v-on:click="resetUser">Reset</button>
                    </div>
                    <div class="col-sm-2">
                        <button class="btn btn-primary" :disabled="!userChanged" v-on:click="sendUserModifications">Valider</button>
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
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    isGodfather: boolean;
    isAdmin: boolean;

    constructor(id: number, email: string, firstname: string, lastname: string, isGodFather: boolean, isAdmin: boolean) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isGodfather = isGodFather;
        this.isAdmin = isAdmin;
    }

    equals(user2: User) {
        return this.id === user2.id && this.email === user2.email && this.firstname === user2.firstname
            && this.lastname === user2.lastname && this.isGodfather === user2.isGodfather && this.isAdmin === user2.isAdmin;
    }

    async connect() {
        app.authentication.setAccessToken(JSON.parse(window.localStorage.getItem('user')!).accessToken);
        await app.authenticate();
    }
}

@Component
export default class Users extends Vue {
    users: User[] = []
    usersOriginal: User[] = [];

    selectedUser: User | null = null;

    userChanged = false;

    async loadUsers() {
        app.authentication.setAccessToken(JSON.parse(window.localStorage.getItem('user')!).accessToken);
        await app.authenticate();
        app.service('users').find().then(
            (data: any) => {
                for (const user of data) {
                    this.users.push(new User(user.id, user.email, user.firstname, user.lastname, user.isGodfather, user.isAdmin));
                    this.usersOriginal.push(new User(user.id, user.email, user.firstname, user.lastname, user.isGodfather, user.isAdmin))
                }
                this.selectedUser = this.users[0];
            }
        );
    }

    mounted() {
        this.loadUsers();
    }

    hasUserChanged() {
        const originalUser: User = this.usersOriginal.find(user => user.id === this.selectedUser!.id)!;
        this.userChanged = !originalUser.equals(this.selectedUser!);
    }

    resetUser() {
        this.selectedUser = JSON.parse(JSON.stringify(this.usersOriginal.find(user => user.id === this.selectedUser?.id)));
        this.hasUserChanged();
    }

    async sendUserModifications() {
        await app.service('users').patch(this.selectedUser?.id, this.selectedUser).then(
            (data: any) => {
                this.usersOriginal[this.usersOriginal.findIndex(user => user.id === this.selectedUser?.id)] = this.selectedUser!;
                this.hasUserChanged();
            }
        );
    }
}
</script>
