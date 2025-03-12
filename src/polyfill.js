// Polyfill file for Node.js core modules and globals
if (typeof window !== 'undefined') {
  // Essential globals
  window.global = window;
  window.process = window.process || { env: {} };
  
  // Import Buffer
  try {
    window.Buffer = window.Buffer || require('buffer').Buffer;
  } catch (e) {
    console.warn('Buffer polyfill failed to load', e);
  }

  // Import Stream
  try {
    window.Stream = window.Stream || require('stream-browserify');
  } catch (e) {
    console.warn('Stream polyfill failed to load', e);
  }

  // Import Crypto
  try {
    if (!window.crypto) {
      window.crypto = require('crypto-browserify');
    }
  } catch (e) {
    console.warn('Crypto polyfill failed to load', e);
  }

  // Console fix for IE
  if (!window.console) {
    window.console = {
      log: function() {},
      error: function() {},
      warn: function() {},
    };
  }
} 