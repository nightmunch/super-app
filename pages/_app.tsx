import "../styles/globals.css";
import { MainLayout } from "../components/MainLayout";
import { AppProps } from "next/app";
import Head from "next/head";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { AppRouter } from "../server/route/app.router";
import { useEffect } from "react";
import { themeChange } from "theme-change";

import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		themeChange(false);
		// 👆 false parameter is required for react project
	}, []);
	return (
		<>
			<Head>
				<title>SuperApp by nightmunch</title>
			</Head>
			<SessionProvider session={pageProps.session}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</SessionProvider>
		</>
	);
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		const url =
			process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
				? `https://www.nightmunch.com/api/trpc`
				: "http://localhost:3000/api/trpc";

		const links = [
			loggerLink(),
			httpBatchLink({
				maxBatchSize: 10,
				url,
			}),
		];

		return {
			queryClientConfig: {
				defaultOptions: {
					queries: {
						staleTime: 60,
					},
				},
			},
			headers() {
				if (ctx?.req) {
					return {
						...ctx.req.headers,
						"x-ssr": "1",
					};
				}
				return {};
			},
			links,
			transformer: superjson,
		};
	},
	ssr: true,
})(App);
