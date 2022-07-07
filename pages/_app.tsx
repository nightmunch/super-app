import "../styles/globals.css";
import { MainLayout } from "../components/MainLayout";
import { AppProps } from "next/app";
import Head from "next/head";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>SuperApp by nightmunch</title>
			</Head>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</>
	);
}

export default withTRPC({
	config({ ctx }) {
		const url = process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
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
