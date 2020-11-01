<template>
    <div class="home">
        <img alt="Vue logo" src="../../public/assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import app from '@/feathers-client';

/*app.reAuthenticate().then(() => {
    console.log("ouii");
}).catch(() => {
    console.log("nooon");
});*/

@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {
}
</script>
