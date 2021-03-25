import { onMounted } from 'vue'

export default function useFocusInput(id, key = '/') {
    onMounted(() => {
        document.addEventListener('keydown', (e) => {
            const input = document.getElementById(id);
            if (e.key === key && document.activeElement != input) {
                e.preventDefault();
                document.querySelector('input').focus();
            }
        });
    })
}
