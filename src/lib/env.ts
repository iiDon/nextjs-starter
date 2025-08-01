import { z } from "zod";

const envSchema = z.object({
  // Server-side variables
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string().min(10),
  NEXTAUTH_URL: z.url(),

  // Client-side variables
});

// Custom error handler with better formatting
function validateEnvironment() {
  try {
    const env = envSchema.parse(process.env);
    console.log("✅ Environment variables validated successfully");
    return env;
  } catch (error) {
    console.error("❌ INVALID ENVIRONMENT VARIABLES: ❌");

    // Check if it's a Zod error with proper error structure
    if (
      error instanceof z.ZodError &&
      error.issues &&
      Array.isArray(error.issues)
    ) {
      error.issues.forEach((err) => {
        const fieldName = err.path.join(".");
        console.error(`- ${fieldName}`);
      });
    } else {
      console.error("Unexpected error during environment validation:");
    }

    process.exit(1);
  }
}

// Validate and parse environment variables
const env = validateEnvironment();

export default env;
