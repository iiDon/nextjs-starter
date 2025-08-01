import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Role } from "./prisma/generated/client";
// import { Locale } from "./i18n/defaults";
// import { getTranslations } from "next-intl/server";

// const getLocale = async (request: Request) => {
//   const referer = request.headers.get("referer") ?? "";
//   const url = new URL(referer);
//   const [, segment] = url.pathname.split("/");
//   return segment as Locale;
// };

class InvalidLoginError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      id: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, request) {
        console.log("credentials", credentials);
        console.log("request", request);
        // const locale = await getLocale(request);
        // const t = await getTranslations({ locale, namespace: "Pages.Auth" });
        // throw new InvalidLoginError(t("InvalidLogin"));

        return {
          id: "1",
          name: "John Doe",
          phone: "01010101010",
          role: "ADMIN",
        };
      },
    }),
  ],
  logger: {
    error(error: Error) {
      if (error instanceof InvalidLoginError) {
        console.error("Its a CredentialsSignin error", error.code);
        return;
      }
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.phone = token.phone as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
