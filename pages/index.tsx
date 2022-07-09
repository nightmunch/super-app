import { AppList } from "../components/AppList";

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
			<AppList />
		</>
	);
}
