import "server-only";
import { auth } from "@/configs/auth";
import { Locale } from "@/configs/i18n/defaults";
import { Role } from "@/configs/prisma/generated";
import { CustomizedError } from "@/lib/errors/errors";
import { getTranslations } from "next-intl/server";

export const guard = async (ROLES: Role[], locale?: Locale) => {
  const session = await auth();

  const t = locale
    ? await getTranslations({ locale, namespace: "Error" })
    : await getTranslations("Error");

  if (!session) {
    throw new CustomizedError(t("You are not logged in"), 401);
  }

  if (!session.user.role) {
    throw new CustomizedError(t("You are not logged in"), 401);
  }

  if (ROLES.length === 0) {
    return session;
  }

  if (!ROLES.includes(session.user.role)) {
    throw new CustomizedError(t("This action is not allowed"), 403);
  }

  return session;
};
