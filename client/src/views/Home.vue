<template>
    <Demo/>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Demo from '@/components/Demo.vue';

@Component({
    components: {
        Demo
    },
})
export default class Home extends Vue {
}
</script>
