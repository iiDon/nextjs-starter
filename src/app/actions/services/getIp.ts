import "server-only";
import { CustomizedError } from "@/lib/errors/errors";

export const getIp = (request: Request, behindCloudflare = false): string => {
  if (behindCloudflare) {
    const cfClient = request.headers.get("cf-connecting-ip");
    if (cfClient) return cfClient;
  }

  const xff = request.headers.get("x-forwarded-for");
  if (!xff) throw new CustomizedError("IP is required", 400);

  return xff.split(",")[0].trim();
};
