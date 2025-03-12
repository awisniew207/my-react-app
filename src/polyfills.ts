// Explicit polyfills for browser environment
import process from 'process';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  // Ensure process is defined globally, with type assertion to handle TS compatibility
  window.process = process as any;
  
  // Ensure process.env exists
  if (!window.process.env) {
    window.process.env = {};
  }
  
  // Ensure Buffer is defined globally
  window.Buffer = window.Buffer || Buffer;
  
  // Ensure global is defined
  window.global = window;
}

// Export to ensure this module is treated as an ES module
export { process, Buffer }; 