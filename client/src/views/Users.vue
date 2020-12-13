<template>
    <div class="userArea">
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

        <MessageStateComponent :standard-message="standardMessage" ref="MessageStateComponent"/>

        <!-- Afficher users existantes -->
        <div class="userInformation" v-if="selectedUser">
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
                    <label class="col-sm-2">Rôles</label>
                    <div class="col-sm-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="isGodfatherCheck" v-model="selectedUser.isGodfather" v-on:change="hasUserChanged">
                            <label class="form-check-label" for="isGodfatherCheck">Parrain</label>
                        </div>
                    </div>
                    <div class="col-sm-1"/>
                    <div class="col-sm-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="isAdminCheck" v-model="selectedUser.isAdmin" v-on:change="hasUserChanged">
                            <label class="form-check-label" for="isAdminCheck">Administrateur</label>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button type="button" class="btn btn-danger" v-on:click="removeUser">Supprimer</button>
                    <button type="button" class="btn btn-warning" :disabled="!userChanged" v-on:click="resetUser">Réinitialiser</button>
                    <button type="button" class="btn btn-primary" :disabled="!userChanged" v-on:click="sendUserModifications">Valider</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import "css/Users.css";
</style>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator';
import app from "@/feathers-client";
import MessageStateComponent from "@/components/MessageStateComponent.vue";

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
}

@Component({
    components: {
        MessageStateComponent,
    }
})
export default class Users extends Vue {

    @Ref('MessageStateComponent') messageStateComponent!: MessageStateComponent;
    standardMessage = 'Modification d\'un utilisateur.';

    users: User[] = []
    usersOriginal: User[] = [];

    selectedUser: User | null | undefined = null;

    userChanged = false;

    async loadUsers() {
        const data = await app.service('users').find();
        this.users = [];
        this.usersOriginal = [];
        for (const user of data) {
            this.users.push(new User(user.id, user.email, user.firstname, user.lastname, user.isGodfather, user.isAdmin));
            this.usersOriginal.push(new User(user.id, user.email, user.firstname, user.lastname, user.isGodfather, user.isAdmin))
        }
    }

    async mounted() {
        await this.loadUsers();
        this.selectedUser = this.users[0];
    }

    hasUserChanged() {
        const originalUser: User = this.usersOriginal.find(user => user.id === this.selectedUser!.id)!;
        this.userChanged = !originalUser.equals(this.selectedUser!);
    }

    resetUser() {
        const resetedUser = JSON.parse(JSON.stringify(this.usersOriginal.find(user => user.id === this.selectedUser?.id)));
        this.users[this.users.indexOf(this.selectedUser!)] = this.selectedUser = resetedUser ? resetedUser : null;
        this.hasUserChanged();
    }

    async removeUser() {
        try {
            await app.service('users').remove(this.selectedUser?.id);
            this.messageStateComponent.displaySuccess('L\'utilmisateur a bien été supprimé.');
            await this.loadUsers();
        } catch (error) {
            console.log(error);
            this.messageStateComponent.displayError('(R1354553) Une erreur est survenue. Contactez l\'administrateur du site.');
        }
    }

    async sendUserModifications() {
        try {
            await app.service('users').patch(this.selectedUser?.id, this.selectedUser);
            await this.loadUsers();
            this.hasUserChanged();
        } catch (error) {
            console.log(error);
        }
    }
}
</script>
