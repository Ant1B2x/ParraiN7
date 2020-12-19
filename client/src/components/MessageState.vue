<template>
    <div class="alertify-notifier ajs-bottom ajs-right">
        <div v-for="(notification, index) in notifications"  :key="index" class="notification" :class="[notification.state, notification.step]">
            <div class="d-flex px-3 py-2 align-items-center">
                    <span class="icon"><font-awesome-icon :icon="notification.icon"/></span>
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
    icon: string;

    constructor(message: string, state: States, step: NotificationStep, icon: string) {
        this.message = message;
        this.state = state;
        this.step = step;
        this.icon = icon;
    }
}

@Component
export default class MessageState extends Vue {

    notifications: Notification[] = [];

    displaySuccess(message: string) {
        this.displayNotification(message, States.hasSucceed, 'check')
    }

    displayWarning(message: string) {
        this.displayNotification(message, States.hasWarning, 'exclamation-triangle')
    }

    displayError(message: string) {
        this.displayNotification(message, States.hasError, 'biohazard');
    }

    displayNotification(message: string, state: States, icon: string) {
        this.notifications.push(new Notification(message, state, NotificationStep.in, icon));
        setTimeout(() => {
            this.notifications.shift();
            console.log('plap');
        }, 6000);
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

    public getIconFromState(state: States) {
        switch (state) {
            case States.hasSucceed:
                return 'check';
            case States.hasError:
                return 'exclamation-triangle';
            case States.hasWarning:
                return 'exclamation-triangle';
            case States.none:
                return 'user-ninja';
        }
    }
}

</script>

<style scoped>
@import "css/MessageState.css";
</style>
