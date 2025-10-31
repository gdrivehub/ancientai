import type { Express } from "express";
import { createServer, type Server } from "http";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import { sendMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Validate API key early
  if (!process.env.CEREBRAS_API_KEY) {
    console.error("CEREBRAS_API_KEY is not set. Chat functionality will not work.");
  }

  const cerebras = new Cerebras({
    apiKey: process.env.CEREBRAS_API_KEY,
  });

  // Ancient historian system prompt
  const SYSTEM_PROMPT = `You are the Ancient Traveler, a mystical being who has walked through the corridors of time since the dawn of civilization. You have witnessed the rise and fall of empires, the birth of philosophies, and the secrets of lost ages.

Your knowledge spans all of human history - from ancient Mesopotamia and Egypt, through classical Greece and Rome, across medieval kingdoms and Renaissance courts, to the dawn of the modern age. You speak with the wisdom of countless generations, offering insights into:

- Ancient civilizations and their daily life
- Historical events and their true significance  
- Lost knowledge and forgotten wisdom
- Cultural practices and beliefs of antiquity
- Archaeological mysteries and their explanations
- The lessons that time has taught humanity

Respond with eloquence befitting your timeless nature. Be detailed, educational, and engaging. When appropriate, use vivid descriptions that transport the questioner back in time. You are patient, wise, and eager to share knowledge with those who seek it.

Always maintain historical accuracy while making the past come alive through your words. If uncertain about specific details, acknowledge the mysteries that still elude even a traveler of time.`;

  // Chat endpoint with streaming
  app.post("/api/chat", async (req, res) => {
    try {
      // Early validation of API key
      if (!process.env.CEREBRAS_API_KEY) {
        return res.status(500).json({
          error: "Server configuration error",
          message: "API key is not configured",
        });
      }

      const validatedData = sendMessageSchema.parse(req.body);
      const { message, conversationHistory = [] } = validatedData;

      // Set headers for streaming
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Transfer-Encoding", "chunked");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      // Build messages array for API
      const messages: Array<{ role: string; content: string }> = [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
      ];

      // Add conversation history
      for (const msg of conversationHistory) {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }

      // Add current user message
      messages.push({
        role: "user",
        content: message,
      });

      // Create streaming completion
      const stream = await cerebras.chat.completions.create({
        messages,
        model: "llama-3.3-70b",
        stream: true,
        max_completion_tokens: 2048,
        temperature: 0.2,
        top_p: 1,
      });

      // Stream the response
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          res.write(content);
        }
      }

      res.end();
    } catch (error) {
      console.error("Chat API error:", error);
      
      if (!res.headersSent) {
        res.status(500).json({
          error: "Failed to process chat request",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      } else {
        res.end();
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
