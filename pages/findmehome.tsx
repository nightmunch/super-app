import { LoanCalculator } from "../components/LoanCalculator";

export default function FindMeHome() {
	return (
		<>
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<div className="card-body">
					<div className="flex flex-col xl:w-1/2 md:m-auto sm:flex-row sm:gap-10 justify-center">
						<div className="flex">
							<div className="my-auto">
								<h1 className="text-lg">Welcome to</h1>
								<h2 className="text-3xl font-semibold text-primary">
									Find Me Home
								</h2>
								<h2 className="text-lg pt-1">
									Auto property suggestion{" "}
									<span className="line-through">for lazy people</span>.
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="card bg-neutral shadow-xl text-neutral-content ">
				<div className="card-body sm:mx-auto sm:w-[42rem]">
					<LoanCalculator />
				</div>
			</div>
		</>
	);
}
