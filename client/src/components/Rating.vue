<!-- https://github.com/ramazanerikli/vue-star-rating -->
<template>
    <div class="rating">
        <ul class="list">
            <li @click="rate(star)" v-for="star in maxStars" :class="{ 'active': star <= grade }" :key="star.grade" class="star">
                <font-awesome-icon icon="star"/>
            </li>
        </ul>
        <!--div v-if="hasCounter" class="info counter">
            <span class="score-rating">{{ grade }}</span>
            <span class="divider">/</span>
            <span class="score-max">{{ maxStars }}</span>
        </div-->
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Rating extends Vue {
    @Prop() grade!: number;
    maxStars = 5;
    hasCounter = true;

    stars = this.grade;

    rate(star: number) {
        if (star <= this.maxStars && star >= 0) {
            this.stars = this.stars === star ? star - 1 : star
            this.$emit('updatedStars', this.stars)
        }
    }
}
</script>

<style scoped>
@import "css/Rating.css";
</style>
