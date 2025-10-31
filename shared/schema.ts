import { z } from "zod";

// Chat message schema
export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

// Request/Response schemas for API
export const sendMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  conversationHistory: z.array(chatMessageSchema).optional(),
});

export type SendMessageRequest = z.infer<typeof sendMessageSchema>;
