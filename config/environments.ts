import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Helper function to safely retrieve required environment variables.
 * Throws an error immediately if a required variable is missing.
 */
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `❌ Missing required environment variable: ${key}\n` +
      `Please create a .env file in your project root. Use .env.example as a template.`
    );
  }
  return value;
}

/**
 * Helper function for optional environment variables with defaults.
 * Use this only for non-sensitive config like URLs, timeouts, environment names.
 */
function getEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

// ========== CREDENTIALS (Required - must be in .env) ==========
export const CREDENTIALS = {
  standardUser: {
    username: requireEnv('STANDARD_USER'),
    password: requireEnv('STANDARD_PASSWORD'),
  },
  lockedUser: {
    username: requireEnv('LOCKED_USER'),
    password: requireEnv('LOCKED_PASSWORD'),
  },
};

// ========== APPLICATION CONFIG ==========
export const CONFIG = {
  baseUrl: getEnv('BASE_URL', 'https://www.saucedemo.com'),
  testEnv: getEnv('TEST_ENV', 'dev'),
  timeout: parseInt(getEnv('TIMEOUT', '30000'), 10),
};

// ========== VALIDATION ==========
// This runs when the file is imported, catching missing secrets early
export function validateEnvironment(): void {
  console.log('✅ Environment configuration loaded successfully');
  console.log(`   Base URL: ${CONFIG.baseUrl}`);
  console.log(`   Test Environment: ${CONFIG.testEnv}`);
}
