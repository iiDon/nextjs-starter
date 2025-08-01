import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
  points: 1000, // 1000 requests per hour
  duration: 3600, // 1 hour
});

export { limiter };
