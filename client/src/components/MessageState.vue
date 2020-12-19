<template>
    <div class="alertify-notifier ajs-bottom ajs-right">
        <div v-for="(notification, index) in notifications"  :key="index" class="notification" :class="[notification.state, notification.step]">
            <div class="d-flex px-3 py-2">
                <div class="pr-2">
                    <i class="fa fa-check" aria-hidden="true"></i>
                </div>
                <div class="alert-text-body" role="status">{{notification.message}}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

enum States {
    hasError = 'hasError',
    hasSucceed = 'hasSucceed',
    hasWarning = 'hasWarning',
    none = 'none',
}

enum NotificationStep {
    in = 'in',
    out = 'out',
}

class Notification {
    message: string;
    state: States;
    step: NotificationStep;

    constructor(message: string, state: States, step: NotificationStep) {
        this.message = message;
        this.state = state;
        this.step = step;
    }
}

@Component
export default class MessageState extends Vue {

    notifications: Notification[] = [];

    displaySuccess(message: string) {
        this.displayNotification(message, States.hasSucceed)
    }

    displayWarning(message: string) {
        this.displayNotification(message, States.hasWarning)
    }

    displayError(message: string) {
        this.displayNotification(message, States.hasError)
    }

    displayNotification(message: string, state: States) {
        this.notifications.push(new Notification(message, state, NotificationStep.in));
        setTimeout(() => {
            this.notifications[0].step = NotificationStep.out;
            setTimeout(() => {
                this.notifications.shift();
            }, 985);
        }, 6750);
    }

    private getLastNotification() {
        return this.notifications[this.notifications.length - 1];
    }

    public isNone() {
        return this.getLastNotification().state === States.none;
    }

    public isOnError() {
        return this.getLastNotification().state === States.hasError;
    }

    public isOnWarning() {
        return this.getLastNotification().state === States.hasWarning;
    }
}

</script>

<style scoped>
@import "css/MessageState.css";
</style>
