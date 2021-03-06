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

        <div class="text-muted">Modification d'un utilisateur, vous modifier vous-même vous déconnectera</div>

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
                        <div class="custom-control custom-checkbox">
                            <input class="custom-control-input" type="checkbox" id="isGodfatherCheck" v-model="selectedUser.isGodfather" v-on:change="hasUserChanged"/>
                            <label class="custom-control-label" for="isGodfatherCheck">Parrain</label>
                        </div>
                    </div>
                    <div class="col-sm-1"/>
                    <div class="col-sm-2">
                        <div class="custom-control custom-checkbox">
                            <input class="custom-control-input" type="checkbox" id="isAdminCheck" v-model="selectedUser.isAdmin" v-on:change="hasUserChanged"/>
                            <label class="custom-control-label" for="isAdminCheck">Administrateur</label>
                        </div>
                    </div>
                </div>
                <div class="buttons mt-5">
                    <button type="button" class="btn btn-danger" v-if="this.user.id !== this.selectedUser.id" v-on:click="removeUser">Supprimer</button>
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import app from "@/feathers-client";
import MessageState from "@/components/MessageState.vue";

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

@Component
export default class Users extends Vue {

    @Prop() user?: User | null;
    @Prop() messageState!: MessageState;

    private users: User[] = [];
    private usersOriginal: User[] = [];

    private selectedUser: User | null | undefined = null;

    private userChanged = false;

    async loadUsers() {
        const data = await app.service('users').find({query: {$sort: {id: 1}}}); // sort users by id
        this.users = [];
        this.usersOriginal = [];
        for (const user of data) {
            this.users.push(new User(user.id, user.email, user.firstname, user.lastname, user.isGodfather, user.isAdmin));
            this.usersOriginal.push(new User(user.id, user.email, user.firstname, user.lastname, user.isGodfather, user.isAdmin));
        }
    }

    // reload selected user with modifications
    reloadSelectedUser() {
        if (this.selectedUser)
            this.selectedUser = this.users.find(user => user.id === this.selectedUser?.id);
    }

    async mounted() {
        await this.loadUsers();
        this.selectedUser = this.users[0];
    }

    hasUserChanged() {
        const originalUser: User | undefined = this.usersOriginal.find(user => user.id === this.selectedUser?.id);
        if (originalUser && this.selectedUser)
            this.userChanged = !originalUser.equals(this.selectedUser);
    }

    resetUser() {
        if (this.selectedUser) {
            const userToReset = JSON.parse(JSON.stringify(this.usersOriginal.find(user => user.id === this.selectedUser?.id)));
            this.users[this.users.indexOf(this.selectedUser)] = this.selectedUser = userToReset ? userToReset : null;
            this.hasUserChanged();
        }
    }

    async removeUser() {
        try {
            await app.service('users').remove(this.selectedUser?.id);
            this.messageState.displaySuccess("L'utilisateur a bien été supprimé.");
            await this.loadUsers();
            this.selectedUser = this.users[0];
        } catch (error) {
            if (error.code === 405) {
                this.messageState.displayError("Votre compte n'est pas encore validé.");
            } else
                this.messageState.displayError("Une erreur est survenue. Contactez l'administrateur du site.");
        }
    }

    async sendUserModifications() {
        try {
            await app.service('users').patch(this.selectedUser?.id, this.selectedUser);

            // deconnect user if he modified himself
            if (this.user?.id === this.selectedUser?.id)
                this.$emit('signalLogOut');

            await this.loadUsers();
            this.reloadSelectedUser();
            this.hasUserChanged();
        } catch (error) {
            if (error.code === 405) {
                this.messageState.displayError("Votre compte n'est pas encore validé.");
            } else
                this.messageState.displayError("Une erreur est survenue. Contactez l'administrateur du site.");
        }
    }
}

</script>
