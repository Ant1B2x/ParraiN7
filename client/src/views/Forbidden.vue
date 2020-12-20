<template>
    <div>
        <h1 id="title">403</h1>
        <p>Accès interdit</p>
        <img width="250px" src="img/brand/forbidden.png"/>
    </div>
</template>

<style scoped>
@import "css/Forbidden.css";
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Forbidden extends Vue {

}

</script>
