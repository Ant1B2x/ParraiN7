<template>
    <div class="card-body px-md-5 py-5 messageZone" v-bind:class="[validation.messageState]">
        <transition name="fade" mode="out-in">
            <div class="text-muted mb-0 alertMessage" role="alert" :key="validation.message">
                {{ validation.message }}
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {MessageState} from "@/views/message-state-enum";

@Component
export default class MessageStateComponent extends Vue {
    @Prop() standardMessage!: string;

    private validation = {
        messageState: MessageState.none,
        message: this.standardMessage,
    }

    displayNormalMessage() {
        this.validation.messageState = MessageState.none;
        this.validation.message = this.standardMessage;
    }

    displaySuccess(successMessage: string) {
        this.validation.message = successMessage;
        setTimeout(() => {
            this.validation.messageState = MessageState.hasSucceed;
            setTimeout(() => {
                this.displayNormalMessage();
            }, 3000);
        }, 500);
    }

    displayError(errorMessage: string) {
        this.validation.message = errorMessage;
        setTimeout(() => {
            this.validation.messageState = MessageState.hasError;
            setTimeout(() => {
                this.displayNormalMessage();
            }, 5000);
        }, 500);
    }

    displayWarning(warningMessage: string) {
        this.validation.message = warningMessage;
        setTimeout(() => {
            this.validation.messageState = MessageState.hasWarning;
            setTimeout(() => {
                this.displayNormalMessage();
            }, 5000);
        }, 500);
    }

    getCurrentState(): MessageState {
        return this.validation.messageState;
    }

    isOnError() {
        return this.validation.messageState === MessageState.hasError;
    }

    isOnWarning() {
        return this.validation.messageState === MessageState.hasWarning;
    }

    isOnErrorOrWarning() {
        return this.isOnError() || this.isOnWarning();
    }
}
</script>

<style scoped>
@import "css/MessageState.css";
</style>
