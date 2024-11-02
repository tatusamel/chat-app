// src/lib/types.ts
export interface ChatMessage {
  content: string;
  sender: string;
  timestamp: string;
  type: "CHAT" | "JOIN" | "LEAVE" | "TYPING";
}
