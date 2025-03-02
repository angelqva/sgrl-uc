const { TextEncoder, TextDecoder } = require("util");

// ✅ Ensure TextEncoder & TextDecoder are globally available in Jest
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
