package com.example.chat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class ChatMessage {

    @Id
    @GeneratedValue
    private Long id;
    private String content;
    private String sender;
    private LocalDateTime timestamp;
    private MessageType type;

    public enum MessageType {
        CHAT, JOIN, LEAVE, TYPING
    }
}
