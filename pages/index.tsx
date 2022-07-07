import Link from "next/link";

type AppCardType = {
	app_name: string;
	url: string;
};

const AppCard: React.FunctionComponent<AppCardType> = ({ app_name, url }) => {
	return (
		<Link href={url}>
			<div className="btn btn-primary h-20">{app_name}</div>
		</Link>
	);
};

export default function Home() {
	return (
		<>
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<div className="card-body">
					<div className="flex flex-col xl:w-1/2 md:m-auto sm:flex-row sm:gap-10 justify-center">
						<div className="flex">
							<div className="my-auto">
								<h1 className="text-lg">Welcome to!</h1>
								<h2 className="text-3xl font-semibold text-primary">
									Super<span className="text-base-content">App</span>
								</h2>
								<h2 className="text-lg pt-1">
									Web application filled with my personal projects.
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<div className="card-body gap-4">
					<h1 className="text-lg font-semibold text-center">List of App</h1>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<AppCard app_name="Find Me Home" url="/findmehome" />
						<AppCard app_name="Find Me Home" url="/" />
						<AppCard app_name="Find Me Home" url="/" />
						<AppCard app_name="Find Me Home" url="/" />
					</div>
				</div>
			</div>
		</>
	);
}
