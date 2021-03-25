<script>
import { nextTick, onMounted, reactive, toRefs } from 'vue'
import { io } from 'socket.io-client'

import useFocusInput from '@/composables/useFocusInput'
import useTyping from '@/composables/useTyping'
import TypingBox from '@/components/TypingBox';
import updateScroll from './helpers/updateScroll';


export default {
  components: {
    TypingBox
  },
  setup () {
    useFocusInput('message-input', '/')
    const socket = io('ws://192.168.0.194:8080');
    const someOnIsTyping = useTyping(socket, "message-input", "form", 850);

    const state = reactive({
      id: Math.ceil(Math.random() * 100000000000 + 1),
      messages: [],
      message: ''
    })

    onMounted(() => {
      socket.on('message', (data) => onMessage(JSON.parse(data)));
      return socket.close;
    })

    function sendMessage() {
      if (state.message) {
        const message = { id: state.id, text: state.message };
        socket.emit('message', JSON.stringify(message));
        onMessage(message);
        state.message = '';
      }
    }

    async function onMessage (data) {
      state.messages.push({id: data.id, text: data.text });
      await nextTick();
      updateScroll();
    }

    return {
      ...toRefs(state), sendMessage, someOnIsTyping
    }
  }
}
</script>
<template>
  <div class="flex flex-col h-screen max-w-screen-sm px-2 mx-auto">
        <!-- messages list  -->
        <div class="flex-auto px-4 mb-4 overflow-y-auto" id="container">
            <template v-for="(m, i) in messages" :key="i">
              <template v-if="m.id === id">
                <div class="float-left w-3/5 my-2"><span class="inline-block px-4 py-2 text-white bg-purple-500 rounded-xl">{{m.text}}</span></div>
              </template>
              <template v-else>
                <div class="float-right w-3/5 my-2"><span class="inline-block float-right px-4 py-2 text-gray-700 bg-gray-200 rounded-xl">{{m.text}}</span></div>
              </template>
            </template>
            <typing-box :typing="someOnIsTyping" />
        </div>
        <!-- input area  -->
        <form id="form" class="flex items-center mb-4" @submit.prevent="sendMessage">
            <input  id="message-input" v-model="message" class="w-full px-4 py-2 text-xl border border-purple-500 rounded-lg" placeholder="Send your message" autocomplete="false"/>
            <button type="submit" class="px-4 py-2 ml-2 text-white bg-purple-500 rounded-lg"><svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg></button>
        </form>
    </div>
</template>
