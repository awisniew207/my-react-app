/// <reference types="vite/client" />

// Declare global namespace for TypeScript to recognize polyfills
declare global {
  interface Window {
    global: typeof globalThis;
    process: any;
    Buffer: any;
  }
}

// This exports an empty object to make the file a module
export {};
