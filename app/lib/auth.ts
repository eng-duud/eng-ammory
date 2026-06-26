import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 3 * 60 * 60 },
  pages: { signIn: "/studio-x7k/login" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: { password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (!credentials?.password) return null;
        const stored = process.env.ADMIN_PASSWORD ?? "";
        if (credentials.password === stored) {
          return { id: "admin", name: "Admin", email: "admin@local" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.isAdmin = true;
      return token;
    },
    async session({ session, token }) {
      if (token.isAdmin) (session as any).isAdmin = true;
      return session;
    },
  },
};
