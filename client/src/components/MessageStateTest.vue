<template>
    <div class="alertify-notifier ajs-bottom ajs-right">
        <div v-for="(notification, index) in notifications"  :key="index" class="notification" :class="[notification.state, notification.step]">
            <div class="d-flex px-3 py-2">
                <div class="pr-2">
                    <i class="fa fa-check" aria-hidden="true"></i>
                </div>
                <div class="alert-text-body" role="status">
                    {{notification.message}}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {MessageState} from "@/views/message-state-enum";

class NotificationTest {
    message: string;
    state: MessageState;
    step: NotificationStep;

    constructor(message: string, state: MessageState, step: NotificationStep) {
        this.message = message;
        this.state = state;
        this.step = step;
    }
}

enum NotificationStep {
    in = 'in',
    out = 'out',
}

@Component
export default class MessageStateTest extends Vue {

    notifications: NotificationTest[] = [];

    displayNotificationSuccess(message: string) {
        this.displayNotification(message, MessageState.hasSucceed)
    }

    displayNotificationWarning(message: string) {
        this.displayNotification(message, MessageState.hasWarning)
    }

    displayNotificationError(message: string) {
        this.displayNotification(message, MessageState.hasError)
    }

    displayNotification(message: string, state: MessageState) {
        this.notifications.push(new NotificationTest(message, state, NotificationStep.in));
        setTimeout(() => {
            this.notifications[0].step = NotificationStep.out;
            setTimeout(() => {
                this.notifications.shift();
            }, 985);
        }, 6750);
    }
}
</script>

<style scoped>
@import "css/MessageStateTest.css";
</style>
