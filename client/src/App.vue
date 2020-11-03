<template>
    <div id="app">
        <MenuParrain7/>
        <router-view/>
    </div>
</template>

<script>
import MenuParrain7 from '@/components/MenuParrain7.vue';

export default {
    components: {
        MenuParrain7,
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
</style>
