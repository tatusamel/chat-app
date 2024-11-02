package com.example.chat.controller;

import com.example.chat.model.ChatMessage;
import com.example.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    private final ChatService chatService;

    @Autowired
    ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now());
        return chatService.processMessage(chatMessage);
    }

    @MessageMapping("/chat.join")
    @SendTo("/topic/public")
    public ChatMessage join(@Payload ChatMessage chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now());
        chatMessage.setType(ChatMessage.MessageType.JOIN);
        return chatMessage;
    }


}
