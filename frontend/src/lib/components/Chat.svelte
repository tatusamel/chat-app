<!-- src/lib/components/Chat.svelte -->
<script lang="ts">
  import type { ChatMessage } from '../types/ChatMessage';

  export let message: ChatMessage;
  export let isOwn: boolean;
</script>

<div class="flex {isOwn ? 'justify-end' : 'justify-start'}">
  <div class="max-w-xs p-3 rounded-lg {isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200'}">
    <div class="text-sm font-semibold">{message.sender}</div>
    <div>{message.content}</div>
    <div class="text-xs opacity-75">{new Date(message.timestamp).toLocaleTimeString()}</div>
  </div>
</div>