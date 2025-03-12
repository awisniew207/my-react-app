/// <reference types="vite/client" />
/// <reference types="node" />

// Import ProcessEnv type
import { ProcessEnv } from 'node:process';

// Declare global namespace for TypeScript to recognize polyfills
declare global {
  interface Window {
    global: typeof globalThis;
    // Update process type to be compatible with actual Process type
    process: {
      env: ProcessEnv;
      [key: string]: any;
    };
    Buffer: typeof Buffer;
    Stream: any;
  }
}

// This exports an empty object to make the file a module
export {};
