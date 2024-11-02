// src/lib/services/websocket.ts

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { messages } from "../stores/messageStore";
import type { ChatMessage } from "../types/ChatMessage";

declare global {
  interface Window {
    global: Window;
  }
}

window.global = window;

export class ChatWebSocket {
  private stompClient!: Client;
  private username: string;

  constructor(url: string, username: string) {
    this.username = username;
    this.connect(url);
  }

  private connect(url: string): void {
    const socket = new SockJS(url);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log("Connected to WebSocket");
      this.sendJoinMessage();

      this.stompClient.subscribe("/topic/public", (message) => {
        const chatMessage: ChatMessage = JSON.parse(message.body);
        messages.update((msgs) => [...msgs, chatMessage]);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    this.stompClient.activate();
  }

  private sendJoinMessage(): void {
    const message: ChatMessage = {
      content: "",
      sender: this.username,
      timestamp: new Date().toISOString(),
      type: "JOIN",
    };
    this.sendMessage(message);
  }

  public sendChatMessage(content: string): void {
    const message: ChatMessage = {
      content,
      sender: this.username,
      timestamp: new Date().toISOString(),
      type: "CHAT",
    };
    this.sendMessage(message);
  }

  private sendMessage(chatMessage: ChatMessage): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.error("STOMP client is not connected");
    }
  }

  public disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
