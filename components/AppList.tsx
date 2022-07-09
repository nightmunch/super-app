import Link from "next/link";

type AppCardType = {
	app_name?: string;
	url?: string;
};

const AppCard: React.FunctionComponent<AppCardType> = ({
	app_name = "App",
	url = "/",
}) => {
	return (
		<Link href={url}>
			<div className="btn btn-primary h-20">{app_name}</div>
		</Link>
	);
};

export const AppList: React.FunctionComponent = ({}) => {
	return (
		<div className="card bg-neutral shadow-xl text-neutral-content mx-auto sm:w-96">
			<div className="card-body">
				<div className="grid gap-3 grid-cols-3">
					<AppCard app_name="Find Me Home" url="/findmehome" />
					<AppCard />
					<AppCard />
					<AppCard />
				</div>
			</div>
		</div>
	);
};
