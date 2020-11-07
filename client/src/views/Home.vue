<template>
    <Demo :user="this.user"/>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import Demo from '@/components/Demo.vue';
import {User} from "@/views/Users.vue";

@Component({
    components: {
        Demo
    },
})
export default class Home extends Vue {
	@Prop() user!: User;
}
</script>
