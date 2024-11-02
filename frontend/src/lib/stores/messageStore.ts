import { writable, type Writable } from "svelte/store";
import type { ChatMessage } from "../types/ChatMessage";

export const messages: Writable<ChatMessage[]> = writable([]);

export const addMessage = (message: ChatMessage): void => {
  messages.update((msgs) => [...msgs, message]);
};
