<template>
    <div id="app" class="master-class">
        <header>
            <Header :user="this.user" @signalLogOut="logOut"/>
        </header>
        <router-view :user="this.user" class="content"/>
        <footer>
            <Footer/>
        </footer>
    </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import app from "@/feathers-client";
import {Component, Vue} from "vue-property-decorator";
import {User} from "@/views/Users.vue";

@Component({
    components: {
        Header,
        Footer
    }
})
export default class App extends Vue  {

    user: User | null = null;

    private async beforeCreate() {
        try {
            const auth = await app.reAuthenticate();
            this.user = auth.user;
            console.log(this.user);
        } catch (error) {
            console.log(error);
            // pass
        }
    }

    private async beforeUpdate() {
        try {
            const auth = await app.get('authentication');
            this.user = auth ? auth.user : null;
        } catch (error) {
            console.log(error);
            this.user = null;
        }
    }

    public logOut = async () => {
        try {
            await app.logout();
            this.$forceUpdate();
            if(this.$router.currentRoute.path !== '/')
                await this.$router.replace('/');
        } catch (error) {
            console.log(error);
            // pass
        }
    }

}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.master-class {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
}

.content {
    flex-grow: 1; /* 4 */
}
</style>
