<template>
    <div id="app" class="masterClass">
        <header>
            <Header :user="this.user" @signalLogOut="logOut"/>
        </header>
        <router-view :user="this.user" class="content"/>
        <footer class="footer">
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

    private async created() {
        try {
            const auth = await app.reAuthenticate();
            this.user = auth.user;
        } catch (err) {
            // pass
        }
    }

    private async beforeUpdate() {
        try {
            const auth = await app.get('authentication');
            this.user = auth.user;
        } catch (err) {
            this.user = null;
        }
    }

    public logOut = async () => {
        try {
            await app.logout();
            this.$forceUpdate();
            await this.$router.replace('/');
        } catch (err) {
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

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.masterClass {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
}

.content {
    flex-grow: 1; /* 4 */
}
</style>
