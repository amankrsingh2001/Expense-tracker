import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import  bcrypt  from 'bcrypt';
import { prisma } from "@/lib/prisma";

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your Email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {

        if(credentials?.password == undefined || credentials.email == undefined){
          return null
      }
      
      try {
          const user = await prisma.user.findFirst({
              where:{
                  email:credentials?.email
              }
          })

          if(!user || !user.id){
              throw new Error("User not found")     
          }

          const validPassword = await bcrypt.compare(credentials?.password, user.password)
          
          if(!validPassword){
              throw new Error("Invalid credentials")
          }
          
          const newUser = {
              email:user.email,
              id:user.id,
              firstName:user.firstName,
              lastName:user.lastName
          }
          return newUser
      } catch (error) {
          const err = (error as Error).message
          throw new Error(err);
      }
      
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "jwt", 
  },
  
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT & { expires?: number } }) {
     
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.expires = token.expires ? new Date(token.expires * 1000).toISOString():null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
