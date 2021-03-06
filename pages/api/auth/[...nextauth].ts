import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, user }) {
            if (session.user) {
            session.user.role = user.role; // Add role value to user object so it is passed along with session
            }
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
	providers: [
		Auth0Provider({
			clientId: process.env.AUTH0_ID!,
			clientSecret: process.env.AUTH0_SECRET!,
            issuer: process.env.AUTH0_ISSUER!,
            authorization: `${process.env.AUTH0_ISSUER}/authorize?response_type=code&prompt=login`
		}),
	],
    secret: 'Iloveyouaimi',
    debug:true
};

export default NextAuth(authOptions);
