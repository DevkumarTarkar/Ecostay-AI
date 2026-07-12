import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const cleanApiUrl = API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // After OAuth sign-in, exchange the user's info for our own JWT via backend
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const response = await fetch(`${cleanApiUrl}/auth/oauth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
              email: user.email,
              full_name: user.name,
              provider: account.provider,
            }),
          });

          if (!response.ok) {
            return false;
          }

          const data = await response.json();
          // Store our backend JWT token in the NextAuth token
          (user as any).backendToken = data.access_token;
          (user as any).backendUser = data.user;
        } catch (error) {
          console.error("OAuth backend sync error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.backendToken = (user as any).backendToken;
        token.backendUser = (user as any).backendUser;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).backendToken = token.backendToken;
      (session as any).backendUser = token.backendUser;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});

export { handler as GET, handler as POST };
