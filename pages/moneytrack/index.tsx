import Link from "next/link";
export default function MoneyTrack() {
	return (
		<>
			<div className="card bg-neutral shadow-xl text-neutral-content">
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
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<div className="card-body">
					<div className="tabs tabs-boxed pb-3">
						<a className="tab">Daily</a>
						<a className="tab">Monthly</a>
						<Link href="/moneytrack/claim">
							<a className="tab">Claim</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
