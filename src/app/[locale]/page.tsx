import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import { getMessages } from "next-intl/server";
import { auth } from "@/configs/auth";
import { redirect } from "next/navigation";
import Home from "@/components/screens/home/Home";

export default async function HomePage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["HomePage"])}>
      <Home />
    </NextIntlClientProvider>
  );
}
