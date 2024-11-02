<!-- src/App.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { messages } from './lib/stores/messageStore';
  import { ChatWebSocket } from './lib/services/websocket';
  import ChatMessage from './lib/components/Chat.svelte';
  import type { ChatMessage as ChatMessageType } from './lib/types/ChatMessage';

  let messageInput: string = '';
  let chatContainer: HTMLDivElement;
  let chatWebSocket: ChatWebSocket;
  let username = prompt('Enter your name') || 'Anonymous';

  onMount(() => {
    chatWebSocket = new ChatWebSocket('http://localhost:8080/ws', username);
  });

  onDestroy(() => {
    if (chatWebSocket) {
      chatWebSocket.disconnect();
    }
  });

  function sendMessage(): void {
    if (!messageInput.trim()) return;

    chatWebSocket.sendChatMessage(messageInput.trim());
    messageInput = '';
  }

  function scrollToBottom(): void {
    setTimeout(() => {
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 50);
  }

  $: {
    if ($messages) scrollToBottom();
  }

</script>

<main class="flex flex-col h-screen bg-gray-100">
  <div class="bg-white p-4 shadow">
    <h1 class="text-xl font-bold text-center">Chat Room</h1>
  </div>

  <div 
    bind:this={chatContainer}
    class="flex-1 overflow-y-auto p-4 space-y-4"
  >
    {#each $messages as message}
      <ChatMessage {message} isOwn={message.sender === username} />
    {/each}
  </div>

  <div class="bg-white p-4 shadow-lg">
    <form 
      on:submit|preventDefault={sendMessage}
      class="flex gap-2"
    >
      <input
        type="text"
        bind:value={messageInput}
        placeholder="Type a message..."
        class="flex-1 p-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Send
      </button>
    </form>
  </div>
</main>