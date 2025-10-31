import { randomUUID } from "crypto";

// Storage interface - currently unused but available for future features
export interface IStorage {
  // Add storage methods here as needed
}

export class MemStorage implements IStorage {
  constructor() {
    // Storage initialization
  }
}

export const storage = new MemStorage();
