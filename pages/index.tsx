import { useEffect, useState } from "react";

let timer: any;
export default function Home() {
	const [counterState, setCounter] = useState(0);
	useEffect(() => {
		clearInterval(timer);
		timer = setInterval(() => {
			if (counterState >= 100.0) {
				clearInterval(timer);
				setCounter(0);
				return;
			}
			setCounter((prev) => prev + 0.1);
		}, 5);

		return () => clearInterval(timer);
	}, [counterState]);
	return (
		<>
			<div className="hero bg-base-200 py-5">
				<div className="hero-content  sm:text-center">
					<div className="max-w-md">
						<h2 className="text-4xl sm:text-5xl font-semibold text-primary">
							Super<span className="text-base-content">App</span>
						</h2>
						<p className="py-6">
							Welcome to one for all web application. Consist of personal
							finance, storage management and many more to come!
						</p>
						<span className="text-xs text-gray-600">
							Why there is a loading bar here.?
						</span>
						<progress
							className="progress progress-primary w-full"
							value={counterState}
							max="100"
						></progress>
					</div>
				</div>
			</div>
		</>
	);
}
