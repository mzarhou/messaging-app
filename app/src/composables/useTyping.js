import { nextTick, onMounted, ref, watch } from 'vue';
import updateScroll from '@/helpers/updateScroll';

export default function useTyping(socket, inputId="message-input", formId = "form", delay = 500) {
    const isTyping = ref(false);

    onMounted(() => {
        const input = document.getElementById(inputId);
        const form = document.getElementById(formId);

        let inputTimeOut
        input.addEventListener("keypress", () => {
            isTyping.value = true;
            if (inputTimeOut)
                clearTimeout(inputTimeOut); // restart the timer
            inputTimeOut = setTimeout(() => isTyping.value = false, delay);
        });
        form.addEventListener("submit", () => isTyping.value = false);
    });

    watch(isTyping, (newVal) => {
        if (newVal) {
            socket.emit('typing');
        } else {
            socket.emit('not typing');
        }
    });

    const someOneIsTyping = ref(false);
    socket.on('typing', async () => {
        someOneIsTyping.value = true;
        await nextTick();
        updateScroll();
    });
    socket.on('not typing', () => someOneIsTyping.value = false);

    return someOneIsTyping;
}
