package com.example.chat.service;

import com.example.chat.model.ChatMessage;
import com.example.chat.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;

    ChatService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public ChatMessage processMessage(ChatMessage chatMessage) {
        return chatMessageRepository.save(chatMessage);
    }
}