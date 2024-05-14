import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async signIn({user}) {
      if (user.email && user.email.endsWith('@uaeh.edu.mx')) {
        return true
      } else {
        return false;
      }
    }
  }
})

export { handler as GET, handler as POST };