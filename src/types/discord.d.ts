// src/types/discord.d.ts
import { Collection, Client } from 'discord.js';
import { ICommand } from '@/interfaces/command';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, ICommand>;
  }
}