import Link from "next/link";
import { useRouter } from "next/router";

export const MoneyTrackLayout: React.FunctionComponent = ({ children }) => {
	const router = useRouter();
	const path = router.pathname;
	const tab = path.split("/")[path.split("/").length - 1];
	return (
		<>
			<div className="card bg-neutral  text-neutral-content">
				<div className="card-body">
					<div className="flex flex-col xl:w-1/2 md:m-auto sm:flex-row sm:gap-10 justify-center">
						<div className="flex">
							<div className="my-auto">
								<h1 className="text-lg">Welcome to</h1>
								<h2 className="text-3xl font-semibold text-primary">
									Money Track!
								</h2>
								<h2 className="text-lg pt-1">
									Track your expenses and saving daily with this app
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="tabs tabs-boxed bg-neutral  p-3">
				<Link href="/moneytrack">
					<a className={`tab ${tab == "moneytrack" ? "tab-active" : ""}`}>
						Main
					</a>
				</Link>
				<Link href="/moneytrack/transactions">
					<a className={`tab ${tab == "transactions" ? "tab-active" : ""}`}>
						Transactions
					</a>
				</Link>
				<Link href="/moneytrack/claim">
					<a className={`tab ${tab == "claim" ? "tab-active" : ""}`}>Claim</a>
				</Link>
				<Link href="/moneytrack/networth">
					<a className={`tab ${tab == "networth" ? "tab-active" : ""}`}>
						Net Worth
					</a>
				</Link>
			</div>
			{children}
		</>
	);
};
