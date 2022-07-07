import Auth0Provider from "next-auth/providers/auth0";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		Auth0Provider({
			clientId: process.env.AUTH0_ID!,
			clientSecret: process.env.AUTH0_SECRET!,
			// @ts-ignore
			domain: process.env.AUTH0_DOMAIN,
		}),
		// ...add more providers here
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				name: {
					label: "Name",
					type: "text",
					placeholder: "Enter your name",
				},
			},
			async authorize(credentials, _req) {
				const user = { id: 1, name: credentials?.name ?? "J Smith" };
				return user;
			},
		}),
	],
};
