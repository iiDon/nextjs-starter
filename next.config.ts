import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import "@/lib/env";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin("./src/configs/i18n/request.ts");
export default withNextIntl(nextConfig);
