<template>
  <div id="app" class="master-class">
    <header>
      <Header :user="this.user" @signalLogOut="logOut"/>
    </header>
    <router-view :user="this.user" :messageState="this.messageState" class="content" v-if="this.userLoadingFinished" @signalLogOut="logOut"/>
    <MessageState ref="MessageState"/>
    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import MessageState from "@/components/MessageState.vue";
import app from "@/feathers-client";
import {Component, Ref, Vue} from "vue-property-decorator";
import {User} from "@/views/Users.vue";

@Component({
  components: {
    MessageState,
    Header,
    Footer
  }
})
export default class App extends Vue {

  @Ref('MessageState') messageState!: MessageState;

  user: User | null = null;
  userLoadingFinished = false;

  private async beforeCreate() {
    try {
      const auth = await app.reAuthenticate();
      this.user = auth.user;
    } catch (error) {
      // pass
    }
    this.userLoadingFinished = true;
  }

  private async beforeUpdate() {
    try {
      const auth = await app.get('authentication');
      this.user = auth ? auth.user : null;
    } catch (error) {
      this.user = null;
    }
  }

  public logOut = async () => {
    try {
      await app.logout();
      this.$forceUpdate();
      if (this.$router.currentRoute.path !== '/')
        await this.$router.replace('/');
    } catch (error) {
      // pass
    }
  }
}

</script>

<style>
@import "views/css/App.css";
</style>
