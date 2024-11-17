<script lang="ts">
  import type { ChatMessage } from '../types/ChatMessage';
  import { CircleUserRoundIcon } from 'lucide-svelte';
  export let message: ChatMessage;
  export let isOwn: boolean;

  $: isSystemMessage = message.type === 'JOIN' || message.type === 'LEAVE';

  function formatTimestamp(timestamp : string) : string {
    const date = new Date(timestamp);
    return !isNaN(date.getTime()) ? date.toLocaleTimeString() : '';
  }
</script>

{#if isSystemMessage}
  <div class="flex justify-center">
    <div class="text-xs text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
      {message.content}
      {#if formatTimestamp(message.timestamp)}
        <span class="text-xs opacity-75 ml-2">{formatTimestamp(message.timestamp)}</span>
      {/if}
    </div>
  </div>

{:else}
<div class="flex items-start gap-2 {isOwn ? 'flex-row-reverse' : 'flex-row'}">
  <CircleUserRoundIcon 
    class={`w-8 h-8 mt-1 ${isOwn ? 'text-blue-500' : 'text-gray-400'}`}
  />
  <div class="max-w-xs p-3 rounded-lg {isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200'}">
    <div class="text-sm font-semibold">{message.sender}</div>
    <div>{message.content}</div>
    <div class="text-xs opacity-75">{formatTimestamp(message.timestamp)}</div>
  </div>
</div>
{/if}